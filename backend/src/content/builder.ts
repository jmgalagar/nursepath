/**
 * Content builder — a tiny DSL for authoring courses compactly and consistently.
 *
 * It auto-generates globally-unique step/pathway/unit IDs from the course code
 * and position, so course files stay focused on REAL CONTENT (titles, readings,
 * quiz questions, simulations) rather than ID bookkeeping.
 *
 * The hand-authored flagship (ncm103.ts) shows the raw structure; the remaining
 * courses use this builder for consistency and brevity.
 */
import type {
  Course,
  CourseCategory,
  DecisionNode,
  Pathway,
  QuizQuestion,
  Step,
  StepKind,
  Unit,
} from "@nursepath/shared";
import { STEP_XP } from "@nursepath/shared";

/** A choice in an input decision node (id auto-generated if omitted). */
interface DecisionChoiceInput {
  id?: string;
  label: string;
  next: string;
  feedback?: string;
}

/** A decision node as authored in a course file (id comes from the object key). */
interface DecisionNodeInput {
  scenario: string;
  patient?: DecisionNode["patient"];
  choices?: DecisionChoiceInput[];
  debrief?: string;
  success?: boolean;
}


/* ---- step constructors (id is assigned later by the path builder) ---- */

export interface StepOpts {
  minutes?: number;
  skills?: string[];
  xp?: number;
}

export function vid(
  title: string,
  summary: string,
  opts: StepOpts & { url?: string; transcript?: string } = {},
): Omit<Step, "id"> & { kind: "video" } {
  return {
    kind: "video",
    title,
    summary,
    minutes: opts.minutes,
    skills: opts.skills,
    xp: opts.xp,
    url: opts.url,
    transcript: opts.transcript,
  } as Omit<Step, "id"> & { kind: "video" };
}

export function read(
  title: string,
  summary: string,
  body: string,
  opts: StepOpts & { source?: string; takeaways?: string[] } = {},
): Omit<Step, "id"> & { kind: "reading" } {
  return {
    kind: "reading",
    title,
    summary,
    body,
    minutes: opts.minutes,
    skills: opts.skills,
    xp: opts.xp,
    source: opts.source,
    takeaways: opts.takeaways,
  } as Omit<Step, "id"> & { kind: "reading" };
}

export function prac(
  title: string,
  summary: string,
  checklist: string[],
  opts: StepOpts & { equipment?: string[] } = {},
): Omit<Step, "id"> & { kind: "practice" } {
  return {
    kind: "practice",
    title,
    summary,
    checklist,
    minutes: opts.minutes,
    skills: opts.skills,
    xp: opts.xp,
    equipment: opts.equipment,
  } as Omit<Step, "id"> & { kind: "practice" };
}

export function q(
  prompt: string,
  options: string[],
  correctIndex: number,
  explanation: string,
): Omit<QuizQuestion, "id"> {
  return { prompt, options, correctIndex, explanation };
}

export function quiz(
  title: string,
  summary: string,
  questions: Omit<QuizQuestion, "id">[],
  opts: StepOpts & { passThreshold?: number; timeLimit?: number } = {},
): Omit<Step, "id"> & { kind: "quiz" } {
  return {
    kind: "quiz",
    title,
    summary,
    questions: questions as QuizQuestion[],
    minutes: opts.minutes,
    skills: opts.skills,
    xp: opts.xp,
    passThreshold: opts.passThreshold ?? 0.7,
    timeLimit: opts.timeLimit,
  } as Omit<Step, "id"> & { kind: "quiz" };
}

/** Decision-tree simulation. Pass nodes as an object keyed by id. */
export function simDecision(
  title: string,
  summary: string,
  entry: string,
  nodes: Record<string, DecisionNodeInput>,
  opts: StepOpts = {},
): Omit<Step, "id"> & { kind: "simulation"; simKind: "decision" } {
  const withIds: Record<string, DecisionNode> = {};
  for (const [id, node] of Object.entries(nodes)) {
    withIds[id] = {
      id,
      scenario: node.scenario,
      patient: node.patient,
      debrief: node.debrief,
      success: node.success,
      choices: node.choices?.map((c, i) => ({
        id: c.id ?? `${id}-c${i}`,
        label: c.label,
        next: c.next,
        feedback: c.feedback,
      })),
    };
  }
  return {
    kind: "simulation",
    simKind: "decision",
    title,
    summary,
    entry,
    nodes: withIds,
    minutes: opts.minutes,
    skills: opts.skills,
    xp: opts.xp,
  } as unknown as Omit<Step, "id"> & { kind: "simulation"; simKind: "decision" };
}

export function simSequence(
  title: string,
  summary: string,
  instruction: string,
  items: string[],
  opts: StepOpts = {},
): Omit<Step, "id"> & { kind: "simulation"; simKind: "sequence" } {
  return {
    kind: "simulation",
    simKind: "sequence",
    title,
    summary,
    instruction,
    items,
    minutes: opts.minutes,
    skills: opts.skills,
    xp: opts.xp,
  } as unknown as Omit<Step, "id"> & { kind: "simulation"; simKind: "sequence" };
}

/* ---- container builders (assign ids) ---- */

const slug = (code: string) => code.toLowerCase().replace(/\s+/g, "");

export function pathway(
  title: string,
  summary: string,
  icon: string,
  steps: Omit<Step, "id">[],
): Omit<Pathway, "id"> {
  return { title, summary, icon, steps: steps as Step[] };
}

export function unit(
  title: string,
  summary: string,
  icon: string,
  hours: number,
  pathways: Omit<Pathway, "id">[],
): Omit<Unit, "id"> {
  return { title, summary, icon, hours, pathways: pathways as Pathway[] };
}

export interface CourseOpts {
  code: string;
  title: string;
  category: CourseCategory;
  tagline: string;
  icon: string;
  hours: number;
  outcomes: string[];
  badges?: string[];
  units: Omit<Unit, "id">[];
}

/** Build a fully-formed Course with deterministic, unique IDs throughout. */
export function course(opts: CourseOpts): Course {
  const c = slug(opts.code);
  const units: Unit[] = opts.units.map((u, ui) => {
    const unitId = `${c}-u${ui + 1}`;
    const pathways: Pathway[] = u.pathways.map((p, pi) => {
      const pathwayId = `${unitId}-p${pi + 1}`;
      const steps: Step[] = p.steps.map((s, si) => {
        const kindSuffix: string = s.kind;
        return {
          ...(s as Step),
          id: `${pathwayId}-s${si + 1}-${kindSuffix}`,
          // ensure xp default
          xp: (s as Step).xp ?? STEP_XP[s.kind as StepKind],
        } as Step;
      });
      return { ...(p as Pathway), id: pathwayId, steps };
    });
    return { ...(u as Unit), id: unitId, pathways };
  });

  return {
    code: opts.code,
    title: opts.title,
    category: opts.category,
    tagline: opts.tagline,
    icon: opts.icon,
    hours: opts.hours,
    outcomes: opts.outcomes,
    badges: opts.badges,
    units,
  };
}
