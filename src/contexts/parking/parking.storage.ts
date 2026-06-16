import type { ParkingState } from "./parking.types";

const CACHE_KEY = "parkops:state:v1";

export const loadState = (): ParkingState | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ParkingState;
  } catch (err) {
    console.error("Failed to parse parking state from localStorage", err);
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
};

export const saveState = (state: ParkingState): void => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to write parking state to localStorage", err);
  }
};

export const clearState = (): void => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (err) {
    console.error("Failed to remove parking state from localStorage", err);
  }
};
