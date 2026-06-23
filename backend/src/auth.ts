import { Router, type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";
import type { AuthResponse, AuthUser } from "@nursepath/shared";

import { prisma } from "./db.js";
import { config } from "./config.js";

export const authRouter = Router();

const credSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).optional(),
});

function sign(user: { id: string; email: string; name: string }): string {
  return jwt.sign({ sub: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: "7d",
  });
}

function toAuthUser(u: { id: string; email: string; name: string }): AuthUser {
  return { id: u.id, email: u.email, name: u.name };
}

authRouter.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = credSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
    }
    const { email, password, name } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name: name ?? email.split("@")[0], passwordHash },
    });

    const token = sign(user);
    const body: AuthResponse = { token, user: toAuthUser(user) };
    res.status(201).json(body);
  } catch (e) {
    next(e);
  }
});

authRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = credSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = sign(user);
    const body: AuthResponse = { token, user: toAuthUser(user) };
    res.json(body);
  } catch (e) {
    next(e);
  }
});

export interface AuthedRequest extends Request {
  userId?: string;
}

/** Express middleware: verifies the Bearer token and sets req.userId. */
export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token" });
  }
  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, config.jwtSecret) as { sub: string };
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

authRouter.get("/me", requireAuth, async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId! } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(toAuthUser(user));
  } catch (e) {
    next(e);
  }
});
