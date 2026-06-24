import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { CardBody, ProgressBar, EmptyState, Spinner } from "../components/ui";
import { categoryColor } from "../components/ui";
import { useToast } from "../components/Toast";
import type { CourseSummary } from "@nursepath/shared";
import * as api from "../lib/api";

export default function CatalogPage() {
  const { allProgress } = useAuth();
  const { toast } = useToast();
  const [summaries, setSummaries] = useState<CourseSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.getCourses()
      .then((data) => setSummaries(data))
      .catch(() => toast("Failed to load courses. Please try again.", "error"))
      .finally(() => setLoading(false));
  }, []);

  const progressMap = useMemo(
    () => new Map(allProgress?.map((p) => [p.courseCode, p]) ?? []),
    [allProgress],
  );

  const categories = useMemo(() => {
    const cats = new Set(summaries.map((s) => s.category));
    return ["ALL", ...Array.from(cats).sort()];
  }, [summaries]);

  const filtered = useMemo(() => {
    let list = summaries;
    if (filter !== "ALL") list = list.filter((s) => s.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.code.toLowerCase().includes(q) ||
          s.title.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q),
      );
    }
    return list;
  }, [summaries, filter, search]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Course Catalog</h1>
        <p className="mt-1 text-gray-500">
          {summaries.length} courses across the Philippine BSN curriculum
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-3 py-2 min-h-[36px] text-sm font-medium transition-colors ${
                filter === cat
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat === "ALL" ? "All" : cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search courses…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field w-full max-w-xs"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState icon="🔍" title="No courses found" description="Try adjusting your filters or search query." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => {
            const p = progressMap.get(s.code);
            return (
              <Link key={s.code} to={`/courses/${s.code}`} className="card group">
                <CardBody>
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{s.icon}</span>
                    <span className={`badge-chip ${categoryColor(s.category)}`}>
                      {s.category}
                    </span>
                  </div>
                  <h3 className="mt-2 font-semibold group-hover:text-primary transition-colors">
                    {s.code}: {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{s.tagline}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                    <span>{s.stepCount} steps</span>
                    <span>·</span>
                    <span>{s.unitCount} units</span>
                    <span>·</span>
                    <span>{s.hours}h</span>
                  </div>
                  {p && p.completedSteps > 0 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{p.completedSteps}/{p.totalSteps} steps</span>
                        <span>{p.percent}%</span>
                      </div>
                      <ProgressBar percent={p.percent} />
                    </div>
                  )}
                </CardBody>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
