import { z } from "zod";

export const bookingFormSchema = z.object({
  driverName: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  vehicleNumber: z
    .string()
    .trim()
    .min(3, { message: "Vehicle number must be at least 3 characters" })
    .max(15, { message: "Vehicle number must not exceed 15 characters" })
    .regex(/^[A-Z0-9\-\s]+$/i, {
      message:
        "Vehicle number can only contain letters, numbers, hyphens, and spaces",
    }),
  duration: z
    .number()
    .int({ message: "Duration must be a whole number of hours" })
    .min(1, { message: "Minimum duration is 1 hour" })
    .max(24, { message: "Maximum duration is 24 hours" }),
});

export type BookingFormSchemaType = z.infer<typeof bookingFormSchema>;
