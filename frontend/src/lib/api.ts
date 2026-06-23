/**
 * NursePath — typed API client.
 *
 * Thin fetch wrapper around the Express backend.
 * The AuthProvider injects the Authorization header; this module
 * only handles request shaping and response parsing.
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

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

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

  const res = await fetch(`${BASE}${path}`, { ...opts, headers });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new ApiError(res.status, body.error ?? `Request failed (${res.status})`);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

/* ---- Auth ----------------------------------------------------------------- */

export async function login(email: string, password: string): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(
  email: string,
  password: string,
  name?: string,
): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
}

export async function getMe(): Promise<AuthUser> {
  return request<AuthUser>("/auth/me");
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

export { ApiError };
