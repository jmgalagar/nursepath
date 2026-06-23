import type {
  Badge,
  Course,
  CourseSummary,
  Pathway,
  Step,
  Unit,
} from "@nursepath/shared";

import { ncm103 } from "./ncm103.js";
import { ncm100 } from "./ncm100.js";
import { ncm101 } from "./ncm101.js";
import { ncm102 } from "./ncm102.js";
import { ncm104 } from "./ncm104.js";
import { ncm105 } from "./ncm105.js";
import { ncm106 } from "./ncm106.js";
import { ncm107 } from "./ncm107.js";
import { ncm109 } from "./ncm109.js";
import { ncm112 } from "./ncm112.js";
import { ncm113 } from "./ncm113.js";
import { ncm114 } from "./ncm114.js";
import { ncm116 } from "./ncm116.js";
import { ncm108 } from "./ncm108.js";
import { ncm110 } from "./ncm110.js";
import { ncm111 } from "./ncm111.js";
import { ncm115 } from "./ncm115.js";
import { ncm117 } from "./ncm117.js";
import { ncm118 } from "./ncm118.js";
import { mc1 } from "./mc1.js";
import { mc2 } from "./mc2.js";
import { mc3 } from "./mc3.js";
import { BADGES } from "./badges.js";

/**
 * The full NursePath catalog. Order = display order in the catalog.
 * Flagship (deepest) courses: NCM 103, NCM 101, NCM 106, NCM 112, MC 1, NCM 117.
 */
export const COURSES: Course[] = [
  // Major & Foundational Medical Science
  mc1,
  mc2,
  mc3,
  // Core Nursing Care Management
  ncm100,
  ncm101,
  ncm102,
  ncm103,
  ncm104,
  ncm105,
  ncm106,
  ncm107,
  ncm109,
  ncm112,
  ncm113,
  ncm114,
  ncm116,
  // Electives & Research
  ncm108,
  ncm110,
  ncm111,
  ncm115,
  ncm117,
  ncm118,
];

export const ALL_BADGES: Badge[] = BADGES;

/* ----------------------------------------------------------------------------
 * Lookup helpers (used by routes + gamification engine)
 * ------------------------------------------------------------------------- */

const courseByCode = new Map(COURSES.map((c) => [c.code, c]));

export function getCourse(code: string): Course | undefined {
  return courseByCode.get(code);
}

export function listCourseSummaries(): CourseSummary[] {
  return COURSES.map(toSummary);
}

export function toSummary(c: Course): CourseSummary {
  let pathwayCount = 0;
  let stepCount = 0;
  for (const u of c.units) {
    pathwayCount += u.pathways.length;
    for (const p of u.pathways) stepCount += p.steps.length;
  }
  return {
    code: c.code,
    title: c.title,
    category: c.category,
    tagline: c.tagline,
    icon: c.icon,
    hours: c.hours,
    unitCount: c.units.length,
    pathwayCount,
    stepCount,
  };
}

/** Flatten every step in the catalog with its course context. */
export function allSteps(): {
  step: Step;
  courseCode: string;
  unitId: string;
  pathwayId: string;
}[] {
  const out: { step: Step; courseCode: string; unitId: string; pathwayId: string }[] = [];
  for (const c of COURSES) {
    for (const u of c.units) {
      for (const p of u.pathways) {
        for (const s of p.steps) {
          out.push({ step: s, courseCode: c.code, unitId: u.id, pathwayId: p.id });
        }
      }
    }
  }
  return out;
}

const stepById = new Map(allSteps().map((x) => [x.step.id, x]));

export function getStep(stepId: string) {
  return stepById.get(stepId);
}

export function getPathway(pathwayId: string): {
  pathway: Pathway;
  course: Course;
  unit: Unit;
} | undefined {
  for (const c of COURSES) {
    for (const u of c.units) {
      for (const p of u.pathways) {
        if (p.id === pathwayId) return { pathway: p, course: c, unit: u };
      }
    }
  }
  return undefined;
}

export function getUnit(unitId: string): { unit: Unit; course: Course } | undefined {
  for (const c of COURSES) {
    for (const u of c.units) {
      if (u.id === unitId) return { unit: u, course: c };
    }
  }
  return undefined;
}
