/**
 * NursePath — shared domain types.
 *
 * Single source of truth for content (backend/content/*), the REST API, and the
 * React frontend. If you change something here, both apps re-typecheck against it.
 *
 * The content model is hierarchical (the 3-level flow in the spec):
 *   Course  ->  Unit  ->  Pathway  ->  Step
 * A Pathway is the step-by-step learning track:
 *   Video  ->  Reading  ->  Practice  ->  Simulation  ->  Quiz
 */

/* ----------------------------------------------------------------------------
 * Catalog enums
 * ------------------------------------------------------------------------- */

export type CourseCategory =
  | "MC" // Major & Foundational Medical Science
  | "NCM" // Core Nursing Care Management
  | "ELECTIVE"; // Professional Nursing Electives & Research

/* ----------------------------------------------------------------------------
 * Step (Level 3 atomic item)
 * ------------------------------------------------------------------------- */

export type StepKind = "video" | "reading" | "practice" | "simulation" | "quiz";

/** XP awarded for completing a step of each kind. Single source for awards. */
export const STEP_XP: Record<StepKind, number> = {
  video: 10,
  reading: 5,
  practice: 20,
  simulation: 20,
  quiz: 50,
};

/** Emoji/icon used across the UI to represent each step kind. */
export const STEP_ICON: Record<StepKind, string> = {
  video: "🎥",
  reading: "📘",
  practice: "🧪",
  simulation: "🧠",
  quiz: "❓",
};

export interface StepBase {
  id: string; // globally unique, e.g. "ncm103-u2-p1-s-quiz"
  kind: StepKind;
  title: string;
  /** Short description shown under the title. */
  summary: string;
  /** XP awarded (defaults to STEP_XP[kind] if omitted). */
  xp?: number;
  /** Skills this step contributes to, e.g. "bp-measurement". */
  skills?: string[];
  /** Estimated minutes to complete. */
  minutes?: number;
}

export interface VideoStep extends StepBase {
  kind: "video";
  /** OEmbed-able YouTube URL or any embeddable video. Optional (can be a placeholder). */
  url?: string;
  /** Transcript / talking points shown below the video. */
  transcript?: string;
}

export interface ReadingStep extends StepBase {
  kind: "reading";
  /** Markdown body of the reading. */
  body: string;
  /** Key takeaways surfaced as a checklist. */
  takeaways?: string[];
  /** Source attribution for the research-backed content. */
  source?: string;
}

export interface PracticeStep extends StepBase {
  kind: "practice";
  /** Hands-on instructions the student checks off. */
  checklist: string[];
  /** Equipment needed. */
  equipment?: string[];
}

export type Step = VideoStep | ReadingStep | PracticeStep | SimulationStep | QuizStep;

/* ----------------------------------------------------------------------------
 * Quiz (a step kind)
 * ------------------------------------------------------------------------- */

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  /** Index into `options` of the correct answer. */
  correctIndex: number;
  /** Explanation shown after answering (reinforces learning). */
  explanation: string;
}

export interface QuizStep extends StepBase {
  kind: "quiz";
  questions: QuizQuestion[];
  /** Pass threshold as a fraction (0..1). Default 0.7. */
  passThreshold?: number;
  /** Optional time limit in minutes. When set, a countdown timer is shown
   *  and the quiz auto-submits when time expires. */
  timeLimit?: number;
}

/* ----------------------------------------------------------------------------
 * Clinical simulation (a step kind)
 *
 * Two flavours:
 *  - "decision": a branching patient scenario (decision tree)
 *  - "sequence": a drag-and-drop "put these steps in order" procedure
 * ------------------------------------------------------------------------- */

export type SimulationKind = "decision" | "sequence";

/** A vitals/patient snapshot displayed in simulations to make scenarios realistic. */
export interface PatientSnapshot {
  name?: string;
  age?: number;
  sex?: "M" | "F";
  /** Loosely typed so different scenarios can show what they need. */
  vitals?: Record<string, string>;
  /** Free-form clinical context line. */
  context?: string;
}

