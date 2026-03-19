import { useState } from "react";
import { useNavigate } from "react-router";
import { CalendarDays, Dumbbell, Sparkles, HandMetal } from "lucide-react";
import { AppHeader } from "../components/layout/AppHeader";
import { Card } from "../components/ui/Card";
import { StatusBadge } from "../components/ui/StatusBadge";
import { FilterChips } from "../components/ui/FilterChips";
import { EmptyState } from "../components/ui/EmptyState";
import { PageTransition } from "../components/ui/PageTransition";

interface Booking {
  id: string;
  service: string;
  serviceType: "training" | "spa" | "massage";
  date: string;
  time: string;
  status: "pending" | "approved" | "rejected" | "completed";
  notes?: string;
  coach?: string;
}

const mockBookings: Booking[] = [
  { id: "b1", service: "Personal Training", serviceType: "training", date: "Mar 20, 2026", time: "7:00 PM", status: "pending", notes: "Focus on upper body", coach: "Coach Mohamed Hany" },
  { id: "b2", service: "Spa", serviceType: "spa", date: "Mar 18, 2026", time: "3:00 PM", status: "approved" },
  { id: "b3", service: "Massage", serviceType: "massage", date: "Mar 15, 2026", time: "5:00 PM", status: "completed", notes: "Deep tissue" },
  { id: "b4", service: "Personal Training", serviceType: "training", date: "Mar 10, 2026", time: "6:00 PM", status: "rejected", coach: "Coach Sara Abdel-Rahim" },
  { id: "b5", service: "Spa", serviceType: "spa", date: "Mar 8, 2026", time: "2:00 PM", status: "completed" },
];

const serviceIcons: Record<string, React.ReactNode> = {
  training: <Dumbbell className="size-[18px]" strokeWidth={1.5} />,
  spa: <Sparkles className="size-[18px]" strokeWidth={1.5} />,
  massage: <HandMetal className="size-[18px]" strokeWidth={1.5} />,
};

const filters = ["All", "Pending", "Approved", "Rejected", "Completed"];

export function BookingHistoryPage() {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const filtered = filter === "All" ? mockBookings : mockBookings.filter((b) => b.status === filter.toLowerCase());

  return (
    <PageTransition className="flex flex-col bg-page-gradient min-h-full">
      <AppHeader title="Booking History" showBack />

      <div className="flex flex-col gap-8 px-5 py-8">
        <FilterChips options={filters} selected={filter} onSelect={setFilter} />

        {filtered.length === 0 ? (
          <EmptyState
            icon={<CalendarDays className="size-10" strokeWidth={1.5} />}
            title="No bookings found"
            description={filter === "All" ? "You haven't booked any sessions yet. Let's get your first one scheduled!" : `No ${filter.toLowerCase()} bookings to show. Try a different filter or book a new session.`}
            actionLabel="Book a Session"
            onAction={() => navigate("/bookings/new")}
          />
        ) : (
          <ul className="flex flex-col gap-[18px]" role="list">
            {filtered.map((booking) => (
              <li key={booking.id}>
                <Card as="article" ariaLabel={`${booking.service} on ${booking.date}`} className="p-5">
                  <div className="flex items-start gap-3.5">
                    <div className="flex items-center justify-center size-11 rounded-xl bg-gold/[0.09] border border-gold/[0.14] text-gold/95 shadow-[0_6px_18px_rgba(212,175,55,0.08)] shrink-0 mt-0.5" aria-hidden="true">
                      {serviceIcons[booking.serviceType]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="text-white truncate">{booking.service}</h4>
                        <StatusBadge
                          status={booking.status}
                          className="px-2 py-[5px] text-[10px] tracking-[0.12em] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
                        />
                      </div>
                      <p className="flex items-center gap-1.5 text-[13px] text-muted-foreground/70">
                        <CalendarDays className="size-3 shrink-0 text-muted-foreground/85" strokeWidth={1.5} aria-hidden="true" />
                        <span>{booking.date} at {booking.time}</span>
                      </p>
                      {booking.coach && (
                        <p className="text-[12px] font-semibold text-muted-foreground/88 mt-2">{booking.coach}</p>
                      )}
                      {booking.notes && (
                        <p className="text-[12px] font-medium text-muted-foreground/84 mt-1.5 truncate italic">"{booking.notes}"</p>
                      )}
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageTransition>
  );
}
