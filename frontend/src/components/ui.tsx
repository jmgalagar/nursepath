import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

/* ---- Button --------------------------------------------------------------- */

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <button
      className={clsx(
        variant === "primary" && "btn-primary",
        variant === "secondary" && "btn-secondary",
        variant === "ghost" && "btn-ghost",
        variant === "danger" && "btn-danger",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "",
        size === "lg" && "px-6 py-3 text-base",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---- Card ----------------------------------------------------------------- */

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("card", className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({
  className,
  children,
}: { className?: string; children: ReactNode }) {
  return <div className={clsx("card-body", className)}>{children}</div>;
}

/* ---- Progress bar --------------------------------------------------------- */

export function ProgressBar({
  percent,
  className,
  color = "bg-primary",
}: {
  percent: number;
  className?: string;
  color?: string;
}) {
  return (
    <div className={clsx("progress-bar", className)}>
      <div
        className={clsx("progress-bar-fill", color)}
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  );
}

/* ---- Badge chip ----------------------------------------------------------- */

export function BadgeChip({
  variant = "primary",
  children,
  className,
}: {
  variant?: "primary" | "secondary" | "gold";
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        variant === "primary" && "badge-primary",
        variant === "secondary" && "badge-secondary",
        variant === "gold" && "badge-gold",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---- Input / Textarea ----------------------------------------------------- */

export function Input({
  label,
  error,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={clsx("input-field", error && "border-alert focus:border-alert focus:ring-alert/20")}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-alert">{error}</p>}
    </div>
  );
}

export function Textarea({
  label,
  error,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        className={clsx(
          "input-field min-h-[80px] resize-y",
          error && "border-alert focus:border-alert focus:ring-alert/20",
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-alert">{error}</p>}
    </div>
  );
}

/* ---- Loading spinner ------------------------------------------------------- */

export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClass =
    size === "sm" ? "h-5 w-5" : size === "lg" ? "h-12 w-12" : "h-8 w-8";
  return (
    <div className={clsx("animate-spin rounded-full border-4 border-primary border-t-transparent", sizeClass)} />
  );
}

/* ---- Empty state ---------------------------------------------------------- */

export function EmptyState({
  icon = "📭",
  title,
  description,
}: {
  icon?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="mb-4 text-5xl">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}

/* ---- Step icon (maps StepKind to emoji) ----------------------------------- */

import type { StepKind } from "@nursepath/shared";
import { STEP_ICON } from "@nursepath/shared";

export function StepIcon({ kind }: { kind: StepKind }) {
  return <span className="text-lg">{STEP_ICON[kind]}</span>;
}

/* ---- Category color helper ----------------------------------------------- */

export function categoryColor(cat: string) {
  switch (cat) {
    case "MC":
      return "bg-purple-100 text-purple-800";
    case "NCM":
      return "bg-primary/10 text-primary";
    case "ELECTIVE":
      return "bg-secondary/10 text-secondary";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
