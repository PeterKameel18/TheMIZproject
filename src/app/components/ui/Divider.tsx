interface DividerProps {
  className?: string;
  variant?: "subtle" | "gradient" | "gold";
}

export function Divider({ className = "", variant = "subtle" }: DividerProps) {
  const variants: Record<string, string> = {
    subtle: "bg-white/[0.04]",
    gradient: "bg-gradient-to-r from-transparent via-white/[0.06] to-transparent",
    gold: "bg-gradient-to-r from-transparent via-gold/[0.12] to-transparent",
  };

  return (
    <div
      className={`h-px w-full ${variants[variant]} ${className}`}
      role="separator"
      aria-hidden="true"
    />
  );
}
