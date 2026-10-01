import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  LayoutDashboard,
  Menu,
  Plane,
  Search,
  Settings,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useFlightBooking } from "../flights/flightBookingStore.js";
import "./Dashboard.css";

const navigation = [
  { label: "Overview", to: "/dashboard/overview", icon: LayoutDashboard, section: "MANAGE", end: true },
  { label: "Bookings", to: "/dashboard/bookings", icon: WalletCards },
  { label: "Analytics", to: "/dashboard/analytics", icon: CircleDollarSign },
  { label: "Upcoming trips", to: "/dashboard/upcoming", icon: CalendarDays },
  { label: "Guests", to: "/dashboard/guests", icon: Users, section: "WORKSPACE" },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
];

const routeTitles = [
  ["/dashboard/overview", "Overview"],
  ["/dashboard/bookings/", "Booking details"],
  ["/dashboard/bookings", "Bookings"],
  ["/dashboard/analytics", "Analytics"],
  ["/dashboard/upcoming", "Upcoming trips"],
  ["/dashboard/guests/", "Guest details"],
  ["/dashboard/guests", "Guests"],
  ["/dashboard/settings", "Settings"],
];

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const { bookings, setBookings } = useFlightBooking();
  const location = useLocation();
  const pageTitle =
    routeTitles.find(([path]) => location.pathname.startsWith(path))?.[1] ??
    "Overview";

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className="booking-dashboard">
      {sidebarOpen && (
        <button
          className="dashboard-scrim"
          type="button"
          aria-label="Close navigation menu"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`booking-sidebar${sidebarOpen ? " sidebar-open" : ""}`}
        id="booking-sidebar"
      >
        <Link className="booking-dashboard-brand" to="/">
          <span className="booking-brand-mark">
            <Plane size={19} aria-hidden="true" />
          </span>
          <span>xxxxxx</span>
        </Link>

        <div className="sidebar-workspace">
          <span className="workspace-avatar">L</span>
          <span className="workspace-copy">
            <strong>Travel Management</strong>
            <small>Workspace</small>
          </span>
          <ChevronDown size={15} aria-hidden="true" />
        </div>

        <nav className="booking-sidebar-nav" aria-label="Booking management">
          {navigation.map(({ label, to, icon: Icon, section, end }) => (
            <div key={to}>
              {section && (
                <span className={`sidebar-label${section === "WORKSPACE" ? " sidebar-label-lower" : ""}`}>
                  {section}
                </span>
              )}
              <NavLink
                className={({ isActive }) =>
                  `sidebar-link${isActive ? " sidebar-link-active" : ""}`
                }
                to={to}
                end={end}
                onClick={closeSidebar}
              >
                <Icon size={18} aria-hidden="true" />
                {label}
                {label === "Bookings" && <span className="sidebar-count">{bookings.length}</span>}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="sidebar-help-card">
          <span className="help-card-icon">
            <Check size={16} aria-hidden="true" />
          </span>
          <strong>Need a hand?</strong>
          <p>Our travel support team is here for you.</p>
          <a href="mailto:support@travelbooking.com">
            Contact support <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>

        <Link className="sidebar-website-link" to="/">
          <ArrowUpRight size={16} aria-hidden="true" />
          View booking website
        </Link>
      </aside>

      <div className="booking-dashboard-main">
        <header className="booking-topbar">
          <div className="topbar-start">
            <button
              className="dashboard-menu-toggle"
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={sidebarOpen}
              aria-controls="booking-sidebar"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} aria-hidden="true" />
            </button>
            <div className="dashboard-breadcrumb">
              <span>Workspace</span>
              <span className="breadcrumb-separator">/</span>
              <strong>{pageTitle}</strong>
            </div>
          </div>

          <div className="topbar-actions">
            <label className={`dashboard-global-search${mobileSearchOpen ? " mobile-search-visible" : ""}`}>
              <Search size={17} aria-hidden="true" />
              <input
                aria-label="Search dashboard"
                placeholder="Search bookings..."
                value={globalSearch}
                onChange={(event) => setGlobalSearch(event.target.value)}
              />
            </label>
            <button
              className="mobile-search-toggle"
              type="button"
              aria-label={mobileSearchOpen ? "Close booking search" : "Open booking search"}
              aria-expanded={mobileSearchOpen}
              onClick={() => setMobileSearchOpen((open) => !open)}
            >
              {mobileSearchOpen ? <X size={19} aria-hidden="true" /> : <Search size={19} aria-hidden="true" />}
            </button>

            <div className="notification-wrapper">
              <button
                className={`notification-button${notificationsOpen ? " notification-active" : ""}`}
                type="button"
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
                onClick={() => setNotificationsOpen((open) => !open)}
              >
                <Bell size={19} aria-hidden="true" />
                <span className="notification-dot" />
              </button>
              {notificationsOpen && (
                <div className="notification-popover">
                  <div className="notification-popover-heading">
                    <strong>Notifications</strong>
                    <span>2 new</span>
                  </div>
                  <p><b>New booking</b> · Olivia Rhye booked a trip to Paris.</p>
                  <p><b>Payment received</b> · Booking BK-2046 is paid.</p>
                </div>
              )}
            </div>

            <button className="dashboard-user" type="button" aria-label="Alex Morgan profile">
              <span className="user-avatar">AM</span>
              <span className="user-copy">
                <strong>Alex Morgan</strong>
                <small>Administrator</small>
              </span>
              <ChevronDown size={15} aria-hidden="true" />
            </button>
          </div>
        </header>

        <main className="dashboard-page-content">
          <Outlet context={{ bookings, globalSearch, setBookings, setGlobalSearch }} />
          <footer className="dashboard-page-footer">
            <span>© 2026 Travel Management</span>
            <a href="mailto:support@travelbooking.com">Need help? Contact support</a>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