/** A node in a decision-tree simulation. */
export interface DecisionNode {
  id: string;
  /** Scenario text / nurse prompt shown to the student. */
  scenario: string;
  /** Optional patient snapshot (vitals etc.) to display. */
  patient?: PatientSnapshot;
  /** Choices the student can take. Empty = leaf (debrief). */
  choices?: DecisionChoice[];
  /** Shown when this node is reached as an outcome/debrief (leaf nodes). */
  debrief?: string;
  /** True when reaching this node counts as a correct resolution. */
  success?: boolean;
}

export interface DecisionChoice {
  id: string;
  label: string;
  /** Id of the next node to go to. */
  next: string;
  /** Immediate feedback after choosing (before the next node). */
  feedback?: string;
}

/** Decision-tree simulation: a branching patient scenario. */
export interface DecisionSimulation extends StepBase {
  kind: "simulation";
  simKind: "decision";
  /** Id of the entry node. */
  entry: string;
  nodes: Record<string, DecisionNode>;
}

/** Sequence simulation: a drag-and-drop "order these steps" procedure. */
export interface SequenceSimulation extends StepBase {
  kind: "simulation";
  simKind: "sequence";
  /** Instruction shown above the shuffled items. */
  instruction: string;
  /** Items in the CORRECT order (the engine shuffles them for the student). */
  items: string[];
}

/** Simulation steps come in two flavours, discriminated by `simKind`. */
export type SimulationStep = DecisionSimulation | SequenceSimulation;

/* ----------------------------------------------------------------------------
 * Pathway (Level 3 container) & Unit (Level 2)
 * ------------------------------------------------------------------------- */

export interface Pathway {
  id: string;
  title: string;
  summary: string;
  /** Emoji used on the pathway card. */
  icon: string;
  steps: Step[];
}

export interface Unit {
  id: string;
  title: string;
  summary: string;
  /** Emoji used on the unit card. */
  icon: string;
  /** Approx total hours across pathways. */
  hours: number;
  pathways: Pathway[];
}

/* ----------------------------------------------------------------------------
 * Course (Level 1)
 * ------------------------------------------------------------------------- */

export interface Course {
  /** Catalog code, e.g. "NCM 103". */
  code: string;
  title: string;
  category: CourseCategory;
  /** Short tagline for the catalog card. */
  tagline: string;
  /** Emoji used as the course avatar. */
  icon: string;
  /** Total lecture/lab hours (from the curriculum spec). */
  hours: number;
  /** "What you'll learn" bullets shown on the hero. */
  outcomes: string[];
  units: Unit[];
  /** Badges this course can award (ids reference the badge catalog). */
  badges?: string[];
}

/* ----------------------------------------------------------------------------
 * Badges
 * ------------------------------------------------------------------------- */

export type BadgeKind = "pathway" | "unit" | "course" | "skill" | "special";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  kind: BadgeKind;
  /**
   * Rule that awards this badge. Resolved by the backend.
   *  - pathway/unit/course: { scope, targetId }
   *  - special/skill: { type: "special", key } keyed off skill tags
   */
  rule:
    | { type: "pathway"; pathwayId: string }
    | { type: "unit"; unitId: string }
    | { type: "course"; courseCode: string }
    | { type: "skill"; skill: string; minSteps: number }
    | { type: "special"; key: string };
}

/* ----------------------------------------------------------------------------
 * API DTOs (what the backend returns to the frontend)
 * ------------------------------------------------------------------------- */

export interface CourseSummary {
  code: string;
  title: string;
  category: CourseCategory;
  tagline: string;
  icon: string;
  hours: number;
  unitCount: number;
  pathwayCount: number;
  stepCount: number;
}

export interface CourseProgress {
  courseCode: string;
  completedSteps: number;
  totalSteps: number;
  /** 0..1 */
  fraction: number;
  percent: number;
  /** Per-unit roll-up. */
  units: {
    unitId: string;
    completedSteps: number;
    totalSteps: number;
    percent: number;
  }[];
}

export interface GamificationState {
  totalXp: number;
  level: number;
  /** XP still needed to reach the next level. */
  xpIntoLevel: number;
  xpForNextLevel: number;
  badges: { badgeId: string; awardedAt: string }[];
  streak: {
    current: number;
    longest: number;
    lastActiveDate: string | null;
  };
  /** Skill mastery: skill key -> { completed, total }. */
  skills: Record<string, { completed: number; total: number; percent: number }>;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
