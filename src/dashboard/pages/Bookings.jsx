import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { formatDate } from "../data.js";
import "./DashboardPages.css";

const statuses = ["All statuses", "Confirmed", "Pending", "Cancelled"];

function StatusBadge({ status }) {
  return (
    <span className={`booking-status status-${status.toLowerCase().replace(/\s+/g, "-")}`}>
      <span className="booking-status-dot" />
      {status}
    </span>
  );
}

function Bookings() {
  const { bookings, globalSearch } = useOutletContext();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const filteredBookings = useMemo(() => {
    const queries = [search, globalSearch].map((query) => query.trim().toLowerCase()).filter(Boolean);
    return bookings.filter((booking) => {
      const matchesStatus = status === "All statuses" || booking.status === status;
      const matchesSearch =
        queries.every((query) =>
          [booking.id, booking.guest, booking.email, booking.route]
            .join(" ")
            .toLowerCase()
            .includes(query),
        );
      return matchesStatus && matchesSearch;
    });
  }, [bookings, globalSearch, search, status]);

  return (
    <>
      <section className="dashboard-page-heading">
        <div><h1>Bookings</h1><p>Search, review, and manage every reservation.</p></div>
        <span className="page-heading-count">{bookings.length} total bookings</span>
      </section>
      <section className="dashboard-panel page-panel">
        <div className="page-toolbar">
          <label className="page-search">
            <Search size={17} aria-hidden="true" />
            <input
              aria-label="Search bookings"
              placeholder="Search by guest, booking ID, or route"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <label className="page-select-label">
            <span className="visually-hidden">Filter by status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              {statuses.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="booking-table-scroll">
          <table className="booking-table management-table">
            <thead><tr>
              <th scope="col">Booking ID</th><th scope="col">Guest</th><th scope="col">Route / destination</th>
              <th scope="col">Date</th><th scope="col">Guests</th><th scope="col">Amount</th>
              <th scope="col">Status</th><th scope="col">Action</th>
            </tr></thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="booking-id">{booking.id}</td>
                  <td><div className="table-guest">
                    <span className={`guest-avatar avatar-${booking.color}`}>{booking.initials}</span>
                    <span><strong>{booking.guest}</strong><small>{booking.email}</small></span>
                  </div></td>
                  <td>{booking.route}</td>
                  <td>{formatDate(booking.date)}</td>
                  <td>{booking.guests}</td>
                  <td className="booking-amount">${booking.amount.toLocaleString("en-US")}</td>
                  <td><StatusBadge status={booking.status} /></td>
                  <td><Link className="button-secondary table-view-link" to={`/dashboard/bookings/${booking.id}`}>View booking</Link></td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr><td className="booking-table-empty" colSpan={8}>{bookings.length === 0 ? "No bookings yet. Confirmed reservations will appear here." : "No bookings match these filters."}</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="booking-table-footer"><span>Showing <strong>{filteredBookings.length}</strong> bookings</span></div>
      </section>
    </>
  );
}

export default Bookings;
