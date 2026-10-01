import { useState } from "react";
import { ArrowLeft, Check, Pencil, X } from "lucide-react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { formatDate } from "../data.js";
import "./DashboardPages.css";

function BookingDetails() {
  const { bookingId } = useParams();
  const { bookings, setBookings } = useOutletContext();
  const booking = bookings.find((item) => item.id === bookingId);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [notice, setNotice] = useState("");

  if (!booking) {
    return (
      <section className="dashboard-panel page-panel">
        <h1>Booking not found</h1>
        <p className="page-description">That booking may have been removed or the link is incorrect.</p>
        <Link className="button-primary" to="/dashboard/bookings">Back to bookings</Link>
      </section>
    );
  }

  function changeStatus(status) {
    setBookings((items) => items.map((item) => item.id === booking.id ? { ...item, status } : item));
    setNotice(`Booking ${booking.id} marked ${status.toLowerCase()}.`);
  }

  function startEditing() {
    setDraft({ origin: booking.origin, destination: booking.destination, date: booking.date, guests: booking.guests });
    setEditing(true);
    setNotice("");
  }

  function saveChanges(event) {
    event.preventDefault();
    setBookings((items) => items.map((item) => item.id === booking.id
      ? { ...item, ...draft, route: `${draft.origin.split(" (")[0]} → ${draft.destination.split(" (")[0]}` }
      : item));
    setEditing(false);
    setNotice("Booking changes saved.");
  }

  return (
    <>
      <section className="dashboard-page-heading">
        <div>
          <Link className="back-link" to="/dashboard/bookings"><ArrowLeft size={15} /> Back to bookings</Link>
          <h1>Booking {booking.id}</h1>
          <p>Created on {formatDate(booking.createdAt)} · {booking.route}</p>
        </div>
        <div className="detail-actions">
          <button className="button-secondary" type="button" onClick={startEditing}><Pencil size={15} /> Edit booking</button>
          {booking.status === "Pending" && (
            <button className="button-primary" type="button" onClick={() => changeStatus("Confirmed")}><Check size={15} /> Confirm</button>
          )}
          {booking.status !== "Cancelled" && (
            <button className="button-danger" type="button" onClick={() => changeStatus("Cancelled")}><X size={15} /> Cancel</button>
          )}
        </div>
      </section>
      {notice && <p className="page-notice" role="status">{notice}</p>}

      <div className="detail-grid">
        {editing ? (
          <form className="dashboard-panel detail-card detail-edit-form" onSubmit={saveChanges}>
            <h2>Edit trip information</h2>
            <label>Departure airport<input required value={draft.origin} onChange={(event) => setDraft({ ...draft, origin: event.target.value })} /></label>
            <label>Destination airport<input required value={draft.destination} onChange={(event) => setDraft({ ...draft, destination: event.target.value })} /></label>
            <label>Travel date<input type="date" required value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} /></label>
            <label>Number of guests<input type="number" min="1" max="9" required value={draft.guests} onChange={(event) => setDraft({ ...draft, guests: Number(event.target.value) })} /></label>
            <div className="detail-actions">
              <button className="button-primary" type="submit">Save changes</button>
              <button className="button-secondary" type="button" onClick={() => setEditing(false)}>Discard</button>
            </div>
          </form>
        ) : (
          <section className="dashboard-panel detail-card">
            <div className="detail-card-heading"><h2>Trip information</h2><span className={`booking-status status-${booking.status.toLowerCase()}`}><span className="booking-status-dot" />{booking.status}</span></div>
            <div className="trip-route-card"><span>{booking.origin}</span><span className="trip-route-line" aria-hidden="true" /><span>{booking.destination}</span></div>
            <dl className="detail-list">
              <div><dt>Departure</dt><dd>{formatDate(booking.date)}</dd></div>
              <div><dt>Return</dt><dd>{formatDate(booking.returnDate)}</dd></div>
              <div><dt>Flight</dt><dd>{booking.flightNumber}</dd></div>
              <div><dt>Travelers</dt><dd>{booking.guests} {booking.guests === 1 ? "guest" : "guests"}</dd></div>
            </dl>
          </section>
        )}

        <section className="dashboard-panel detail-card">
          <h2>Customer information</h2>
          <div className="detail-customer">
            <span className={`guest-avatar avatar-${booking.color}`}>{booking.initials}</span>
            <div><strong>{booking.guest}</strong><small>Customer since {formatDate(booking.createdAt)}</small></div>
          </div>
          <dl className="detail-list">
            <div><dt>Email address</dt><dd><a href={`mailto:${booking.email}`}>{booking.email}</a></dd></div>
            <div><dt>Phone number</dt><dd><a href={`tel:${booking.phone}`}>{booking.phone}</a></dd></div>
          </dl>
          <Link className="panel-view-link" to={`/dashboard/guests/${booking.guestId}`}>View customer profile</Link>
        </section>

        <section className="dashboard-panel detail-card">
          <h2>Payment information</h2>
          <dl className="detail-list">
            <div><dt>Total amount</dt><dd className="detail-total">${booking.amount.toLocaleString("en-US")}</dd></div>
            <div><dt>Payment status</dt><dd>{booking.paymentStatus}</dd></div>
            <div><dt>Payment method</dt><dd>{booking.paymentMethod}</dd></div>
            <div><dt>Booking reference</dt><dd>{booking.id}</dd></div>
          </dl>
        </section>

        <section className="dashboard-panel detail-card">
          <h2>Booking timeline</h2>
          <ol className="booking-timeline">
            <li><span className="timeline-dot timeline-done" /><div><strong>Booking created</strong><small>{formatDate(booking.createdAt)}</small></div></li>
            <li><span className={`timeline-dot${booking.paymentStatus === "Paid" ? " timeline-done" : ""}`} /><div><strong>{booking.paymentStatus === "Paid" ? "Payment received" : booking.paymentStatus}</strong><small>{booking.paymentStatus === "Paid" ? formatDate(booking.createdAt) : "Awaiting customer payment"}</small></div></li>
            <li><span className={`timeline-dot${booking.status === "Confirmed" ? " timeline-done" : ""}`} /><div><strong>{booking.status === "Cancelled" ? "Booking cancelled" : "Trip confirmed"}</strong><small>{booking.status}</small></div></li>
          </ol>
        </section>
      </div>
    </>
  );
}

export default BookingDetails;
