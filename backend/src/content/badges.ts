import type { Badge } from "@nursepath/shared";

/**
 * Badge catalog. Rules are resolved by the gamification engine
 * (src/gamification.ts) against a user's progress.
 *
 * - pathway/unit/course rules auto-fire on completion roll-up.
 * - skill rules fire when enough steps tagged with a skill are done.
 * - special rules are hand-keyed one-offs.
 */
export const BADGES: Badge[] = [
  // --- Course-completion badges (one per flagship) ---
  {
    id: "course-ncm103",
    name: "Fundamentals Achiever",
    description: "Completed every step in NCM 103 — Fundamentals of Nursing Practice.",
    icon: "🏅",
    kind: "course",
    rule: { type: "course", courseCode: "NCM 103" },
  },
  {
    id: "course-ncm101",
    name: "Master Assessor",
    description: "Completed every step in NCM 101 — Health Assessment.",
    icon: "🩺",
    kind: "course",
    rule: { type: "course", courseCode: "NCM 101" },
  },
  {
    id: "course-ncm106",
    name: "Pharmacology Pro",
    description: "Completed every step in NCM 106 — Pharmacology.",
    icon: "💊",
    kind: "course",
    rule: { type: "course", courseCode: "NCM 106" },
  },
  {
    id: "course-ncm112",
    name: "Critical Care Ready",
    description: "Completed every step in NCM 112 — Oxygenation & Fluids.",
    icon: "🫁",
    kind: "course",
    rule: { type: "course", courseCode: "NCM 112" },
  },

  // --- Skill badges ---
  {
    id: "skill-vitals",
    name: "Vital Signs Master",
    description: "Completed 6+ steps tagged with vital-signs skills.",
    icon: "💓",
    kind: "skill",
    rule: { type: "skill", skill: "vital-signs", minSteps: 6 },
  },
  {
    id: "skill-infection-control",
    name: "Infection Control Expert",
    description: "Completed 5+ steps tagged with infection-control skills.",
    icon: "🦠",
    kind: "skill",
    rule: { type: "skill", skill: "infection-control", minSteps: 5 },
  },
  {
    id: "skill-medication",
    name: "Medication Safety Champion",
    description: "Completed 5+ steps tagged with medication-administration skills.",
    icon: "💉",
    kind: "skill",
    rule: { type: "skill", skill: "medication-administration", minSteps: 5 },
  },

  // --- Special badges ---
  {
    id: "special-first-steps",
    name: "First Steps",
    description: "Completed your very first learning step.",
    icon: "🌱",
    kind: "special",
    rule: { type: "special", key: "first-step" },
  },
  {
    id: "special-quiz-whiz",
    name: "Quiz Whiz",
    description: "Passed 5 quizzes.",
    icon: "🧠",
    kind: "special",
    rule: { type: "special", key: "five-quizzes" },
  },
  {
    id: "special-streak-3",
    name: "On Fire",
    description: "Reached a 3-day study streak.",
    icon: "🔥",
    kind: "special",
    rule: { type: "special", key: "streak-3" },
  },
  {
    id: "special-level-5",
    name: "Rising Clinician",
    description: "Reached Level 5.",
    icon: "⭐",
    kind: "special",
    rule: { type: "special", key: "level-5" },
  },
];

export const BADGE_IDS = new Set(BADGES.map((b) => b.id));
