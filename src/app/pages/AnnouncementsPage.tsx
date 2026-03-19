import { useState } from "react";
import { Megaphone, Tag, Clock, AlertTriangle, Pin } from "lucide-react";
import { AppHeader } from "../components/layout/AppHeader";
import { Card } from "../components/ui/Card";
import { FilterChips } from "../components/ui/FilterChips";
import { EmptyState } from "../components/ui/EmptyState";
import { PageTransition } from "../components/ui/PageTransition";

interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "All" | "Offers" | "Notices" | "Hours";
  pinned?: boolean;
}

const allAnnouncements: Announcement[] = [
  { id: "1", title: "Sham El-Nessim Hours", description: "The gym will operate on reduced hours during the Sham El-Nessim holiday (March 20-22). Saturday: 10 AM - 8 PM, Sunday: 10 AM - 6 PM, Monday: Closed. Regular hours resume Tuesday.", date: "Mar 15, 2026", category: "Hours", pinned: true },
  { id: "2", title: "New Ramadan Offer", description: "Special Ramadan membership packages now available! Get 20% off all monthly and quarterly plans. Limited time offer valid throughout Ramadan.", date: "Mar 12, 2026", category: "Offers" },
  { id: "3", title: "Spa Services Discount", description: "Enjoy 30% off all spa and massage services this week only. Book now through the app to secure your slot!", date: "Mar 10, 2026", category: "Offers" },
  { id: "4", title: "New Equipment Arrival", description: "We've added new cable machines and free weights to the strength training area. Come check them out!", date: "Mar 8, 2026", category: "Notices" },
  { id: "5", title: "Maintenance Notice", description: "The swimming pool will be closed for maintenance on March 25th. We apologize for the inconvenience.", date: "Mar 5, 2026", category: "Notices" },
  { id: "6", title: "Extended Thursday Hours", description: "Starting this month, the gym will stay open until 1 AM every Thursday night. Enjoy your late-night workouts!", date: "Mar 3, 2026", category: "Hours" },
];

const categories = ["All", "Offers", "Notices", "Hours"];

const categoryIcons: Record<string, React.ReactNode> = {
  Offers: <Tag className="size-3 shrink-0" strokeWidth={1.5} />,
  Notices: <AlertTriangle className="size-3 shrink-0" strokeWidth={1.5} />,
  Hours: <Clock className="size-3 shrink-0" strokeWidth={1.5} />,
};

export function AnnouncementsPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? allAnnouncements : allAnnouncements.filter((a) => a.category === filter);

  return (
    <PageTransition className="flex flex-col bg-page-gradient min-h-full">
      <AppHeader title="Announcements" showBack />

      <div className="flex flex-col gap-8 px-5 py-8">
        <FilterChips options={categories} selected={filter} onSelect={setFilter} />

        {filtered.length === 0 ? (
          <EmptyState
            icon={<Megaphone className="size-10" strokeWidth={1.5} />}
            title="Nothing here yet"
            description={filter === "All" ? "We'll post updates here when there's something new. Check back soon!" : `No ${filter.toLowerCase()} right now — check back later for updates.`}
          />
        ) : (
          <ul className="flex flex-col gap-6" role="list">
            {filtered.map((item, index) => (
              <li key={item.id}>
                <Card
                  as="article"
                  className={`p-5 transition-all duration-200 ${
                    index === 0
                      ? "shadow-[0_14px_30px_rgba(0,0,0,0.18),0_0_24px_rgba(212,175,55,0.06)] border-gold/[0.14]"
                      : "opacity-[0.92]"
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    {/* Meta row */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full bg-gradient-to-r from-gold/[0.18] to-gold/[0.08] text-gold border border-gold/[0.2] shadow-[0_4px_12px_rgba(212,175,55,0.08)] uppercase tracking-[0.14em] leading-none">
                        {categoryIcons[item.category]}
                        <span className="translate-y-[0.5px]">{item.category}</span>
                      </span>
                      {item.pinned && (
                        <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-[3px] rounded-full bg-warning/[0.08] text-warning border border-warning/[0.1] uppercase tracking-wider leading-none">
                          <Pin className="size-2.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                          <span className="translate-y-[0.5px]">Pinned</span>
                        </span>
                      )}
                      <span className="text-[11px] text-muted-foreground/72 ml-auto tabular-nums">{item.date}</span>
                    </div>
                    {/* Content */}
                    <div className="max-w-[34ch]">
                      <h4 className="text-white mb-2.5">{item.title}</h4>
                      <p className="text-[14px] text-muted-foreground/72 leading-[1.8]">{item.description}</p>
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
