import { Router, type Response, type NextFunction } from "express";
import { z } from "zod";
import type {
  Course,
  CourseProgress,
  GamificationState,
} from "@nursepath/shared";

import { prisma } from "./db.js";
import {
  COURSES,
  allSteps,
  getCourse,
  getStep,
  getPathway,
  getUnit,
  listCourseSummaries,
} from "./content/index.js";
import { ALL_BADGES } from "./content/index.js";
import { type AuthedRequest, requireAuth } from "./auth.js";
import {
  buildGamificationState,
  evaluateBadges,
  touchStreakToday,
  xpForStep,
} from "./gamification.js";

export const apiRouter = Router();

/* ----------------------------------------------------------------------------
 * Courses (read-only content)
 * ------------------------------------------------------------------------- */

apiRouter.get("/courses", (_req, res: Response) => {
  res.json(listCourseSummaries());
});

apiRouter.get("/courses/:code", (req, res) => {
  const course = getCourse(req.params.code);
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.json(course);
});

apiRouter.get("/badges", (_req, res) => {
  res.json(ALL_BADGES);
});

/* ----------------------------------------------------------------------------
 * Progress
 * ------------------------------------------------------------------------- */

const markStepSchema = z.object({ stepId: z.string() });

apiRouter.post("/progress/steps", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const parsed = markStepSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
    const { stepId } = parsed.data;

    const ctx = getStep(stepId);
    if (!ctx) return res.status(404).json({ error: "Step not found" });
    const { step, courseCode } = ctx;

    // Idempotent: if already completed, just return current state.
    const existing = await prisma.stepProgress.findUnique({
      where: { userId_stepId: { userId: req.userId!, stepId } },
    });

    let created = false;
    if (!existing) {
      await prisma.stepProgress.create({
        data: {
          userId: req.userId!,
          stepId,
          courseCode,
          xpAwarded: xpForStep(step),
        },
      });
      created = true;
      await touchStreakToday(req.userId!);
      await evaluateBadges(req.userId!);
    }

    const gamification = await buildGamificationState(req.userId!);
    const progress = await buildCourseProgress(req.userId!, courseCode);

    res.json({
      newlyCompleted: created,
      xpAwarded: created ? xpForStep(step) : 0,
      courseProgress: progress,
      gamification,
    });
  } catch (e) {
    next(e);
  }
});

/** Optional: allow un-completing a step (toggles off). */
apiRouter.delete("/progress/steps/:stepId", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    await prisma.stepProgress
      .delete({ where: { userId_stepId: { userId: req.userId!, stepId: req.params.stepId } } })
      .catch(() => {});
    const ctx = getStep(req.params.stepId);
    const courseCode = ctx?.courseCode;
    const gamification = await buildGamificationState(req.userId!);
    const courseProgress = courseCode
      ? await buildCourseProgress(req.userId!, courseCode)
      : null;
    res.json({ gamification, courseProgress });
  } catch (e) {
    next(e);
  }
});

/** All step ids completed by the user (for fast client hydration). */
apiRouter.get("/progress/completed", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const rows = await prisma.stepProgress.findMany({
      where: { userId: req.userId! },
      select: { stepId: true },
    });
    res.json({ completed: rows.map((r) => r.stepId) });
  } catch (e) {
    next(e);
  }
});

apiRouter.get("/progress/:courseCode", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const course = getCourse(req.params.courseCode);
    if (!course) return res.status(404).json({ error: "Course not found" });
    const progress = await buildCourseProgress(req.userId!, course.code);
    res.json(progress);
  } catch (e) {
    next(e);
  }
});

/** Roll-up progress for every course (for the dashboard grid). */
apiRouter.get("/progress", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const rows = await prisma.stepProgress.findMany({
      where: { userId: req.userId! },
      select: { stepId: true, courseCode: true },
    });
    const completedByCourse = new Map<string, Set<string>>();
    for (const r of rows) {
      if (!completedByCourse.has(r.courseCode)) completedByCourse.set(r.courseCode, new Set());
      completedByCourse.get(r.courseCode)!.add(r.stepId);
    }

    const out = COURSES.map((c) => computeCourseProgress(c, completedByCourse.get(c.code) ?? new Set()));
    res.json(out);
  } catch (e) {
    next(e);
  }
});

/* ----------------------------------------------------------------------------
 * Gamification
 * ------------------------------------------------------------------------- */

