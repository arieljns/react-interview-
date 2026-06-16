import React from "react";
import { useTheme } from "../../contexts/theme/useTheme";
import { Button } from "../../components/Button/Button";

interface TerminalLayoutProps {
  children: React.ReactNode;
  meta?: {
    title: string;
  };
}

export const TerminalLayout: React.FC<TerminalLayoutProps> = ({
  children,
  meta,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between transition-colors duration-150">
      {}
      <header className="border-b border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              P
            </div>
            <span className="font-semibold text-lg tracking-wide bg-gradient-to-r from-slate-800 to-slate-500 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              {meta?.title || "ParkOps Kiosk"}
            </span>
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
        </div>
      </header>

      {}
      <main className="flex-grow flex flex-col items-center justify-center py-8 px-4">
        {children}
      </main>

      {}
      <footer className="border-t border-slate-200 dark:border-slate-900/80 bg-white dark:bg-slate-950 py-4 text-center text-xs text-slate-400 dark:text-slate-500">
        <p>© {new Date().getFullYear()} Manajemen Parkir.</p>
      </footer>
    </div>
  );
};

TerminalLayout.displayName = "TerminalLayout";
