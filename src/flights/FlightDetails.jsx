import { ArrowLeft, ArrowRight, BriefcaseBusiness, Check, Clock3, Plane } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFlightBooking } from "./flightBookingStore.js";
import { flightOptions, formatDuration, formatTripDate } from "./flightData.js";
import "./FlightPages.css";

function FlightDetails() {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const { search, selectedFlightId, setSelectedFlightId } = useFlightBooking();
  const flight = flightOptions.find((item) => item.id === flightId);

  if (!flight) {
    return <main className="flight-flow-page"><div className="flight-empty-state"><h1>Flight not found</h1><Link className="flight-flow-secondary" to="/flights/results">Back to results</Link></div></main>;
  }

  const segments = [
    {
      label: "OUTBOUND",
      date: search.departureDate,
      origin: flight.origin,
      destination: flight.destination,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      durationMinutes: flight.durationMinutes,
      stops: flight.stops,
      stopCity: flight.stopCity,
    },
    ...(search.tripType === "round-trip" ? [{
      label: "RETURN",
      date: search.returnDate,
      origin: flight.destination,
      destination: flight.origin,
      departureTime: flight.returnDepartureTime,
      arrivalTime: flight.returnArrivalTime,
      durationMinutes: flight.returnDurationMinutes,
      stops: flight.returnStops,
      stopCity: flight.returnStopCity,
    }] : []),
  ];

  function continueBooking() {
    setSelectedFlightId(flight.id);
    navigate("/flights/passengers");
  }

  return (
    <main className="flight-flow-page">
      <header className="flight-flow-header"><Link className="flight-flow-brand" to="/"><span><Plane size={19} /></span>xxxxxx</Link><Link className="flight-flow-back" to="/flights/results"><ArrowLeft size={15} /> Back to results</Link></header>
      <nav className="flight-flow-steps" aria-label="Booking progress"><span className="flight-flow-step flight-flow-step-active">1 <b>Flights</b></span><i /><span className="flight-flow-step">2 <b>Passenger</b></span><i /><span className="flight-flow-step">3 <b>Confirmation</b></span></nav>
      <section className="flight-flow-page-title"><p className="flight-flow-eyebrow">FLIGHT DETAILS</p><h1>Your trip, at a glance.</h1><p>{search.origin} to {search.destination} · {formatTripDate(search.departureDate)}</p></section>

      <div className="flight-detail-layout">
        <div className="flight-detail-main">
          <section className="flight-flow-panel">
            <div className="flight-detail-airline"><span className="flight-airline-mark">{flight.airlineCode}</span><div><strong>{flight.airline}</strong><span>{flight.aircraft} · {flight.fare}</span></div><span className="flight-detail-duration"><Clock3 size={15} /> {formatDuration(flight.durationMinutes)}</span></div>
            {segments.map((segment) => (
              <div className="flight-itinerary" key={segment.label}>
                <div className="flight-itinerary-point"><span className="flight-itinerary-dot" /><div><small>{segment.label} · {formatTripDate(segment.date)}</small><strong>{segment.departureTime} <span>{segment.origin}</span></strong><p>{flight.airline} · {flight.aircraft}</p></div></div>
                <div className="flight-itinerary-middle"><span />{segment.stops === 0 ? `Nonstop · ${formatDuration(segment.durationMinutes)}` : `${segment.stops} stop in ${segment.stopCity} · ${formatDuration(segment.durationMinutes)}`}<span /></div>
                <div className="flight-itinerary-point"><span className="flight-itinerary-dot flight-itinerary-dot-end" /><div><small>ARRIVAL</small><strong>{segment.arrivalTime} <span>{segment.destination}</span></strong><p>Local arrival time</p></div></div>
              </div>
            ))}
          </section>

          <section className="flight-flow-panel">
            <h2>Included with this fare</h2>
            <div className="flight-detail-inclusions">
              <div><BriefcaseBusiness size={18} /><span><strong>Baggage</strong><small>{flight.baggage}</small></span></div>
              {flight.amenities.map((amenity) => <div key={amenity}><Check size={18} /><span><strong>{amenity}</strong><small>Included in the selected fare</small></span></div>)}
            </div>
          </section>
        </div>

        <aside className="flight-flow-panel flight-fare-card">
          <p className="flight-flow-eyebrow">FARE SUMMARY</p><h2>{flight.fare}</h2>
          <div className="flight-fare-line"><span>{search.travellers} {search.travellers === 1 ? "traveller" : "travellers"}</span><strong>${flight.price.toLocaleString("en-US")} each</strong></div>
          <div className="flight-fare-line"><span>Flight total</span><strong>${(flight.price * Number(search.travellers)).toLocaleString("en-US")}</strong></div>
          <p className="flight-fare-note">Taxes and carrier fees are included in this demo price.</p>
          <button className="flight-flow-primary flight-flow-wide" type="button" onClick={continueBooking}>{selectedFlightId === flight.id ? "Continue with this flight" : "Select this flight"} <ArrowRight size={16} /></button>
        </aside>
      </div>
    </main>
  );
}

export default FlightDetails;
