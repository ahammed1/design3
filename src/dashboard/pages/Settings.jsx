import { useState } from "react";
import { Check } from "lucide-react";
import "./DashboardPages.css";

function Settings() {
  const [saved, setSaved] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [accountNotice, setAccountNotice] = useState("");
  const [preferences, setPreferences] = useState({
    emailBookings: true,
    emailPayments: true,
    weeklyReport: false,
    compactTable: false,
    defaultRange: "Last 30 days",
  });
  const [profile, setProfile] = useState({ name: "Alex Morgan", email: "alex.morgan@travelbooking.com", timezone: "Asia/Kolkata" });

  function updatePreference(field, value) {
    setPreferences((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function updateProfile(field, value) {
    setProfile((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function saveSettings(event) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <>
      <section className="dashboard-page-heading"><div><h1>Settings</h1><p>Manage your profile, notifications, and workspace preferences.</p></div></section>
      <form className="settings-form" onSubmit={saveSettings}>
        <section className="dashboard-panel settings-card">
          <div className="settings-section-heading"><h2>Profile settings</h2><p>Update the personal details on your account.</p></div>
          <div className="settings-fields">
            <label>Full name<input value={profile.name} onChange={(event) => updateProfile("name", event.target.value)} /></label>
            <label>Email address<input type="email" value={profile.email} onChange={(event) => updateProfile("email", event.target.value)} /></label>
            <label>Time zone<select value={profile.timezone} onChange={(event) => updateProfile("timezone", event.target.value)}><option>Asia/Kolkata</option><option>Europe/London</option><option>America/New_York</option><option>Asia/Tokyo</option></select></label>
          </div>
        </section>
        <section className="dashboard-panel settings-card">
          <div className="settings-section-heading"><h2>Notification preferences</h2><p>Choose which updates you receive.</p></div>
          <div className="settings-options">
            <label className="settings-toggle"><span><strong>New booking notifications</strong><small>Get notified when a customer makes a booking.</small></span><input type="checkbox" checked={preferences.emailBookings} onChange={(event) => updatePreference("emailBookings", event.target.checked)} /></label>
            <label className="settings-toggle"><span><strong>Payment updates</strong><small>Receive updates for successful payments and refunds.</small></span><input type="checkbox" checked={preferences.emailPayments} onChange={(event) => updatePreference("emailPayments", event.target.checked)} /></label>
            <label className="settings-toggle"><span><strong>Weekly performance report</strong><small>A summary of bookings and revenue each week.</small></span><input type="checkbox" checked={preferences.weeklyReport} onChange={(event) => updatePreference("weeklyReport", event.target.checked)} /></label>
          </div>
        </section>
        <section className="dashboard-panel settings-card">
          <div className="settings-section-heading"><h2>Dashboard preferences</h2><p>Customize your management workspace.</p></div>
          <div className="settings-fields">
            <label>Default date range<select value={preferences.defaultRange} onChange={(event) => updatePreference("defaultRange", event.target.value)}><option>Last 7 days</option><option>Last 30 days</option><option>Last 90 days</option><option>This year</option></select></label>
            <label className="settings-toggle settings-compact"><span><strong>Compact booking tables</strong><small>Show more rows at once on desktop.</small></span><input type="checkbox" checked={preferences.compactTable} onChange={(event) => updatePreference("compactTable", event.target.checked)} /></label>
          </div>
        </section>
        <section className="dashboard-panel settings-card">
          <div className="settings-section-heading"><h2>Account settings</h2><p>Manage account security and access.</p></div>
          <div className="account-setting-row"><span><strong>Password</strong><small>Last changed 3 months ago</small></span><button className="button-secondary" type="button" onClick={() => setAccountNotice("Password management will be available when account authentication is connected.")}>Change password</button></div>
          <div className="account-setting-row"><span><strong>Two-factor authentication</strong><small>{twoFactorEnabled ? "Two-factor authentication is enabled for this session." : "Add another layer of security to your account."}</small></span><button className="button-secondary" type="button" onClick={() => { setTwoFactorEnabled((enabled) => !enabled); setAccountNotice(""); }}>{twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}</button></div>
          {accountNotice && <p className="page-notice" role="status">{accountNotice}</p>}
        </section>
        <div className="settings-actions">
          {saved && <span className="settings-saved" role="status"><Check size={16} /> Settings saved</span>}
          <button className="button-primary" type="submit">Save settings</button>
        </div>
      </form>
    </>
  );
}

export default Settings;
