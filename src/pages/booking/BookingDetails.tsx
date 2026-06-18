import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useParking } from "../../contexts/parking/useParking";
import { useBookingSession } from "./hooks/useBookingSession";
import { Card } from "../../components/Card/Card";
import { ReceiptCard } from "../../components/ReceiptCard/ReceiptCard";
import { Button } from "../../components/Button/Button";
import { ConfirmationDialog } from "../../components/ConfirmationDialog/ConfirmationDialog";

export default function BookingDetails() {
  const { id = "A5" } = useParams();
  const navigate = useNavigate();
  const { state, endParkingSession } = useParking();

  const booking = state.bookings[id];

  const [extendedHours, setExtendedHours] = useState(0);
  const [simulationMode, setSimulationMode] = useState<
    "none" | "active" | "overtime"
  >("none");
  const [showCheckoutConfirm, setShowCheckoutConfirm] = useState(false);

  const { isOvertime, formattedTime, percentageElapsed } = useBookingSession({
    booking,
    extendedHours,
    simulationMode,
  });

  const handleExtendSession = () => {
    setExtendedHours((prev) => prev + 1);
    setSimulationMode("none");
  };

  const handleEndSession = () => {
    setShowCheckoutConfirm(true);
  };

  const handleConfirmEndSession = () => {
    setShowCheckoutConfirm(false);
    const durationHours = booking ? booking.durationHours : 2;
    const baseAmount = durationHours * 4500;
    const extensionAmount = extendedHours * 4500;
    const penaltyAmount = isOvertime ? 12500 : 0;
    const total = baseAmount + extensionAmount + penaltyAmount;
    const displaySlot = booking ? booking.slotId : id;

    endParkingSession(id);
    navigate(
      `/offboarding?slotId=${displaySlot}&duration=${
        durationHours + extendedHours
      }&base=${baseAmount}&extension=${extensionAmount}&penalty=${penaltyAmount}&total=${total}`,
    );
  };

  const handleCancelEndSession = () => {
    setShowCheckoutConfirm(false);
  };

  const baseRate = 4500;
  const durationHours = booking ? booking.durationHours : 2;
  const durationText = `${durationHours + extendedHours}j 00m`;
  const estimatedTotal =
    (durationHours + extendedHours) * baseRate + (isOvertime ? 12500 : 0);

  const getStartTimeText = () => {
    if (!booking) return "10:30 AM";
    const date = new Date(booking.startTime);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const driverName = booking ? booking.driverName : "Alex Johnson";
  const vehiclePlate = booking ? booking.vehicleNumber : "KLX-9082";
  const slotName = booking ? booking.slotId : id;
  const profileInitials = driverName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const receiptRows = [
    { label: "WAKTU MULAI", value: getStartTimeText() },
    { label: "DURASI", value: durationText },
    { label: "TARIF DASAR", value: "Rp 4.500 / jam" },
    ...(isOvertime
      ? [
          {
            label: "DENDA OVERTIME",
            value: "Rp 12.500",
            valueClassName: "text-rose-500 dark:text-rose-400",
          },
        ]
      : []),
  ];

  const totalRow = {
    label: "ESTIMASI TOTAL",
    value: `Rp ${estimatedTotal.toLocaleString("id-ID")}`,
    valueClassName: "text-indigo-600 dark:text-indigo-400 font-bold",
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 text-slate-800 dark:text-slate-100">
      <style>{`
        @keyframes pulse-red {
          0%, 100% { background-color: rgba(244, 63, 94, 0.05); border-color: rgba(244, 63, 94, 0.2); }
          50% { background-color: rgba(244, 63, 94, 0.15); border-color: rgba(244, 63, 94, 0.4); }
        }
        .overtime-pulse {
          animation: pulse-red 2.5s infinite;
        }
      `}</style>

      {}
      <Card className="p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Panel Simulasi Konsol
          </span>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Aktifkan status langsung untuk memeriksa status layar
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant={simulationMode === "active" ? "primary" : "secondary"}
            onClick={() => setSimulationMode("active")}
            size="sm"
          >
            Simulasikan Sesi Aktif
          </Button>
          <Button
            variant={simulationMode === "overtime" ? "danger" : "secondary"}
            onClick={() => setSimulationMode("overtime")}
            size="sm"
          >
            Simulasikan Peringatan Overtime
          </Button>
        </div>
      </Card>

      {isOvertime && (
        <div className="w-full p-5 rounded-2xl border border-rose-500/40 overtime-pulse flex flex-col md:flex-row items-center gap-4 justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-500 dark:text-rose-400 text-2xl font-bold">
              ⚠
            </div>
            <div>
              <h2 className="text-lg font-bold text-rose-800 dark:text-rose-300">
                Overtime Terdeteksi
              </h2>
              <p className="text-xs text-rose-600 dark:text-rose-400/80 mt-0.5">
                Sesi telah melebihi durasi yang dipesan. Silakan perpanjang atau
                lakukan check-out untuk menghindari biaya denda.
              </p>
            </div>
          </div>
          <div className="font-mono text-2xl font-bold text-rose-500 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 rounded-xl px-4 py-2">
            +{formattedTime}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          <Card className="relative overflow-hidden p-6">
            <div
              className={`absolute top-0 left-0 w-1.5 h-full ${
                isOvertime ? "bg-rose-500" : "bg-indigo-500"
              }`}
            />
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {isOvertime ? "Overtime" : "Sisa Waktu"}
              </span>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-5xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">
                  {formattedTime}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {isOvertime
                    ? `Terlambat di Slot ${slotName}`
                    : `Tersisa dari sesi ${durationText}`}
                </span>
              </div>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-950 mt-6 overflow-hidden">
              <div
                style={{
                  width: `${percentageElapsed}%`,
                }}
                className={`h-full rounded-full transition-all duration-1000 ${
                  isOvertime
                    ? "bg-rose-505"
                    : "bg-gradient-to-r from-indigo-500 to-violet-500"
                }`}
              />
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <Card className="p-5 flex flex-col gap-1" hoverable>
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Pengemudi
              </span>
              <span className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {driverName}
              </span>
            </Card>

            <Card
              className="p-5 flex flex-row items-center justify-between"
              hoverable
            >
              <div>
                <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                  Slot
                </span>
                <span className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 block mt-1">
                  {slotName}
                </span>
              </div>
              <span className="h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
            </Card>

            <Card className="p-5 flex flex-col gap-1" hoverable>
              <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Kendaraan
              </span>
              <span className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                {vehiclePlate}
              </span>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button
              variant="primary"
              onClick={handleExtendSession}
              className="flex-1"
            >
              Perpanjang Sesi (+1j)
            </Button>
            <Button
              variant="danger"
              onClick={handleEndSession}
              className="flex-1"
            >
              Akhiri Sesi Parkir
            </Button>
          </div>

          <Card className="p-6">
            <h3 className="text-md font-bold text-slate-900 dark:text-white mb-6">
              Log Riwayat Sesi
            </h3>
            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 pl-6 flex flex-col gap-6 text-left">
              {isOvertime && (
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-rose-500 border-4 border-white dark:border-slate-950" />
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-sm font-semibold text-rose-600 dark:text-rose-300">
                        Denda Lembur Diterapkan
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Biaya keterlambatan Level 1 dicatat ke sesi
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      11:30 AM
                    </span>
                  </div>
                </div>
              )}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-indigo-500 border-4 border-white dark:border-slate-950" />
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-white">
                      Pemeriksaan Sistem Selesai
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Nomor plat {vehiclePlate} ditangkap dan diverifikasi
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                    10:31 AM
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-slate-400 dark:bg-slate-700 border-4 border-white dark:border-slate-950" />
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-white">
                      Kendaraan Masuk
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Masuk terdaftar di Pintu Utama #4
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                    10:30 AM
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          <Card className="flex flex-col gap-6 p-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-indigo-50 dark:bg-indigo-600/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center font-bold text-lg text-indigo-600 dark:text-indigo-400 shadow-inner">
                {profileInitials}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  {driverName}
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide mt-1 inline-block">
                  Anggota Premium
                </span>
              </div>
            </div>

            <ReceiptCard
              rows={receiptRows}
              totalRow={totalRow}
              className="border-none p-0 bg-transparent dark:bg-transparent text-xs gap-3 border-t border-slate-200 dark:border-slate-800 pt-4"
            />
          </Card>

          <Card className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Sektor Utara, Lantai 2, Zona A
            </p>
          </Card>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showCheckoutConfirm}
        title="Akhiri Sesi Parkir"
        description="Apakah Anda yakin ingin mengakhiri sesi parkir ini? Tindakan ini akan mengosongkan slot dan memproses checkout tagihan pembayaran."
        confirmLabel="Ya, Selesaikan"
        cancelLabel="Batal"
        variant="danger"
        onConfirm={handleConfirmEndSession}
        onCancel={handleCancelEndSession}
      />
    </div>
  );
}
