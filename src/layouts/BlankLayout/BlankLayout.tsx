import React from "react";
import { useTheme } from "../../contexts/theme/useTheme";

interface BlankLayoutProps {
  children: React.ReactNode;
}

export const BlankLayout: React.FC<BlankLayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-150 ${
        theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"
      }`}
    >
      {children}
    </div>
  );
};

BlankLayout.displayName = "BlankLayout";
