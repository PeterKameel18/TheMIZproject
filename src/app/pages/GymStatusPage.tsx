import { useEffect, useState } from "react";
import { Clock, TrendingUp, BarChart3, Zap, Users } from "lucide-react";
import { motion } from "motion/react";
import { AppHeader } from "../components/layout/AppHeader";
import { Card } from "../components/ui/Card";
import { PageTransition } from "../components/ui/PageTransition";

const hourlyData = [
  { hour: "7 AM", level: 15 },
  { hour: "8 AM", level: 40 },
  { hour: "9 AM", level: 55 },
  { hour: "10 AM", level: 65 },
  { hour: "11 AM", level: 50 },
  { hour: "12 PM", level: 80 },
  { hour: "1 PM", level: 70 },
  { hour: "2 PM", level: 30 },
  { hour: "3 PM", level: 25 },
  { hour: "4 PM", level: 45 },
  { hour: "5 PM", level: 60 },
  { hour: "6 PM", level: 90 },
  { hour: "7 PM", level: 85 },
  { hour: "8 PM", level: 75 },
  { hour: "9 PM", level: 50 },
  { hour: "10 PM", level: 30 },
];

// Current hour index (simulated as 5 PM = index 10)
const currentHourIdx = 10;

interface StatusInfo {
  label: string;
  insight: string;
  color: string;
  colorMuted: string;
  bg: string;
  hex: string;
  hexEnd: string;
  glow: string;
}

function getStatusInfo(level: number): StatusInfo {
  if (level < 40)
    return {
      label: "Low — great time to train",
      insight: "Gym is quiet — perfect for focused, uninterrupted training",
      color: "text-success",
      colorMuted: "text-success/80",
      bg: "bg-success",
      hex: "#34D399",
      hexEnd: "#10B981",
      glow: "rgba(52, 211, 153, 0.10)",
    };
  if (level < 70)
    return {
      label: "Moderate — normal activity",
      insight: "Moderate crowd — most equipment is available",
      color: "text-warning",
      colorMuted: "text-warning/80",
      bg: "bg-warning",
      hex: "#FBBF24",
      hexEnd: "#F59E0B",
      glow: "rgba(251, 191, 36, 0.10)",
    };
  return {
    label: "Busy — peak hours",
    insight: "Gym is busy — expect wait times on popular equipment",
    color: "text-error",
    colorMuted: "text-error/80",
    bg: "bg-error",
    hex: "#F87171",
    hexEnd: "#EF4444",
    glow: "rgba(248, 113, 113, 0.10)",
  };
}

function getBarStatus(level: number) {
  if (level < 40) return { hex: "#34D399", hexEnd: "#10B981" };
  if (level < 70) return { hex: "#FBBF24", hexEnd: "#F59E0B" };
  return { hex: "#F87171", hexEnd: "#EF4444" };
}

