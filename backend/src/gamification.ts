import { STEP_XP, type Badge, type GamificationState, type Step, type StepKind } from "@nursepath/shared";

import { prisma } from "./db.js";
import { ALL_BADGES } from "./content/index.js";
import { allSteps, getCourse } from "./content/index.js";

/* ----------------------------------------------------------------------------
 * Levels
 *
 * Each level requires progressively more XP. We use a simple quadratic-ish
 * curve so early levels feel quick and later levels take real effort.
 * ------------------------------------------------------------------------- */

interface LevelInfo {
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number; // 0 at max level
}

/** Cumulative XP needed to *reach* a given level. Level 1 = 0 XP. */
function xpForLevel(level: number): number {
  // Reach level n at cumulative 25 * (n-1) * n:
  //   L2=50, L3=150, L4=300, L5=500, L6=750, L7=1050, L10=2250
  // One flagship course (~700 XP) reaches ~level 5-6 — rewarding early,
  // while later levels take real sustained effort.
  return 25 * (level - 1) * level;
}

export function levelFromXp(totalXp: number): LevelInfo {
  // Solve 25*(L-1)*L <= totalXp  →  L^2 - L - totalXp/25 <= 0
  const approx = (Math.sqrt(1 + (8 * totalXp) / 50) + 1) / 2;
  let level = Math.floor(approx);
  if (level < 1) level = 1;
  // Clamp to ensure correctness (the formula is an upper-bound estimate).
  while (xpForLevel(level + 1) <= totalXp) level++;
  while (level > 1 && xpForLevel(level) > totalXp) level--;

  const xpIntoLevel = totalXp - xpForLevel(level);
  const xpForNextLevel = xpForLevel(level + 1) - xpForLevel(level);
  return { level, xpIntoLevel, xpForNextLevel };
}

/* ----------------------------------------------------------------------------
 * Badges
 *
 * Rule resolution runs after any progress change. It's idempotent — re-running
 * never re-awards an already-awarded badge (unique constraint guards it).
 * ------------------------------------------------------------------------- */

/**
 * Evaluate all badge rules for a user and award any newly-earned badges.
 * Returns the ids of badges awarded on this pass.
 */
export async function evaluateBadges(userId: string): Promise<string[]> {
  const completedStepIds = (
    await prisma.stepProgress.findMany({
      where: { userId },
      select: { stepId: true },
    })
  ).map((r) => r.stepId);

  const completedSet = new Set(completedStepIds);
  const alreadyAwarded = new Set(
    (await prisma.badgeAward.findMany({ where: { userId }, select: { badgeId: true } })).map(
      (b) => b.badgeId,
    ),
  );

  // Pre-compute per-skill counts of completed steps.
  const skillCounts = new Map<string, number>();
  for (const { step } of allSteps()) {
    if (!completedSet.has(step.id)) continue;
    for (const sk of step.skills ?? []) {
      skillCounts.set(sk, (skillCounts.get(sk) ?? 0) + 1);
    }
  }

  // Special badges need extra aggregates.
  const totalCompleted = completedStepIds.length;
  const quizzesPassed = countQuizzesPassed(completedSet);
  const { level } = levelFromXp(await getTotalXp(userId));
  const streakCurrent = (await computeStreak(userId)).current;

  const newlyAwarded: string[] = [];

  for (const badge of ALL_BADGES) {
    if (alreadyAwarded.has(badge.id)) continue;
    const earned = isEarned(badge, {
      completedSet,
      skillCounts,
      totalCompleted,
      quizzesPassed,
      level,
      streakCurrent,
    });
    if (earned) {
      await prisma.badgeAward.create({ data: { userId, badgeId: badge.id } }).catch(() => {});
      newlyAwarded.push(badge.id);
    }
  }

  return newlyAwarded;
}

function isEarned(
  badge: Badge,
  ctx: {
    completedSet: Set<string>;
    skillCounts: Map<string, number>;
    totalCompleted: number;
    quizzesPassed: number;
    level: number;
    streakCurrent: number;
  },
): boolean {
  switch (badge.rule.type) {
    case "course": {
      const course = getCourse(badge.rule.courseCode);
      if (!course) return false;
      const ids = collectStepIdsForCourse(course.code);
      return ids.length > 0 && ids.every((id) => ctx.completedSet.has(id));
    }
    case "pathway": {
      const ids = collectStepIdsForPathway(badge.rule.pathwayId);
      return ids.length > 0 && ids.every((id) => ctx.completedSet.has(id));
    }
    case "unit": {
      const ids = collectStepIdsForUnit(badge.rule.unitId);
      return ids.length > 0 && ids.every((id) => ctx.completedSet.has(id));
    }
    case "skill":
      return (ctx.skillCounts.get(badge.rule.skill) ?? 0) >= badge.rule.minSteps;
    case "special": {
      switch (badge.rule.key) {
        case "first-step":
          return ctx.totalCompleted >= 1;
        case "five-quizzes":
          return ctx.quizzesPassed >= 5;
        case "streak-3":
          return ctx.streakCurrent >= 3;
        case "level-5":
          return ctx.level >= 5;
        default:
          return false;
      }
    }
  }
}

