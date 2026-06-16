export interface ParkingSlotProps {
  
  id: string;
  
  status: "available" | "occupied" | "selected";
  
  disabled?: boolean;
  
  onClick?: (id: string) => void;
}
