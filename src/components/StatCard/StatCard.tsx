import React, { memo } from "react";
import type { StatCardProps } from "./StatCard.types";
import { Card } from "../Card/Card";

export const StatCard: React.FC<StatCardProps> = memo(({
  title,
  value,
  icon,
  trend,
  color = "default",
}) => {
  const valueColorStyles = {
    default: "text-slate-900 dark:text-white",
    success: "text-emerald-600 dark:text-emerald-400",
    danger: "text-rose-600 dark:text-rose-400",
  };

  const isPositiveTrend = trend !== undefined && trend > 0;

  return (
    <Card
      role="region"
      aria-label={`${title} stat card`}
      className="flex flex-col justify-between gap-4"
    >
      <div className="flex justify-between items-start">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 select-none">
          {title}
        </span>
        {icon && (
          <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/35 flex items-center justify-center text-slate-500 dark:text-slate-400" aria-hidden="true">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <span className={`text-3xl font-bold font-mono tracking-tight ${valueColorStyles[color]}`}>
          {value.toLocaleString()}
        </span>

        {trend !== undefined && trend !== 0 && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
              isPositiveTrend
                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/15"
                : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/15"
            }`}
            aria-label={`Trend: ${isPositiveTrend ? "Increased by" : "Decreased by"} ${Math.abs(trend)}%`}
          >
            <span aria-hidden="true">{isPositiveTrend ? "↑" : "↓"}</span>
            <span className="font-mono">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </Card>
  );
});

StatCard.displayName = "StatCard";
