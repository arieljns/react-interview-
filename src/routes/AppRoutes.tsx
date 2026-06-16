import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./index";
import { RouteGuard } from "./RouteGuard";
import { BlankLayout, TerminalLayout, DashboardLayout } from "../layouts";
import type { LayoutType } from "../layouts/layouts.types";

interface LayoutProps {
  children: React.ReactNode;
  meta?: {
    title: string;
    footer?: boolean;
  };
}

const layoutsMap: Record<LayoutType, React.ComponentType<LayoutProps>> = {
  BlankLayout,
  TerminalLayout,
  DashboardLayout,
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {routes.map((route) => {
        const Layout = layoutsMap[route.meta.layout];

        return (
          <Route
            key={route.key}
            path={route.path}
            element={
              <RouteGuard authority={route.authority}>
                <Layout meta={route.meta}>
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-[50vh] text-slate-400 font-medium">
                        <svg className="animate-spin h-6 w-6 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Loading operations console...
                      </div>
                    }
                  >
                    <route.component />
                  </Suspense>
                </Layout>
              </RouteGuard>
            }
          />
        );
      })}
    </Routes>
  );
};

AppRoutes.displayName = "AppRoutes";
