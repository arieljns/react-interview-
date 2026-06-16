import { useNavigate } from "react-router-dom";
import { useParking } from "../../contexts/parking/useParking";
import { Card } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";

export default function ActiveBooking() {
  const navigate = useNavigate();
  const { state } = useParking();

  const activeBookingId = state.activeBookingId;
  const booking = activeBookingId ? state.bookings[activeBookingId] : null;

  const getFormattedTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 text-slate-800 dark:text-slate-100">
      {booking ? (
        <Card className="flex flex-col gap-6">
          <header className="border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Sesi Parkir Aktif</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Sedang memantau sesi langsung ID:{" "}
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  {booking.id}
                </span>
              </p>
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-850 flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Pengemudi
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {booking.driverName}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-850 flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Slot Dialokasikan
              </span>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">
                {booking.slotId}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-850 flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Nomor Plat
              </span>
              <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200 mt-0.5">
                {booking.vehicleNumber}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-850 flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Waktu Mulai
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {getFormattedTime(booking.startTime)}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <Button
              variant="secondary"
              onClick={() => navigate("/dashboard")}
            >
              Kembali ke Dashboard
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate(`/bookings/${booking.id}`)}
            >
              Pantau Sesi Langsung & Checkout
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="max-w-xl mx-auto p-8 text-center flex flex-col items-center gap-6 animate-fade-in">
          <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-855 flex items-center justify-center text-3xl">
            🚗
          </div>
          <div className="flex flex-col gap-1.5">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tidak Ada Reservasi Parkir Aktif</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Anda saat ini tidak memiliki sesi parkir aktif yang terkunci. Kembali ke peta dashboard untuk memilih slot kosong.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate("/dashboard")}
          >
            Cari Slot Parkir
          </Button>
        </Card>
      )}
    </div>
  );
}
