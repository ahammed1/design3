import { Link } from "react-router-dom";
import { ArrowLeft, Plane } from "lucide-react";
import FlightSearchForm from "./FlightSearchForm.jsx";
import "./FlightPages.css";

function FlightSearch() {
  return (
    <main className="flight-flow-page">
      <header className="flight-flow-header">
        <Link className="flight-flow-brand" to="/"><span><Plane size={19} /></span>xxxxxx</Link>
        <Link className="flight-flow-back" to="/"><ArrowLeft size={15} /> Back to home</Link>
      </header>
      <section className="flight-flow-hero">
        <p className="flight-flow-eyebrow">A better way to get there</p>
        <h1>Find a flight that fits your plans.</h1>
        <p>Compare thoughtful options, choose your trip, and book with confidence.</p>
      </section>
      <section className="flight-flow-card" aria-label="Search flights">
        <FlightSearchForm />
      </section>
      <div className="flight-flow-search-footnote">Flexible plans · Clear fares · Support when you need it</div>
    </main>
  );
}

export default FlightSearch;
