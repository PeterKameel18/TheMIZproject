import { Home, QrCode, CalendarDays, Megaphone, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";

const navItems = [
  { label: "Home", icon: Home, path: "/" },
  { label: "QR Pass", icon: QrCode, path: "/qr" },
  { label: "Bookings", icon: CalendarDays, path: "/bookings" },
  { label: "News", icon: Megaphone, path: "/announcements" },
  { label: "Profile", icon: User, path: "/profile" },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const iconStrokeWidth = 1.75;

  return (
    <nav
      className="flex items-center justify-around bg-gradient-to-t from-card to-card/90 backdrop-blur-xl border-t border-white/[0.05] px-2 pt-2 pb-3 sticky bottom-0 z-10"
      aria-label="Main navigation"
    >
      {navItems.map(({ label, icon: Icon, path }) => {
        const isActive = location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
        const isHome = path === "/" && location.pathname === "/";
        const active = isActive || isHome;

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors duration-200 active:scale-90 ${
              active
                ? "text-gold"
                : "text-muted-foreground/50 hover:text-muted-foreground/80"
            }`}
            aria-current={active ? "page" : undefined}
            aria-label={label}
          >
            <div className="relative flex size-6 items-center justify-center">
              <Icon className="size-5 shrink-0" strokeWidth={iconStrokeWidth} aria-hidden="true" />
              {active && (
                <motion.span
                  layoutId="bottomnav-indicator"
                  className="absolute -bottom-0.5 w-4 h-[2px] rounded-full bg-gold"
                  aria-hidden="true"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </div>
            <span className={`text-[10px] tracking-wide transition-colors duration-200 ${active ? "text-gold" : ""}`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
