/**
 * Seed script — creates a demo account with realistic partial progress so the
 * dashboard, badges, XP, level, and streak all look alive on first run.
 *
 * Run: npm run seed  (or: npm run setup)
 */
import bcrypt from "bcryptjs";

import { prisma } from "./db.js";
import { allSteps } from "./content/index.js";
import { evaluateBadges, xpForStep, touchStreakToday, shiftDay, todayUtc } from "./gamification.js";

const DEMO_EMAIL = "demo@nursepath.app";
const DEMO_PASSWORD = "nurse123";

async function main() {
  console.log("🌱 Seeding NursePath demo data...");

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  // Upsert the demo user.
  const user = await prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: { isAdmin: false },
    create: {
      email: DEMO_EMAIL,
      name: "Demo Nurse",
      passwordHash,
      verified: true,
    },
  });

  // Clear old demo progress so re-seeding is deterministic.
  await prisma.stepProgress.deleteMany({ where: { userId: user.id } });
  await prisma.badgeAward.deleteMany({ where: { userId: user.id } });
  await prisma.streakDay.deleteMany({ where: { userId: user.id } });

  // Complete the first ~14 steps of NCM 103 (Fundamentals) plus a few from
  // Health Assessment, to give a mix of XP and a couple of badges.
  const targetSteps = allSteps()
    .filter((x) => ["NCM 103", "NCM 101", "MC 1"].includes(x.courseCode))
    .slice(0, 16);

  for (const { step, courseCode } of targetSteps) {
    await prisma.stepProgress.create({
      data: { userId: user.id, stepId: step.id, courseCode, xpAwarded: xpForStep(step) },
    });
  }

  // Build a believable streak: active today, yesterday, and 2 days ago.
  const today = todayUtc();
  for (const offset of [0, -1, -2]) {
    await prisma.streakDay.create({ data: { userId: user.id, date: shiftDay(today, offset) } });
  }

  // Evaluate badges against the new progress.
  const awarded = await evaluateBadges(user.id);

  // Also create a second sample user so the leaderboard isn't empty.
  const user2 = await prisma.user.upsert({
    where: { email: "trainee@nursepath.app" },
    update: { isAdmin: false },
    create: {
      email: "trainee@nursepath.app",
      name: "Trainee Santos",
      passwordHash: await bcrypt.hash("nurse123", 10),
      verified: true,
    },
  });
  const sample2 = allSteps().slice(0, 6);
  // Clear trainee's old progress so re-seeding is deterministic (matches demo user).
  await prisma.stepProgress.deleteMany({ where: { userId: user2.id } });
  await prisma.streakDay.deleteMany({ where: { userId: user2.id } });
  for (const { step, courseCode } of sample2) {
    await prisma.stepProgress.create({
      data: { userId: user2.id, stepId: step.id, courseCode, xpAwarded: xpForStep(step) },
    });
  }
  await touchStreakToday(user2.id);

  const total = await prisma.stepProgress.aggregate({
    where: { userId: user.id },
    _sum: { xpAwarded: true },
  });

  console.log(`✅ Demo user ready:`);
  console.log(`   email:    ${DEMO_EMAIL}`);
  console.log(`   password: ${DEMO_PASSWORD}`);
  console.log(`   completed ${targetSteps.length} steps for ${total._sum.xpAwarded ?? 0} XP`);
  console.log(`   awarded ${awarded.length} badges: ${awarded.join(", ") || "(none yet)"}`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
