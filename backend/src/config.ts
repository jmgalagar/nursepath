import "dotenv/config";

const NODE_ENV = process.env.NODE_ENV ?? "development";
const isProduction = NODE_ENV === "production";
const isTest = NODE_ENV === "test";

const DATABASE_URL = process.env.DATABASE_URL ?? "file:./dev.db";
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";

// Production hardening: refuse to boot with insecure defaults.
if (isProduction) {
  if (JWT_SECRET === "dev-secret-change-me" || JWT_SECRET.length < 16) {
    throw new Error(
      "FATAL: JWT_SECRET must be set to a strong value (16+ chars) in production.",
    );
  }
  if (DATABASE_URL.startsWith("file:")) {
    throw new Error(
      "FATAL: DATABASE_URL must be a PostgreSQL connection string in production (got a file: URL).",
    );
  }
}

export const config = {
  nodeEnv: NODE_ENV,
  isProduction,
  isTest,
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: JWT_SECRET,
  databaseUrl: DATABASE_URL,
  // Frontend origin for CORS.
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
};
