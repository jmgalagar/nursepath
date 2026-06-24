/**
 * Vitest setupFiles run once per test file, after modules are imported.
 *
 * The real DB bootstrap lives in vitest.config.ts globalSetup (runs before any
 * import). This file just disconnects the shared client at the end of a run.
 */
import { afterAll } from "vitest";
import { prisma } from "../db.js";

afterAll(async () => {
  await prisma.$disconnect();
});
