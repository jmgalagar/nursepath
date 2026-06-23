import { describe, it, expect } from "vitest";
import request from "supertest";

import { createApp } from "../index.js";
import { allSteps } from "../content/index.js";

const app = () => createApp();

const unique = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}@test.com`;

async function register(prefix: string) {
  const email = unique(prefix);
  const res = await request(app())
    .post("/api/auth/register")
    .send({ email, password: "secret123", name: prefix });
  return { token: res.body.token as string, email };
}

async function complete(token: string, stepId: string) {
  return request(app())
    .post("/api/progress/steps")
    .set("Authorization", `Bearer ${token}`)
    .send({ stepId });
}

describe("badges", () => {
  it("awards the 'First Steps' badge on first completion", async () => {
    const { token } = await register("badge1");

    const res = await complete(token, "ncm103-u1-p1-s-video");
    const badgeIds = res.body.gamification.badges.map((b: { badgeId: string }) => b.badgeId);

    expect(badgeIds).toContain("special-first-steps");
  });

  it("awards the level-5 badge once enough XP is earned", async () => {
    const { token } = await register("badge2");

    // Complete every step in NCM 103 (33 steps) to pile up XP past level 5.
    const ncm103Steps = allSteps()
      .filter((x) => x.courseCode === "NCM 103")
      .map((x) => x.step.id);

    for (const stepId of ncm103Steps) {
      await complete(token, stepId);
    }

    const me = await request(app())
      .get("/api/gamification/me")
      .set("Authorization", `Bearer ${token}`);

    const badgeIds = me.body.badges.map((b: { badgeId: string }) => b.badgeId);
    // Completing all of NCM 103 should grant the course badge and a high level.
    expect(badgeIds).toContain("course-ncm103");
    expect(me.body.level).toBeGreaterThanOrEqual(5);
    expect(badgeIds).toContain("special-level-5");
  });

  it("does not re-award an existing badge", async () => {
    const { token } = await register("badge3");

    const first = await complete(token, "ncm103-u1-p1-s-video");
    const firstBadges = first.body.gamification.badges.length;

    const second = await complete(token, "ncm103-u1-p1-s-reading");
    const secondBadges = second.body.gamification.badges.length;

    // 'First Steps' awarded once; second completion shouldn't duplicate it.
    expect(secondBadges).toBeGreaterThanOrEqual(firstBadges);
    const ids = second.body.gamification.badges.map((b: { badgeId: string }) => b.badgeId);
    const firstStepsCount = ids.filter((id: string) => id === "special-first-steps").length;
    expect(firstStepsCount).toBe(1);
  });
});
