import { useState, useEffect, useCallback } from "react";
import type { Booking } from "../../../contexts/parking/parking.types";

interface UseBookingSessionParams {
  booking?: Booking;
  extendedHours: number;
  simulationMode: "none" | "active" | "overtime";
}

interface UseBookingSessionResult {
  secondsLeft: number;
  overtimeSeconds: number;
  isOvertime: boolean;
  formattedTime: string;
  percentageElapsed: number;
}

export const useBookingSession = ({
  booking,
  extendedHours,
  simulationMode,
}: UseBookingSessionParams): UseBookingSessionResult => {
  
  const [mockState, setMockState] = useState({
    secondsLeft: 4462,
    overtimeSeconds: 930,
    isOvertime: false,
  });

  
  const [liveState, setLiveState] = useState({
    secondsLeft: 0,
    overtimeSeconds: 0,
    isOvertime: false,
  });

  const formatTime = useCallback((totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const pad = (num: number) => String(num).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  }, []);

  
  const [prevSimMode, setPrevSimMode] = useState(simulationMode);
  const [prevBookingId, setPrevBookingId] = useState(booking?.id);

  if (simulationMode !== prevSimMode || booking?.id !== prevBookingId) {
    setPrevSimMode(simulationMode);
    setPrevBookingId(booking?.id);
    if (simulationMode === "active") {
      setMockState({
        isOvertime: false,
        secondsLeft: 4462,
        overtimeSeconds: 0,
      });
    } else if (simulationMode === "overtime") {
      setMockState({
        isOvertime: true,
        secondsLeft: 0,
        overtimeSeconds: 930,
      });
    } else if (!booking) {
      setMockState({
        isOvertime: false,
        secondsLeft: 4462,
        overtimeSeconds: 930,
      });
    }
  }

  
  useEffect(() => {
    if (simulationMode === "active") {
      return;
    }
    if (simulationMode === "overtime") {
      const timer = setInterval(() => {
        setMockState((prev) => ({
          ...prev,
          overtimeSeconds: prev.overtimeSeconds + 1,
        }));
      }, 1000);
      return () => clearInterval(timer);
    }

    if (!booking) {
      const timer = setInterval(() => {
        setMockState((prev) => {
          if (prev.isOvertime) {
            return {
              ...prev,
              overtimeSeconds: prev.overtimeSeconds + 1,
            };
          }
          if (prev.secondsLeft <= 1) {
            return {
              isOvertime: true,
              secondsLeft: 0,
              overtimeSeconds: 930,
            };
          }
          return {
            ...prev,
            secondsLeft: prev.secondsLeft - 1,
          };
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [booking, simulationMode]);

  
  useEffect(() => {
    if (simulationMode !== "none" || !booking) return;

    const updateTimer = () => {
      const start = new Date(booking.startTime).getTime();
      const durationMs =
        (booking.durationHours + extendedHours) * 60 * 60 * 1000;
      const end = start + durationMs;
      const now = Date.now();
      const diffMs = end - now;

      if (diffMs < 0) {
        setLiveState({
          isOvertime: true,
          overtimeSeconds: Math.floor(Math.abs(diffMs) / 1000),
          secondsLeft: 0,
        });
      } else {
        setLiveState({
          isOvertime: false,
          secondsLeft: Math.floor(diffMs / 1000),
          overtimeSeconds: 0,
        });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [booking, extendedHours, simulationMode]);

  
  const state =
    simulationMode === "active"
      ? { isOvertime: false, secondsLeft: 4462, overtimeSeconds: 0 }
      : simulationMode === "overtime"
      ? { isOvertime: true, secondsLeft: 0, overtimeSeconds: mockState.overtimeSeconds }
      : !booking
      ? mockState
      : liveState;

  const durationHours = booking ? booking.durationHours : 2;
  const totalDurationSeconds = (durationHours + extendedHours) * 3600;
  
  
  const percentageElapsed = state.isOvertime
    ? 100
    : totalDurationSeconds > 0
    ? Math.min(
        100,
        Math.max(
          0,
          ((totalDurationSeconds - state.secondsLeft) / totalDurationSeconds) * 100
        )
      )
    : 0;

  return {
    ...state,
    formattedTime: formatTime(state.isOvertime ? state.overtimeSeconds : state.secondsLeft),
    percentageElapsed,
  };
};
