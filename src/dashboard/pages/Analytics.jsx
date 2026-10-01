import { CircleDollarSign, Plane, WalletCards, Clock3 } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { formatCurrency, getDashboardMetrics, getMonthlyStats, getPopularDestinations } from "../data.js";
import "./DashboardPages.css";

function Analytics() {
  const { bookings } = useOutletContext();
  const metrics = getDashboardMetrics(bookings);
  const monthlyStats = getMonthlyStats(bookings);
  const destinations = getPopularDestinations(bookings);
  const revenueMonths = monthlyStats.filter((item) => item.revenue > 0);
  const maxBookings = Math.max(1, ...monthlyStats.map((item) => item.bookings));
  const maxRevenue = Math.max(1, ...revenueMonths.map((item) => item.revenue));
  const statusCounts = ["Confirmed", "Pending", "Cancelled"].map((status) => ({
    status,
    count: bookings.filter((item) => item.status === status).length,
  }));

  return (
    <>
      <section className="dashboard-page-heading">
        <div><h1>Analytics</h1><p>Performance summaries based on your platform bookings.</p></div>
        <span className="page-heading-count">Live booking data</span>
      </section>
      <section className="booking-stats-grid" aria-label="Analytics summary">
        <article className="booking-metric-card"><div className="metric-card-top"><span>Total bookings</span><span className="metric-icon metric-icon-violet"><WalletCards size={18} /></span></div><strong>{metrics.totalBookings.toLocaleString("en-US")}</strong><p className="metric-trend trend-neutral">All booking statuses</p></article>
        <article className="booking-metric-card"><div className="metric-card-top"><span>Paid revenue</span><span className="metric-icon metric-icon-green"><CircleDollarSign size={18} /></span></div><strong>{formatCurrency(metrics.revenue)}</strong><p className="metric-trend trend-neutral">Paid bookings only</p></article>
        <article className="booking-metric-card"><div className="metric-card-top"><span>Average paid booking</span><span className="metric-icon metric-icon-blue"><Plane size={18} /></span></div><strong>{formatCurrency(metrics.averageBooking)}</strong><p className="metric-trend trend-neutral">Based on paid bookings</p></article>
        <article className="booking-metric-card"><div className="metric-card-top"><span>Pending bookings</span><span className="metric-icon metric-icon-amber"><Clock3 size={18} /></span></div><strong>{metrics.pendingBookings}</strong><p className="metric-trend trend-neutral">Awaiting confirmation</p></article>
      </section>

      <section className="dashboard-panel page-panel">
        <div className="panel-heading"><div><h2>Monthly bookings</h2><p>Reservation volume based on travel date</p></div><span className="chart-legend"><span className="chart-legend-mark" /> Bookings</span></div>
        {monthlyStats.length > 0 ? (
          <div className="analytics-chart">
            {monthlyStats.map((item) => (
              <div className="analytics-chart-column" key={item.month}>
                <span className="analytics-chart-value">{item.bookings}</span>
                <span className="analytics-chart-bar" style={{ height: `${(item.bookings / maxBookings) * 100}%` }} title={`${item.month}: ${item.bookings} bookings`} />
                <span className="analytics-chart-label">{item.month}</span>
              </div>
            ))}
          </div>
        ) : <p className="dashboard-empty-state">Monthly analytics will appear after bookings are added.</p>}
      </section>

      <div className="dashboard-middle-grid dashboard-secondary-grid">
        <section className="dashboard-panel page-panel">
          <div className="panel-heading"><div><h2>Revenue trend</h2><p>Collected payments by travel month</p></div></div>
          {revenueMonths.length > 0 ? (
            <div className="revenue-list">
              {revenueMonths.map((item) => (
                <div className="revenue-row" key={item.month}>
                  <span>{item.month}</span><div className="revenue-bar-track"><span style={{ width: `${(item.revenue / maxRevenue) * 100}%` }} /></div>
                  <strong>{formatCurrency(item.revenue)}</strong>
                </div>
              ))}
            </div>
          ) : <p className="dashboard-empty-state">Revenue trends appear when a booking payment is recorded.</p>}
        </section>
        <section className="dashboard-panel page-panel">
          <div className="panel-heading"><div><h2>Popular destinations</h2><p>Based on current bookings</p></div></div>
          {destinations.length > 0 ? (
            <div className="destination-list">
              {destinations.map((item, index) => (
                <div className="destination-row" key={item.name}>
                  <span className={`destination-rank destination-rank-${Math.min(index + 1, 4)}`}>{index + 1}</span>
                  <div className="destination-row-main"><strong>{item.name}</strong><span>{item.bookings} {item.bookings === 1 ? "booking" : "bookings"}</span></div>
                  <div className="destination-bar-track"><span style={{ width: `${item.share}%` }} /></div>
                </div>
              ))}
            </div>
          ) : <p className="dashboard-empty-state">Destinations will appear after your first booking.</p>}
        </section>
      </div>

      <section className="dashboard-panel page-panel">
        <div className="panel-heading"><div><h2>Booking status breakdown</h2><p>Current distribution of reservations</p></div></div>
        <div className="status-breakdown">
          {statusCounts.map(({ status, count }) => (
            <div className="status-breakdown-item" key={status}>
              <span className={`booking-status status-${status.toLowerCase()}`}><span className="booking-status-dot" />{status}</span>
              <strong>{count}</strong>
              <span>{bookings.length ? `${((count / bookings.length) * 100).toFixed(0)}% of bookings` : "0% of bookings"}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Analytics;
