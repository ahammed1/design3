import { useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { formatDate } from "../data.js";
import "./DashboardPages.css";

function createGuestList(bookings) {
  const guestsById = new Map();
  bookings.forEach((booking) => {
    const guest = guestsById.get(booking.guestId) ?? {
      id: booking.guestId,
      name: booking.guest,
      email: booking.email,
      phone: booking.phone,
      initials: booking.initials,
      color: booking.color,
      bookings: [],
    };
    guest.bookings.push(booking);
    guestsById.set(booking.guestId, guest);
  });
  return [...guestsById.values()].map((guest) => ({
    ...guest,
    totalSpent: guest.bookings
      .filter((booking) => booking.paymentStatus === "Paid")
      .reduce((total, booking) => total + booking.amount, 0),
    lastBooking: guest.bookings.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0],
  }));
}

function Guests() {
  const { guestId } = useParams();
  const { bookings, globalSearch } = useOutletContext();
  const [search, setSearch] = useState("");
  const guests = useMemo(() => createGuestList(bookings), [bookings]);
  const selectedGuest = guests.find((guest) => guest.id === guestId);
  const filteredGuests = useMemo(() => {
    const queries = [search, globalSearch].map((query) => query.trim().toLowerCase()).filter(Boolean);
    return guests.filter((guest) =>
      queries.every((query) => [guest.name, guest.email, guest.phone].join(" ").toLowerCase().includes(query)),
    );
  }, [globalSearch, guests, search]);

  if (guestId) {
    if (!selectedGuest) {
      return <section className="dashboard-panel page-panel"><h1>Guest not found</h1><Link className="button-primary" to="/dashboard/guests">Back to guests</Link></section>;
    }
    return (
      <>
        <section className="dashboard-page-heading">
          <div><Link className="back-link" to="/dashboard/guests"><ArrowLeft size={15} /> Back to guests</Link><h1>{selectedGuest.name}</h1><p>Customer profile and booking history.</p></div>
        </section>
        <div className="detail-grid guest-profile-grid">
          <section className="dashboard-panel detail-card">
            <div className="detail-customer"><span className={`guest-avatar avatar-${selectedGuest.color}`}>{selectedGuest.initials}</span><div><strong>{selectedGuest.name}</strong><small>Customer profile</small></div></div>
            <dl className="detail-list">
              <div><dt>Email address</dt><dd><a href={`mailto:${selectedGuest.email}`}>{selectedGuest.email}</a></dd></div>
              <div><dt>Phone number</dt><dd><a href={`tel:${selectedGuest.phone}`}>{selectedGuest.phone}</a></dd></div>
              <div><dt>Total bookings</dt><dd>{selectedGuest.bookings.length}</dd></div>
              <div><dt>Total spending</dt><dd className="detail-total">${selectedGuest.totalSpent.toLocaleString("en-US")}</dd></div>
              <div><dt>Last booking</dt><dd>{formatDate(selectedGuest.lastBooking.createdAt)}</dd></div>
            </dl>
          </section>
          <section className="dashboard-panel detail-card">
            <h2>Booking history</h2>
            {selectedGuest.bookings.map((booking) => (
              <Link className="guest-booking-row" to={`/dashboard/bookings/${booking.id}`} key={booking.id}>
                <span><strong>{booking.route}</strong><small>{booking.id} · {formatDate(booking.date)}</small></span>
                <span className={`booking-status status-${booking.status.toLowerCase()}`}><span className="booking-status-dot" />{booking.status}</span>
              </Link>
            ))}
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="dashboard-page-heading"><div><h1>Guests</h1><p>Customer profiles, booking history, and lifetime value.</p></div><span className="page-heading-count">{guests.length} customers</span></section>
      <section className="dashboard-panel page-panel">
        <div className="page-toolbar"><label className="page-search"><Search size={17} aria-hidden="true" /><input aria-label="Search customers" placeholder="Search by name, email, or phone" value={search} onChange={(event) => setSearch(event.target.value)} /></label></div>
        <div className="booking-table-scroll">
          <table className="booking-table management-table">
            <thead><tr><th scope="col">Customer</th><th scope="col">Phone</th><th scope="col">Total bookings</th><th scope="col">Total spending</th><th scope="col">Last booking</th><th scope="col">Action</th></tr></thead>
            <tbody>
              {filteredGuests.map((guest) => (
                <tr key={guest.id}>
                  <td><div className="table-guest"><span className={`guest-avatar avatar-${guest.color}`}>{guest.initials}</span><span><strong>{guest.name}</strong><small>{guest.email}</small></span></div></td>
                  <td>{guest.phone}</td><td>{guest.bookings.length}</td><td className="booking-amount">${guest.totalSpent.toLocaleString("en-US")}</td><td>{formatDate(guest.lastBooking.createdAt)}</td>
                  <td><Link className="button-secondary table-view-link" to={`/dashboard/guests/${guest.id}`}>View details</Link></td>
                </tr>
              ))}
              {filteredGuests.length === 0 && <tr><td className="booking-table-empty" colSpan={6}>No customers match your search.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Guests;
