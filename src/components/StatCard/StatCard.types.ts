import type { ReactNode } from "react";

export interface StatCardProps {
  
  title: string;
  
  value: number;
  
  icon?: ReactNode;
  
  trend?: number;
  
  color?: "default" | "success" | "danger";
}
