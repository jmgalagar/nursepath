/**
 * NursePath — typed API client.
 *
 * Thin fetch wrapper around the Express backend with retry-on-5xx logic
 * and a global unauthorized callback (triggers auto-logout on expired JWT).
 */

import type {
  AuthResponse,
  AuthUser,
  Course,
  CourseSummary,
  CourseProgress,
  GamificationState,
  Badge,
  Pathway,
  Unit,
  SimulationStep,
} from "@nursepath/shared";

/* ---- Helpers -------------------------------------------------------------- */

// In dev, Vite proxies "/api" → localhost:4000 (see vite.config.ts).
// In production (Vercel), VITE_API_URL points to the Render backend URL.
const BASE = import.meta.env.VITE_API_URL || "/api";

// Delay helper for retry backoff.
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/* ---- Unauthorized callback -------------------------------------------------
 *
 * The AuthProvider calls setOnUnauthorized(hander) on mount so that when any
 * request receives a 401, the user is logged out and a toast is shown.
 * This avoids circular dependencies between api.ts and auth.tsx.
 */

let onUnauthorized: (() => void) | null = null;

export function setOnUnauthorized(fn: () => void) {
  onUnauthorized = fn;
}

/* ---- Request with retry --------------------------------------------------- */

async function request<T>(
  path: string,
  opts: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("np_token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(opts.headers as Record<string, string> | undefined),
  };

  const maxRetries = 3;
  let lastError: ApiError | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await fetch(`${BASE}${path}`, { ...opts, headers });

      // 401 → trigger unauthorized callback (expired / invalid token)
      if (res.status === 401) {
        onUnauthorized?.();
        throw new ApiError(401, "Your session has expired. Please sign in again.");
      }

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        const err = new ApiError(res.status, body.error ?? `Request failed (${res.status})`);

        // Only retry on server errors (5xx). Client errors (4xx) are final.
        if (res.status >= 500 && attempt < maxRetries - 1) {
          lastError = err;
          await sleep(500 * Math.pow(3, attempt)); // 500ms, 1500ms, 3000ms
          continue;
        }
        throw err;
      }

      // 204 No Content
      if (res.status === 204) return undefined as T;
      return res.json() as Promise<T>;
    } catch (err) {
      if (err instanceof ApiError) throw err;

      // Network error (fetch failed) — retry if we have attempts left.
      if (attempt < maxRetries - 1) {
        lastError = new ApiError(0, "Network error, retrying…");
        await sleep(500 * Math.pow(3, attempt));
        continue;
      }
      throw new ApiError(0, "Network error. Please check your connection.");
    }
  }

  // Should not reach here, but TypeScript wants a return.
  throw lastError ?? new ApiError(0, "Request failed after retries");
}

/* ---- Auth ----------------------------------------------------------------- */

export async function login(email: string, password: string): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function googleLogin(credential: string): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/google", {
    method: "POST",
    body: JSON.stringify({ credential }),
  });
}

export async function register(
  email: string,
  password: string,
  name?: string,
): Promise<AuthResponse | { message: string; user: AuthUser }> {
  return request<AuthResponse | { message: string; user: AuthUser }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
}

export async function verifyEmail(token: string): Promise<AuthResponse> {
  return request<AuthResponse>(`/auth/verify?token=${encodeURIComponent(token)}`);
}

export async function getMe(): Promise<AuthUser> {
  return request<AuthUser>("/auth/me");
}

/* ---- Account management ------------------------------------------------- */

