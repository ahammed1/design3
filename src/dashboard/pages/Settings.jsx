import { useState } from "react";
import { Check } from "lucide-react";
import { useAuth } from "../../auth/authStore.js";
import "./DashboardPages.css";

function Settings() {
  const { user, updateProfile } = useAuth();
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [preferences, setPreferences] = useState({
    emailBookings: user?.user_metadata?.preferences?.emailBookings ?? true,
    emailPayments: user?.user_metadata?.preferences?.emailPayments ?? true,
    weeklyReport: user?.user_metadata?.preferences?.weeklyReport ?? false,
    compactTable: user?.user_metadata?.preferences?.compactTable ?? false,
    defaultRange: user?.user_metadata?.preferences?.defaultRange ?? "Last 30 days",
  });
  const [profile, setProfile] = useState({
    name: user?.user_metadata?.full_name ?? "",
    email: user?.email ?? "",
    timezone: "Asia/Kolkata",
  });

  function updatePreference(field, value) {
    setPreferences((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function updateProfileField(field, value) {
    setProfile((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  async function saveSettings(event) {
    event.preventDefault();
    setSaved(false);
    setSaveError("");
    try {
      await updateProfile({ fullName: profile.name, preferences });
      setSaved(true);
    } catch (error) {
      setSaveError(error.message || "Unable to save administrator profile.");
    }
  }

  return (
    <>
      <section className="dashboard-page-heading"><div><h1>Settings</h1><p>Manage your profile, notifications, and workspace preferences.</p></div></section>
      <form className="settings-form" onSubmit={saveSettings}>
        <section className="dashboard-panel settings-card">
          <div className="settings-section-heading"><h2>Profile settings</h2><p>Update the personal details on your account.</p></div>
          <div className="settings-fields">
            <label>Full name<input value={profile.name} onChange={(event) => updateProfileField("name", event.target.value)} required /></label>
            <label>Email address<input type="email" value={profile.email} readOnly /></label>
            <label>Time zone<select value={profile.timezone} onChange={(event) => updateProfileField("timezone", event.target.value)}><option>Asia/Kolkata</option><option>Europe/London</option><option>America/New_York</option><option>Asia/Tokyo</option></select></label>
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
          <div className="account-setting-row"><span><strong>Administrator email</strong><small>{profile.email}</small></span><span className="account-auth-provider">Managed by Supabase Auth</span></div>
          <div className="account-setting-row"><span><strong>Administrator access</strong><small>Only the configured administrator email can access this dashboard.</small></span><span className="account-auth-provider">Supabase Auth</span></div>
        </section>
        <div className="settings-actions">
          {saved && <span className="settings-saved" role="status"><Check size={16} /> Settings saved</span>}
          {saveError && <span className="settings-error" role="alert">{saveError}</span>}
          <button className="button-primary" type="submit">Save settings</button>
        </div>
      </form>
    </>
  );
}

export default Settings;
