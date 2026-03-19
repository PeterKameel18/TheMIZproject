interface StatusBadgeProps {
  status: "active" | "expired" | "pending" | "approved" | "rejected" | "completed";
  className?: string;
}

const statusConfig: Record<string, { bg: string; dot: string }> = {
  active: { bg: "bg-success/10 text-success border-success/20", dot: "bg-success" },
  expired: { bg: "bg-error/10 text-error border-error/20", dot: "bg-error" },
  pending: { bg: "bg-warning/10 text-warning border-warning/20", dot: "bg-warning" },
  approved: { bg: "bg-success/10 text-success border-success/20", dot: "bg-success" },
  rejected: { bg: "bg-error/10 text-error border-error/20", dot: "bg-error" },
  completed: { bg: "bg-info/10 text-info border-info/20", dot: "bg-info" },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex h-7 items-center justify-center gap-1.5 rounded-full px-3 text-[11px] font-heading tracking-wide uppercase border leading-none align-middle ${config.bg} ${className}`}
      role="status"
    >
      <span className={`size-1.5 rounded-full shrink-0 ${config.dot}`} aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
}
