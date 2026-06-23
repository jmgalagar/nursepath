/**
 * NursePath — auth context provider.
 *
 * Stores the JWT in localStorage, exposes the current user via React context,
 * and provides login / register / logout actions.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { AuthUser, GamificationState, CourseProgress } from "@nursepath/shared";
import * as api from "./api";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  gamification: GamificationState | null;
  allProgress: CourseProgress[] | null;
  completedSteps: Set<string>;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  refreshGamification: () => Promise<void>;
  refreshProgress: () => Promise<void>;
}

type AuthContextValue = AuthState & AuthActions;

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem("np_token"),
    loading: true,
    gamification: null,
    allProgress: null,
    completedSteps: new Set(),
  });

  const hydrate = useCallback(async (token: string) => {
    try {
      localStorage.setItem("np_token", token);
      const user = await api.getMe();
      const [gamification, allProgress, completedSteps] = await Promise.all([
        api.getGamification(),
        api.getAllProgress(),
        api.getCompletedSteps(),
      ]);
      setState({
        user,
        token,
        loading: false,
        gamification,
        allProgress,
        completedSteps: new Set(completedSteps),
      });
    } catch {
      localStorage.removeItem("np_token");
      setState((s) => ({ ...s, loading: false, token: null, user: null }));
    }
  }, []);

  useEffect(() => {
    if (state.token) {
      hydrate(state.token);
    } else {
      setState((s) => ({ ...s, loading: false }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.login(email, password);
    await hydrate(res.token);
  }, [hydrate]);

  const register = useCallback(
    async (email: string, password: string, name?: string) => {
      const res = await api.register(email, password, name);
      await hydrate(res.token);
    },
    [hydrate],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("np_token");
    setState({
      user: null,
      token: null,
      loading: false,
      gamification: null,
      allProgress: null,
      completedSteps: new Set(),
    });
  }, []);

  const refreshGamification = useCallback(async () => {
    if (!state.token) return;
    const gamification = await api.getGamification();
    setState((s) => ({ ...s, gamification }));
  }, [state.token]);

  const refreshProgress = useCallback(async () => {
    if (!state.token) return;
    const [allProgress, completedSteps] = await Promise.all([
      api.getAllProgress(),
      api.getCompletedSteps(),
    ]);
    setState((s) => ({ ...s, allProgress, completedSteps: new Set(completedSteps) }));
  }, [state.token]);

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, refreshGamification, refreshProgress }}
    >
      {children}
    </AuthContext.Provider>
  );
}