function countQuizzesPassed(completedSet: Set<string>): number {
  let n = 0;
  for (const { step } of allSteps()) {
    if (step.kind === "quiz" && completedSet.has(step.id)) n++;
  }
  return n;
}

/* ---- step-id collectors (for course/unit/pathway completion badges) ---- */

function collectStepIdsForCourse(courseCode: string): string[] {
  const course = getCourse(courseCode);
  if (!course) return [];
  const ids: string[] = [];
  for (const u of course.units) for (const p of u.pathways) for (const s of p.steps) ids.push(s.id);
  return ids;
}

function collectStepIdsForUnit(unitId: string): string[] {
  const ids: string[] = [];
  for (const c of getCoursesIterable()) {
    for (const u of c.units) {
      if (u.id === unitId) {
        for (const p of u.pathways) for (const s of p.steps) ids.push(s.id);
        return ids;
      }
    }
  }
  return ids;
}

function collectStepIdsForPathway(pathwayId: string): string[] {
  for (const c of getCoursesIterable()) {
    for (const u of c.units) {
      for (const p of u.pathways) {
        if (p.id === pathwayId) return p.steps.map((s) => s.id);
      }
    }
  }
  return [];
}

// Avoid an import cycle by re-reading COURSES via a helper.
import { COURSES } from "./content/index.js";
function getCoursesIterable() {
  return COURSES;
}

/* ----------------------------------------------------------------------------
 * Streaks
 * ------------------------------------------------------------------------- */

/** Returns { current, longest, lastActiveDate }. */
export async function computeStreak(userId: string): Promise<{
  current: number;
  longest: number;
  lastActiveDate: string | null;
}> {
  const days = (
    await prisma.streakDay.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      select: { date: true },
    })
  ).map((d) => d.date);

  if (days.length === 0) return { current: 0, longest: 0, lastActiveDate: null };

  // Current streak: count consecutive days back from today (or yesterday, to
  // keep a streak alive through the start of a new day).
  const today = todayUtc();
  const yesterday = shiftDay(today, -1);
  let cursor: string | null = days[0] === today || days[0] === yesterday ? days[0] : null;
  let current = 0;
  if (cursor) {
    current = 1;
    for (let i = 1; i < days.length; i++) {
      if (days[i] === shiftDay(cursor, -1)) {
        current++;
        cursor = days[i];
      } else break;
    }
  }

  // Longest streak: scan the sorted-desc list for the longest run of
  // consecutive days.
  let longest = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    if (days[i] === shiftDay(days[i - 1], -1)) {
      run++;
      longest = Math.max(longest, run);
    } else {
      run = 1;
    }
  }

  return { current, longest, lastActiveDate: days[0] };
}

/** Mark today as an active day (idempotent via upsert — no thrown error). */
export async function touchStreakToday(userId: string): Promise<void> {
  const date = todayUtc();
  await prisma.streakDay.upsert({
    where: { userId_date: { userId, date } },
    update: {},
    create: { userId, date },
  });
}

/* ----------------------------------------------------------------------------
 * Aggregated gamification state (for GET /gamification/me)
 * ------------------------------------------------------------------------- */

export async function buildGamificationState(userId: string): Promise<GamificationState> {
  const totalXp = await getTotalXp(userId);
  const { level, xpIntoLevel, xpForNextLevel } = levelFromXp(totalXp);

  const badges = (
    await prisma.badgeAward.findMany({
      where: { userId },
      orderBy: { awardedAt: "desc" },
      select: { badgeId: true, awardedAt: true },
    })
  ).map((b) => ({ badgeId: b.badgeId, awardedAt: b.awardedAt.toISOString() }));

  const streak = await computeStreak(userId);

  // Skill mastery: completed/total steps per skill tag across the catalog.
  const completedRows = await prisma.stepProgress.findMany({
    where: { userId },
    select: { stepId: true },
  });
  const completedSet = new Set(completedRows.map((r) => r.stepId));

  const skills: GamificationState["skills"] = {};
  for (const { step } of allSteps()) {
    for (const sk of step.skills ?? []) {
      skills[sk] ??= { completed: 0, total: 0, percent: 0 };
      skills[sk].total++;
      if (completedSet.has(step.id)) skills[sk].completed++;
    }
  }
  for (const sk of Object.keys(skills)) {
    const s = skills[sk];
    s.percent = s.total === 0 ? 0 : Math.round((s.completed / s.total) * 100);
  }

  return {
    totalXp,
    level,
    xpIntoLevel,
    xpForNextLevel,
    badges,
    streak,
    skills,
  };
}

async function getTotalXp(userId: string): Promise<number> {
  const agg = await prisma.stepProgress.aggregate({
    where: { userId },
    _sum: { xpAwarded: true },
  });
  return agg._sum.xpAwarded ?? 0;
}

/* ----------------------------------------------------------------------------
 * Date helpers (UTC day strings: YYYY-MM-DD)
 * ------------------------------------------------------------------------- */

export function todayUtc(): string {
  return toDateStr(new Date());
}

export function shiftDay(dateStr: string, deltaDays: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + deltaDays);
  return toDateStr(d);
}

function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/* ----------------------------------------------------------------------------
 * XP helpers for step completion
 * ------------------------------------------------------------------------- */

export function xpForStep(step: Step): number {
  return step.xp ?? STEP_XP[step.kind as StepKind];
}
