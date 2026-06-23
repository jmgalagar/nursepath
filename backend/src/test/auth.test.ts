import { describe, it, expect } from "vitest";
import request from "supertest";

import { createApp } from "../index.js";

const app = () => createApp();

const unique = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}@test.com`;

describe("auth", () => {
  it("registers a new user and returns a token", async () => {
    const email = unique("alice");
    const res = await request(app())
      .post("/api/auth/register")
      .send({ email, password: "secret123", name: "Alice" });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeTypeOf("string");
    expect(res.body.user.email).toBe(email);
    expect(res.body.user.name).toBe("Alice");
  });

  it("rejects duplicate registration", async () => {
    const email = unique("bob");
    await request(app())
      .post("/api/auth/register")
      .send({ email, password: "secret123", name: "Bob" });

    const res = await request(app())
      .post("/api/auth/register")
      .send({ email, password: "secret123", name: "Bob" });

    expect(res.status).toBe(409);
  });

  it("logs in with correct credentials", async () => {
    const email = unique("carol");
    await request(app())
      .post("/api/auth/register")
      .send({ email, password: "secret123", name: "Carol" });

    const res = await request(app()).post("/api/auth/login").send({ email, password: "secret123" });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTypeOf("string");
  });

  it("rejects wrong password", async () => {
    const email = unique("dave");
    await request(app())
      .post("/api/auth/register")
      .send({ email, password: "secret123", name: "Dave" });

    const res = await request(app()).post("/api/auth/login").send({ email, password: "wrongpass" });
    expect(res.status).toBe(401);
  });

  it("requires a token for /me", async () => {
    const res = await request(app()).get("/api/auth/me");
    expect(res.status).toBe(401);
  });

  it("returns the user for /me with a valid token", async () => {
    const email = unique("erin");
    const reg = await request(app())
      .post("/api/auth/register")
      .send({ email, password: "secret123", name: "Erin" });

    const res = await request(app())
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${reg.body.token}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(email);
  });
});
