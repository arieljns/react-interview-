import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center flex flex-col items-center gap-6 py-20 text-slate-800 dark:text-slate-100">
      <div className="h-16 w-16 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-3xl">
        🔍
      </div>
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">404 - Tidak Ditemukan</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Halaman konsol operasional yang Anda cari tidak ditemukan.
        </p>
      </div>
      <Link
        to="/dashboard"
        className="py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/15 transition-all duration-150 cursor-pointer"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
