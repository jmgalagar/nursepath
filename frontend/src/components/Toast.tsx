import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import clsx from "clsx";

/* ---- Types --------------------------------------------------------------- */

type ToastVariant = "success" | "error" | "info" | "warning";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

/* ---- Context + hook ------------------------------------------------------ */

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

/* ---- Icons per variant --------------------------------------------------- */

const ICONS: Record<ToastVariant, string> = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
  warning: "⚠️",
};

const BORDER_COLORS: Record<ToastVariant, string> = {
  success: "border-secondary/60",
  error: "border-alert/60",
  info: "border-primary/60",
  warning: "border-amber-400/60",
};

const BG_COLORS: Record<ToastVariant, string> = {
  success: "bg-secondary/5",
  error: "bg-alert/5",
  info: "bg-primary/5",
  warning: "bg-amber-50",
};

const TEXT_COLORS: Record<ToastVariant, string> = {
  success: "text-secondary",
  error: "text-alert",
  info: "text-primary",
  warning: "text-amber-700",
};

/* ---- Provider ------------------------------------------------------------ */

let toastIdCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback(
    (message: string, variant: ToastVariant = "error") => {
      const id = ++toastIdCounter;
      setToasts((prev) => [...prev, { id, message, variant }]);
      // Auto-dismiss after 4 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}

      {/* Toast container — fixed to top-right */}
      <div className="fixed right-4 top-20 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={clsx(
              "pointer-events-auto flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg",
              "min-w-[280px] max-w-[420px]",
              "animate-toast-in",
              BORDER_COLORS[t.variant],
              BG_COLORS[t.variant],
            )}
          >
            <span className="mt-0.5 text-lg">{ICONS[t.variant]}</span>
            <p className={clsx("flex-1 text-sm font-medium", TEXT_COLORS[t.variant])}>
              {t.message}
            </p>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              className={clsx("text-sm opacity-60 hover:opacity-100", TEXT_COLORS[t.variant])}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
