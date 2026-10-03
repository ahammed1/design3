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
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authStore.js";
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
  const [bookings, setBookings] = useState([]);
  const [signOutError, setSignOutError] = useState("");
  const { isAdmin, loading, signOut, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const displayName = user?.user_metadata?.full_name || user?.email || "Administrator";
  const initials = displayName
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
  const pageTitle =
    routeTitles.find(([path]) => location.pathname.startsWith(path))?.[1] ??
    "Overview";

  function closeSidebar() {
    setSidebarOpen(false);
  }

  async function handleSignOut() {
    setSignOutError("");
    try {
      await signOut();
      navigate("/admin/sign-in", { replace: true });
    } catch (error) {
      setSignOutError(error.message || "Unable to sign out.");
    }
  }

  if (loading) {
    return <main className="dashboard-auth-status">Loading administrator session…</main>;
  }

  if (!isAdmin) {
    return <Navigate to="/admin/sign-in" replace state={{ from: location.pathname }} />;
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
          <span className="workspace-avatar">{initials || "A"}</span>
          <span className="workspace-copy">
            <strong>{displayName}</strong>
            <small>Administrator</small>
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
              </button>
              {notificationsOpen && (
                <div className="notification-popover">
                    <div className="notification-popover-heading">
                      <strong>Notifications</strong>
                      <span>0 new</span>
                    </div>
                    <p>No notifications yet. Updates will appear here when you receive them.</p>
                </div>
              )}
            </div>

            <button className="dashboard-user" type="button" aria-label={`Sign out ${displayName}`} onClick={handleSignOut}>
              <span className="user-avatar">{initials || "A"}</span>
              <span className="user-copy">
                <strong>{displayName}</strong>
                <small>Sign out</small>
              </span>
              <ChevronDown size={15} aria-hidden="true" />
            </button>
          </div>
        </header>

        <main className="dashboard-page-content">
          {signOutError && <p className="dashboard-auth-error" role="alert">{signOutError}</p>}
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
