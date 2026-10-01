import { ArrowRight, Check, Plane } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useFlightBooking } from "./flightBookingStore.js";
import { formatDuration, formatTripDate } from "./flightData.js";
import "./FlightPages.css";

function BookingConfirmation() {
  const { bookingId } = useParams();
  const { bookings } = useFlightBooking();
  const booking = bookings.find((item) => item.id === bookingId);
  if (!booking || !booking.flight || !booking.passenger) return <Navigate to="/" replace />;

  const { flight, passenger } = booking;
  return (
    <main className="flight-flow-page flight-confirmation-page">
      <header className="flight-flow-header"><Link className="flight-flow-brand" to="/"><span><Plane size={19} /></span>xxxxxx</Link><Link className="flight-flow-back" to="/">Return to home</Link></header>
      <nav className="flight-flow-steps" aria-label="Booking progress"><span className="flight-flow-step flight-flow-step-complete">✓ <b>Flights</b></span><i /><span className="flight-flow-step flight-flow-step-complete">✓ <b>Passenger</b></span><i /><span className="flight-flow-step flight-flow-step-active">3 <b>Confirmation</b></span></nav>
      <section className="confirmation-success">
        <span className="confirmation-check"><Check size={26} /></span>
        <p className="flight-flow-eyebrow">YOUR BOOKING IS READY</p>
        <h1>All set, {passenger.firstName}.</h1>
        <p>Your demo flight booking has been added to your travel management dashboard.</p>
      </section>
      <section className="flight-flow-panel confirmation-card">
        <div className="confirmation-card-heading"><div><p className="flight-flow-eyebrow">BOOKING REFERENCE</p><h2>{booking.id}</h2></div><span className="confirmation-status"><span />{booking.status}</span></div>
        <div className="confirmation-summary-route"><div><small>FROM</small><strong>{flight.origin}</strong><span>{formatTripDate(booking.date)} · {flight.departureTime}</span></div><ArrowRight size={20} /><div><small>TO</small><strong>{flight.destination}</strong><span>{flight.arrivalTime} · {formatDuration(flight.durationMinutes)}</span></div></div>
        <div className="confirmation-details-grid">
          <div><small>Passenger</small><strong>{passenger.firstName} {passenger.lastName}</strong></div>
          <div><small>Email</small><strong>{passenger.email}</strong></div>
          <div><small>Airline</small><strong>{flight.airline} · {flight.id}</strong></div>
          <div><small>Travellers / cabin</small><strong>{booking.guests} · {booking.cabinClass}</strong></div>
          <div><small>Booking status</small><strong>{booking.status} · demo reservation</strong></div>
          <div><small>Total price</small><strong>${booking.amount.toLocaleString("en-US")}</strong></div>
        </div>
        <div className="confirmation-actions">
          <Link className="flight-flow-primary" to={`/dashboard/bookings/${booking.id}`}>View booking in dashboard <ArrowRight size={16} /></Link>
          <Link className="flight-flow-secondary" to="/">Back to website</Link>
        </div>
      </section>
    </main>
  );
}

export default BookingConfirmation;
