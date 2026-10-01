import { useMemo, useState } from "react";
import { CalendarDays, Search } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { formatDate } from "../data.js";
import "./DashboardPages.css";

function UpcomingTrips() {
  const { bookings, globalSearch } = useOutletContext();
  const [search, setSearch] = useState("");
  const upcoming = useMemo(() => {
    const queries = [search, globalSearch].map((query) => query.trim().toLowerCase()).filter(Boolean);
    return bookings
      .filter((booking) => booking.status !== "Cancelled" && booking.date >= "2026-10-01")
      .filter((booking) => queries.every((query) => [booking.guest, booking.route, booking.id].join(" ").toLowerCase().includes(query)))
      .sort((left, right) => left.date.localeCompare(right.date));
  }, [bookings, globalSearch, search]);

  return (
    <>
      <section className="dashboard-page-heading">
        <div><h1>Upcoming trips</h1><p>Keep track of your customers’ next departures.</p></div>
        <span className="page-heading-count">{upcoming.length} upcoming trips</span>
      </section>
      <section className="dashboard-panel page-panel">
        <div className="page-toolbar">
          <label className="page-search"><Search size={17} aria-hidden="true" /><input aria-label="Search upcoming trips" placeholder="Search by customer or destination" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
        </div>
        <div className="trip-card-list">
          {upcoming.map((trip) => (
            <article className="trip-card" key={trip.id}>
              <div className="trip-card-date"><CalendarDays size={17} aria-hidden="true" /><span>{formatDate(trip.date)}</span></div>
              <div className="trip-card-guest"><span className={`guest-avatar avatar-${trip.color}`}>{trip.initials}</span><span><strong>{trip.guest}</strong><small>{trip.guests} {trip.guests === 1 ? "guest" : "guests"}</small></span></div>
              <div className="trip-card-route"><small>DESTINATION</small><strong>{trip.route}</strong></div>
              <span className={`booking-status status-${trip.status.toLowerCase()}`}><span className="booking-status-dot" />{trip.status}</span>
              <Link className="button-secondary" to={`/dashboard/bookings/${trip.id}`}>View trip</Link>
            </article>
          ))}
          {upcoming.length === 0 && <p className="empty-state">No upcoming trips match your search.</p>}
        </div>
      </section>
    </>
  );
}

export default UpcomingTrips;
