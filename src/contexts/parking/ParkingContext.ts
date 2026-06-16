import { createContext } from "react";
import type { ParkingContextValue } from "./parking.types";

export const ParkingContext = createContext<ParkingContextValue | undefined>(undefined);
