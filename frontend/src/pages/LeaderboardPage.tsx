import { useEffect, useState } from "react";
import { Spinner, EmptyState, Card, CardBody } from "../components/ui";
import { useToast } from "../components/Toast";
import type { LeaderboardEntry } from "../lib/api";
import * as api from "../lib/api";
import { useAuth } from "../lib/auth";

export default function LeaderboardPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLeaderboard()
      .then(setEntries)
      .catch(() => toast("Failed to load leaderboard.", "error"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">🏆 Leaderboard</h1>
        <p className="mt-1 text-gray-500">Top nursing students ranked by XP earned</p>
      </div>

      {entries.length === 0 ? (
        <EmptyState icon="🏆" title="No rankings yet" description="Be the first to start earning XP!" />
      ) : (
        <div className="space-y-3">
          {/* Top 3 podium */}
          {entries.length >= 3 && (
            <div className="flex items-end justify-center gap-4 mb-6">
              {/* 2nd */}
              <PodiumCard entry={entries[1]} position={2} />
              {/* 1st */}
              <PodiumCard entry={entries[0]} position={1} />
              {/* 3rd */}
              <PodiumCard entry={entries[2]} position={3} />
            </div>
          )}

          {/* Full list — horizontal scroll on mobile */}
          <div className="overflow-x-auto">
            <Card>
              <CardBody className="p-0 min-w-[480px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">XP</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr
                      key={entry.userId}
                      className={`border-b border-gray-100 transition-colors ${
                        entry.userId === user?.id ? "bg-primary/5" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          entry.rank === 1 ? "bg-amber-100 text-amber-800"
                            : entry.rank === 2 ? "bg-gray-200 text-gray-700"
                            : entry.rank === 3 ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          {entry.rank <= 3 ? ["🥇", "🥈", "🥉"][entry.rank - 1] : entry.rank}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{entry.name}</span>
                          {entry.userId === user?.id && (
                            <span className="badge-chip bg-primary/10 text-primary text-xs">You</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="font-semibold text-gray-900">{entry.xp.toLocaleString()}</span>
                        <span className="ml-1 text-xs text-gray-500">XP</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function PodiumCard({ entry, position }: { entry: LeaderboardEntry; position: number }) {
  const heights = { 1: "h-32", 2: "h-24", 3: "h-20" };
  const colors = {
    1: "from-amber-400 to-amber-500",
    2: "from-gray-300 to-gray-400",
    3: "from-orange-300 to-orange-400",
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl mb-2">{(["🥇", "🥈", "🥉"] as string[])[position - 1]}</span>
      <div className={`w-20 rounded-t-xl bg-gradient-to-b ${colors[position as keyof typeof colors]} ${heights[position as keyof typeof heights]} flex flex-col items-center justify-end pb-2`}>
        <span className="text-white font-bold text-sm truncate px-1">{entry.name}</span>
      </div>
      <div className="w-20 bg-gray-100 rounded-b-xl px-2 py-1 text-center">
        <span className="text-xs font-semibold text-gray-700">{entry.xp.toLocaleString()} XP</span>
      </div>
    </div>
  );
}
