import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CardBody, ProgressBar, BadgeChip, Spinner, EmptyState } from "../components/ui";
import type { Course, CourseProgress } from "@nursepath/shared";
import * as api from "../lib/api";

export default function CoursePage() {
  const { code } = useParams<{ code: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;
    Promise.all([
      api.getCourse(code),
      api.getCourseProgress(code).catch(() => null),
    ])
      .then(([c, p]) => {
        setCourse(c);
        setProgress(p);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!course) {
    return <EmptyState icon="❓" title="Course not found" description={`No course with code "${code}".`} />;
  }

  const unitProgressMap = new Map(
    progress?.units.map((u) => [u.unitId, u]) ?? [],
  );

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/courses" className="hover:text-primary">Courses</Link>
        <span>/</span>
        <span className="text-gray-900">{course.code}: {course.title}</span>
      </div>

      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="text-5xl">{course.icon}</span>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <BadgeChip variant="primary">{course.category}</BadgeChip>
              <BadgeChip variant="gold">{course.hours} lecture/lab hours</BadgeChip>
            </div>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              {course.code}: {course.title}
            </h1>
            <p className="mt-1 text-gray-600">{course.tagline}</p>

            {/* Progress bar */}
            {progress && (
              <div className="mt-4 max-w-md">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">
                    {progress.completedSteps}/{progress.totalSteps} steps completed
                  </span>
                  <span className="font-semibold text-primary">{progress.percent}%</span>
                </div>
                <ProgressBar percent={progress.percent} />
              </div>
            )}
          </div>
        </div>

        {/* Outcomes */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">What you&apos;ll learn</h3>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {course.outcomes.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 text-secondary">✓</span>
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Units */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Units ({course.units.length})</h2>
        <div className="space-y-4">
          {course.units.map((unit, idx) => {
            const up = unitProgressMap.get(unit.id);
            return (
              <Link key={unit.id} to={`/units/${unit.id}`} className="card group block">
                <CardBody>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                      {unit.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-400">Unit {idx + 1}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-400">{unit.hours}h</span>
                      </div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
                        {unit.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-gray-500 line-clamp-2">{unit.summary}</p>

                      {up && (
                        <div className="mt-2 max-w-xs">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>{up.completedSteps}/{up.totalSteps} steps</span>
                            <span>{up.percent}%</span>
                          </div>
                          <ProgressBar percent={up.percent} />
                        </div>
                      )}

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {unit.pathways.map((pw) => (
                          <span
                            key={pw.id}
                            className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                          >
                            <span>{pw.icon}</span>
                            {pw.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
