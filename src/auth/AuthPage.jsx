import { useState } from "react";
import { ArrowLeft, Plane } from "lucide-react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./authStore.js";
import "./Auth.css";

function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminEmail, configured, createAdmin, isAdmin, loading, sessionError, signIn, signOut, user } = useAuth();
  const isSetup = location.pathname === "/admin/setup";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  if (loading) {
    return <main className="admin-auth-page"><p className="auth-status">Loading administrator access…</p></main>;
  }
  if (isAdmin) return <Navigate to="/dashboard/overview" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      if (isSetup) {
        const result = await createAdmin({ fullName, email, password });
        if (result.session) {
          navigate("/dashboard/overview", { replace: true });
        } else {
          setMessage("Administrator account created. Confirm the email address, then sign in.");
        }
      } else {
        await signIn({ email, password });
        navigate("/dashboard/overview", { replace: true });
      }
    } catch (authError) {
      setError(authError.message || "Unable to complete administrator authentication.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUnauthorizedSignOut() {
    setSignOutError("");
    try {
      await signOut();
    } catch (authError) {
      setSignOutError(authError.message || "Unable to sign out of this account.");
    }
  }

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card">
        <Link className="auth-back-link" to="/"><ArrowLeft size={15} /> Back to website</Link>
        <div className="auth-brand-mark"><Plane size={20} aria-hidden="true" /></div>
        <p className="auth-eyebrow">ADMINISTRATOR ACCESS</p>
        <h1>{isSetup ? "Create your admin account" : "Welcome back"}</h1>
        <p className="auth-description">
          {isSetup
            ? "Create the administrator profile used to manage your booking platform."
            : "Sign in to manage your bookings and travel platform."}
        </p>

        {!configured ? (
          <div className="auth-configuration-message" role="alert">
            <strong>Authentication setup required</strong>
            <p>Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_ADMIN_EMAIL` to `.env.local`, then restart the development server. See `.env.example` for the expected format.</p>
          </div>
        ) : sessionError ? (
          <p className="auth-error" role="alert">Unable to load the administrator session: {sessionError}</p>
        ) : (
          <form className="admin-auth-form" onSubmit={handleSubmit}>
            {isSetup && (
              <label>Administrator name
                <input autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} required />
              </label>
            )}
            <label>Administrator email
              <input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <label>Password
              <input type="password" autoComplete={isSetup ? "new-password" : "current-password"} minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required />
            </label>
            {error && <p className="auth-error" role="alert">{error}</p>}
            {message && <p className="auth-success" role="status">{message}</p>}
            <button className="auth-submit-button" type="submit" disabled={submitting}>
              {submitting ? "Please wait…" : isSetup ? "Create administrator account" : "Sign in"}
            </button>
          </form>
        )}

        {user && !isAdmin && (
          <div className="auth-unauthorized">
            <p className="auth-error" role="alert">The signed-in account does not match the configured administrator email.</p>
            {signOutError && <p className="auth-error" role="alert">{signOutError}</p>}
            <button className="flight-flow-secondary" type="button" onClick={handleUnauthorizedSignOut}>Sign out of this account</button>
          </div>
        )}
        {configured && (
          <p className="auth-mode-switch">
            {isSetup ? "Already set up?" : "First time here?"}{" "}
            <Link to={isSetup ? "/admin/sign-in" : "/admin/setup"}>
              {isSetup ? "Sign in" : "Create admin account"}
            </Link>
          </p>
        )}
      </section>
    </main>
  );
}

export default AuthPage;
