import { useSearchParams, useNavigate } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import { ReceiptCard } from "../../components/ReceiptCard/ReceiptCard";
import { Button } from "../../components/Button/Button";

export default function Offboarding() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const slotId = searchParams.get("slotId") || "N/A";
  const duration = searchParams.get("duration") || "2";
  const base = parseInt(searchParams.get("base") || "9000", 10);
  const extension = parseInt(searchParams.get("extension") || "0", 10);
  const penalty = parseInt(searchParams.get("penalty") || "0", 10);
  const total = parseInt(searchParams.get("total") || "9000", 10);

  const receiptRows = [
    { label: "SLOT DIKOSONGKAN", value: slotId, valueClassName: "text-indigo-600 dark:text-indigo-400 font-bold" },
    { label: "TOTAL DURASI", value: `${duration} Jam` },
    { label: "TARIF DASAR", value: `Rp ${base.toLocaleString("id-ID")}` },
    { label: "PERPANJANGAN", value: `Rp ${extension.toLocaleString("id-ID")}` },
    { label: "DENDA", value: `Rp ${penalty.toLocaleString("id-ID")}`, valueClassName: "text-rose-500 dark:text-rose-400", borderBottom: false },
  ];

  const totalRow = {
    label: "TOTAL TAGIHAN",
    value: `Rp ${total.toLocaleString("id-ID")}`,
    valueClassName: "text-emerald-600 dark:text-emerald-400 font-bold",
  };

  return (
    <Card className="max-w-md text-center flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col items-center gap-2">
        <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 text-2xl font-bold">
          ✓
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-2">Sesi Selesai</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Terima kasih telah parkir bersama kami! Slot Anda kini telah dikosongkan.
        </p>
      </div>

      <ReceiptCard rows={receiptRows} totalRow={totalRow} />

      <Button
        variant="primary"
        onClick={() => navigate("/dashboard")}
        className="w-full"
      >
        Kembali ke Dashboard
      </Button>
    </Card>
  );
}
