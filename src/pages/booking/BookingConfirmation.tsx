import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { useParking } from "../../contexts/parking/useParking";
import { Card } from "../../components/Card/Card";
import { ReceiptCard } from "../../components/ReceiptCard/ReceiptCard";
import { Button } from "../../components/Button/Button";

export default function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { state } = useParking();

  const booking = state.bookings[id];

  const slotId = booking ? booking.slotId : id;
  const name = booking ? booking.driverName : (searchParams.get("name") || "Operator");
  const vehicle = booking ? booking.vehicleNumber : (searchParams.get("vehicle") || "V-123-PLATE");
  const duration = booking ? booking.durationHours.toString() : (searchParams.get("duration") || "2");

  const receiptRows = [
    { label: "SLOT DIALOKASIKAN", value: slotId, valueClassName: "text-indigo-600 dark:text-indigo-400 font-bold" },
    { label: "PENGEMUDI", value: name },
    { label: "KENDARAAN", value: vehicle },
    { label: "DURASI", value: `${duration} Jam`, borderBottom: false },
  ];

  return (
    <Card className="max-w-md text-center flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col items-center gap-2">
        <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 text-2xl font-bold">
          ✓
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-2">Reservasi Dikonfirmasi</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Slot parkir Anda telah berhasil dikunci.</p>
      </div>

      <ReceiptCard rows={receiptRows} />

      <div className="flex flex-col gap-2">
        <Button
          variant="primary"
          onClick={() => navigate(`/bookings/${id}`)}
          className="w-full"
        >
          Pantau Sesi Langsung
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate("/dashboard")}
          className="w-full"
        >
          Kembali ke Dashboard
        </Button>
      </div>
    </Card>
  );
}
