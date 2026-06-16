export interface SessionTimerProps {
  
  startTime: string;
  
  durationHours: number;
}

export interface UseSessionTimerResult {
  
  formattedTime: string;
  
  isOvertime: boolean;
  
  percentageElapsed: number;
}
