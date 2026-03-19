import { createBrowserRouter } from "react-router";

import { RootLayout } from "./components/layout/RootLayout";
import { MainLayout } from "./components/layout/MainLayout";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { QRCodePage } from "./pages/QRCodePage";
import { AnnouncementsPage } from "./pages/AnnouncementsPage";
import { GymStatusPage } from "./pages/GymStatusPage";
import { BookingPage } from "./pages/BookingPage";
import { BookingHistoryPage } from "./pages/BookingHistoryPage";
import { GymInfoPage } from "./pages/GymInfoPage";
import { AuthGuard } from "./components/layout/AuthGuard";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/signup",
        Component: SignUpPage,
      },
      {
        path: "/forgot-password",
        Component: ForgotPasswordPage,
      },
      {
        path: "/",
        Component: AuthGuard,
        children: [
          {
            Component: MainLayout,
            children: [
              { index: true, Component: DashboardPage },
              { path: "profile", Component: ProfilePage },
              { path: "qr", Component: QRCodePage },
              { path: "announcements", Component: AnnouncementsPage },
              { path: "bookings", Component: BookingHistoryPage },
              { path: "bookings/new", Component: BookingPage },
              { path: "bookings/history", Component: BookingHistoryPage },
              { path: "gym-status", Component: GymStatusPage },
              { path: "gym-info", Component: GymInfoPage },
            ],
          },
        ],
      },
    ],
  },
]);