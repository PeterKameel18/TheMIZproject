import { Clock, Phone, Mail, MapPin, AlertTriangle, Instagram, Globe, ArrowUpRight } from "lucide-react";
import { AppHeader } from "../components/layout/AppHeader";
import { Card } from "../components/ui/Card";
import { PageTransition } from "../components/ui/PageTransition";
import { Divider } from "../components/ui/Divider";

const weeklyHours = [
  { day: "Saturday", hours: "7:00 AM – 12:00 AM" },
  { day: "Sunday", hours: "7:00 AM – 12:00 AM" },
  { day: "Monday", hours: "7:00 AM – 12:00 AM" },
  { day: "Tuesday", hours: "7:00 AM – 12:00 AM" },
  { day: "Wednesday", hours: "7:00 AM – 12:00 AM" },
  { day: "Thursday", hours: "7:00 AM – 1:00 AM" },
  { day: "Friday", hours: "9:00 AM – 11:00 PM" },
];

const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
const gymAddress = "47 Street 9, Maadi, Cairo, Egypt";
const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gymAddress)}`;

export function GymInfoPage() {
  return (
    <PageTransition className="flex flex-col bg-page-gradient min-h-full">
      <AppHeader title="Gym Info" showBack />

      <div className="flex flex-col gap-10 px-5 py-10">
        {/* Working Hours */}
        <Card as="section" ariaLabel="Working hours" className="p-5">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="flex items-center justify-center size-8 rounded-lg bg-gold/[0.08] border border-gold/[0.12] shrink-0" aria-hidden="true">
              <Clock className="size-4 text-gold" strokeWidth={1.5} />
            </div>
            <h3 className="text-white">Working Hours</h3>
          </div>
          <dl className="flex flex-col gap-1">
            {weeklyHours.map(({ day, hours }) => {
              const isToday = day === today;
              return (
                <div
                  key={day}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${isToday ? "bg-gold/[0.06] border border-gold/[0.08]" : ""}`}
                >
                  <dt className={`text-[14px] ${isToday ? "text-gold" : "text-muted-foreground/70"}`}>
                    {day}
                    {isToday && <span className="ml-2 text-[10px] uppercase tracking-wider opacity-70">(Today)</span>}
                  </dt>
                  <dd className={`text-[14px] ${isToday ? "text-gold font-heading" : "text-white/80"}`}>{hours}</dd>
                </div>
              );
            })}
          </dl>
        </Card>

        {/* Holiday Notice */}
        <Card as="section" ariaLabel="Holiday notice" className="p-5 border-warning/[0.15] bg-warning/[0.02]">
          <div className="flex items-start gap-3.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-warning/[0.08] border border-warning/[0.12] shrink-0" aria-hidden="true">
              <AlertTriangle className="size-4 text-warning" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h4 className="text-warning mb-1.5">Holiday Hours</h4>
              <p className="text-[14px] text-muted-foreground/60 leading-relaxed">
                Working hours may change during public holidays. Check announcements for updates.
              </p>
            </div>
          </div>
        </Card>

        {/* Contact */}
        <Card as="section" ariaLabel="Contact information" className="p-5">
          <h3 className="text-white mb-6">Contact Us</h3>
          <div className="flex flex-col gap-4">
            <a href="tel:+20227356100" className="flex items-center gap-3 text-[14px] text-white/80 hover:text-gold transition-colors duration-200 group">
              <div className="flex items-center justify-center size-8 rounded-lg bg-white/[0.04] group-hover:bg-gold/[0.08] transition-colors duration-200" aria-hidden="true">
                <Phone className="size-4 text-muted-foreground/60 group-hover:text-gold transition-colors duration-200" strokeWidth={1.5} />
              </div>
              +20 2 2735 6100
            </a>
            <Divider variant="subtle" />
            <a href="mailto:info@mizgym.com" className="flex items-center gap-3 text-[14px] text-white/80 hover:text-gold transition-colors duration-200 group">
              <div className="flex items-center justify-center size-8 rounded-lg bg-white/[0.04] group-hover:bg-gold/[0.08] transition-colors duration-200" aria-hidden="true">
                <Mail className="size-4 text-muted-foreground/60 group-hover:text-gold transition-colors duration-200" strokeWidth={1.5} />
              </div>
              info@mizgym.com
            </a>
            <Divider variant="subtle" />
            <div className="flex items-center gap-3 text-[14px] text-white/80">
              <div className="flex items-center justify-center size-8 rounded-lg bg-white/[0.04] shrink-0" aria-hidden="true">
                <MapPin className="size-4 text-muted-foreground/60" strokeWidth={1.5} />
              </div>
              <span>{gymAddress}</span>
            </div>
          </div>
        </Card>

        {/* Location */}
        <Card as="section" ariaLabel="Location map" className="p-5">
          <h3 className="text-white mb-4">Location</h3>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group block w-full rounded-[18px] border border-gold/[0.12] overflow-hidden cursor-pointer transition-all duration-250 ease-out hover:-translate-y-0.5 hover:border-gold/[0.22] hover:shadow-[0_14px_32px_rgba(0,0,0,0.2),0_0_24px_rgba(212,175,55,0.08)] active:scale-[0.985] active:shadow-[0_8px_18px_rgba(0,0,0,0.18),0_0_16px_rgba(212,175,55,0.05)]"
            aria-label="View gym location on map"
          >
            <div
              className="relative h-48 flex items-center justify-center px-6"
              style={{
                background:
                  "radial-gradient(circle at 30% 35%, rgba(212,175,55,0.12) 0%, transparent 24%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.06) 0%, transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(20,20,22,1) 100%)",
              }}
            >
              <div className="absolute inset-0 opacity-40" aria-hidden="true">
                <div className="absolute inset-x-0 top-8 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                <div className="absolute inset-x-0 bottom-12 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                <div className="absolute inset-y-0 left-12 w-px bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />
                <div className="absolute inset-y-0 right-16 w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
              </div>
              <div className="relative flex flex-col items-center gap-3 text-center max-w-[24rem]">
                <div className="flex items-center justify-center size-14 rounded-2xl bg-gold/[0.1] border border-gold/[0.16] text-gold shadow-[0_8px_24px_rgba(212,175,55,0.08)] transition-all duration-250 group-hover:scale-[1.03] group-hover:shadow-[0_10px_28px_rgba(212,175,55,0.14)] group-active:scale-[0.98]" aria-hidden="true">
                  <MapPin className="size-6" strokeWidth={1.75} />
                </div>
                <div className="space-y-1.5">
                  <p className="text-[13px] text-muted-foreground/72 leading-relaxed">{gymAddress}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] text-gold/95 border border-gold/[0.14] bg-gold/[0.06] shadow-[0_4px_14px_rgba(212,175,55,0.06)] transition-all duration-250 group-hover:border-gold/[0.22] group-hover:bg-gold/[0.1] group-hover:text-gold group-hover:shadow-[0_8px_18px_rgba(212,175,55,0.1)]">
                  Open Google Maps
                  <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-250 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" strokeWidth={1.75} aria-hidden="true" />
                </span>
              </div>
            </div>
          </a>
        </Card>

        {/* Social Links */}
        <Card as="section" ariaLabel="Social media" className="p-5">
          <h3 className="text-white mb-5">Follow Us</h3>
          <div className="flex gap-3">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Globe, label: "Website" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.03] rounded-xl text-[13px] text-muted-foreground/60 hover:text-white hover:bg-white/[0.06] border border-white/[0.06] transition-all duration-200 active:scale-95"
                aria-label={`Visit our ${label}`}
              >
                <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
