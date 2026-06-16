

export interface ParkingSlotData {
  
  id: string;
  
  status: "available" | "occupied";
  
  disabled?: boolean;
}

export interface ParkingGridProps {
  
  slots: ParkingSlotData[];
  
  selectedSlotId?: string;
  
  onSlotClick?: (slotId: string) => void;
}
