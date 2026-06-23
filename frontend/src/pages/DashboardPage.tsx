import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { CardBody, ProgressBar, BadgeChip, EmptyState } from "../components/ui";
import type { CourseSummary } from "@nursepath/shared";
import * as api from "../lib/api";

export default function DashboardPage() {
  const { user, gamification, allProgress, refreshGamification } = useAuth();
  const [summaries, setSummaries] = useState<CourseSummary[]>([]);

  useEffect(() => {
    api.getCourses().then(setSummaries).catch(() => {});
    refreshGamification().catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const progressMap = new Map(allProgress?.map((p) => [p.courseCode, p]) ?? []);
  const inProgress = summaries.filter((s) => {
    const p = progressMap.get(s.code);
    return p && p.completedSteps > 0 && p.completedSteps < p.totalSteps;
  });
  const notStarted = summaries.filter((s) => {
    const p = progressMap.get(s.code);
    return !p || p.completedSteps === 0;
  });

  return (
    <div className="space-y-8">
      {/* Welcome hero */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-6 text-white shadow-lg sm:p-8">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Welcome back, {user?.name ?? "Nurse"}! 🩺
        </h1>
        <p className="mt-2 text-white/80">
          Continue your Philippine BSN journey. Track your progress across 22 curriculum courses.
        </p>

        {/* Quick stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatBox label="Level" value={`⭐ ${gamification?.level ?? 0}`} />
          <StatBox label="Total XP" value={`${gamification?.totalXp ?? 0}`} />
          <StatBox
            label="Streak"
            value={`🔥 ${gamification?.streak.current ?? 0} days`}
          />
          <StatBox
            label="Badges"
            value={`${gamification?.badges.length ?? 0} earned`}
          />
        </div>
      </div>

      {/* Continue learning */}
      {inProgress.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold">Continue Learning</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inProgress.map((s) => {
              const p = progressMap.get(s.code)!;
              return (
                <Link key={s.code} to={`/courses/${s.code}`} className="card group">
                  <CardBody>
                    <div className="flex items-start justify-between">
                      <span className="text-3xl">{s.icon}</span>
                      <BadgeChip variant="primary">{s.category}</BadgeChip>
                    </div>
                    <h3 className="mt-2 font-semibold group-hover:text-primary transition-colors">
                      {s.code}: {s.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{s.tagline}</p>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{p.completedSteps}/{p.totalSteps} steps</span>
                        <span>{p.percent}%</span>
                      </div>
                      <ProgressBar percent={p.percent} />
                    </div>
                  </CardBody>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Not started */}
      {notStarted.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold">
            {inProgress.length > 0 ? "Explore Courses" : "Start Learning"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notStarted.slice(0, 6).map((s) => (
              <Link key={s.code} to={`/courses/${s.code}`} className="card group">
                <CardBody>
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{s.icon}</span>
                    <BadgeChip variant="primary">{s.category}</BadgeChip>
                  </div>
                  <h3 className="mt-2 font-semibold group-hover:text-primary transition-colors">
                    {s.code}: {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{s.tagline}</p>
                  <p className="mt-3 text-xs text-gray-400">
                    {s.stepCount} steps · {s.unitCount} units · {s.hours}h
                  </p>
                </CardBody>
              </Link>
            ))}
          </div>
          {notStarted.length > 6 && (
            <div className="mt-4 text-center">
              <Link to="/courses" className="btn-ghost text-sm">
                View all {summaries.length} courses →
              </Link>
            </div>
          )}
        </section>
      )}

      {summaries.length === 0 && (
        <EmptyState
          icon="📚"
          title="Loading courses…"
          description="Your curriculum is being prepared."
        />
      )}
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/15 px-4 py-3">
      <div className="text-xs font-medium text-white/70">{label}</div>
      <div className="mt-1 text-lg font-bold">{value}</div>
    </div>
  );
}
