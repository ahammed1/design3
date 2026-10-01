import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Plane, SlidersHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFlightBooking } from "./flightBookingStore.js";
import { flightOptions, formatDuration, formatTripDate } from "./flightData.js";
import "./FlightPages.css";

function matchingAirport(searchValue, flightValue) {
  const query = searchValue.trim().toLowerCase();
  if (!query) return true;
  const airport = flightValue.toLowerCase();
  const city = airport.split(" (")[0];
  const code = airport.match(/\(([^)]+)\)/)?.[1]?.toLowerCase() ?? "";
  return city.includes(query) || query.includes(city) || code === query.replace(/[()]/g, "");
}

function FlightResults() {
  const navigate = useNavigate();
  const { search, setSelectedFlightId } = useFlightBooking();
  const [sort, setSort] = useState("best");
  const [stops, setStops] = useState("any");
  const [airlines, setAirlines] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1200);
  const [departAfter, setDepartAfter] = useState("00:00");
  const [arriveBefore, setArriveBefore] = useState("23:59");
  const [maxDuration, setMaxDuration] = useState(24);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const routeFlights = useMemo(() => {
    const byRoute = flightOptions.filter(
      (flight) =>
        matchingAirport(search.origin, flight.origin) &&
        matchingAirport(search.destination, flight.destination) &&
        (!search.directOnly || flight.stops === 0),
    );
    return byRoute.length ? byRoute : [];
  }, [search.destination, search.directOnly, search.origin]);
  const availableAirlines = [...new Set(routeFlights.map((flight) => flight.airline))];

  const filteredFlights = useMemo(() => {
    const flights = routeFlights.filter((flight) => {
      const departureMatches = flight.departureTime >= departAfter;
      const arrivalMatches = flight.arrivalTime <= arriveBefore;
      return (
        (stops === "any" || (stops === "direct" && flight.stops === 0) || (stops === "one-stop" && flight.stops <= 1)) &&
        (airlines.length === 0 || airlines.includes(flight.airline)) &&
        flight.price <= Number(maxPrice) &&
        departureMatches &&
        arrivalMatches &&
        flight.durationMinutes <= Number(maxDuration) * 60
      );
    });
    return flights.sort((left, right) => {
      if (sort === "cheapest") return left.price - right.price;
      if (sort === "fastest") return left.durationMinutes - right.durationMinutes;
      return left.bestScore - right.bestScore;
    });
  }, [airlines, departAfter, arriveBefore, maxDuration, maxPrice, routeFlights, sort, stops]);

  function selectFlight(flightId) {
    setSelectedFlightId(flightId);
    navigate(`/flights/details/${flightId}`);
  }

  function toggleAirline(airline) {
    setAirlines((current) =>
      current.includes(airline) ? current.filter((item) => item !== airline) : [...current, airline],
    );
  }

  return (
    <main className="flight-flow-page flight-results-page">
      <header className="flight-flow-header">
        <Link className="flight-flow-brand" to="/"><span><Plane size={19} /></span>xxxxxx</Link>
        <Link className="flight-flow-back" to="/flights/search"><ArrowLeft size={15} /> Edit search</Link>
      </header>
      <nav className="flight-flow-steps" aria-label="Booking progress">
        <span className="flight-flow-step flight-flow-step-active">1 <b>Flights</b></span><i />
        <span className="flight-flow-step">2 <b>Passenger</b></span><i />
        <span className="flight-flow-step">3 <b>Confirmation</b></span>
      </nav>

      <section className="flight-results-summary">
        <div>
          <p className="flight-flow-eyebrow">YOUR SEARCH</p>
          <h1>{search.origin || "Select origin"} <ArrowRight size={21} /> {search.destination || "Select destination"}</h1>
          <p>{formatTripDate(search.departureDate)}{search.tripType === "round-trip" ? ` · Return ${formatTripDate(search.returnDate)}` : " · One way"} · {search.travellers} {search.travellers === 1 ? "traveller" : "travellers"} · {search.cabinClass}</p>
        </div>
        <Link className="flight-flow-secondary" to="/flights/search">Change search</Link>
      </section>

      <div className="flight-results-toolbar">
        <span><strong>{filteredFlights.length}</strong> flight options</span>
        <button className="flight-flow-secondary flight-filter-toggle" type="button" aria-expanded={filtersOpen} onClick={() => setFiltersOpen((open) => !open)}><SlidersHorizontal size={16} /> Filters</button>
        <label className="flight-sort-control">Sort by
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="best">Best</option><option value="cheapest">Cheapest</option><option value="fastest">Fastest</option>
          </select>
        </label>
      </div>

      <div className="flight-results-layout">
        <aside className={`flight-filter-panel${filtersOpen ? " flight-filter-panel-open" : ""}`} aria-label="Flight filters">
          <div className="flight-filter-heading"><h2>Filters</h2><button type="button" onClick={() => { setStops("any"); setAirlines([]); setMaxPrice(1200); setDepartAfter("00:00"); setArriveBefore("23:59"); setMaxDuration(24); }}>Clear all</button></div>
          <label className="flight-filter-group">Stops
            <select value={stops} onChange={(event) => setStops(event.target.value)}>
              <option value="any">Any number of stops</option><option value="direct">Direct only</option><option value="one-stop">1 stop or fewer</option>
            </select>
          </label>
          <fieldset className="flight-filter-group"><legend>Airlines</legend>
            {availableAirlines.map((airline) => (
              <label className="flight-filter-check" key={airline}><input type="checkbox" checked={airlines.includes(airline)} onChange={() => toggleAirline(airline)} />{airline}</label>
            ))}
            {availableAirlines.length === 0 && <small className="flight-filter-muted">No airlines for this route.</small>}
          </fieldset>
          <label className="flight-filter-group">Maximum price <strong>${maxPrice}</strong>
            <input type="range" min="100" max="1500" step="10" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} />
            <span className="flight-range-labels"><small>$100</small><small>$1,500+</small></span>
          </label>
          <label className="flight-filter-group">Depart after
            <input type="time" value={departAfter} onChange={(event) => setDepartAfter(event.target.value)} />
          </label>
          <label className="flight-filter-group">Arrive before
            <input type="time" value={arriveBefore} onChange={(event) => setArriveBefore(event.target.value)} />
          </label>
          <label className="flight-filter-group">Maximum duration <strong>{maxDuration} hours</strong>
            <input type="range" min="3" max="30" value={maxDuration} onChange={(event) => setMaxDuration(event.target.value)} />
            <span className="flight-range-labels"><small>3 hours</small><small>30+ hours</small></span>
          </label>
        </aside>

        <section className="flight-result-list" aria-label="Available flights">
          {filteredFlights.map((flight, index) => (
            <article className="flight-result-card" key={flight.id}>
              {index === 0 && sort === "best" && <span className="flight-recommendation">Recommended</span>}
              <div className="flight-airline-mark" aria-label={flight.airline}>{flight.airlineCode}</div>
              <div className="flight-airline-name"><strong>{flight.airline}</strong><span>{flight.aircraft}</span></div>
              <div className="flight-time-pair">
                <div><strong>{flight.departureTime}</strong><span>{flight.origin.match(/\(([^)]+)\)/)?.[1]}</span></div>
                <div className="flight-duration"><span>{formatDuration(flight.durationMinutes)}</span><i /><small>{flight.stops === 0 ? "Nonstop" : `${flight.stops} stop · ${flight.stopCity}`}</small></div>
                <div><strong>{flight.arrivalTime}</strong><span>{flight.destination.match(/\(([^)]+)\)/)?.[1]}</span></div>
              </div>
              <div className="flight-result-price"><strong>${flight.price.toLocaleString("en-US")}</strong><span>per traveller</span></div>
              <button className="flight-flow-primary flight-select-button" type="button" onClick={() => selectFlight(flight.id)}>Select</button>
            </article>
          ))}
          {filteredFlights.length === 0 && (
            <div className="flight-empty-state">
              <h2>No matching flights found</h2>
              <p>Try another route or clear a filter to see more options.</p>
              <Link className="flight-flow-secondary" to="/flights/search">Change your search</Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default FlightResults;