// SVG circular gauge
function OccupancyGauge({ level, count, status }: { level: number; count: number; status: StatusInfo }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const size = 200;
  const strokeWidth = 11;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * (animated ? level : 0)) / 100;
  const gradientId = "gauge-grad";
  const glowId = "gauge-outer-glow";
  const strokeGlowId = "gauge-stroke-glow";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <div
        className="absolute inset-3 rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle, ${status.glow} 0%, transparent 72%)`,
          boxShadow: `0 0 36px ${status.glow}`,
        }}
        aria-hidden="true"
      />
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={status.hex} stopOpacity="0.62" />
            <stop offset="50%" stopColor={status.hexEnd} stopOpacity="0.95" />
            <stop offset="100%" stopColor={status.hex} stopOpacity="1" />
          </linearGradient>
          <filter id="gauge-glow">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={strokeGlowId}>
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.5 0"
            />
          </filter>
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="68%" stopColor={status.hex} stopOpacity="0.05" />
            <stop offset="100%" stopColor={status.hex} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Subtle ambient fill */}
        <circle cx={size / 2} cy={size / 2} r={radius - strokeWidth} fill={`url(#${glowId})`} />
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Soft halo under the active arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={status.hex}
          strokeOpacity="0.32"
          strokeWidth={strokeWidth + 1}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          filter={`url(#${strokeGlowId})`}
        />
        {/* Active arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          filter="url(#gauge-glow)"
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
        <motion.span
          className={`text-[44px] font-heading tracking-tight ${status.color}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {count}
        </motion.span>
        <span className="text-[12px] font-heading text-white/88 uppercase tracking-[0.2em]">MEMBERS</span>
      </div>
    </div>
  );
}

export function GymStatusPage() {
  const currentLevel = 60;
  const currentCount = 34;
  const maxCapacity = 60;
  const status = getStatusInfo(currentLevel);

  // Find best time window (lowest consecutive 2-hour average)
  const bestStart = hourlyData.reduce(
    (best, _, i, arr) => {
      if (i > arr.length - 2) return best;
      const avg = (arr[i].level + arr[i + 1].level) / 2;
      return avg < best.avg ? { avg, idx: i } : best;
    },
    { avg: 100, idx: 0 }
  );
  const bestTimeLabel = `${hourlyData[bestStart.idx].hour} – ${hourlyData[bestStart.idx + 1].hour}`;

  return (
    <PageTransition className="flex flex-col bg-page-gradient min-h-full">
      <AppHeader title="Gym Status" showBack />

      <div className="flex flex-col gap-12 px-5 py-8">
        {/* Current Occupancy */}
        <Card
          as="section"
          ariaLabel="Current gym occupancy"
          className="p-8 overflow-hidden border-white/[0.07]"
          style={{
            background: `linear-gradient(180deg, ${status.glow} 0%, rgba(255,255,255,0.015) 36%, transparent 68%)`,
            boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 16px 45px rgba(0,0,0,0.22), 0 10px 40px ${status.glow}`,
          } as React.CSSProperties}
        >
          <div className="flex flex-col items-center gap-7">
            <OccupancyGauge level={currentLevel} count={currentCount} status={status} />

            {/* Status label */}
            <motion.div
              className="flex flex-col items-center gap-2.5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`size-2.5 rounded-full ${status.bg} animate-pulse`}
                  aria-hidden="true"
                />
                <h3 className={`${status.color} tracking-tight text-[19px]`}>{status.label}</h3>
              </div>
              <p className="text-[14px] text-muted-foreground/60 text-center max-w-[280px] leading-relaxed">
                {status.insight}
              </p>
            </motion.div>

            {/* Capacity bar */}
            <div className="w-full max-w-xs mt-1">
              <div className="flex justify-between text-[10px] text-muted-foreground/50 uppercase tracking-[0.12em] mb-2.5">
                <span>Empty</span>
                <span>{currentCount}/{maxCapacity} capacity</span>
                <span>Full</span>
              </div>
              <div
                className="h-2.5 bg-white/[0.04] rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={currentLevel}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Gym is at ${currentLevel}% capacity — ${status.label}`}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${status.hex}90, ${status.hexEnd})` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${currentLevel}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground/58 mt-1.5">
              <Clock className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              <span>Live · updated just now</span>
            </div>
          </div>
        </Card>

        {/* Best Time to Visit — highlighted */}
        <Card
          as="section"
          ariaLabel="Best time to visit"
          className="p-6 border-success/[0.12]"
          style={{
            background: "linear-gradient(135deg, rgba(52, 211, 153, 0.08) 0%, rgba(52, 211, 153, 0.03) 22%, rgba(20, 20, 22, 1) 72%)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
          } as React.CSSProperties}
        >
          <div className="flex items-start gap-3.5">
            <div className="flex items-center justify-center size-12 rounded-2xl bg-success/[0.08] border border-success/[0.12] shrink-0" aria-hidden="true">
              <Zap className="size-5 text-success" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2.5 mb-1.5">
                <h4 className="text-success">Best Time to Visit</h4>
                <span className="inline-flex items-center text-[9px] px-2 py-[3px] rounded-full bg-success/[0.1] text-success/80 border border-success/[0.1] uppercase tracking-widest leading-none">
                  <span className="translate-y-[0.5px]">Smart Pick</span>
                </span>
              </div>
              <p className="text-[22px] text-white font-heading tracking-tight mt-1">{bestTimeLabel}</p>
              <p className="text-[12px] text-muted-foreground/48 mt-2 tracking-wide leading-relaxed">
                Typically the least crowded window today
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-5">
          <Card
            as="div"
            className="p-5 flex items-center gap-3.5 border-info/[0.1]"
            style={{
              background: "linear-gradient(145deg, rgba(56,189,248,0.08) 0%, rgba(56,189,248,0.03) 26%, rgba(20,20,22,1) 76%)",
              boxShadow: "0 10px 26px rgba(0,0,0,0.16)",
            } as React.CSSProperties}
          >
            <div className="flex items-center justify-center size-10 rounded-xl bg-info/[0.08] border border-info/[0.12] shrink-0" aria-hidden="true">
              <TrendingUp className="size-[18px] text-info" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground/58 uppercase tracking-wider">Peak Today</p>
              <p className="text-[16px] text-white font-heading mt-1 tabular-nums">6 PM</p>
            </div>
          </Card>
          <Card
            as="div"
            className="p-5 flex items-center gap-3.5 border-gold/[0.1]"
            style={{
              background: "linear-gradient(145deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.03) 26%, rgba(20,20,22,1) 76%)",
              boxShadow: "0 10px 26px rgba(0,0,0,0.16)",
            } as React.CSSProperties}
          >
            <div className="flex items-center justify-center size-10 rounded-xl bg-gold/[0.08] border border-gold/[0.12] shrink-0" aria-hidden="true">
              <Users className="size-[18px] text-gold" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground/58 uppercase tracking-wider">Avg Today</p>
              <p className="text-[16px] text-white font-heading mt-1 tabular-nums">{Math.round(hourlyData.reduce((s, d) => s + d.level, 0) / hourlyData.length)}%</p>
            </div>
          </Card>
        </div>

        {/* Hourly Trend Chart */}
        <Card as="section" ariaLabel="Today's hourly trend" className="p-6 mt-1">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center size-8 rounded-lg bg-info/[0.08] border border-info/[0.12]" aria-hidden="true">
                <BarChart3 className="size-4 text-info" strokeWidth={1.5} />
              </div>
              <h4 className="text-white">Today's Trend</h4>
            </div>
            <div className="flex items-center gap-5">
              {[
                { label: "Low", color: "bg-success" },
                { label: "Moderate", color: "bg-warning" },
                { label: "Busy", color: "bg-error" },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className={`size-2 rounded-full shrink-0 ${color}`} aria-hidden="true" />
                  <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div
            className="flex items-end gap-[6px] h-40"
            role="img"
            aria-label="Hourly gym occupancy chart showing activity levels throughout the day"
          >
            {hourlyData.map(({ hour, level }, i) => {
              const barStatus = getBarStatus(level);
              const isNow = i === currentHourIdx;
              const maxBarH = 144; // px
              const barH = Math.max(6, (level / 100) * maxBarH);

              return (
                <div key={hour} className="flex flex-col items-center flex-1 gap-2 group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <span className="text-[10px] text-white bg-elevated px-2.5 py-1 rounded-lg whitespace-nowrap border border-white/[0.08] shadow-lg">
                      {level}%
                    </span>
                  </div>

                  {/* Bar */}
                  <motion.div
                    className={`w-full rounded-lg ${isNow ? "ring-1 ring-white/20" : ""}`}
                    style={{
                      background: `linear-gradient(180deg, ${barStatus.hex}, ${barStatus.hexEnd}60)`,
                      minHeight: 6,
                    }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: barH, opacity: isNow ? 1 : 0.7 }}
                    whileHover={{ opacity: 1, scale: 1.08 }}
                    transition={{ duration: 0.6, delay: i * 0.04, ease: "easeOut" }}
                  />

                  {/* Label */}
                  <span
                    className={`text-[9px] tracking-wide ${
                      isNow ? "text-white" : "text-muted-foreground/40"
                    }`}
                  >
                    {hour.replace(" ", "")}
                  </span>

                  {/* Now dot */}
                  {isNow && (
                    <span className="size-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
