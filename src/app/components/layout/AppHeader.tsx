import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { GymLogo } from "../ui/GymLogo";

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  showLogo?: boolean;
  rightAction?: React.ReactNode;
}

export function AppHeader({ title, showBack = false, showLogo = false, rightAction }: AppHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center gap-3 px-5 py-4 bg-background/80 backdrop-blur-xl border-b border-white/[0.04] sticky top-0 z-10">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-9 rounded-xl text-muted-foreground/60 hover:text-white hover:bg-white/[0.06] transition-all duration-200 active:scale-90 shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft className="size-[18px]" strokeWidth={1.5} />
        </button>
      )}
      {showLogo && <GymLogo size={40} />}
      <h2 className="flex-1 text-white tracking-tight truncate">{title}</h2>
      {rightAction && <div className="shrink-0">{rightAction}</div>}
    </header>
  );
}
