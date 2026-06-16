export type SlotStatus = "available" | "occupied" | "maintenance";
export type SessionStatus = "active" | "overtime" | "completed";

export interface ParkingSlot {
  id: string;
  status: SlotStatus;
  vehicleSize: "small" | "medium" | "large";
  disabled?: boolean;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface Booking {
  id: string;
  slotId: string;
  driverName: string;
  vehicleNumber: string;
  startTime: string;
  durationHours: number;
}

export interface ParkingFilters {
  vehicleSize?: "small" | "medium" | "large";
}

export interface ParkingState {
  slots: ParkingSlot[];
  bookings: Record<string, Booking>;
  activeBookingId: string | null;
  selectedSlotId: string | null;
  filters: ParkingFilters;
}

export type ParkingAction =
  | { type: "INITIALIZE"; payload: { state: ParkingState } }
  | { type: "SELECT_SLOT"; payload: { slotId: string | null } }
  | { type: "CLEAR_SELECTION" }
  | { type: "RESERVE_SLOT"; payload: { booking: Booking } }
  | { type: "END_SESSION"; payload: { bookingId: string } }
  | { type: "UPDATE_FILTER"; payload: { filters: ParkingFilters } }
  | { type: "RESET_FILTERS" };

export interface ParkingContextValue {
  state: ParkingState;
  filteredSlots: ParkingSlot[];
  selectSlot: (slotId: string | null) => void;
  clearSelection: () => void;
  reserveSlot: (bookingData: Omit<Booking, "id" | "startTime">) => string;
  endParkingSession: (bookingId: string) => void;
  updateFilter: (filters: ParkingFilters) => void;
  resetFilters: () => void;
}
