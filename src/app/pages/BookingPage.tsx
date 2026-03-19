import { useState } from "react";
import { useNavigate } from "react-router";
import { Dumbbell, Sparkles, HandMetal, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { AppHeader } from "../components/layout/AppHeader";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { PageTransition } from "../components/ui/PageTransition";
import { Divider } from "../components/ui/Divider";
import { Textarea } from "../components/ui/Textarea";

const services = [
  { id: "training", label: "Personal Training", icon: Dumbbell, description: "1-on-1 session with a certified trainer" },
  { id: "spa", label: "Spa", icon: Sparkles, description: "Relaxation and wellness treatments" },
  { id: "massage", label: "Massage", icon: HandMetal, description: "Professional therapeutic massage" },
];

export function BookingPage() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!selectedService || !date || !time) {
      setError("Please select a service, date, and time");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageTransition className="flex flex-col bg-page-gradient min-h-full">
        <AppHeader title="Book a Session" showBack />
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6 py-16">
          <div className="flex items-center justify-center size-20 rounded-2xl bg-success/[0.08] border border-success/20" aria-hidden="true">
            <CheckCircle2 className="size-10 text-success" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <h2 className="text-white mb-3 tracking-tight">Request Submitted!</h2>
            <p className="text-[14px] text-muted-foreground/60 leading-relaxed max-w-xs">Your booking request has been sent. We'll notify you once it's confirmed.</p>
          </div>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Button onClick={() => navigate("/bookings/history")} fullWidth size="lg">View Bookings</Button>
            <Button variant="secondary" onClick={() => { setSubmitted(false); setSelectedService(""); setDate(""); setTime(""); setNotes(""); }} fullWidth size="lg">Book Another</Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="flex flex-col bg-page-gradient min-h-full">
      <AppHeader title="Book a Session" showBack />

      <form onSubmit={handleSubmit} className="flex flex-col gap-14 px-5 py-10" noValidate>
        {error && (
          <div className="flex items-center gap-2.5 bg-error/[0.08] border border-error/20 rounded-xl px-4 py-3.5 text-[14px] text-error" role="alert">
            <span className="size-1.5 rounded-full bg-error shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {/* Service Selection */}
        <fieldset>
          <legend className="text-[13px] text-muted-foreground/70 uppercase tracking-wider mb-6">Choose Service</legend>
          <div className="flex flex-col gap-4">
            {services.map(({ id, label, icon: Icon, description }) => {
              const isSelected = selectedService === id;
              return (
                <motion.div
                  key={id}
                  layout
                  whileTap={{ scale: 0.985 }}
                  animate={isSelected ? { scale: 1.025, y: -2 } : { scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                >
                  <Card
                    onClick={() => setSelectedService(id)}
                    ariaLabel={label}
                    glow={isSelected ? "gold" : "default"}
                    className={`flex items-center gap-3.5 p-5 transition-all duration-300 ease-out cursor-pointer ${
                      isSelected
                        ? "border-gold/35 shadow-[0_0_0_1px_rgba(212,175,55,0.18),0_16px_40px_rgba(212,175,55,0.14),0_18px_34px_rgba(0,0,0,0.16)]"
                        : "hover:border-white/[0.1] hover:shadow-[0_10px_22px_rgba(0,0,0,0.16)]"
                    }`}
                    style={isSelected ? { background: "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 26%, rgba(20,20,22,1) 74%)" } : undefined}
                  >
                    <div className={`flex items-center justify-center size-12 rounded-xl border shrink-0 transition-all duration-250 ${isSelected ? "bg-gold/[0.16] text-gold border-gold/28 shadow-[0_8px_22px_rgba(212,175,55,0.12)]" : "bg-white/[0.03] text-muted-foreground/55 border-white/[0.06]"}`} aria-hidden="true">
                      <Icon className={`size-5 ${isSelected ? "brightness-125" : ""}`} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white">{label}</h4>
                      <p className="text-[13px] text-muted-foreground/58 mt-1.5 leading-relaxed">{description}</p>
                    </div>
                    <div className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-250 ${isSelected ? "border-gold shadow-[0_0_12px_rgba(212,175,55,0.22)]" : "border-white/[0.12]"}`}>
                      {isSelected && <div className="size-2.5 rounded-full bg-gold" />}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </fieldset>

        <Divider variant="gradient" className="mt-1" />

        {/* Date & Time */}
        <fieldset>
          <legend className="text-[13px] text-muted-foreground/70 uppercase tracking-wider mb-6">Date & Time</legend>
          <div className="grid grid-cols-2 gap-5">
            <Input
              label="Preferred Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="h-12 rounded-xl border-white/[0.08] bg-surface hover:border-gold/25 focus-visible:border-gold/40 shadow-[0_6px_18px_rgba(0,0,0,0.12)] cursor-pointer"
            />
            <Input
              label="Preferred Time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="h-12 rounded-xl border-white/[0.08] bg-surface hover:border-gold/25 focus-visible:border-gold/40 shadow-[0_6px_18px_rgba(0,0,0,0.12)] cursor-pointer"
            />
          </div>
        </fieldset>

        <Divider variant="gradient" className="mt-1" />

        {/* Notes */}
        <fieldset>
          <legend className="text-[13px] text-muted-foreground/70 uppercase tracking-wider mb-6">Additional Notes</legend>
          <Textarea
            id="booking-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any preferences or special requests..."
            rows={4}
            className="w-full bg-surface border border-white/[0.08] rounded-xl px-4 py-4 text-white text-[15px] placeholder:text-muted-foreground/52 hover:border-gold/20 focus-visible:border-gold/40 focus-visible:ring-gold/20 resize-none card-glow transition-all duration-250 ease-out leading-relaxed"
            aria-label="Additional notes for your booking"
          />
          <p className="text-[12px] text-muted-foreground/48 mt-3 tracking-wide">Optional — let us know about any preferences</p>
        </fieldset>

        <div className="pt-2">
          <Button type="submit" fullWidth size="lg" loading={loading}>Submit Request</Button>
        </div>
      </form>
    </PageTransition>
  );
}
