import type { ParkingState, ParkingAction } from "./parking.types";

export const initialParkingState: ParkingState = {
  slots: [
    { id: "A-01", status: "available", vehicleSize: "small", x: 30, y: 30 },
    { id: "A-02", status: "occupied", vehicleSize: "medium", x: 180, y: 30 },
    { id: "A-03", status: "available", vehicleSize: "large", x: 330, y: 30 },
    { id: "A-04", status: "occupied", vehicleSize: "medium", x: 480, y: 30 },
    { id: "B-01", status: "available", vehicleSize: "small", x: 30, y: 170 },
    { id: "B-02", status: "available", vehicleSize: "large", x: 180, y: 170 },
    { id: "B-03", status: "occupied", vehicleSize: "medium", x: 330, y: 170 },
    { id: "B-04", status: "available", vehicleSize: "small", x: 480, y: 170 },
  ],
  bookings: {},
  activeBookingId: null,
  selectedSlotId: null,
  filters: {},
};

export const parkingReducer = (
  state: ParkingState,
  action: ParkingAction
): ParkingState => {
  switch (action.type) {
    case "INITIALIZE":
      return action.payload.state;

    case "SELECT_SLOT": {
      const target = state.slots.find((s) => s.id === action.payload.slotId);
      if (target?.disabled) {
        return state;
      }
      return {
        ...state,
        selectedSlotId: action.payload.slotId,
      };
    }

    case "CLEAR_SELECTION":
      return {
        ...state,
        selectedSlotId: null,
      };

    case "RESERVE_SLOT": {
      const { booking } = action.payload;
      const targetSlot = state.slots.find((s) => s.id === booking.slotId);
      if (!targetSlot || targetSlot.status !== "available" || targetSlot.disabled) {
        return state;
      }

      const updatedSlots = state.slots.map((slot) =>
        slot.id === booking.slotId ? { ...slot, status: "occupied" as const } : slot
      );

      return {
        ...state,
        slots: updatedSlots,
        bookings: {
          ...state.bookings,
          [booking.id]: booking,
        },
        activeBookingId: booking.id,
        selectedSlotId: null,
      };
    }

    case "END_SESSION": {
      const { bookingId } = action.payload;
      const booking = state.bookings[bookingId];
      if (!booking) {
        return state;
      }

      const updatedSlots = state.slots.map((slot) =>
        slot.id === booking.slotId ? { ...slot, status: "available" as const } : slot
      );

      return {
        ...state,
        slots: updatedSlots,
        activeBookingId: null,
      };
    }

    case "UPDATE_FILTER":
      return {
        ...state,
        filters: {
          ...(state.filters || {}),
          ...action.payload.filters,
        },
      };

    case "RESET_FILTERS":
      return {
        ...state,
        filters: {},
      };

    default:
      return state;
  }
};
