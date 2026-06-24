import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { config } from "./config.js";
import { authRouter } from "./auth.js";
import { apiRouter } from "./routes.js";

export function createApp() {
  const app = express();

  app.use(cors({ origin: config.frontendOrigin, credentials: true }));
  app.use(express.json());
  app.use(helmet({ crossOriginOpenerPolicy: false, crossOriginResourcePolicy: false }));

  // Global rate limit: 200 requests / minute / IP.
  const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please slow down." },
  });

  // Stricter limit on auth endpoints: 15 attempts / 15 minutes / IP.
  // Protects against brute-force login/register attacks.
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many auth attempts from this IP, try again in 15 minutes." },
  });

  // Health check (no rate limit — used by Render/uptime monitors).
  app.get("/api/health", (_req, res) => res.json({ ok: true, name: "NursePath API" }));

  app.use("/api/auth", authLimiter, authRouter);
  app.use("/api", apiLimiter, apiRouter);

  // 404 fallback.
  app.use("/api", (_req, res) => res.status(404).json({ error: "Not found" }));

  // Central error handler.
  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("[NursePath API] error:", err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}

if (process.env.NODE_ENV !== "test") {
  const app = createApp();
  const port = config.port;
  // Render binds via PORT env; bind to 0.0.0.0 to accept external traffic.
  app.listen(port, "0.0.0.0", () => {
    console.log(`🩺 NursePath API listening on port ${port}`);
  });
}