apiRouter.get("/gamification/me", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const state: GamificationState = await buildGamificationState(req.userId!);
    res.json(state);
  } catch (e) {
    next(e);
  }
});

apiRouter.get("/leaderboard", async (_req, res, next) => {
  try {
    const top = await prisma.stepProgress.groupBy({
      by: ["userId"],
      _sum: { xpAwarded: true },
      orderBy: { _sum: { xpAwarded: "desc" } },
      take: 10,
    });
    const users = await prisma.user.findMany({
      where: { id: { in: top.map((t) => t.userId) } },
      select: { id: true, name: true },
    });
    const nameById = new Map(users.map((u) => [u.id, u.name]));
    res.json(
      top.map((t, i) => ({
        rank: i + 1,
        userId: t.userId,
        name: nameById.get(t.userId) ?? "Unknown",
        xp: t._sum.xpAwarded ?? 0,
      })),
    );
  } catch (e) {
    next(e);
  }
});

/* ----------------------------------------------------------------------------
 * Pathways / Units / Simulations (lookup helpers)
 * ------------------------------------------------------------------------- */

apiRouter.get("/pathways/:pathwayId", (req, res) => {
  const found = getPathway(req.params.pathwayId);
  if (!found) return res.status(404).json({ error: "Pathway not found" });
  res.json({
    pathway: found.pathway,
    courseCode: found.course.code,
    courseTitle: found.course.title,
    unitId: found.unit.id,
    unitTitle: found.unit.title,
  });
});

apiRouter.get("/units/:unitId", (req, res) => {
  const found = getUnit(req.params.unitId);
  if (!found) return res.status(404).json({ error: "Unit not found" });
  res.json({ unit: found.unit, courseCode: found.course.code, courseTitle: found.course.title });
});

apiRouter.get("/simulations/:stepId", (req, res) => {
  const ctx = getStep(req.params.stepId);
  if (!ctx || ctx.step.kind !== "simulation") {
    return res.status(404).json({ error: "Simulation not found" });
  }
  res.json(ctx.step);
});

/* ----------------------------------------------------------------------------
 * Clinical log (skill tracking / peer notes)
 * ------------------------------------------------------------------------- */

const logSchema = z.object({
  courseCode: z.string().optional(),
  note: z.string().min(1).max(2000),
});

apiRouter.get("/clinical-log", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const entries = await prisma.clinicalLogEntry.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    res.json(entries);
  } catch (e) {
    next(e);
  }
});

apiRouter.post("/clinical-log", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const parsed = logSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid input" });
    const entry = await prisma.clinicalLogEntry.create({
      data: { userId: req.userId!, courseCode: parsed.data.courseCode, note: parsed.data.note },
    });
    res.status(201).json(entry);
  } catch (e) {
    next(e);
  }
});

apiRouter.delete("/clinical-log/:id", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    await prisma.clinicalLogEntry
      .delete({ where: { id: req.params.id, userId: req.userId! } })
      .catch(() => {});
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

/* ----------------------------------------------------------------------------
 * Progress math helpers
 * ------------------------------------------------------------------------- */

function buildCourseProgress(userId: string, courseCode: string): Promise<CourseProgress> {
  const course = getCourse(courseCode)!;
  return prisma.stepProgress
    .findMany({ where: { userId, courseCode }, select: { stepId: true } })
    .then((rows) => {
      const completed = new Set(rows.map((r) => r.stepId));
      return computeCourseProgress(course, completed);
    });
}

function computeCourseProgress(course: Course, completed: Set<string>): CourseProgress {
  const units = course.units.map((u) => {
    let totalSteps = 0;
    let completedSteps = 0;
    for (const p of u.pathways) {
      for (const s of p.steps) {
        totalSteps++;
        if (completed.has(s.id)) completedSteps++;
      }
    }
    return {
      unitId: u.id,
      completedSteps,
      totalSteps,
      percent: totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100),
    };
  });

  const totalSteps = units.reduce((a, u) => a + u.totalSteps, 0);
  const completedSteps = units.reduce((a, u) => a + u.completedSteps, 0);
  const fraction = totalSteps === 0 ? 0 : completedSteps / totalSteps;

  return {
    courseCode: course.code,
    completedSteps,
    totalSteps,
    fraction,
    percent: Math.round(fraction * 100),
    units,
  };
}
