import crypto from "crypto";
import { Router, type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { Resend } from "resend";
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

function toAuthUser(u: { id: string; email: string; name: string; isAdmin?: boolean }): AuthUser {
  return { id: u.id, email: u.email, name: u.name, isAdmin: u.isAdmin ?? false };
}

/* ---- Register (creates unverified user, sends verification email) ------- */

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
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const canSendEmail = !!config.resendApiKey;
    const user = await prisma.user.create({
      data: {
        email,
        name: name ?? email.split("@")[0],
        passwordHash,
        verified: config.isTest || !canSendEmail, // auto-verify if no email service
        verificationToken: config.isTest || !canSendEmail ? null : verificationToken,
      },
    });

    // When no email service is configured, return a JWT immediately.
    if (config.isTest || !canSendEmail) {
      const token = sign(user);
      const body: AuthResponse = { token, user: toAuthUser(user) };
      return res.status(201).json(body);
    }

    // Send verification email (silently ignore if not configured, for local dev).
    if (config.resendApiKey) {
      try {
        const resend = new Resend(config.resendApiKey);
        await resend.emails.send({
          from: "NursePath <noreply@nursepath.app>",
          to: email,
          subject: "Verify your NursePath account",
          html: `
            <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
              <h1 style="color:#2A7FFF;">Welcome to NursePath 🩺</h1>
              <p style="color:#333;">Click the button below to verify your email and activate your account.</p>
              <a href="${config.verifyUrl}?token=${verificationToken}"
                 style="display:inline-block;background:#2A7FFF;color:white;padding:12px 24px;
                        border-radius:8px;text-decoration:none;font-weight:600;margin:16px 0;">
                Verify Email
              </a>
              <p style="color:#666;font-size:13px;">This link expires in 24 hours. If you didn't create an account, ignore this email.</p>
            </div>
          `,
        });
      } catch {
        // In dev without a real API key, verification works via seed/direct DB.
      }
    }

    res.status(201).json({
      message: "Account created! Check your email for a verification link.",
      user: toAuthUser(user),
    });
  } catch (e) {
    next(e);
  }
});

/* ---- Verify email ------------------------------------------------------- */

authRouter.get("/verify", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.query.token as string | undefined;
    if (!token) return res.status(400).json({ error: "Missing verification token" });

    const user = await prisma.user.findFirst({ where: { verificationToken: token } });
    if (!user) return res.status(400).json({ error: "Invalid or expired verification token" });

    await prisma.user.update({
      where: { id: user.id },
      data: { verified: true, verificationToken: null },
    });

    const jwt = sign(user);
    const body: AuthResponse = { token: jwt, user: toAuthUser(user) };
    res.json(body);
  } catch (e) {
    next(e);
  }
});

/* ---- Google Sign-In ----------------------------------------------------- */

authRouter.post("/google", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { credential } = req.body as { credential?: string };
    if (!credential) return res.status(400).json({ error: "Missing credential" });

    const { OAuth2Client } = await import("google-auth-library");
    const client = new OAuth2Client(config.googleClientId);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: config.googleClientId,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ error: "Invalid Google token" });
    }

    const email = payload.email;
    const name = payload.name ?? email.split("@")[0];

    // Find or create user. Google-verified users are automatically verified.
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      // Ensure existing users are marked verified if they weren't already.
      if (!user.verified) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { verified: true, verificationToken: null },
        });
      }
    } else {
      user = await prisma.user.create({
        data: {
          email,
          name,
          passwordHash: "",
          verified: true,
          verificationToken: null,
        },
      });
    }

    const token = sign(user);
    const body: AuthResponse = { token, user: toAuthUser(user) };
    res.json(body);
  } catch (e) {
    next(e);
  }
});

/* ---- Login (requires verified email) ------------------------------------ */

authRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = credSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    if (!user.verified) {
      return res.status(403).json({ error: "Please verify your email before signing in. Check your inbox." });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = sign(user);
    const body: AuthResponse = { token, user: toAuthUser(user) };
    res.json(body);
  } catch (e) {
    next(e);
  }
});

/* ---- Auth middleware ---------------------------------------------------- */

export interface AuthedRequest extends Request {
  userId?: string;
}

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

/** Express middleware: requires the user to be an admin. */
export async function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  requireAuth(req, res, async () => {
    if (!req.userId) return res.status(401).json({ error: "Missing token" });
    const user = await prisma.user.findUnique({ where: { id: req.userId }, select: { isAdmin: true } });
    if (!user?.isAdmin) return res.status(403).json({ error: "Forbidden" });
    next();
  });
}

/* ---- GET /me ------------------------------------------------------------ */

authRouter.get("/me", requireAuth, async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId! } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(toAuthUser(user));
  } catch (e) {
    next(e);
  }
});

/* ---- Account management ------------------------------------------------- */

const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
});

authRouter.put("/me", requireAuth, async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const parsed = updateProfileSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
    }
    const { name, email } = parsed.data;
    if (!name && !email) {
      return res.status(400).json({ error: "Nothing to update" });
    }

    if (email) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing && existing.id !== req.userId) {
        return res.status(409).json({ error: "Email already in use" });
      }
    }

    const user = await prisma.user.update({
      where: { id: req.userId! },
      data: { ...(name && { name }), ...(email && { email }) },
    });
    res.json(toAuthUser(user));
  } catch (e) {
    next(e);
  }
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6),
});

authRouter.post("/change-password", requireAuth, async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const parsed = changePasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const { currentPassword, newPassword } = parsed.data;

    const user = await prisma.user.findUnique({ where: { id: req.userId! } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const ok = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Current password is incorrect" });

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: req.userId! }, data: { passwordHash } });

    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});
