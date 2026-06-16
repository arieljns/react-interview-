import React from "react";

export interface ReceiptRow {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
  borderBottom?: boolean;
}

export interface ReceiptCardProps {
  rows: ReceiptRow[];
  totalRow?: {
    label: string;
    value: React.ReactNode;
    valueClassName?: string;
  };
  className?: string;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({
  rows,
  totalRow,
  className = "",
}) => {
  return (
    <div
      className={`
        bg-slate-50 dark:bg-slate-950/60 rounded-xl p-4 border border-slate-200 dark:border-slate-800
        flex flex-col gap-3 text-left font-mono text-sm text-slate-700 dark:text-slate-300
        ${className}
      `}
    >
      {rows.map((row, index) => (
        <div
          key={index}
          className={`flex justify-between items-baseline gap-2 ${
            row.borderBottom !== false
              ? "border-b border-slate-200/60 dark:border-slate-900 pb-2"
              : ""
          }`}
        >
          <span className="text-slate-400 dark:text-slate-500 shrink-0">{row.label}</span>
          <span className={`text-right ${row.valueClassName || "text-slate-800 dark:text-slate-200"}`}>
            {row.value}
          </span>
        </div>
      ))}
      {totalRow && (
        <div className="flex justify-between items-baseline gap-2 pt-1 font-bold text-slate-900 dark:text-white text-base">
          <span className="text-slate-400 dark:text-slate-500 shrink-0">{totalRow.label}</span>
          <span className={`text-right ${totalRow.valueClassName || "text-emerald-600 dark:text-emerald-400"}`}>
            {totalRow.value}
          </span>
        </div>
      )}
    </div>
  );
};
