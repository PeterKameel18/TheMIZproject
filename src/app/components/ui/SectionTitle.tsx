import { ChevronRight } from "lucide-react";

interface SectionTitleProps {
  title: string;
  action?: string;
  onAction?: () => void;
}

export function SectionTitle({ title, action, onAction }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-white">{title}</h3>
      {action && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-0.5 text-[13px] text-muted-foreground/70 hover:text-gold transition-colors duration-200 active:scale-95"
        >
          <span className="translate-y-[0.5px]">{action}</span>
          <ChevronRight className="size-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
