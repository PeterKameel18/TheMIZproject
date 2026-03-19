import { useState, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Lightbulb, RefreshCw, Shield, CalendarDays, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AppHeader } from "../components/layout/AppHeader";
import { Card } from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";
import { PageTransition } from "../components/ui/PageTransition";

export function QRCodePage() {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setRefreshKey((k) => k + 1);
      setIsRefreshing(false);
    }, 800);
  }, [isRefreshing]);

  if (!user) return null;

  const expiryDate = new Date(user.membership.expiryDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const isActive = user.membership.status === "active";

  return (
    <PageTransition className="flex flex-col bg-page-gradient min-h-full">
      <AppHeader title="Your Entry Pass" showBack />

      <div className="flex-1 flex flex-col items-center gap-10 px-5 py-10">
        {/* QR Card */}
        <Card
          glow="gold"
          className="flex flex-col items-center w-full max-w-sm py-10 px-6 border-gold/[0.18] overflow-hidden relative"
          style={{
            background: "linear-gradient(180deg, rgba(212,175,55,0.07) 0%, rgba(25,25,28,1) 45%, rgba(20,20,22,1) 100%)",
            boxShadow:
              "0 0 0 1px rgba(212,175,55,0.14), 0 0 52px rgba(212,175,55,0.07), 0 14px 40px rgba(0,0,0,0.46), 0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none"
            animate={{
              boxShadow: [
                "0 0 0 1px rgba(212,175,55,0.08), 0 0 28px rgba(212,175,55,0.04)",
                "0 0 0 1px rgba(212,175,55,0.12), 0 0 42px rgba(212,175,55,0.08)",
                "0 0 0 1px rgba(212,175,55,0.08), 0 0 28px rgba(212,175,55,0.04)",
              ],
            }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-6 rounded-[28px] pointer-events-none"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03), 0 0 48px rgba(212,175,55,0.04)",
            }}
            animate={{ opacity: [0.55, 0.8, 0.55] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-y-0 -left-1/3 w-1/2 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
              filter: "blur(14px)",
            }}
            animate={{ x: ["0%", "220%"] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
            aria-hidden="true"
          />
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-14 h-14 border-t-2 border-l-2 border-gold/[0.18] rounded-tl-[inherit]" aria-hidden="true" />
          <div className="absolute top-0 right-0 w-14 h-14 border-t-2 border-r-2 border-gold/[0.18] rounded-tr-[inherit]" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-14 h-14 border-b-2 border-l-2 border-gold/[0.18] rounded-bl-[inherit]" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 w-14 h-14 border-b-2 border-r-2 border-gold/[0.18] rounded-br-[inherit]" aria-hidden="true" />

          {/* QR Code */}
          <AnimatePresence mode="wait">
            <div className="relative">
              <motion.div
                className="absolute inset-[-12px] rounded-[28px] pointer-events-none"
                animate={{
                  boxShadow: [
                    "0 0 0 1px rgba(212,175,55,0.04), 0 0 18px rgba(212,175,55,0.04)",
                    "0 0 0 1px rgba(212,175,55,0.08), 0 0 28px rgba(212,175,55,0.08)",
                    "0 0 0 1px rgba(212,175,55,0.04), 0 0 18px rgba(212,175,55,0.04)",
                  ],
                }}
                transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <motion.div
                key={refreshKey}
                className="relative bg-white p-5 rounded-2xl"
                style={{
                  boxShadow: "0 4px 32px rgba(0,0,0,0.5), 0 0 80px rgba(212,175,55,0.06), 0 0 0 1px rgba(255,255,255,0.08)",
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0 }}
              >
                <QRCodeSVG
                  value={`MIZ-GYM:${user.membership.id}:${refreshKey}`}
                  size={200}
                  level="H"
                  aria-label={`QR code for membership ${user.membership.id}`}
                />
              </motion.div>
            </div>
          </AnimatePresence>

          <p className="text-[12px] text-muted-foreground/64 text-center mt-4 leading-relaxed">
            Increase brightness for faster scanning
          </p>

          {/* Member Info */}
          <div className="text-center flex flex-col items-center w-full mt-8">
            {/* Name */}
            <h3 className="text-white tracking-tight text-[18px]">{user.name}</h3>

            {/* Membership plan badge */}
            <div className="flex items-center gap-1.5 mt-3 px-3.5 py-1.5 rounded-full bg-gold/[0.08] border border-gold/[0.12]">
              <CreditCard className="size-3 text-gold" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-[12px] text-gold font-heading tracking-wide">
                {user.membership.plan}
              </span>
            </div>

            {/* Membership ID */}
            <p className="text-[11px] font-mono text-muted-foreground/46 tracking-[0.16em] mt-3">
              {user.membership.id}
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mt-6 mb-6" aria-hidden="true" />

            {/* Status + Expiry row */}
            <div className="flex items-center justify-center gap-5 w-full">
              {/* Status badge */}
              <div
                className={`inline-flex h-7 items-center justify-center gap-1.5 rounded-full px-3 text-[11px] font-heading uppercase tracking-[0.16em] ${
                  isActive
                    ? "bg-success/[0.14] text-success border border-success/[0.24]"
                    : "bg-error/[0.14] text-error border border-error/[0.24]"
                }`}
                style={{
                  boxShadow: isActive
                    ? "0 0 18px rgba(52,211,153,0.12), 0 0 0 1px rgba(52,211,153,0.08)"
                    : "0 0 18px rgba(248,113,113,0.12), 0 0 0 1px rgba(248,113,113,0.08)",
                }}
              >
                <span
                  className={`size-1.5 rounded-full ${isActive ? "bg-success" : "bg-error"} animate-pulse`}
                  aria-hidden="true"
                />
                <Shield className="size-3" strokeWidth={2} aria-hidden="true" />
                {isActive ? "ACTIVE" : "EXPIRED"}
              </div>

              {/* Separator */}
              <div className="w-px h-4 bg-white/[0.08]" aria-hidden="true" />

              {/* Expiry */}
              <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground/68">
                <CalendarDays className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                <span>{expiryDate}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Instruction */}
        <div className="flex flex-col items-center gap-3 max-w-[300px]">
          <p className="text-[16px] text-white text-center font-heading tracking-tight">
            Show this code at the entrance
          </p>
          <p className="text-[14px] text-muted-foreground/74 text-center leading-relaxed">
            Hold your screen up to the scanner for a quick, contactless check-in
          </p>
        </div>

        {/* Tips */}
        <Card className="flex items-start gap-3.5 w-full p-5">
          <div
            className="flex items-center justify-center size-9 rounded-xl bg-warning/[0.08] border border-warning/[0.12] shrink-0"
            aria-hidden="true"
          >
            <Lightbulb className="size-4 text-warning" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[13px] text-white/80 mb-0.5">Pro tip</p>
            <p className="text-[13px] text-muted-foreground/60 leading-relaxed">
              Increase your screen brightness for a faster, smoother scan.
            </p>
          </div>
        </Card>

        {/* Refresh */}
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2.5 text-[14px] text-muted-foreground/70 hover:text-gold transition-all duration-200 active:scale-95 disabled:opacity-50 px-4 py-2 rounded-xl hover:bg-white/[0.03]"
          aria-label="Refresh QR code"
        >
          <motion.span
            animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
            transition={isRefreshing ? { duration: 0.8, ease: "linear" } : {}}
            className="inline-flex"
          >
            <RefreshCw className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </motion.span>
          {isRefreshing ? "Refreshing…" : "Refresh Code"}
        </button>
      </div>
    </PageTransition>
  );
}
