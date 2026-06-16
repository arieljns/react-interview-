import type { ParkingSlot, ParkingFilters } from "./parking.types";

export const filterSlots = (
  slots: ParkingSlot[],
  filters?: ParkingFilters
): ParkingSlot[] => {
  if (!filters || !filters.vehicleSize) {
    return slots;
  }
  return slots.filter((slot) => slot.vehicleSize === filters.vehicleSize);
};
