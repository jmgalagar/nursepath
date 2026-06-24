import { useEffect, useState } from "react";
import { Card, CardBody, Spinner, EmptyState, BadgeChip } from "../components/ui";
import { useToast } from "../components/Toast";
import { useAuth } from "../lib/auth";
import type { SuggestionEntry, AdminUserEntry } from "../lib/api";
import * as api from "../lib/api";

type Tab = "feedback" | "users";

export default function AdminPage() {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const [tab, setTab] = useState<Tab>("feedback");
  const [suggestions, setSuggestions] = useState<SuggestionEntry[]>([]);
  const [users, setUsers] = useState<AdminUserEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getAllSuggestions().catch(() => [] as SuggestionEntry[]),
      api.getAdminUsers().catch(() => [] as AdminUserEntry[]),
    ]).then(([s, u]) => {
      setSuggestions(s);
      setUsers(u);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">🛠️ Admin</h1>
        <p className="mt-1 text-gray-500">Manage your platform</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        <button
          onClick={() => setTab("feedback")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            tab === "feedback" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Feedback ({suggestions.length})
        </button>
        <button
          onClick={() => setTab("users")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            tab === "users" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Users ({users.length})
        </button>
      </div>

      {/* Feedback tab */}
      {tab === "feedback" && (
        suggestions.length === 0 ? (
          <EmptyState icon="💬" title="No feedback yet" />
        ) : (
          <div className="space-y-3">
            {suggestions.map((entry) => (
              <Card key={entry.id}>
                <CardBody>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{entry.message}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                    <span>{entry.user.name} &lt;{entry.user.email}&gt;</span>
                    <span>{new Date(entry.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )
      )}

      {/* Users tab */}
      {tab === "users" && (
        users.length === 0 ? (
          <EmptyState icon="👤" title="No users" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Email</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500">Role</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500">XP</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500">Joined</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{u.name}</td>
                    <td className="px-4 py-3 text-gray-500">{u.email}</td>
                    <td className="px-4 py-3 text-center">
                      {u.isAdmin ? (
                        <BadgeChip variant="gold">Admin</BadgeChip>
                      ) : (
                        <BadgeChip variant="primary">User</BadgeChip>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">{u.totalXp.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {!u.isAdmin && u.id !== currentUser?.id && (
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete user "${u.name}" (${u.email})? This cannot be undone.`)) return;
                            try {
                              await api.deleteUser(u.id);
                              setUsers((prev) => prev.filter((x) => x.id !== u.id));
                              toast("User deleted.", "success");
                            } catch {
                              toast("Failed to delete user.", "error");
                            }
                          }}
                          className="text-xs text-alert hover:text-alert-700 font-medium"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}
