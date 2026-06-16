import React from "react";
import { useSessionTimer } from "./useSessionTimer";
import type { SessionTimerProps } from "./SessionTimer.types";
import { Card } from "../Card/Card";

export const SessionTimer: React.FC<SessionTimerProps> = ({
  startTime,
  durationHours,
}) => {
  const { formattedTime, isOvertime, percentageElapsed } = useSessionTimer(
    startTime,
    durationHours
  );

  return (
    <Card
      role="timer"
      aria-label={`Session timer, ${isOvertime ? "Overtime duration" : "Time remaining"} is ${formattedTime}`}
      className={`
        max-w-sm flex flex-col gap-4 transition-colors duration-300
        ${isOvertime 
          ? "bg-rose-50 dark:bg-rose-950/15 border-rose-200 dark:border-rose-900/30 text-rose-800 dark:text-rose-200" 
          : "text-slate-800 dark:text-slate-200"
        }
      `}
    >
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {isOvertime ? "Overtime Alert" : "Active Session"}
        </span>
        <span 
          className={`h-2.5 w-2.5 rounded-full ${isOvertime ? "bg-rose-500 animate-ping" : "bg-indigo-400 animate-pulse"}`} 
          aria-hidden="true" 
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className={`text-4xl font-mono font-bold tracking-tight ${isOvertime ? "text-rose-600 dark:text-rose-400" : "text-slate-900 dark:text-white"}`}>
          {formattedTime}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {isOvertime ? "Exceeded booked limit" : "Remaining until checkout"}
        </span>
      </div>

      <div className="w-full flex flex-col gap-2 mt-2">
        <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-950 overflow-hidden" aria-hidden="true">
          <div
            style={{ width: `${percentageElapsed}%` }}
            className={`
              h-full rounded-full transition-all duration-1000 ease-out
              ${isOvertime ? "bg-rose-500" : "bg-gradient-to-r from-indigo-500 to-violet-500"}
            `}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 font-medium font-mono">
          <span>0%</span>
          <span>{Math.round(percentageElapsed)}% elapsed</span>
          <span>100%</span>
        </div>
      </div>
    </Card>
  );
};

SessionTimer.displayName = "SessionTimer";
