import { useEffect, useState } from "react";
import { useAuth } from "../lib/auth";
import { Card, CardBody, ProgressBar, BadgeChip, Button, Spinner, EmptyState, Textarea } from "../components/ui";
import type { Badge } from "@nursepath/shared";
import * as api from "../lib/api";

export default function ProfilePage() {
  const { user, gamification } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [clinicalLog, setClinicalLog] = useState<api.ClinicalLogEntry[]>([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getBadges(),
      api.getClinicalLog(),
    ])
      .then(([b, log]) => {
        setBadges(b);
        setClinicalLog(log);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const earnedBadgeIds = new Set(gamification?.badges.map((b) => b.badgeId) ?? []);

  async function handleAddLog() {
    if (!newNote.trim()) return;
    setSaving(true);
    try {
      const entry = await api.addClinicalLog(newNote.trim());
      setClinicalLog((prev) => [entry, ...prev]);
      setNewNote("");
    } catch {} finally {
      setSaving(false);
    }
  }

  async function handleDeleteLog(id: string) {
    try {
      await api.deleteClinicalLog(id);
      setClinicalLog((prev) => prev.filter((e) => e.id !== id));
    } catch {}
  }

  if (loading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }

  return (
    <div className="space-y-8">
      {/* Profile header */}
      <div className="flex items-start gap-6">
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-4xl font-bold text-primary">
          {user?.name?.charAt(0).toUpperCase() ?? "U"}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{user?.name ?? "Student"}</h1>
          <p className="text-gray-500">{user?.email}</p>

          {/* Quick stats */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Level" value={`⭐ ${gamification?.level ?? 0}`} />
            <Stat label="Total XP" value={`${gamification?.totalXp ?? 0}`} />
            <Stat label="Streak" value={`🔥 ${gamification?.streak.current ?? 0}`} />
            <Stat label="Badges" value={`${gamification?.badges.length ?? 0}/${badges.length}`} />
          </div>

          {/* XP progress to next level */}
          {gamification && (
            <div className="mt-4 max-w-md">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Level {gamification.level} → Level {gamification.level + 1}</span>
                <span>{gamification.xpIntoLevel}/{gamification.xpForNextLevel} XP</span>
              </div>
              <ProgressBar percent={(gamification.xpIntoLevel / gamification.xpForNextLevel) * 100} />
            </div>
          )}
        </div>
      </div>

      {/* Badges */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Badges</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge) => {
            const earned = earnedBadgeIds.has(badge.id);
            return (
              <div key={badge.id} className={`card ${!earned ? "opacity-60" : ""}`}>
                <CardBody className="flex items-start gap-3">
                  <span className={`text-3xl ${!earned ? "grayscale" : ""}`}>{badge.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold truncate">{badge.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{badge.description}</p>
                    {earned ? (
                      <BadgeChip variant="gold" className="mt-1">Earned ✓</BadgeChip>
                    ) : (
                      <BadgeChip variant="primary" className="mt-1">Locked</BadgeChip>
                    )}
                  </div>
                </CardBody>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skills */}
      {gamification && gamification.skills && Object.keys(gamification.skills).length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold">Skills</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(gamification.skills)
              .sort(([, a], [, b]) => b.percent - a.percent)
              .map(([skill, data]) => (
                <div key={skill} className="card">
                  <CardBody>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold capitalize">{skill.replace(/-/g, " ")}</h3>
                      <span className="text-xs text-gray-500">{data.completed}/{data.total}</span>
                    </div>
                    <ProgressBar percent={data.percent} />
                  </CardBody>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Clinical Log */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Clinical Log</h2>

        {/* Add entry */}
        <Card className="mb-4">
          <CardBody className="space-y-3">
            <Textarea
              placeholder="Record a clinical observation, skill practiced, or learning note…"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <div className="flex justify-end">
              <Button onClick={handleAddLog} disabled={!newNote.trim() || saving}>
                {saving ? "Saving…" : "Add Entry"}
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Entries */}
        {clinicalLog.length === 0 ? (
          <EmptyState icon="📓" title="No entries yet" description="Start recording your clinical experiences." />
        ) : (
          <div className="space-y-3">
            {clinicalLog.map((entry) => (
              <div key={entry.id} className="card">
                <CardBody>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{entry.note}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {new Date(entry.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      {entry.courseCode && ` · ${entry.courseCode}`}
                    </span>
                    <button onClick={() => handleDeleteLog(entry.id)} className="text-xs text-gray-400 hover:text-alert transition-colors">
                      Delete
                    </button>
                  </div>
                </CardBody>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-0.5 text-lg font-bold">{value}</div>
    </div>
  );
}
