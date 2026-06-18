import { useState, useMemo, useCallback } from "react";
import { StatCard } from "../../components/StatCard/StatCard";
import { ParkingGrid } from "../../components/ParkingGrid/ParkingGrid";
import { ParkingMap } from "../../components/ParkingMap/ParkingMap";
import type { ParkingSlotData } from "../../components/ParkingGrid/ParkingGrid.types";
import type { ParkingSlotMapData } from "../../components/ParkingMap/ParkingMap.types";
import { useNavigate } from "react-router-dom";
import { useParking } from "../../contexts/parking/useParking";
import { useTheme } from "../../contexts/theme/useTheme";
import type { Booking } from "../../contexts/parking/parking.types";
import { Card } from "../../components/Card/Card";
import { ReceiptCard } from "../../components/ReceiptCard/ReceiptCard";
import { Button } from "../../components/Button/Button";
import { ConfirmationDialog } from "../../components/ConfirmationDialog/ConfirmationDialog";
import { useBookingSession } from "../../pages/booking/hooks/useBookingSession";

export default function Dashboard() {
  const { state, filteredSlots, selectSlot, updateFilter } = useParking();
  const activeBooking = state.activeBookingId ? state.bookings[state.activeBookingId] : undefined;
  const { formattedTime } = useBookingSession({
    booking: activeBooking,
    extendedHours: 0,
    simulationMode: "none",
  });
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [occupiedModalData, setOccupiedModalData] = useState<{
    slotId: string;
    booking?: Booking;
  } | null>(null);
  const [slotToConfirm, setSlotToConfirm] = useState<string | null>(null);

  const totalSlots = state.slots.length;
  const occupiedSlots = state.slots.filter(
    (s) => s.status === "occupied",
  ).length;
  const availableSlots = state.slots.filter(
    (s) => s.status === "available",
  ).length;
  const activeBookingsCount = Object.values(state.bookings).filter((b) => {
    const slot = state.slots.find((s) => s.id === b.slotId);
    return slot?.status === "occupied";
  }).length;

  const stats = useMemo(
    () => [
      { title: "Total Slot", value: totalSlots, trend: 0 },
      {
        title: "Slot Terisi",
        value: occupiedSlots,
        trend: 0,
        color: "danger" as const,
      },
      {
        title: "Slot Kosong",
        value: availableSlots,
        trend: 0,
        color: "success" as const,
      },
      { title: "Reservasi Aktif", value: activeBookingsCount, trend: 0 },
    ],
    [totalSlots, occupiedSlots, availableSlots, activeBookingsCount],
  );

  const gridSlots: ParkingSlotData[] = useMemo(
    () =>
      filteredSlots.map((s) => ({
        id: s.id,
        status: s.status === "occupied" ? "occupied" : "available",
        disabled: s.disabled || s.status === "maintenance",
      })),
    [filteredSlots],
  );

  const mapSlots: ParkingSlotMapData[] = useMemo(
    () =>
      filteredSlots.map((s) => ({
        id: s.id,
        status: s.status === "occupied" ? "occupied" : "available",
        x: s.x,
        y: s.y,
        width: s.width,
        height: s.height,
        disabled: s.disabled || s.status === "maintenance",
      })),
    [filteredSlots],
  );

  const handleSlotSelect = useCallback(
    (slotId: string) => {
      const selectedSlot = state.slots.find((s) => s.id === slotId);
      if (selectedSlot?.status === "occupied") {
        const booking = Object.values(state.bookings).find(
          (b) => b.slotId === slotId,
        );
        setOccupiedModalData({
          slotId,
          booking,
        });
      } else if (
        selectedSlot &&
        selectedSlot.status === "available" &&
        !selectedSlot.disabled
      ) {
        setSlotToConfirm(slotId);
      }
    },
    [state.slots, state.bookings],
  );

  const handleConfirmSlotSelection = useCallback(() => {
    if (slotToConfirm) {
      selectSlot(slotToConfirm);
      setSlotToConfirm(null);
      navigate("/reserve");
    }
  }, [slotToConfirm, selectSlot, navigate]);

  const handleCancelSlotSelection = useCallback(() => {
    setSlotToConfirm(null);
  }, []);

  const modalReceiptRows = useMemo(() => {
    if (!occupiedModalData?.booking) return [];
    return [
      { label: "PENGEMUDI", value: occupiedModalData.booking.driverName },
      { label: "KENDARAAN", value: occupiedModalData.booking.vehicleNumber },
      {
        label: "WAKTU MULAI",
        value: new Date(occupiedModalData.booking.startTime).toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
          },
        ),
      },
      {
        label: "DURASI PESANAN",
        value: `${occupiedModalData.booking.durationHours} Jam`,
        borderBottom: false,
      },
    ];
  }, [occupiedModalData]);

  return (
    <div className="flex flex-col gap-8 w-full text-slate-800 dark:text-slate-100">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            color={stat.color}
          />
        ))}
      </section>

      <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
            Filter Ukuran Kendaraan
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Saring tampilan kavling parkir berdasarkan dimensi mobil anda
          </p>
        </div>
        <select
          value={state.filters?.vehicleSize || ""}
          onChange={(e) => {
            const val = e.target.value;
            updateFilter({
              vehicleSize: val
                ? (val as "small" | "medium" | "large")
                : undefined,
            });
          }}
          className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-850 dark:text-slate-100 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer min-w-[160px]"
        >
          <option value="">Semua Ukuran</option>
          <option value="small">Kecil (Small)</option>
          <option value="medium">Sedang (Medium)</option>
          <option value="large">Besar (Large)</option>
        </select>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        <section className="lg:col-span-6 flex flex-col gap-3">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Tata Letak Peta Zona
          </h3>
          <ParkingMap
            slots={mapSlots}
            selectedSlotId={state.selectedSlotId || undefined}
            onSlotSelect={handleSlotSelect}
            width={440}
            height={320}
            theme={theme}
            elapsedTime={activeBooking ? formattedTime : undefined}
            activeSlotId={activeBooking?.slotId}
          />
        </section>

        <section className="lg:col-span-6 flex flex-col gap-3">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Daftar Slot Parkir
          </h3>
          <ParkingGrid
            slots={gridSlots}
            selectedSlotId={state.selectedSlotId || undefined}
            onSlotClick={handleSlotSelect}
          />
        </section>
      </div>

      {occupiedModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <Card className="max-w-md shadow-2xl flex flex-col gap-5 text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Slot Terisi
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Referensi Slot:{" "}
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                    {occupiedModalData.slotId}
                  </span>
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setOccupiedModalData(null)}
                className="h-8 w-8 p-0 rounded-lg text-lg flex items-center justify-center"
              >
                &times;
              </Button>
            </header>

            {occupiedModalData.booking ? (
              <div className="flex flex-col gap-4">
                <ReceiptCard
                  rows={modalReceiptRows}
                  className="bg-slate-50 dark:bg-slate-950/50 p-4 border border-slate-200 dark:border-slate-850 text-xs gap-2"
                />

                <div className="flex gap-3 mt-2">
                  <Button
                    variant="secondary"
                    onClick={() => setOccupiedModalData(null)}
                    className="flex-1"
                  >
                    Tutup
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      const bId = occupiedModalData.booking?.id;
                      setOccupiedModalData(null);
                      if (bId) navigate(`/bookings/${bId}`);
                    }}
                    className="flex-1"
                  >
                    Pantau Sesi Langsung
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Slot parkir ini saat ini ditandai sebagai terisi, tetapi tidak
                  ada sesi pembayaran aktif yang tercatat dalam log sistem.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => setOccupiedModalData(null)}
                  className="w-full"
                >
                  Tutup
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}

      <ConfirmationDialog
        isOpen={!!slotToConfirm}
        title="Konfirmasi Pilihan Slot"
        description={`Apakah Anda ingin memilih dan memesan slot parkir ${slotToConfirm}? Anda akan diarahkan ke halaman formulir reservasi.`}
        confirmLabel="Ya, Pesan Slot"
        cancelLabel="Batal"
        onConfirm={handleConfirmSlotSelection}
        onCancel={handleCancelSlotSelection}
      />
    </div>
  );
}
