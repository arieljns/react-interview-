import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookingForm } from "../../components/BookingForm/BookingForm";
import type { BookingFormData } from "../../components/BookingForm/BookingForm.types";
import { useParking } from "../../contexts/parking/useParking";

export default function ReserveParking() {
  const navigate = useNavigate();
  const { state, reserveSlot } = useParking();
  const [loading, setLoading] = useState(false);

  const slotId = state.selectedSlotId || "B-02";

  const handleBookingSubmit = (data: BookingFormData) => {
    setLoading(true);
    setTimeout(() => {
      const newBookingId = reserveSlot({
        slotId,
        driverName: data.driverName,
        vehicleNumber: data.vehicleNumber,
        durationHours: data.duration,
      });
      setLoading(false);
      navigate(
        `/bookings/${newBookingId}/confirmation?name=${encodeURIComponent(
          data.driverName
        )}&vehicle=${encodeURIComponent(data.vehicleNumber)}&duration=${
          data.duration
        }`
      );
    }, 1000);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Pesan Kavling Parkir</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Lengkapi data di bawah ini untuk memulai reservasi slot.
        </p>
      </div>

      <BookingForm
        slotId={slotId}
        onSubmit={handleBookingSubmit}
        loading={loading}
      />
    </div>
  );
}
