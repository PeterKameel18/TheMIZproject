import { useNavigate } from "react-router";
import { LogOut, Mail, Phone, CreditCard, Calendar, Hash, Shield, AlertTriangle, Sparkles } from "lucide-react";
import { AppHeader } from "../components/layout/AppHeader";
import { Card } from "../components/ui/Card";
import { StatusBadge } from "../components/ui/StatusBadge";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { PageTransition } from "../components/ui/PageTransition";
import { Divider } from "../components/ui/Divider";

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Expiry calculations
  const expiryDate = new Date(user.membership.expiryDate);
  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const isExpired = user.membership.status === "expired" || daysLeft === 0;
  const isExpiringSoon = !isExpired && daysLeft <= 14;
  const isUrgent = !isExpired && daysLeft <= 5;
  const showRenewalCta = isExpired || isExpiringSoon;

  const expiryFormatted = expiryDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const membershipRows = [
    { icon: CreditCard, label: "Plan", value: user.membership.plan },
    { icon: Shield, label: "Status", value: user.membership.status, isBadge: true },
    { icon: Calendar, label: "Start Date", value: new Date(user.membership.startDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
    { icon: Calendar, label: "Expiry Date", value: expiryFormatted, isExpiry: true },
    { icon: Hash, label: "Membership ID", value: user.membership.id, isMono: true },
  ];

  return (
    <PageTransition className="flex flex-col bg-page-gradient min-h-full">
      <AppHeader title="Profile" showBack />

      <div className="flex flex-col gap-10 px-5 py-10">
        {/* Avatar & Name */}
        <section className="flex flex-col items-center gap-4" aria-label="User information">
          <div
            className="flex items-center justify-center size-[88px] rounded-2xl text-[#120d02] text-[32px] font-heading border border-gold/[0.22] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_10px_28px_rgba(212,175,55,0.14),0_18px_36px_rgba(0,0,0,0.16)]"
            style={{
              background: "radial-gradient(circle at 30% 25%, rgba(255,244,214,0.4) 0%, transparent 22%), linear-gradient(160deg, #f1d57a 0%, #d4af37 45%, #b8962e 100%)",
            }}
          >
            {user.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="text-center">
            <h2 className="text-white tracking-tight">{user.name}</h2>
            <p className="text-[14px] text-muted-foreground/70 mt-1.5">{user.email}</p>
          </div>
        </section>

        {/* Contact Info */}
        <Card as="section" ariaLabel="Contact information" className="p-5">
          <h3 className="text-white mb-5">Contact</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-8 rounded-lg bg-white/[0.04]" aria-hidden="true">
                <Mail className="size-4 text-muted-foreground/60" strokeWidth={1.5} />
              </div>
              <span className="text-[14px] text-white/90">{user.email}</span>
            </div>
            <Divider variant="subtle" />
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-8 rounded-lg bg-white/[0.04]" aria-hidden="true">
                <Phone className="size-4 text-muted-foreground/60" strokeWidth={1.5} />
              </div>
              <span className="text-[14px] text-white/90">{user.phone}</span>
            </div>
          </div>
        </Card>

        {/* Membership Details */}
        <Card
          as="section"
          ariaLabel="Membership details"
          className={`p-6 ${
            isExpired
              ? "border-error/[0.2]"
              : isUrgent
                ? "border-warning/[0.2]"
                : isExpiringSoon
                  ? "border-warning/[0.15]"
                  : "border-gold/[0.12]"
          }`}
          style={{
            background: isExpired
              ? "linear-gradient(180deg, rgba(248,113,113,0.07) 0%, rgba(20,20,22,1) 45%)"
              : isExpiringSoon
                ? "linear-gradient(180deg, rgba(251,191,36,0.06) 0%, rgba(20,20,22,1) 45%)"
                : "linear-gradient(180deg, rgba(212,175,55,0.05) 0%, rgba(20,20,22,1) 50%)",
            boxShadow: isExpired
              ? "0 0 0 1px rgba(248,113,113,0.14), 0 8px 28px rgba(248,113,113,0.07), 0 16px 36px rgba(0,0,0,0.16)"
              : isExpiringSoon
                ? "0 0 0 1px rgba(251,191,36,0.12), 0 8px 28px rgba(251,191,36,0.07), 0 16px 36px rgba(0,0,0,0.16)"
                : "0 0 0 1px rgba(212,175,55,0.1), 0 8px 24px rgba(212,175,55,0.05), 0 16px 34px rgba(0,0,0,0.15)",
          } as React.CSSProperties}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white">Membership</h3>
            {isExpiringSoon && !isExpired && (
              <span className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider leading-none ${
                isUrgent
                  ? "bg-warning/[0.12] text-warning border border-warning/[0.15] animate-pulse"
                  : "bg-warning/[0.08] text-warning/80 border border-warning/[0.1]"
              }`}>
                <AlertTriangle className="size-2.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                <span className="translate-y-[0.5px]">{daysLeft} days left</span>
              </span>
            )}
            {isExpired && (
              <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-error/[0.12] text-error border border-error/[0.15] uppercase tracking-wider leading-none">
                <AlertTriangle className="size-2.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                <span className="translate-y-[0.5px]">Expired</span>
              </span>
            )}
          </div>
          <dl className="flex flex-col">
            {membershipRows.map(({ icon: Icon, label, value, isBadge, isMono, isExpiry }, index) => (
              <div key={label}>
                {index > 0 && <Divider variant="subtle" />}
                <div className={`flex items-center justify-between gap-4 ${isExpiry ? "py-4.5" : "py-4"}`}>
                  <dt className="flex items-center gap-3 text-[14px] text-muted-foreground/70 min-w-0">
                    <div className={`flex items-center justify-center size-9 rounded-lg shrink-0 ${isExpiry ? "bg-gold/[0.08] border border-gold/[0.12]" : "bg-white/[0.04]"}`} aria-hidden="true">
                      <Icon className={`size-4 shrink-0 ${isExpiry ? "text-gold/80" : "text-muted-foreground/60"}`} strokeWidth={1.5} />
                    </div>
                    <span className={`leading-none ${isExpiry ? "text-white/92" : ""}`}>{label}</span>
                  </dt>
                  <dd className={`shrink-0 text-right ${isExpiry ? "text-[15px]" : "text-[14px]"}`}>
                    {isBadge ? (
                      <StatusBadge status={value as "active" | "expired"} />
                    ) : (
                      <span className={`${
                        isExpiry && isExpired
                          ? "text-error font-heading"
                          : isExpiry && isUrgent
                            ? "text-warning font-heading"
                          : isExpiry && isExpiringSoon
                              ? "text-warning font-heading"
                              : isExpiry
                                ? "text-white font-heading"
                                : "text-white/90"
                      } ${isExpiry ? "text-[16px] tracking-tight" : ""} ${isMono ? "font-mono text-[12px] tracking-wider text-muted-foreground/60" : ""}`}>
                        {value}
                      </span>
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Card>

        {/* Renewal CTA */}
        {showRenewalCta && (
          <Card
            as="section"
            ariaLabel="Renew membership"
            className={`p-5 ${isExpired ? "border-error/[0.18]" : "border-gold/[0.15]"}`}
            style={{
              background: isExpired
                ? "linear-gradient(135deg, rgba(248,113,113,0.06) 0%, rgba(20,20,22,1) 60%)"
                : "linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(20,20,22,1) 60%)",
              boxShadow: isExpired
                ? "0 10px 30px rgba(248,113,113,0.07), 0 16px 36px rgba(0,0,0,0.14)"
                : "0 10px 30px rgba(212,175,55,0.07), 0 16px 36px rgba(0,0,0,0.14)",
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
                  {isExpired ? "Membership expired" : "Time to renew"}
                </h4>
                <p className="text-[14px] text-muted-foreground/60 leading-relaxed">
                  {isExpired
                    ? "Your access has ended. Renew to continue using all gym facilities and services."
                    : `Only ${daysLeft} day${daysLeft !== 1 ? "s" : ""} left on your plan. Renew now to avoid any disruption.`}
                </p>
              </div>
            </div>
            <Button
              fullWidth
              size="lg"
              className="h-12 rounded-xl border border-gold/[0.14] bg-gradient-to-b from-gold/[0.92] to-gold-muted/[0.9] text-[15px] font-heading tracking-wide shadow-[0_0_0_1px_rgba(212,175,55,0.1),0_8px_18px_rgba(212,175,55,0.1)] hover:from-gold/[0.9] hover:to-gold-muted/[0.88]"
            >
              Request Renewal
            </Button>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-4">
          {!showRenewalCta && (
            <button
              className="w-full flex items-center justify-center gap-2.5 px-6 py-[18px] min-h-[58px] text-[16px] font-heading tracking-wide rounded-[14px] bg-gradient-to-r from-gold/[0.12] via-gold/[0.09] to-gold/[0.12] text-gold/90 border border-gold/[0.16] transition-all duration-200 ease-out hover:from-gold/[0.16] hover:via-gold/[0.11] hover:to-gold/[0.16] hover:border-gold/[0.22] active:scale-[0.97] select-none"
              style={{
                boxShadow: "0 0 0 1px rgba(212,175,55,0.07), 0 8px 18px rgba(212,175,55,0.08), 0 16px 30px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.18)",
              }}
            >
              <Sparkles className="size-[18px] shrink-0" strokeWidth={1.5} aria-hidden="true" />
              Request Renewal
            </button>
          )}
          <Button
            variant="ghost"
            fullWidth
            onClick={handleLogout}
            className="text-error/62 hover:text-error/78 hover:bg-error/[0.04]"
          >
            <LogOut className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            Log Out
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
