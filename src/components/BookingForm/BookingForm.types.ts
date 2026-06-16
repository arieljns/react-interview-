export interface BookingFormData {
  
  driverName: string;
  
  vehicleNumber: string;
  
  duration: number;
}

export interface BookingFormProps {
  
  slotId: string;
  
  onSubmit: (data: BookingFormData) => void;
  
  loading?: boolean;
}
