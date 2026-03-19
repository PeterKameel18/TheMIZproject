import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background border-x border-white/[0.02]">
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
