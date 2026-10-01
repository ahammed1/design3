import { useState } from "react";
import { FlightBookingContext } from "./flightBookingStore.js";

export function FlightBookingProvider({ children }) {
  const [search, setSearch] = useState({
    tripType: "round-trip",
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    travellers: 1,
    cabinClass: "Economy",
    directOnly: false,
  });
  const [selectedFlightId, setSelectedFlightId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [createdBooking, setCreatedBooking] = useState(null);

  function updateSearch(values) {
    setSearch((current) => ({ ...current, ...values }));
    setSelectedFlightId("");
    setCreatedBooking(null);
  }

  function createBooking({ flight, passenger }) {
    const bookingId = `LF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const initials = `${passenger.firstName[0] ?? ""}${passenger.lastName[0] ?? ""}`.toUpperCase();
    const record = {
      id: bookingId,
      guestId: `G-${bookingId.slice(-6)}`,
      guest: `${passenger.firstName} ${passenger.lastName}`.trim(),
      email: passenger.email,
      phone: passenger.phone,
      initials: initials || "GU",
      color: "lilac",
      route: `${flight.origin.split(" (")[0]} → ${flight.destination.split(" (")[0]}`,
      origin: flight.origin,
      destination: flight.destination,
      date: search.departureDate,
      returnDate: search.tripType === "round-trip" ? search.returnDate : "",
      guests: Number(search.travellers),
      amount: flight.price * Number(search.travellers),
      status: "Pending",
      paymentStatus: "Awaiting payment",
      paymentMethod: "Demo booking",
      createdAt: new Date().toISOString().slice(0, 10),
      flightNumber: flight.id,
      passengerType: passenger.passengerType,
      cabinClass: search.cabinClass,
      flight,
      passenger,
    };
    setBookings((current) => [record, ...current]);
    setCreatedBooking(record);
    return record;
  }

  const value = {
    search,
    updateSearch,
    selectedFlightId,
    setSelectedFlightId,
    bookings,
    setBookings,
    createdBooking,
    createBooking,
  };

  return <FlightBookingContext.Provider value={value}>{children}</FlightBookingContext.Provider>;
}
