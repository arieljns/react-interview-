import React, { useReducer, useEffect, useMemo, useCallback } from "react";
import { ParkingContext } from "./ParkingContext";
import { parkingReducer, initialParkingState } from "./parking.reducer";
import { loadState, saveState } from "./parking.storage";
import { filterSlots } from "./parking.selectors";
import type { Booking, ParkingFilters } from "./parking.types";

interface ParkingProviderProps {
  children: React.ReactNode;
}

const initializer = () => {
  const cached = loadState();
  if (!cached) {
    return initialParkingState;
  }
  const mergedSlots = cached.slots.map((cachedSlot) => {
    const defaultSlot = initialParkingState.slots.find((s) => s.id === cachedSlot.id);
    return {
      ...defaultSlot,
      ...cachedSlot,
      disabled: defaultSlot?.disabled,
      vehicleSize: cachedSlot.vehicleSize || defaultSlot?.vehicleSize || "medium",
    };
  });

  const cleanedBookings: Record<string, Booking> = {};
  if (cached.bookings) {
    Object.keys(cached.bookings).forEach((bookingId) => {
      const booking = cached.bookings[bookingId];
      const slot = mergedSlots.find((s) => s.id === booking.slotId);
      if (slot && slot.status === "occupied") {
        cleanedBookings[bookingId] = booking;
      }
    });
  }

  let activeBookingId = cached.activeBookingId;
  if (activeBookingId && !cleanedBookings[activeBookingId]) {
    activeBookingId = null;
  }

  return {
    ...initialParkingState,
    ...cached,
    slots: mergedSlots,
    bookings: cleanedBookings,
    activeBookingId,
    filters: cached.filters || {},
  };
};

export const ParkingProvider: React.FC<ParkingProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    parkingReducer,
    initialParkingState,
    initializer,
  );

  useEffect(() => {
    saveState(state);
  }, [state]);

  const selectSlot = useCallback((slotId: string | null) => {
    dispatch({ type: "SELECT_SLOT", payload: { slotId } });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: "CLEAR_SELECTION" });
  }, []);

  const reserveSlot = useCallback(
    (bookingData: Omit<Booking, "id" | "startTime">): string => {
      const id = `BK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const startTime = new Date().toISOString();
      const booking: Booking = {
        ...bookingData,
        id,
        startTime,
      };
      dispatch({ type: "RESERVE_SLOT", payload: { booking } });
      return id;
    },
    [],
  );

  const endParkingSession = useCallback((bookingId: string) => {
    dispatch({ type: "END_SESSION", payload: { bookingId } });
  }, []);

  const updateFilter = useCallback((filters: ParkingFilters) => {
    dispatch({ type: "UPDATE_FILTER", payload: { filters } });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  const filteredSlots = useMemo(() => {
    return filterSlots(state.slots, state.filters);
  }, [state.slots, state.filters]);

  const contextValue = useMemo(
    () => ({
      state,
      filteredSlots,
      selectSlot,
      clearSelection,
      reserveSlot,
      endParkingSession,
      updateFilter,
      resetFilters,
    }),
    [
      state,
      filteredSlots,
      selectSlot,
      clearSelection,
      reserveSlot,
      endParkingSession,
      updateFilter,
      resetFilters,
    ],
  );

  return (
    <ParkingContext.Provider value={contextValue}>
      {children}
    </ParkingContext.Provider>
  );
};
