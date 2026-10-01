import { createContext, useContext } from "react";

export const FlightBookingContext = createContext(null);

export function useFlightBooking() {
  const context = useContext(FlightBookingContext);
  if (!context) {
    throw new Error("useFlightBooking must be used within a FlightBookingProvider");
  }
  return context;
}
