import { ArrowUpRight, CircleDollarSign, Plane, WalletCards } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { dashboardMetrics, monthlyStats } from "../data.js";
import "./DashboardPages.css";

const destinations = [
  { name: "Paris, France", bookings: 248, share: 86 },
  { name: "Tokyo, Japan", bookings: 196, share: 68 },
  { name: "Rome, Italy", bookings: 154, share: 54 },
  { name: "Bali, Indonesia", bookings: 128, share: 44 },
];

function Analytics() {
  const { bookings } = useOutletContext();
  const maxBookings = Math.max(...monthlyStats.map((item) => item.bookings));
  const maxRevenue = Math.max(...monthlyStats.map((item) => item.revenue));
  const statusCounts = ["Confirmed", "Pending", "Cancelled"].map((status) => ({
    status,
    count: bookings.filter((item) => item.status === status).length,
  }));

  return (
    <>
      <section className="dashboard-page-heading">
        <div><h1>Analytics</h1><p>Understand booking performance and revenue trends.</p></div>
        <span className="page-heading-count">2026 overview</span>
      </section>
      <section className="booking-stats-grid" aria-label="Analytics summary">
        <article className="booking-metric-card"><div className="metric-card-top"><span>Total bookings</span><span className="metric-icon metric-icon-violet"><WalletCards size={18} /></span></div><strong>{dashboardMetrics.totalBookings.toLocaleString("en-US")}</strong><p className="metric-trend trend-positive"><ArrowUpRight size={14} /> 12.8% <span>vs last month</span></p></article>
        <article className="booking-metric-card"><div className="metric-card-top"><span>Revenue</span><span className="metric-icon metric-icon-green"><CircleDollarSign size={18} /></span></div><strong>${dashboardMetrics.revenue.toLocaleString("en-US")}</strong><p className="metric-trend trend-positive"><ArrowUpRight size={14} /> 8.2% <span>vs last month</span></p></article>
        <article className="booking-metric-card"><div className="metric-card-top"><span>Average booking</span><span className="metric-icon metric-icon-blue"><Plane size={18} /></span></div><strong>$1,840</strong><p className="metric-trend trend-positive">Across all destinations</p></article>
        <article className="booking-metric-card"><div className="metric-card-top"><span>Conversion rate</span><span className="metric-icon metric-icon-amber"><ArrowUpRight size={18} /></span></div><strong>4.8%</strong><p className="metric-trend trend-positive"><ArrowUpRight size={14} /> 0.6% <span>vs last month</span></p></article>
      </section>

      <section className="dashboard-panel page-panel">
        <div className="panel-heading"><div><h2>Monthly bookings</h2><p>Number of reservations by month</p></div><span className="chart-legend"><span className="chart-legend-mark" /> Bookings</span></div>
        <div className="analytics-chart">
          {monthlyStats.map((item) => (
            <div className="analytics-chart-column" key={item.month}>
              <span className="analytics-chart-value">{item.bookings}</span>
              <span className={`analytics-chart-bar${item.month === "Oct" ? " analytics-chart-bar-active" : ""}`} style={{ height: `${(item.bookings / maxBookings) * 100}%` }} title={`${item.month}: ${item.bookings} bookings`} />
              <span className="analytics-chart-label">{item.month}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="dashboard-middle-grid dashboard-secondary-grid">
        <section className="dashboard-panel page-panel">
          <div className="panel-heading"><div><h2>Revenue trend</h2><p>Monthly gross revenue</p></div><span className="chart-period-summary"><ArrowUpRight size={14} /> 16.2%</span></div>
          <div className="revenue-list">
            {monthlyStats.slice(6).map((item) => (
              <div className="revenue-row" key={item.month}>
                <span>{item.month}</span><div className="revenue-bar-track"><span style={{ width: `${(item.revenue / maxRevenue) * 100}%` }} /></div>
                <strong>${(item.revenue / 1000).toFixed(1)}k</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="dashboard-panel page-panel">
          <div className="panel-heading"><div><h2>Popular destinations</h2><p>Most booked this year</p></div></div>
          <div className="destination-list">
            {destinations.map((item, index) => (
              <div className="destination-row" key={item.name}>
                <span className={`destination-rank destination-rank-${index + 1}`}>{index + 1}</span>
                <div className="destination-row-main"><strong>{item.name}</strong><span>{item.bookings} bookings</span></div>
                <div className="destination-bar-track"><span style={{ width: `${item.share}%` }} /></div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="dashboard-panel page-panel">
        <div className="panel-heading"><div><h2>Booking status breakdown</h2><p>Current distribution of reservations</p></div></div>
        <div className="status-breakdown">
          {statusCounts.map(({ status, count }) => (
            <div className="status-breakdown-item" key={status}>
              <span className={`booking-status status-${status.toLowerCase()}`}><span className="booking-status-dot" />{status}</span>
              <strong>{count}</strong>
              <span>{((count / bookings.length) * 100).toFixed(0)}% of bookings</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Analytics;
