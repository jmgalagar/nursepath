import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globalSetup: ["./src/test/globalSetup.ts"],
    setupFiles: ["./src/test/setup.ts"],
    // Run tests serially — they share one SQLite DB file for the run.
    poolOptions: { threads: { singleThread: true } },
    globals: false,
  },
});
