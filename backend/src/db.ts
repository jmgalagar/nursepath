import { PrismaClient } from "@prisma/client";

// One shared PrismaClient per process (avoids exhausting connections in dev
// hot-reloading with tsx watch).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "test" ? ["error"] : ["warn", "error"],
  });

if (process.env.NODE_ENV !== "test") {
  globalForPrisma.prisma = prisma;
}
