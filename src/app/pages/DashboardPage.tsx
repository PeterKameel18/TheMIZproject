import { useNavigate } from "react-router";
import { QrCode, CalendarDays, Activity, Bell, Clock, ChevronRight, AlertTriangle, Sparkles } from "lucide-react";
import { Card } from "../components/ui/Card";
import { StatusBadge } from "../components/ui/StatusBadge";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Button } from "../components/ui/Button";
import { GymLogo } from "../components/ui/GymLogo";
import { useAuth } from "../context/AuthContext";
import { PageTransition } from "../components/ui/PageTransition";
import { Divider } from "../components/ui/Divider";

const quickActions = [
  { label: "Show QR", icon: QrCode, path: "/qr", color: "bg-gold/[0.08] text-gold border-gold/[0.12]" },
  { label: "Book Session", icon: CalendarDays, path: "/bookings/new", color: "bg-info/[0.08] text-info border-info/[0.12]" },
  { label: "Gym Status", icon: Activity, path: "/gym-status", color: "bg-success/[0.08] text-success border-success/[0.12]" },
];

const announcements = [
  { id: "1", title: "Sham El-Nessim Hours", description: "Gym will operate on reduced hours during the Sham El-Nessim holiday weekend.", date: "Mar 15, 2026", category: "Hours" },
  { id: "2", title: "New Ramadan Offer", description: "Special Ramadan membership packages now available. 20% off all plans!", date: "Mar 12, 2026", category: "Offers" },
  { id: "3", title: "Spa Services Discount", description: "Enjoy 30% off all spa and massage services this week only.", date: "Mar 10, 2026", category: "Offers" },
];

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const firstName = user.name.split(" ")[0];

  // Expiry calculations
  const expiryDate = new Date(user.membership.expiryDate);
  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const isExpired = user.membership.status === "expired" || daysLeft === 0;
  const isExpiringSoon = !isExpired && daysLeft <= 14;
  const isUrgent = !isExpired && daysLeft <= 5;
  const showRenewalCta = isExpired || isExpiringSoon;

  const expiryFormatted = expiryDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <PageTransition className="flex flex-col gap-10 pb-10 bg-page-gradient min-h-full">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-6">
        <div className="flex items-center gap-3">
          <GymLogo size={40} />
          <div>
            <p className="text-[13px] text-muted-foreground/70 tracking-wide">Welcome back,</p>
            <h2 className="text-white font-heading tracking-tight">Hello, {firstName}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate("/announcements")}
            className="flex items-center justify-center size-10 rounded-xl bg-surface border border-white/[0.06] text-muted-foreground/60 hover:text-white hover:bg-surface-hover transition-all duration-200 active:scale-95 card-glow"
            aria-label="View notifications"
          >
            <Bell className="size-[18px]" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-b from-gold to-gold-muted text-black font-heading text-[15px] btn-glow-gold active:scale-95 transition-all duration-200"
            aria-label="View profile"
          >
            {firstName[0]}
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-10 px-5">
        {/* Membership Card */}
        <Card
          onClick={() => navigate("/profile")}
          ariaLabel="View membership details"
          glow="gold"
          className={`p-6 overflow-hidden relative ${
            isExpired
              ? "border-error/[0.25]"
              : isUrgent
                ? "border-warning/[0.25]"
                : "border-gold/[0.18]"
          }`}
          style={{
            background: isExpired
              ? "linear-gradient(135deg, rgba(248,113,113,0.08) 0%, rgba(30,20,20,1) 58%)"
              : isExpiringSoon
                ? "linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(212,175,55,0.04) 38%, rgba(20,20,22,1) 68%)"
                : "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.025) 42%, rgba(20,20,22,1) 64%)",
            boxShadow: isExpired
              ? "0 0 0 1px rgba(248,113,113,0.12), 0 10px 30px rgba(248,113,113,0.06), 0 22px 55px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.28)"
              : isUrgent
                ? "0 0 0 1px rgba(251,191,36,0.12), 0 10px 30px rgba(251,191,36,0.06), 0 22px 55px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.28)"
                : "0 0 0 1px rgba(212,175,55,0.12), 0 8px 26px rgba(212,175,55,0.05), 0 18px 48px rgba(212,175,55,0.035), 0 22px 60px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.28)",
          } as React.CSSProperties}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-[11px] text-gold/60 uppercase tracking-[0.14em] mb-1.5">Membership</p>
              <h3 className="text-white text-[18px]">{user.membership.plan}</h3>
            </div>
            <StatusBadge status={user.membership.status} />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gold/[0.08]">
            <div>
              <p className="text-[11px] text-muted-foreground/50 uppercase tracking-[0.12em]">
                {isExpired ? "Expired on" : "Expires"}
              </p>
              <div className="flex items-center gap-2.5 mt-1">
                <p className={`text-[16px] font-heading tracking-tight ${
                  isExpired ? "text-error" : isUrgent ? "text-warning" : isExpiringSoon ? "text-warning/90" : "text-white"
                }`}>
                  {expiryFormatted}
                </p>
                {!isExpired && isExpiringSoon && (
                  <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider leading-none ${
                    isUrgent
                      ? "bg-warning/[0.12] text-warning border border-warning/[0.15]"
                      : "bg-warning/[0.08] text-warning/80 border border-warning/[0.1]"
                  }`}>
                    <AlertTriangle className="size-2.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                    <span className="translate-y-[0.5px]">{daysLeft} days left</span>
                  </span>
                )}
                {isExpired && (
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-error/[0.12] text-error border border-error/[0.15] uppercase tracking-wider leading-none">
                    <AlertTriangle className="size-2.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                    <span className="translate-y-[0.5px]">Expired</span>
                  </span>
                )}
              </div>
            </div>
            <ChevronRight className="size-[18px] text-muted-foreground/30 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          </div>
        </Card>

        {/* Renewal CTA */}
        {showRenewalCta && (
          <Card
            as="section"
            ariaLabel="Renew your membership"
            className={`p-5 ${isExpired ? "border-error/[0.15]" : "border-gold/[0.12]"}`}
            style={{
              background: isExpired
                ? "linear-gradient(135deg, rgba(248,113,113,0.05) 0%, rgba(20,20,22,1) 60%)"
                : "linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(20,20,22,1) 60%)",
            } as React.CSSProperties}
          >
            <div className="flex items-start gap-3.5 mb-5">
              <div className={`flex items-center justify-center size-11 rounded-xl shrink-0 ${
                isExpired
                  ? "bg-error/[0.1] border border-error/[0.15]"
                  : "bg-gold/[0.08] border border-gold/[0.12]"
              }`} aria-hidden="true">
                <Sparkles className={`size-5 ${isExpired ? "text-error" : "text-gold"}`} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-white mb-1.5">
                  {isExpired ? "Your membership has expired" : "Membership expiring soon"}
                </h4>
                <p className="text-[14px] text-muted-foreground/60 leading-relaxed">
                  {isExpired
                    ? "Renew now to regain full access to the gym, classes, and all premium facilities."
                    : `You have ${daysLeft} day${daysLeft !== 1 ? "s" : ""} remaining. Renew early to keep uninterrupted access.`}
                </p>
              </div>
            </div>
            <Button
              fullWidth
              size="lg"
              className="border border-gold/[0.14] bg-gradient-to-b from-gold/[0.92] to-gold-muted/[0.9] shadow-[0_0_0_1px_rgba(212,175,55,0.1),0_8px_18px_rgba(212,175,55,0.1)] hover:from-gold/[0.9] hover:to-gold-muted/[0.88]"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/profile");
              }}
            >
              Renew Membership
            </Button>
          </Card>
        )}

        {/* Quick Actions */}
        <section aria-label="Quick actions" className="relative">
          <SectionTitle title="Quick Actions" />
          <div className="grid grid-cols-3 gap-5 mt-5">
            {quickActions.map(({ label, icon: Icon, path, color }) => (
              <Card
                key={path}
                onClick={() => navigate(path)}
                ariaLabel={label}
                className="flex flex-col items-center gap-3 py-5 px-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.012)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),inset_0_0_20px_rgba(255,255,255,0.01)] transition-all duration-250 ease-out hover:-translate-y-0.5 hover:scale-[1.025] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_0_24px_rgba(255,255,255,0.015),0_14px_32px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,255,255,0.05)] active:scale-[0.975] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.03),inset_0_0_18px_rgba(255,255,255,0.008),0_6px_14px_rgba(0,0,0,0.22)]"
              >
                <div className={`flex items-center justify-center size-11 rounded-xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${color}`} aria-hidden="true">
                  <Icon className="size-[20px] brightness-125 contrast-110" strokeWidth={1.5} />
                </div>
                <span className="text-[12px] text-muted-foreground/70 tracking-wide text-center">{label}</span>
              </Card>
            ))}
          </div>
        </section>

        <Divider variant="gradient" className="mt-3" />

        {/* Gym Occupancy */}
        <section aria-label="Gym occupancy" className="pt-1">
          <Card onClick={() => navigate("/gym-status")} ariaLabel="View gym status details" className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center size-8 rounded-lg bg-warning/[0.08] border border-warning/[0.12]" aria-hidden="true">
                  <Activity className="size-4 text-warning" strokeWidth={1.5} />
                </div>
                <h4 className="text-white">Gym Status</h4>
              </div>
              <span className="text-[11px] text-muted-foreground/50 tracking-wide tabular-nums">2 min ago</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2.5 bg-white/[0.04] rounded-full overflow-hidden" role="progressbar" aria-valuenow={55} aria-valuemin={0} aria-valuemax={100} aria-label="Gym occupancy level">
                <div className="h-full bg-gradient-to-r from-warning/80 to-warning rounded-full transition-all duration-700 ease-out" style={{ width: "55%" }} />
              </div>
              <span className="text-[13px] text-warning shrink-0 tabular-nums">Moderate — normal activity</span>
            </div>
            <p className="text-[13px] text-muted-foreground/60 mt-3">~32 members · normal activity</p>
          </Card>
        </section>

        <Divider variant="gradient" className="mt-2" />

        {/* Announcements */}
        <section aria-label="Recent announcements">
          <SectionTitle title="Announcements" action="See All" onAction={() => navigate("/announcements")} />
          <div className="flex flex-col gap-5 mt-5">
            {announcements.slice(0, 2).map((item) => (
              <Card key={item.id} onClick={() => navigate("/announcements")} ariaLabel={`Announcement: ${item.title}`} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="inline-flex items-center text-[10px] px-2 py-[3px] rounded-full bg-gold/[0.08] text-gold/80 border border-gold/[0.1] uppercase tracking-wider leading-none">
                        <span className="translate-y-[0.5px]">{item.category}</span>
                      </span>
                      <span className="text-[11px] text-muted-foreground/50 tabular-nums">{item.date}</span>
                    </div>
                    <h4 className="text-white mb-1.5">{item.title}</h4>
                    <p className="text-[14px] text-muted-foreground/60 line-clamp-2 leading-relaxed">{item.description}</p>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground/25 mt-1.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Divider variant="gradient" className="mt-2" />

        {/* Working Hours */}
        <section aria-label="Today's working hours">
          <Card onClick={() => navigate("/gym-info")} ariaLabel="View full gym information" className="p-5">
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="flex items-center justify-center size-8 rounded-lg bg-gold/[0.08] border border-gold/[0.12]" aria-hidden="true">
                <Clock className="size-4 text-gold" strokeWidth={1.5} />
              </div>
              <h4 className="text-white">Today's Hours</h4>
            </div>
            <p className="text-[15px] text-white font-heading">7:00 AM – 12:00 AM</p>
            <p className="text-[12px] text-muted-foreground/50 mt-2.5 tracking-wide">Tap to see full schedule</p>
          </Card>
        </section>
      </div>
    </PageTransition>
  );
}
