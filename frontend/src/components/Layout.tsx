import { Outlet } from "react-router-dom";
import { useAuth } from "../lib/auth";
import NavLink from "./NavLink";

export default function Layout() {
  const { user, gamification, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top nav */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <a href="/dashboard" className="flex items-center gap-2 text-lg font-bold text-primary">
            <span className="text-2xl">🩺</span>
            <span>NursePath</span>
          </a>

          {/* Navigation */}
          <nav className="hidden items-center gap-1 sm:flex">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/courses">Courses</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
          </nav>

          {/* User info */}
          <div className="flex items-center gap-3">
            {gamification && (
              <div className="hidden items-center gap-1.5 sm:flex">
                <span className="badge-gold">
                  ⭐ {gamification.level}
                </span>
                <span className="text-xs text-gray-500">
                  {gamification.totalXp} XP
                </span>
                {gamification.streak.current > 0 && (
                  <span className="badge-primary">🔥 {gamification.streak.current}</span>
                )}
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                {user?.name?.charAt(0).toUpperCase() ?? "U"}
              </div>
              <span className="hidden text-sm font-medium text-gray-700 sm:inline">
                {user?.name}
              </span>
            </div>
            <button
              onClick={logout}
              className="btn-ghost text-xs px-2 py-1.5"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="flex border-t border-gray-100 sm:hidden">
          <NavLink to="/dashboard" className="flex-1 justify-center py-2">Dashboard</NavLink>
          <NavLink to="/courses" className="flex-1 justify-center py-2">Courses</NavLink>
          <NavLink to="/leaderboard" className="flex-1 justify-center py-2">Ranks</NavLink>
          <NavLink to="/profile" className="flex-1 justify-center py-2">Profile</NavLink>
        </nav>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-6 text-center text-xs text-gray-500">
        <p>© 2026 NursePath — Philippine BSN Curriculum Learning Platform</p>
        <p className="mt-1">Based on CHED CMO No. 14, s. 2009</p>
      </footer>
    </div>
  );
}
