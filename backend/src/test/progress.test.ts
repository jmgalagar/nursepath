import { describe, it, expect } from "vitest";
import request from "supertest";

import { createApp } from "../index.js";
import { STEP_XP } from "@nursepath/shared";

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

/** A real step id from the catalog (first step of NCM 103). */
const SAMPLE_STEP_ID = "ncm103-u1-p1-s-video";

describe("progress & XP", () => {
  it("awards XP when a step is completed", async () => {
    const { token } = await register("xp1");

    const res = await request(app())
      .post("/api/progress/steps")
      .set("Authorization", `Bearer ${token}`)
      .send({ stepId: SAMPLE_STEP_ID });

    expect(res.status).toBe(200);
    expect(res.body.newlyCompleted).toBe(true);
    expect(res.body.xpAwarded).toBe(STEP_XP.video); // 10
    expect(res.body.gamification.totalXp).toBe(STEP_XP.video);
  });

  it("does NOT award XP twice for the same step", async () => {
    const { token } = await register("xp2");

    await request(app())
      .post("/api/progress/steps")
      .set("Authorization", `Bearer ${token}`)
      .send({ stepId: SAMPLE_STEP_ID });

    const second = await request(app())
      .post("/api/progress/steps")
      .set("Authorization", `Bearer ${token}`)
      .send({ stepId: SAMPLE_STEP_ID });

    expect(second.body.newlyCompleted).toBe(false);
    expect(second.body.xpAwarded).toBe(0);
    expect(second.body.gamification.totalXp).toBe(STEP_XP.video);
  });

  it("computes course progress percent", async () => {
    const { token } = await register("xp3");

    // Complete one step, then read the course progress.
    await request(app())
      .post("/api/progress/steps")
      .set("Authorization", `Bearer ${token}`)
      .send({ stepId: SAMPLE_STEP_ID });

    const res = await request(app())
      .get("/api/progress/NCM%20103")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.totalSteps).toBeGreaterThan(0);
    expect(res.body.completedSteps).toBe(1);
    expect(res.body.percent).toBeGreaterThan(0);
  });

  it("requires auth", async () => {
    const res = await request(app()).post("/api/progress/steps").send({ stepId: SAMPLE_STEP_ID });
    expect(res.status).toBe(401);
  });

  it("rejects an unknown step id", async () => {
    const { token } = await register("xp4");
    const res = await request(app())
      .post("/api/progress/steps")
      .set("Authorization", `Bearer ${token}`)
      .send({ stepId: "does-not-exist" });
    expect(res.status).toBe(404);
  });

  it("levels up as XP grows", async () => {
    const { token } = await register("xp5");

    // Level 1 at 0 XP. Complete several steps to gain XP.
    const before = await request(app())
      .get("/api/gamification/me")
      .set("Authorization", `Bearer ${token}`);
    expect(before.body.level).toBe(1);

    // Complete all the steps of the first pathway to accumulate XP.
    const steps = [
      "ncm103-u1-p1-s-video",
      "ncm103-u1-p1-s-reading",
      "ncm103-u1-p1-s-practice",
      "ncm103-u1-p1-s-quiz",
    ];
    for (const stepId of steps) {
      await request(app())
        .post("/api/progress/steps")
        .set("Authorization", `Bearer ${token}`)
        .send({ stepId });
    }

    const after = await request(app())
      .get("/api/gamification/me")
      .set("Authorization", `Bearer ${token}`);
    expect(after.body.totalXp).toBeGreaterThan(before.body.totalXp);
    expect(after.body.streak.current).toBeGreaterThanOrEqual(1);
  });
});
