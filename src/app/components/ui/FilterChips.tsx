interface FilterChipsProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export function FilterChips({ options, selected, onSelect }: FilterChipsProps) {
  return (
    <div
      className="flex min-w-0 gap-3 overflow-x-auto overscroll-x-contain pb-1 pr-5 scrollbar-none [scrollbar-gutter:stable] [webkit-overflow-scrolling:touch]"
      role="tablist"
      aria-label="Filter options"
    >
      {options.map((option) => (
        <button
          key={option}
          role="tab"
          aria-selected={selected === option}
          onClick={() => onSelect(option)}
          className={`shrink-0 px-5 py-2.5 min-h-[42px] rounded-[12px] text-[13px] font-heading tracking-wide transition-all duration-200 ease-out active:scale-[0.97] select-none ${
            selected === option
              ? "bg-gradient-to-b from-gold to-gold-muted text-black ring-1 ring-gold/35 shadow-[0_0_0_1px_rgba(212,175,55,0.18),0_8px_22px_rgba(212,175,55,0.14)] btn-glow-gold"
              : "bg-surface text-muted-foreground/70 hover:text-white hover:bg-surface-hover border border-white/[0.06] btn-glow-secondary"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
