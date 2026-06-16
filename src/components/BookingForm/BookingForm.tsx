import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bookingFormSchema,
  type BookingFormSchemaType,
} from "./bookingForm.schema";
import type { BookingFormProps } from "./BookingForm.types";
import { Card } from "../Card/Card";
import { Button } from "../Button/Button";

export const BookingForm: React.FC<BookingFormProps> = ({
  slotId,
  onSubmit,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormSchemaType>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      driverName: "",
      vehicleNumber: "",
      duration: 1,
    },
  });

  const handleFormSubmit = (data: BookingFormSchemaType) => {
    onSubmit(data);
  };

  return (
    <Card
      as="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-md flex flex-col gap-5 text-left"
      noValidate
    >
      <header className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pesan Slot Parkir</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Memesan Slot:{" "}
          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
            {slotId}
          </span>
        </p>
      </header>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="driverName"
          className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
        >
          Nama Lengkap
        </label>
        <input
          id="name"
          type="text"
          disabled={loading}
          placeholder="Contoh: John Doe"
          {...register("driverName")}
          className={`
            px-4 py-2.5 rounded-lg border bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm transition-all duration-150
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950
            ${
              errors.driverName
                ? "border-rose-500/80 focus-visible:ring-rose-500"
                : "border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500"
            }
          `}
        />
        {errors.driverName && (
          <span className="text-xs text-rose-500 dark:text-rose-400 font-medium" role="alert">
            {errors.driverName.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="vehicleNumber"
          className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
        >
          Nomor Plat Kendaraan
        </label>
        <input
          id="vehicleNumber"
          type="text"
          disabled={loading}
          placeholder="Contoh: B-1234-XYZ"
          {...register("vehicleNumber")}
          className={`
            px-4 py-2.5 rounded-lg border bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm font-mono tracking-wide transition-all duration-150
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950
            ${
              errors.vehicleNumber
                ? "border-rose-500/80 focus-visible:ring-rose-500"
                : "border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500"
            }
          `}
        />
        {errors.vehicleNumber && (
          <span className="text-xs text-rose-500 dark:text-rose-400 font-medium" role="alert">
            {errors.vehicleNumber.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="duration"
          className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
        >
          Durasi (Jam)
        </label>
        <input
          id="duration"
          type="number"
          min={1}
          max={24}
          disabled={loading}
          {...register("duration", { valueAsNumber: true })}
          className={`
            px-4 py-2.5 rounded-lg border bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 text-sm font-mono transition-all duration-150
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950
            ${
              errors.duration
                ? "border-rose-500/80 focus-visible:ring-rose-500"
                : "border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500"
            }
          `}
        />
        {errors.duration && (
          <span className="text-xs text-rose-500 dark:text-rose-400 font-medium" role="alert">
            {errors.duration.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full mt-2"
      >
        Konfirmasi Pemesanan
      </Button>
    </Card>
  );
};
