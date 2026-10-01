import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Users,
  WalletCards,
} from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { dashboardMetrics, formatDate, monthlyStats } from "./data.js";
import "./Dashboard.css";

const filters = ["All bookings", "Confirmed", "Pending", "Cancelled"];

function StatusBadge({ status }) {
  return (
    <span className={`booking-status status-${status.toLowerCase().replace(/\s+/g, "-")}`}>
      <span className="booking-status-dot" />
      {status}
    </span>
  );
}

function Dashboard() {
  const { bookings, globalSearch } = useOutletContext();
  const [activeFilter, setActiveFilter] = useState("All bookings");
  const visibleBookings = useMemo(() => {
    const query = globalSearch.trim().toLowerCase();
    return bookings.filter((booking) => {
      const matchesStatus = activeFilter === "All bookings" || booking.status === activeFilter;
      const matchesSearch =
        !query ||
        [booking.id, booking.guest, booking.email, booking.route]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [activeFilter, bookings, globalSearch]);

  const upcoming = bookings
    .filter((booking) => booking.status !== "Cancelled")
    .slice()
    .sort((left, right) => left.date.localeCompare(right.date))
    .slice(0, 3);
  return (
    <>
      <section className="dashboard-page-heading">
        <div>
          <p className="dashboard-date-line">Thursday, October 1, 2026</p>
          <h1>Booking overview</h1>
          <p>Here’s what’s happening with your travel business today.</p>
        </div>
        <button className="dashboard-date-button" type="button">
          <CalendarDays size={16} aria-hidden="true" />
          Last 30 days
          <ChevronDown size={15} aria-hidden="true" />
        </button>
      </section>

      <section className="booking-stats-grid" aria-label="Booking statistics">
        <article className="booking-metric-card">
          <div className="metric-card-top">
            <span>Total bookings</span>
            <span className="metric-icon metric-icon-violet"><WalletCards size={18} /></span>
          </div>
          <strong>{dashboardMetrics.totalBookings.toLocaleString("en-US")}</strong>
          <p className="metric-trend trend-positive"><ArrowUpRight size={14} /> 12.8% <span>vs last month</span></p>
        </article>
        <article className="booking-metric-card">
          <div className="metric-card-top">
            <span>Total revenue</span>
            <span className="metric-icon metric-icon-green"><CircleDollarSign size={18} /></span>
          </div>
          <strong>${dashboardMetrics.revenue.toLocaleString("en-US")}</strong>
          <p className="metric-trend trend-positive"><ArrowUpRight size={14} /> 8.2% <span>vs last month</span></p>
        </article>
        <article className="booking-metric-card">
          <div className="metric-card-top">
            <span>Pending bookings</span>
            <span className="metric-icon metric-icon-amber"><Clock3 size={18} /></span>
          </div>
          <strong>{dashboardMetrics.pendingBookings}</strong>
          <p className="metric-trend trend-neutral">Needs your attention</p>
        </article>
        <article className="booking-metric-card">
          <div className="metric-card-top">
            <span>Active guests</span>
            <span className="metric-icon metric-icon-blue"><Users size={18} /></span>
          </div>
          <strong>{dashboardMetrics.activeGuests.toLocaleString("en-US")}</strong>
          <p className="metric-trend trend-positive"><ArrowUpRight size={14} /> 5.4% <span>vs last month</span></p>
        </article>
      </section>

      <section className="dashboard-middle-grid">
        <article className="dashboard-panel analytics-panel">
          <div className="panel-heading">
            <div>
              <h2>Booking analytics</h2>
              <p>Booking volume throughout the year</p>
            </div>
            <Link className="panel-view-link" to="/dashboard/analytics">View analytics</Link>
          </div>
          <div className="booking-chart" role="img" aria-label="Monthly booking chart for 2026">
            <div className="chart-y-axis">
              <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
            </div>
            <div className="chart-plot">
              <div className="chart-grid-lines" aria-hidden="true">
                <span /><span /><span /><span /><span />
              </div>
              <div className="chart-bars">
                {monthlyStats.map((item) => (
                  <div className="chart-column" key={item.month}>
                    <div className="chart-bar-track">
                      <span
                        className={`chart-bar${item.month === "Oct" ? " chart-bar-highlight" : ""}`}
                        style={{ height: `${item.bookings}%` }}
                        title={`${item.month}: ${item.bookings} bookings`}
                      />
                    </div>
                    <span className="chart-month">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="chart-legend">
            <span className="chart-legend-mark" />
            Bookings
            <span className="chart-period-summary"><ArrowUpRight size={14} /> 18.4% <span>vs last year</span></span>
          </div>
        </article>

        <article className="dashboard-panel upcoming-panel">
          <div className="panel-heading">
            <div><h2>Upcoming bookings</h2><p>Next departures</p></div>
            <Link className="panel-view-link" to="/dashboard/upcoming">View all</Link>
          </div>
          <div className="upcoming-booking-list">
            {upcoming.map((booking) => (
              <div className="upcoming-booking-item" key={booking.id}>
                <span className={`guest-avatar avatar-${booking.color}`}>{booking.initials}</span>
                <div className="upcoming-booking-copy">
                  <strong>{booking.guest}</strong>
                  <span>{booking.route}</span>
                  <small><Clock3 size={12} /> {formatDate(booking.date)}</small>
                </div>
                <span className="upcoming-mini-status">{booking.status}</span>
              </div>
            ))}
          </div>
          <Link className="upcoming-footer-link" to="/dashboard/upcoming">
            See departure schedule <ArrowRight size={14} />
          </Link>
        </article>
      </section>

      <section className="dashboard-panel recent-bookings-panel">
        <div className="panel-heading recent-bookings-heading">
          <div><h2>Recent bookings</h2><p>Track and manage your latest reservations.</p></div>
          <button className="export-button" type="button" onClick={() => window.print()}>
            Export report <ArrowDownRight size={15} aria-hidden="true" />
          </button>
        </div>
        <div className="booking-table-toolbar">
          <div className="booking-filter-tabs" aria-label="Filter bookings">
            {filters.map((filter) => (
              <button
                className={activeFilter === filter ? "filter-tab filter-tab-active" : "filter-tab"}
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="booking-table-scroll">
          <table className="booking-table">
            <thead><tr>
              <th scope="col">Booking ID</th><th scope="col">Guest</th><th scope="col">Route</th>
              <th scope="col">Travel date</th><th scope="col">Guests</th><th scope="col">Amount</th>
              <th scope="col">Status</th><th scope="col"><span className="visually-hidden">View</span></th>
            </tr></thead>
            <tbody>
              {visibleBookings.slice(0, 6).map((booking) => (
                <tr key={booking.id}>
                  <td className="booking-id">{booking.id}</td>
                  <td><div className="table-guest">
                    <span className={`guest-avatar avatar-${booking.color}`}>{booking.initials}</span>
                    <span><strong>{booking.guest}</strong><small>{booking.email}</small></span>
                  </div></td>
                  <td>{booking.route}</td>
                  <td>{formatDate(booking.date)}</td>
                  <td>{booking.guests} {booking.guests === 1 ? "guest" : "guests"}</td>
                  <td className="booking-amount">${booking.amount.toLocaleString("en-US")}</td>
                  <td><StatusBadge status={booking.status} /></td>
                  <td><Link className="table-view-link" to={`/dashboard/bookings/${booking.id}`}>View</Link></td>
                </tr>
              ))}
              {visibleBookings.length === 0 && (
                <tr><td className="booking-table-empty" colSpan={8}>No bookings match your search and status filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="booking-table-footer">
          <span>Showing <strong>{Math.min(visibleBookings.length, 6)}</strong> of <strong>{bookings.length}</strong> recent bookings</span>
          <Link to="/dashboard/bookings">View all bookings <ArrowRight size={14} /></Link>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
