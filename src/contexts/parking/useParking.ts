import { useContext } from "react";
import { ParkingContext } from "./ParkingContext";
import type { ParkingContextValue } from "./parking.types";

export const useParking = (): ParkingContextValue => {
  const context = useContext(ParkingContext);
  if (context === undefined) {
    throw new Error("useParking must be used within a ParkingProvider");
  }
  return context;
};
