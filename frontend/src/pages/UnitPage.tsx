import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CardBody, ProgressBar, Spinner, EmptyState, StepIcon } from "../components/ui";
import { useAuth } from "../lib/auth";
import type { Unit, Pathway } from "@nursepath/shared";
import * as api from "../lib/api";

export default function UnitPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [courseCode, setCourseCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { completedSteps } = useAuth();

  useEffect(() => {
    if (!unitId) return;
    api.getUnit(unitId)
      .then((data) => {
        setUnit(data.unit);
        setCourseCode(data.courseCode);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [unitId]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!unit) {
    return <EmptyState icon="❓" title="Unit not found" />;
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/courses" className="hover:text-primary">Courses</Link>
        {courseCode && (
          <>
            <span>/</span>
            <Link to={`/courses/${courseCode}`} className="hover:text-primary">
              {courseCode}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-gray-900">{unit.title}</span>
      </div>

      {/* Unit header */}
      <div className="rounded-2xl bg-gradient-to-r from-secondary/10 to-primary/10 p-6">
        <div className="flex items-start gap-4">
          <span className="text-5xl">{unit.icon}</span>
          <div>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Unit</span>
            <h1 className="text-2xl font-bold">{unit.title}</h1>
            <p className="mt-1 text-gray-600">{unit.summary}</p>
            <p className="mt-1 text-sm text-gray-400">
              {unit.hours} hours · {unit.pathways.length} pathways
            </p>
          </div>
        </div>
      </div>

      {/* Pathways */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Pathways</h2>
        <div className="space-y-4">
          {unit.pathways.map((pw: Pathway) => {
            const totalSteps = pw.steps.length;
            const doneSteps = pw.steps.filter((s) => completedSteps.has(s.id)).length;
            const percent = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0;

            return (
              <Link key={pw.id} to={`/pathways/${pw.id}`} className="card group block">
                <CardBody>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-2xl">
                      {pw.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold group-hover:text-secondary transition-colors">
                        {pw.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-gray-500">{pw.summary}</p>

                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{doneSteps}/{totalSteps} steps</span>
                          <span>{percent}%</span>
                        </div>
                        <ProgressBar percent={percent} color={percent === 100 ? "bg-secondary" : "bg-primary"} />
                      </div>

                      {/* Step icons row */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {pw.steps.map((step) => (
                          <span
                            key={step.id}
                            className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs ${
                              completedSteps.has(step.id)
                                ? "bg-secondary/10 text-secondary font-medium"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            <StepIcon kind={step.kind} />
                            {step.title.length > 25 ? step.title.slice(0, 25) + "…" : step.title}
                            {completedSteps.has(step.id) && <span>✓</span>}
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
