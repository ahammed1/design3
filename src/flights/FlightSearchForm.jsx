import { useState } from "react";
import { ArrowLeftRight, CalendarDays, MapPin, PlaneTakeoff, Search, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { airports } from "./flightData.js";
import { useFlightBooking } from "./flightBookingStore.js";

function FlightSearchForm() {
  const navigate = useNavigate();
  const { search, updateSearch } = useFlightBooking();
  const [tripType, setTripType] = useState(search.tripType === "one-way" ? "one-way" : "round-trip");
  const [origin, setOrigin] = useState(search.origin);
  const [destination, setDestination] = useState(search.destination);
  const [departureDate, setDepartureDate] = useState(search.departureDate);
  const [returnDate, setReturnDate] = useState(search.returnDate);
  const [travellers, setTravellers] = useState(String(search.travellers || 1));
  const [cabinClass, setCabinClass] = useState(search.cabinClass || "Economy");
  const [directOnly, setDirectOnly] = useState(search.directOnly);
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const earliestDate = today.toISOString().slice(0, 10);

  function submitSearch(event) {
    event.preventDefault();
    updateSearch({
      tripType,
      origin: origin.trim(),
      destination: destination.trim(),
      departureDate,
      returnDate: tripType === "round-trip" ? returnDate : "",
      travellers: Number(travellers),
      cabinClass,
      directOnly,
    });
    navigate("/flights/results");
  }

  return (
    <form className="flight-flow-search-form" onSubmit={submitSearch}>
      <div className="flight-flow-trip-toggle" role="group" aria-label="Trip type">
        {[
          ["round-trip", "Round trip"],
          ["one-way", "One way"],
        ].map(([value, label]) => (
          <button
            className={tripType === value ? "flight-flow-trip-active" : ""}
            key={value}
            type="button"
            aria-pressed={tripType === value}
            onClick={() => setTripType(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <datalist id="flight-flow-airports">
        {airports.map((airport) => (
          <option key={airport.code} value={`${airport.city} (${airport.code})`} />
        ))}
      </datalist>

      <div className="flight-flow-form-grid">
        <label className="flight-flow-field">
          <span>From</span>
          <span className="flight-flow-input-wrap"><MapPin size={17} aria-hidden="true" />
            <input list="flight-flow-airports" autoComplete="off" placeholder="City or airport" value={origin} onChange={(event) => setOrigin(event.target.value)} required />
          </span>
        </label>
        <button
          className="flight-flow-swap"
          type="button"
          aria-label="Swap departure and arrival"
          onClick={() => {
            setOrigin(destination);
            setDestination(origin);
          }}
        >
          <ArrowLeftRight size={17} aria-hidden="true" />
        </button>
        <label className="flight-flow-field">
          <span>To</span>
          <span className="flight-flow-input-wrap"><PlaneTakeoff size={17} aria-hidden="true" />
            <input list="flight-flow-airports" autoComplete="off" placeholder="City or airport" value={destination} onChange={(event) => setDestination(event.target.value)} required />
          </span>
        </label>
        <label className="flight-flow-field">
          <span>Departure</span>
          <span className="flight-flow-input-wrap"><CalendarDays size={17} aria-hidden="true" />
            <input aria-label="Departure date" type="date" min={earliestDate} value={departureDate} onChange={(event) => setDepartureDate(event.target.value)} required />
          </span>
        </label>
        {tripType === "round-trip" && (
          <label className="flight-flow-field">
            <span>Return</span>
            <span className="flight-flow-input-wrap"><CalendarDays size={17} aria-hidden="true" />
              <input aria-label="Return date" type="date" min={departureDate || earliestDate} value={returnDate} onChange={(event) => setReturnDate(event.target.value)} required />
            </span>
          </label>
        )}
        <label className="flight-flow-field">
          <span>Travellers</span>
          <span className="flight-flow-input-wrap"><Users size={17} aria-hidden="true" />
            <select value={travellers} onChange={(event) => setTravellers(event.target.value)}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((count) => <option key={count} value={count}>{count} {count === 1 ? "traveller" : "travellers"}</option>)}
            </select>
          </span>
        </label>
        <label className="flight-flow-field">
          <span>Cabin class</span>
          <span className="flight-flow-input-wrap">
            <select value={cabinClass} onChange={(event) => setCabinClass(event.target.value)}>
              <option>Economy</option><option>Premium Economy</option><option>Business</option><option>First</option>
            </select>
          </span>
        </label>
      </div>

      <div className="flight-flow-form-actions">
        <label className="flight-flow-check">
          <input type="checkbox" checked={directOnly} onChange={(event) => setDirectOnly(event.target.checked)} />
          <span>Direct flights only</span>
        </label>
        <button className="flight-flow-primary" type="submit"><Search size={17} /> Search flights</button>
      </div>
    </form>
  );
}

export default FlightSearchForm;
