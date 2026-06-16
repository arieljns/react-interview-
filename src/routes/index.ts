import { lazy, type LazyExoticComponent, type ComponentType } from "react";
import type { LayoutType } from "../layouts/layouts.types";

export interface RouteConfig {
  key: string;
  path: string;
  
  component: LazyExoticComponent<ComponentType<unknown>>;
  authority: string[];
  meta: {
    layout: LayoutType;
    pageContainerType?: "fluid" | "fixed" | "compact";
    footer?: boolean;
    title: string;
  };
}

export const routes: RouteConfig[] = [
  
  {
    key: "dashboard",
    path: "/dashboard",
    component: lazy(() => import("../pages/dashboard/Dashboard")),
    authority: ["admin", "operator"],
    meta: {
      layout: "DashboardLayout",
      pageContainerType: "fluid",
      footer: true,
      title: "Dashboard",
    },
  },

  
  {
    key: "reserveParking",
    path: "/reserve",
    component: lazy(() => import("../pages/booking/ReserveParking")),
    authority: ["admin", "operator", "user"],
    meta: {
      layout: "TerminalLayout",
      pageContainerType: "fixed",
      footer: false,
      title: "Booking Slot Parkir",
    },
  },
  {
    key: "bookingConfirmation",
    path: "/bookings/:id/confirmation",
    component: lazy(() => import("../pages/booking/BookingConfirmation")),
    authority: ["admin", "operator", "user"],
    meta: {
      layout: "TerminalLayout",
      pageContainerType: "compact",
      footer: false,
      title: "Konfirmasi Booking",
    },
  },
  {
    key: "bookingDetails",
    path: "/bookings/:id",
    component: lazy(() => import("../pages/booking/BookingDetails")),
    authority: ["admin", "operator", "user"],
    meta: {
      layout: "DashboardLayout",
      pageContainerType: "fixed",
      footer: true,
      title: "Detail Booking",
    },
  },
  {
    key: "activeBooking",
    path: "/active-booking",
    component: lazy(() => import("../pages/booking/ActiveBooking")),
    authority: ["admin", "operator", "user"],
    meta: {
      layout: "DashboardLayout",
      pageContainerType: "fixed",
      footer: true,
      title: "Pemesanan Aktif",
    },
  },
  {
    key: "offboarding",
    path: "/offboarding",
    component: lazy(() => import("../pages/booking/Offboarding")),
    authority: ["admin", "operator", "user"],
    meta: {
      layout: "TerminalLayout",
      pageContainerType: "compact",
      footer: false,
      title: "Session Ended",
    },
  },
  {
    key: "notFound",
    path: "*",
    component: lazy(() => import("../pages/errors/NotFound")),
    authority: [],
    meta: {
      layout: "BlankLayout",
      footer: false,
      title: "Page Not Found",
    },
  },
];
