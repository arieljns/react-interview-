import { useState, useEffect, useCallback } from "react";
import type { UseSessionTimerResult } from "./SessionTimer.types";

export const useSessionTimer = (
  startTime: string,
  durationHours: number
): UseSessionTimerResult => {
  const formatTime = useCallback((ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number) => String(num).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }, []);

  const calculateTimer = useCallback((): UseSessionTimerResult => {
    const startMs = new Date(startTime).getTime();
    const totalDurationMs = durationHours * 60 * 60 * 1000;
    const expiryMs = startMs + totalDurationMs;
    const nowMs = Date.now();

    const isOvertime = nowMs > expiryMs;
    const elapsedMs = nowMs - startMs;
    
    const percentageElapsed = Math.min(
      100,
      Math.max(0, (elapsedMs / totalDurationMs) * 100)
    );

    const formattedTime = isOvertime
      ? formatTime(nowMs - expiryMs)
      : formatTime(expiryMs - nowMs);

    return {
      formattedTime,
      isOvertime,
      percentageElapsed,
    };
  }, [startTime, durationHours, formatTime]);

  const [timerState, setTimerState] = useState<UseSessionTimerResult>(calculateTimer);

  
  const [prevStartTime, setPrevStartTime] = useState(startTime);
  const [prevDuration, setPrevDuration] = useState(durationHours);

  if (startTime !== prevStartTime || durationHours !== prevDuration) {
    setPrevStartTime(startTime);
    setPrevDuration(durationHours);
    setTimerState(calculateTimer());
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimerState(calculateTimer());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [calculateTimer]);

  return timerState;
};
