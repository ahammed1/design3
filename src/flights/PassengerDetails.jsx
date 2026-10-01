import { useState } from "react";
import { ArrowLeft, ArrowRight, Plane } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFlightBooking } from "./flightBookingStore.js";
import { flightOptions, formatTripDate } from "./flightData.js";
import "./FlightPages.css";

function PassengerDetails() {
  const navigate = useNavigate();
  const { search, selectedFlightId, createBooking } = useFlightBooking();
  const flight = flightOptions.find((item) => item.id === selectedFlightId);
  const [passenger, setPassenger] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    passengerType: "Adult",
  });
  const [error, setError] = useState("");

  if (!flight) return <Navigate to="/flights/results" replace />;

  function updatePassenger(field, value) {
    setPassenger((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function submitPassenger(event) {
    event.preventDefault();
    if (!passenger.firstName.trim() || !passenger.lastName.trim() || !passenger.email.trim() || !passenger.phone.trim()) {
      setError("Complete each passenger field to continue.");
      return;
    }
    const booking = createBooking({ flight, passenger });
    navigate(`/flights/confirmation/${booking.id}`);
  }

  return (
    <main className="flight-flow-page">
      <header className="flight-flow-header"><Link className="flight-flow-brand" to="/"><span><Plane size={19} /></span>xxxxxx</Link><Link className="flight-flow-back" to={`/flights/details/${flight.id}`}><ArrowLeft size={15} /> Back to flight</Link></header>
      <nav className="flight-flow-steps" aria-label="Booking progress"><span className="flight-flow-step flight-flow-step-complete">✓ <b>Flights</b></span><i /><span className="flight-flow-step flight-flow-step-active">2 <b>Passenger</b></span><i /><span className="flight-flow-step">3 <b>Confirmation</b></span></nav>
      <section className="flight-flow-page-title"><p className="flight-flow-eyebrow">PASSENGER INFORMATION</p><h1>Who’s travelling?</h1><p>Enter the lead passenger’s details exactly as shown on their travel ID.</p></section>
      <div className="passenger-page-grid">
        <form className="flight-flow-panel passenger-form" onSubmit={submitPassenger}>
          <h2>Lead passenger</h2>
          <div className="passenger-fields-grid">
            <label>First name<input autoComplete="given-name" value={passenger.firstName} onChange={(event) => updatePassenger("firstName", event.target.value)} required /></label>
            <label>Last name<input autoComplete="family-name" value={passenger.lastName} onChange={(event) => updatePassenger("lastName", event.target.value)} required /></label>
            <label>Email address<input type="email" autoComplete="email" value={passenger.email} onChange={(event) => updatePassenger("email", event.target.value)} required /></label>
            <label>Phone number<input type="tel" autoComplete="tel" value={passenger.phone} onChange={(event) => updatePassenger("phone", event.target.value)} required /></label>
            <label>Passenger type<select value={passenger.passengerType} onChange={(event) => updatePassenger("passengerType", event.target.value)}><option>Adult</option><option>Child</option><option>Infant</option></select></label>
          </div>
          <p className="passenger-demo-note">For this demo, one lead passenger is collected for the full traveller count.</p>
          {error && <p className="flight-form-error" role="alert">{error}</p>}
          <button className="flight-flow-primary" type="submit">Continue <ArrowRight size={16} /></button>
        </form>
        <aside className="flight-flow-panel flight-fare-card">
          <p className="flight-flow-eyebrow">YOUR FLIGHT</p><h2>{flight.origin} <ArrowRight size={16} /> {flight.destination}</h2>
          <p className="passenger-flight-date">{formatTripDate(search.departureDate)}</p>
          <div className="flight-fare-line"><span>{flight.airline}</span><strong>{flight.fare}</strong></div>
          <div className="flight-fare-line"><span>{search.travellers} travellers</span><strong>${(flight.price * Number(search.travellers)).toLocaleString("en-US")}</strong></div>
          <div className="flight-fare-line flight-fare-total"><span>Total</span><strong>${(flight.price * Number(search.travellers)).toLocaleString("en-US")}</strong></div>
        </aside>
      </div>
    </main>
  );
}

export default PassengerDetails;
