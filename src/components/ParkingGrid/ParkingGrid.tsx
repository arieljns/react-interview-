import React, { memo } from "react";
import { ParkingSlot } from "../ParkingSlot/ParkingSlot";
import type { ParkingGridProps } from "./ParkingGrid.types";

export const ParkingGrid: React.FC<ParkingGridProps> = memo(({
  slots,
  selectedSlotId,
  onSlotClick,
}) => {
  return (
    <div 
      className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full"
      role="grid"
      aria-label="Parking slots grid"
    >
      {slots.map((slot) => {
        const computedStatus = slot.id === selectedSlotId ? "selected" : slot.status;

        return (
          <div key={slot.id} role="gridcell" className="w-full">
            <ParkingSlot
              id={slot.id}
              status={computedStatus}
              disabled={slot.disabled}
              onClick={onSlotClick}
            />
          </div>
        );
      })}
    </div>
  );
});

ParkingGrid.displayName = "ParkingGrid";
