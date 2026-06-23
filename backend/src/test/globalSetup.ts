/**
 * Vitest globalSetup — runs ONCE before any test module is imported.
 *
 * This is critical: src/db.ts reads DATABASE_URL at import time, so the env var
 * and schema must be ready before the first test file loads. We create a fresh
 * temp SQLite file, push the schema to it, and set the env so every test module
 * shares the same isolated DB for the whole run.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

let tempDir: string;

export function setup() {
  tempDir = mkdtempSync(path.join(tmpdir(), "nursepath-test-"));

  // Must be set before any test imports src/db.ts.
  process.env.DATABASE_URL = `file:${path.join(tempDir, "test.db")}`;
  process.env.NODE_ENV = "test";
  process.env.JWT_SECRET = "test-secret";

  execFileSync("npx", ["prisma", "db", "push", "--force-reset", "--skip-generate"], {
    stdio: "pipe",
    cwd: path.resolve(__dirname, "../.."),
    env: { ...process.env },
  });
}

export function teardown() {
  if (tempDir) {
    try {
      rmSync(tempDir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
}
