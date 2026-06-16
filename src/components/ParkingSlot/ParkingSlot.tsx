import React, { memo } from "react";
import type { ParkingSlotProps } from "./ParkingSlot.types";
import { Card } from "../Card/Card";

export const ParkingSlot: React.FC<ParkingSlotProps> = memo(
  ({ id, status, disabled = false, onClick }) => {
    const handleClick = () => {
      if (onClick && !disabled) {
        onClick(id);
      }
    };

    const statusStyles = {
      available: {
        card: "bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-950/30 border-emerald-200 dark:border-emerald-500/40 hover:border-emerald-300 dark:hover:border-emerald-500/60 text-emerald-800 dark:text-emerald-300 focus-visible:ring-emerald-500",
        dot: "bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]",
        label: "Available",
      },
      occupied: {
        card: "bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-500/40 hover:border-rose-300 dark:hover:border-rose-500/60 text-rose-800 dark:text-rose-300 focus-visible:ring-rose-500",
        dot: "bg-rose-500 dark:bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.5)]",
        label: "Occupied",
      },
      selected: {
        card: "bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-950/50 border-indigo-500 text-indigo-700 dark:text-indigo-200 ring-2 ring-indigo-500/40 focus-visible:ring-indigo-500",
        dot: "bg-indigo-500 dark:bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)] animate-pulse",
        label: "Selected",
      },
    };

    const currentStyles = statusStyles[status];

    return (
      <Card
        as="button"
        type="button"
        onClick={handleClick}
        disabled={disabled}
        aria-label={`Parking slot ${id}, Status: ${currentStyles.label}${disabled ? ", Disabled" : ""}`}
        aria-pressed={status === "selected"}
        className={`
          w-full p-4 rounded-xl border flex flex-col justify-between items-start gap-4 shadow-none backdrop-blur-none
          transition-all duration-200 ease-in-out text-left select-none
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950
          ${
            disabled
              ? "opacity-45 cursor-not-allowed bg-slate-100 dark:bg-slate-900/10 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500"
              : `cursor-pointer ${currentStyles.card}`
          }
        `}
      >
        <div className="w-full flex items-center justify-between">
          <span className="font-mono text-sm tracking-wider uppercase font-semibold text-slate-500 dark:text-slate-400">
            Slot ID
          </span>
          <span
            className={`h-2 w-2 rounded-full ${disabled ? "bg-slate-400 dark:bg-slate-600" : currentStyles.dot}`}
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
            {id}
          </span>
          <span className="text-xs font-medium opacity-80 mt-1">
            {disabled ? "Disabled" : currentStyles.label}
          </span>
        </div>
      </Card>
    );
  },
);

ParkingSlot.displayName = "ParkingSlot";
