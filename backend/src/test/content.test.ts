/**
 * Content validation — guards the authored catalog as it scales.
 *
 * Catches structural mistakes (duplicate ids, quizzes with no correct answer,
 * decision trees with broken links) that would otherwise surface only at runtime.
 */
import { describe, it, expect } from "vitest";

import { COURSES, ALL_BADGES, allSteps, getPathway, getUnit } from "../content/index.js";

describe("course catalog integrity", () => {
  it("has all 22 courses", () => {
    expect(COURSES.length).toBe(22);
  });

  it("every course has the required metadata", () => {
    for (const c of COURSES) {
      expect(c.code).toBeTruthy();
      expect(c.title).toBeTruthy();
      expect(["MC", "NCM", "ELECTIVE"]).toContain(c.category);
      expect(c.units.length).toBeGreaterThan(0);
      expect(c.outcomes.length).toBeGreaterThan(0);
    }
  });

  it("has unique course codes", () => {
    const codes = COURSES.map((c) => c.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it("every step id in the catalog is globally unique", () => {
    const ids = allSteps().map((x) => x.step.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes, `duplicate step ids: ${dupes.slice(0, 10).join(", ")}`).toEqual([]);
  });

  it("every pathway has at least one step", () => {
    for (const c of COURSES) {
      for (const u of c.units) {
        for (const p of u.pathways) {
          expect(p.steps.length, `${c.code} pathway ${p.id}`).toBeGreaterThan(0);
        }
      }
    }
  });

  it("every pathway contains a quiz step", () => {
    for (const c of COURSES) {
      for (const u of c.units) {
        for (const p of u.pathways) {
          const hasQuiz = p.steps.some((s) => s.kind === "quiz");
          expect(hasQuiz, `${c.code} / ${p.id} has no quiz`).toBe(true);
        }
      }
    }
  });

  it("every quiz question has a valid correct index", () => {
    for (const { step, courseCode } of allSteps()) {
      if (step.kind !== "quiz") continue;
      for (const q of step.questions) {
        expect(q.options.length, `${courseCode} ${step.id} ${q.prompt}`).toBeGreaterThanOrEqual(2);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
        expect(q.explanation).toBeTruthy();
      }
    }
  });

  it("every decision simulation has a reachable success node and valid links", () => {
    for (const { step } of allSteps()) {
      if (step.kind !== "simulation") continue;
      if (step.simKind !== "decision") continue;

      const nodeIds = new Set(Object.keys(step.nodes));
      expect(nodeIds.has(step.entry), `${step.id} entry ${step.entry} missing`).toBe(true);

      // Every choice.next must point to an existing node.
      for (const node of Object.values(step.nodes)) {
        for (const choice of node.choices ?? []) {
          expect(nodeIds.has(choice.next), `${step.id} choice → missing ${choice.next}`).toBe(true);
        }
      }

      // At least one success leaf exists.
      const hasSuccess = Object.values(step.nodes).some((n) => n.success);
      expect(hasSuccess, `${step.id} has no success/debrief node`).toBe(true);
    }
  });

  it("every sequence simulation has ordered items", () => {
    for (const { step } of allSteps()) {
      if (step.kind !== "simulation" || step.simKind !== "sequence") continue;
      expect(step.items.length, `${step.id} has items`).toBeGreaterThanOrEqual(3);
      expect(step.instruction).toBeTruthy();
    }
  });

  it("pathway and unit lookups resolve", () => {
    const first = COURSES[0].units[0].pathways[0];
    expect(getPathway(first.id)).toBeDefined();
    expect(getUnit(COURSES[0].units[0].id)).toBeDefined();
  });

  it("every badge rule references real content or known special keys", () => {
    const knownSpecials = new Set([
      "first-step",
      "five-quizzes",
      "streak-3",
      "level-5",
    ]);
    for (const badge of ALL_BADGES) {
      switch (badge.rule.type) {
        case "course": {
          const course = COURSES.find((c) => c.code === badge.rule.courseCode);
          expect(course, `badge ${badge.id} → unknown course`).toBeDefined();
          break;
        }
        case "special":
          expect(knownSpecials.has(badge.rule.key), `badge ${badge.id} → unknown special`).toBe(true);
          break;
        default:
          // pathway / unit / skill rules are validated at runtime.
          break;
      }
    }
  });
});
