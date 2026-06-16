import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/theme/useTheme";
import { Button } from "../../components/Button/Button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  meta?: {
    title: string;
    footer?: boolean;
  };
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  meta,
}) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg
          className="w-5 h-5 transition-transform duration-150 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      ),
    },
    {
      label: "Pemesanan Aktif",
      path: "/active-booking",
      icon: (
        <svg
          className="w-5 h-5 transition-transform duration-150 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V9.75M3.75 14.25h16.5M3.75 14.25 5.47 9c.217-.652.825-1.1 1.512-1.1h10.035c.687 0 1.295.448 1.512 1.1l1.72 5.25"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-150">
      <aside className="hidden md:flex w-64 border-r border-slate-200 dark:border-slate-900 bg-slate-100/50 dark:bg-slate-950/40 flex-col p-6 gap-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            P
          </div>
          <span className="font-semibold text-lg tracking-wide bg-gradient-to-r from-slate-800 to-slate-500 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            Manajemen Parkir
          </span>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 group
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/15"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900 hover:text-slate-800 dark:hover:text-slate-200"
                  }
                `}
              >
                <span
                  className={
                    isActive
                      ? "text-white"
                      : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                  }
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-grow flex flex-col justify-between pb-16 md:pb-0">
        <header className="border-b border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-0">
            <div className="md:hidden h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white text-sm">
              P
            </div>
            <h2 className="font-semibold text-lg text-slate-900 dark:text-white">
              {meta?.title || "Pusat Kontrol"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={toggleTheme}
              className="p-2 h-9 w-9 rounded-lg"
              aria-label="Ubah Tema"
            >
              {theme === "light" ? (
                <svg
                  className="w-5 h-5 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1.5m0 15V21m-9-9h1.5m15 0H21m-3.9-6.3h-1.06m-9.14 0H5.86m12.28 12.28H17.08m-9.14 0H5.86M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z"
                  />
                </svg>
              )}
            </Button>
          </div>
        </header>

        <main className="flex-grow p-6 md:p-8">{children}</main>

        {meta?.footer !== false && (
          <footer className="border-t border-slate-200 dark:border-slate-900/80 bg-white dark:bg-slate-950 py-4 text-center text-xs text-slate-400 dark:text-slate-500">
            <p>© {new Date().getFullYear()} ParkOps Control Suite.</p>
          </footer>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-900 flex md:hidden items-center justify-around px-4 z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center gap-1 flex-1 h-full py-1 transition-all duration-150 group
                ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                }
              `}
            >
              <span>{item.icon}</span>
              <span className="text-[10px] font-semibold tracking-wide uppercase">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

DashboardLayout.displayName = "DashboardLayout";
