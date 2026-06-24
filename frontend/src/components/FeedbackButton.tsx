import { useState } from "react";
import { useToast } from "./Toast";
import * as api from "../lib/api";

export default function FeedbackButton() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit() {
    if (!message.trim() || sending) return;
    setSending(true);
    try {
      await api.submitSuggestion(message.trim());
      toast("Thanks for your feedback!", "success");
      setMessage("");
      setOpen(false);
    } catch {
      toast("Failed to send feedback. Please try again.", "error");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark transition-colors"
        title="Send feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 00-.266.112L8.78 21.53A.75.75 0 017.5 21v-3.956a51.108 51.108 0 01-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="w-full sm:max-w-md bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl p-6 shadow-xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Send Feedback</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl">✕</button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Found a bug? Have a suggestion? Let us know!
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think…"
              maxLength={500}
              rows={4}
              className="input-field resize-none"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-400">{500 - message.length} characters left</span>
              <button
                onClick={handleSubmit}
                disabled={!message.trim() || sending}
                className="btn-primary"
              >
                {sending ? "Sending…" : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