export async function updateProfile(data: { name?: string; email?: string }): Promise<AuthUser> {
  return request<AuthUser>("/auth/me", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await request("/auth/change-password", {
    method: "POST",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

/* ---- Courses (read-only) -------------------------------------------------- */

export async function getCourses(): Promise<CourseSummary[]> {
  return request<CourseSummary[]>("/courses");
}

export async function getCourse(code: string): Promise<Course> {
  return request<Course>(`/courses/${encodeURIComponent(code)}`);
}

export async function getPathway(pathwayId: string): Promise<{
  pathway: Pathway;
  courseCode: string;
  courseTitle: string;
  unitId: string;
  unitTitle: string;
}> {
  return request(`/pathways/${encodeURIComponent(pathwayId)}`);
}

export async function getUnit(unitId: string): Promise<{ unit: Unit; courseCode: string; courseTitle: string }> {
  return request<{ unit: Unit; courseCode: string; courseTitle: string }>(`/units/${encodeURIComponent(unitId)}`);
}

export async function getSimulation(stepId: string): Promise<SimulationStep> {
  return request<SimulationStep>(`/simulations/${encodeURIComponent(stepId)}`);
}

/* ---- Badges --------------------------------------------------------------- */

export async function getBadges(): Promise<Badge[]> {
  return request<Badge[]>("/badges");
}

/* ---- Progress ------------------------------------------------------------- */

export interface MarkStepResult {
  newlyCompleted: boolean;
  xpAwarded: number;
  courseProgress: CourseProgress;
  gamification: GamificationState;
}

export async function markStep(stepId: string): Promise<MarkStepResult> {
  return request<MarkStepResult>("/progress/steps", {
    method: "POST",
    body: JSON.stringify({ stepId }),
  });
}

export async function unmarkStep(stepId: string): Promise<{ gamification: GamificationState; courseProgress: CourseProgress | null }> {
  return request(`/progress/steps/${encodeURIComponent(stepId)}`, {
    method: "DELETE",
  });
}

export async function getCompletedSteps(): Promise<string[]> {
  const data = await request<{ completed: string[] }>("/progress/completed");
  return data.completed;
}

export async function getCourseProgress(courseCode: string): Promise<CourseProgress> {
  return request<CourseProgress>(`/progress/${encodeURIComponent(courseCode)}`);
}

export async function getAllProgress(): Promise<CourseProgress[]> {
  return request<CourseProgress[]>("/progress");
}

/* ---- Gamification --------------------------------------------------------- */

export async function getGamification(): Promise<GamificationState> {
  return request<GamificationState>("/gamification/me");
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  xp: number;
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  return request<LeaderboardEntry[]>("/leaderboard");
}

/* ---- Clinical Log --------------------------------------------------------- */

export interface ClinicalLogEntry {
  id: string;
  userId: string;
  courseCode: string | null;
  note: string;
  createdAt: string;
}

export async function getClinicalLog(): Promise<ClinicalLogEntry[]> {
  return request<ClinicalLogEntry[]>("/clinical-log");
}

export async function addClinicalLog(
  note: string,
  courseCode?: string,
): Promise<ClinicalLogEntry> {
  return request<ClinicalLogEntry>("/clinical-log", {
    method: "POST",
    body: JSON.stringify({ note, courseCode }),
  });
}

export async function deleteClinicalLog(id: string): Promise<void> {
  return request(`/clinical-log/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

/* ---- Suggestions / Feedback --------------------------------------------- */

export async function submitSuggestion(message: string): Promise<void> {
  await request("/suggestions", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}

/* ---- Admin -------------------------------------------------------------- */

export interface SuggestionEntry {
  id: string;
  userId: string;
  message: string;
  createdAt: string;
  user: { name: string; email: string };
}

export async function getAllSuggestions(): Promise<SuggestionEntry[]> {
  return request<SuggestionEntry[]>("/admin/suggestions");
}

export interface AdminUserEntry {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: string;
  totalXp: number;
}

export async function getAdminUsers(): Promise<AdminUserEntry[]> {
  return request<AdminUserEntry[]>("/admin/users");
}

export async function deleteUser(userId: string): Promise<void> {
  await request(`/admin/users/${encodeURIComponent(userId)}`, { method: "DELETE" });
}

export { ApiError };
