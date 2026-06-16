export interface ParkingSlotMapData {
  
  id: string;
  
  status: "available" | "occupied";
  
  x: number;
  
  y: number;
  
  width?: number;
  
  height?: number;
  
  disabled?: boolean;
}

export interface ParkingMapProps {
  slots: ParkingSlotMapData[];
  selectedSlotId?: string;
  onSlotSelect?: (slotId: string) => void;
  width?: number;
  height?: number;
  theme?: "light" | "dark";
}
