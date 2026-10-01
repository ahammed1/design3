import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BusFront,
  CarFront,
  CalendarDays,
  Headphones,
  Hotel,
  MapPin,
  Plane,
  PlaneTakeoff,
  Plus,
  ShieldCheck,
  Search,
  TicketCheck,
  Users,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AuthPage from "./auth/AuthPage.jsx";
import { AuthProvider } from "./auth/AuthProvider.jsx";
import BookingConfirmation from "./flights/BookingConfirmation.jsx";
import FlightDetails from "./flights/FlightDetails.jsx";
import FlightResults from "./flights/FlightResults.jsx";
import FlightSearch from "./flights/FlightSearch.jsx";
import { FlightBookingProvider } from "./flights/FlightBookingContext.jsx";
import { useFlightBooking } from "./flights/flightBookingStore.js";
import PassengerDetails from "./flights/PassengerDetails.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import DashboardLayout from "./dashboard/DashboardLayout.jsx";
import Analytics from "./dashboard/pages/Analytics.jsx";
import BookingDetails from "./dashboard/pages/BookingDetails.jsx";
import Bookings from "./dashboard/pages/Bookings.jsx";
import Guests from "./dashboard/pages/Guests.jsx";
import Settings from "./dashboard/pages/Settings.jsx";
import UpcomingTrips from "./dashboard/pages/UpcomingTrips.jsx";
import "./App.css";

const destinations = [
  {
    city: "Paris, France",
    text: "The City of Light is a celebration of art, food, and unforgettable evenings.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    href: "https://www.globalcharter.com/row-destinations?utm_source=google&utm_medium=cpc&utm_campaign=&utm_id=23766774360&utm_term=flights+to+paris&utm_content=808654092473&gad_source=1&gad_campaignid=23766774360&gbraid=0AAAAABiAiF4O4E-9jGgkcIOqfmnpD-1WI&gclid=CjwKCAjwoOjVBhArEiwAUwDak_GLlXEMdgOahZK6Nko8_DB8rg-HfwcGjkV65gYe3bQXyFnB37RL-xoCmysQAvD_BwE",
  },
  {
    city: "Berlin, Germany",
    text: "A creative, modern city with historic streets, vibrant culture, and warm energy.",
    image:
      "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Sydney, Australia",
    text: "Sunlit beaches, iconic harbors, and vibrant urban experiences await your next escape.",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Toronto, Canada",
    text: "Diverse neighborhoods, skyline views, and a welcoming city atmosphere at every turn.",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Delhi, India",
    text: "A bold city of iconic landmarks, unforgettable food, and lively local culture.",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "London, UK",
    text: "Historic charm, premium culture, and a timeless destination for memorable journeys.",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "New York, USA",
    text: "Take in iconic skylines, endless energy, and unforgettable city adventures.",
    image:
      "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Tokyo, Japan",
    text: "Discover Tokyo's glowing skyline, peaceful temples, and unforgettable food.",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80",
  },
];

const footerPhotos = [
  {
    label: "Above the clouds",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Window seat views",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Discover Paris",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Explore Tokyo",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=700&q=80",
  },
];

const homepageDeals = [
  {
    origin: "Bengaluru (BLR)",
    destination: "Dubai (DXB)",
    city: "Dubai",
    country: "United Arab Emirates",
    price: 228,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  },
  {
    origin: "New York (JFK)",
    destination: "Paris (CDG)",
    city: "Paris",
    country: "France",
    price: 398,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
  },
  {
    origin: "Singapore (SIN)",
    destination: "Tokyo (HND)",
    city: "Tokyo",
    country: "Japan",
    price: 318,
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80",
  },
  {
    origin: "Delhi (DEL)",
    destination: "London (LHR)",
    city: "London",
    country: "United Kingdom",
    price: 486,
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
  },
];

const homepageFaqs = [
  {
    question: "How do I compare the available flights?",
    answer:
      "Enter your route and travel dates in the search form. On the results page, filter by stops, airline, price, departure or arrival time, and duration, then sort by best, cheapest, or fastest.",
  },
  {
    question: "Can I choose a direct flight?",
    answer:
      "Yes. Turn on Direct flights only in the search form, or use the stops filter on the results page to show nonstop options.",
  },
  {
    question: "What is included in the displayed fare?",
    answer:
      "Each sample flight includes fare and baggage information in its details. The prices on this demo site are illustrative and are not live quotes.",
  },
  {
    question: "Can I change passenger information after booking?",
    answer:
      "This frontend demo records the details you submit and displays them in the confirmation and dashboard. Changes are not sent to an airline or booking provider.",
  },
];

const airports = [
  { value: "Bengaluru (BLR)", label: "Kempegowda International Airport" },
  { value: "Chennai (MAA)", label: "Chennai International Airport" },
  { value: "Kochi (COK)", label: "Cochin International Airport" },
  { value: "Kolkata (CCU)", label: "Netaji Subhas Chandra Bose International Airport" },
  { value: "Hyderabad (HYD)", label: "Rajiv Gandhi International Airport" },
  { value: "Ahmedabad (AMD)", label: "Sardar Vallabhbhai Patel International Airport" },
  { value: "Dubai (DXB)", label: "Dubai International Airport" },
  { value: "Doha (DOH)", label: "Hamad International Airport" },
  { value: "Bangkok (BKK)", label: "Suvarnabhumi Airport" },
  { value: "Rome (FCO)", label: "Leonardo da Vinci–Fiumicino Airport" },
  { value: "Istanbul (IST)", label: "Istanbul Airport" },
  { value: "London (LHR)", label: "Heathrow Airport" },
  { value: "New York (JFK)", label: "John F. Kennedy International Airport" },
  { value: "Paris (CDG)", label: "Charles de Gaulle Airport" },
  { value: "Tokyo (HND)", label: "Haneda Airport" },
];

function BookingWebsite() {
  const navigate = useNavigate();
  const { updateSearch } = useFlightBooking();
  const [tripType, setTripType] = useState("round-trip");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [travelClass, setTravelClass] = useState("Economy");
  const [additionalLegs, setAdditionalLegs] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [airportsSwapped, setAirportsSwapped] = useState(false);
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const earliestDeparture = today.toISOString().slice(0, 10);

  const airportName = (value) =>
    airports.find((airport) => airport.value === value)?.label ??
    "City, airport or IATA code";
  const needsReturnDate = tripType === "round-trip";
  const hasCompleteAdditionalLegs =
    tripType !== "multi-city" ||
    (additionalLegs.length > 0 &&
      additionalLegs.every((leg) => leg.origin.trim() && leg.destination.trim() && leg.date));
  const canSearch =
    origin.trim() &&
    destination.trim() &&
    departureDate &&
    (!needsReturnDate || (returnDate && returnDate >= departureDate)) &&
    hasCompleteAdditionalLegs;

  function swapAirports() {
    setOrigin(destination);
    setDestination(origin);
    setAirportsSwapped((swapped) => !swapped);
    setSearchMessage("");
  }

  function updateLeg(index, field, value) {
    setAdditionalLegs((legs) =>
      legs.map((leg, legIndex) =>
        legIndex === index ? { ...leg, [field]: value } : leg,
      ),
    );
  }

  function submitFlightSearch(event) {
    event.preventDefault();
    if (tripType === "multi-city") {
      setSearchMessage("Multi-city search is not available in this demo yet. Choose Round Trip or One Way.");
      return;
    }
    updateSearch({
      tripType,
      origin: origin.trim(),
      destination: destination.trim(),
      departureDate,
      returnDate: tripType === "round-trip" ? returnDate : "",
      travellers: Number(passengers),
      cabinClass: travelClass,
      directOnly: false,
    });
    setSearchMessage("");
    navigate("/flights/results");
  }

  function searchHomepageDeal(deal) {
    const departure = new Date();
    departure.setDate(departure.getDate() + 14);
    departure.setMinutes(departure.getMinutes() - departure.getTimezoneOffset());
    updateSearch({
      tripType: "one-way",
      origin: deal.origin,
      destination: deal.destination,
      departureDate: departure.toISOString().slice(0, 10),
      returnDate: "",
      travellers: 1,
      cabinClass: "Economy",
      directOnly: false,
    });
    navigate("/flights/results");
  }

  return (
    <div className="app">
      <div className="page-shell">
        <Navbar />

        <main className="content">
          <section className="hero" id="home">
            <div className="mini-card left-card">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                alt="Coastal travel"
              />
            </div>

            <div className="mini-card right-card">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80"
                alt="Airplane wing"
              />
            </div>

            <div className="hero-copy">
              <h1>
                <span className="hero-title-line hero-title-line-left">Fly Smarter,</span>
                <span className="hero-title-line hero-title-line-right">Explore Further.</span>
              </h1>
              <p className="hero-description">
                Elevate your journey with intelligent travel that takes you
                farther, faster, and with unmatched ease.
              </p>
              <button
                className="primary-btn"
                type="button"
                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Ticket Now
              </button>
            </div>

            <div className="plane-visual">
              <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80"
                alt="Airplane in the sky"
              />
            </div>

            <button
              className="scroll-btn"
              type="button"
              aria-label="Scroll to booking"
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            >
              <ArrowDown size={17} />
            </button>
          </section>

          <section className="booking-area" id="booking">
            <div className="booking-header">
              <div className="booking-heading-copy">
                <p className="booking-eyebrow">PLAN YOUR NEXT JOURNEY</p>
                <h2>Where would you like to go?</h2>
                <p>Compare options and find the right trip for you.</p>
              </div>
            </div>

            <form className="flight-search-card" onSubmit={submitFlightSearch}>
              <div className="flight-search-options">
                <div className="trip-type-control" role="group" aria-label="Trip type">
                  {[
                    { value: "round-trip", label: "Round Trip" },
                    { value: "one-way", label: "One Way" },
                    { value: "multi-city", label: "Multi City" },
                  ].map((type) => (
                    <button
                      key={type.value}
                      className={`trip-type-option${tripType === type.value ? " selected" : ""}`}
                      type="button"
                      aria-pressed={tripType === type.value}
                      onClick={() => {
                        setTripType(type.value);
                        setSearchMessage("");
                      }}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
                <span className="flight-search-caption">Book your next flight</span>
              </div>

              <datalist id="flight-airports">
                {airports.map((airport) => (
                  <option key={airport.value} value={airport.value} />
                ))}
              </datalist>

              <div className="flight-search-fields">
                <div className="flight-airport-pair">
                  <div className="flight-search-field airport-field">
                    <label htmlFor="booking-origin">From</label>
                    <div className="flight-field-control">
                      <MapPin size={18} aria-hidden="true" />
                      <div className="flight-field-text">
                        <input
                          id="booking-origin"
                          autoComplete="off"
                          list="flight-airports"
                          placeholder=""
                          value={origin}
                          onChange={(event) => {
                            setOrigin(event.target.value);
                            setSearchMessage("");
                          }}
                          required
                        />
                        <span>{airportName(origin)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className={`airport-swap-button${airportsSwapped ? " is-swapped" : ""}`}
                    type="button"
                    aria-label="Swap departure and destination"
                    onClick={swapAirports}
                  >
                    <ArrowLeftRight size={16} aria-hidden="true" />
                  </button>

                  <div className="flight-search-field airport-field">
                    <label htmlFor="booking-destination">To</label>
                    <div className="flight-field-control">
                      <PlaneTakeoff size={18} aria-hidden="true" />
                      <div className="flight-field-text">
                        <input
                          id="booking-destination"
                          autoComplete="off"
                          list="flight-airports"
                          placeholder=""
                          value={destination}
                          onChange={(event) => {
                            setDestination(event.target.value);
                            setSearchMessage("");
                          }}
                          required
                        />
                        <span>{airportName(destination)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flight-search-field">
                  <label htmlFor="booking-departure">Departure</label>
                  <div className="flight-field-control">
                    <CalendarDays size={18} aria-hidden="true" />
                    <input
                      id="booking-departure"
                      aria-label="Departure date"
                      type="date"
                      min={earliestDeparture}
                      value={departureDate}
                      onChange={(event) => {
                        setDepartureDate(event.target.value);
                        setSearchMessage("");
                      }}
                      required
                    />
                  </div>
                </div>

                {needsReturnDate && (
                  <div className="flight-search-field">
                    <label htmlFor="booking-return">Return</label>
                    <div className="flight-field-control">
                      <CalendarDays size={18} aria-hidden="true" />
                      <input
                        id="booking-return"
                        aria-label="Return date"
                        type="date"
                        min={departureDate || earliestDeparture}
                        value={returnDate}
                        onChange={(event) => {
                          setReturnDate(event.target.value);
                          setSearchMessage("");
                        }}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="flight-search-field passenger-field">
                  <label htmlFor="booking-passengers">Passengers &amp; Class</label>
                  <div className="flight-field-control passenger-control">
                    <UserRound size={18} aria-hidden="true" />
                    <select
                      id="booking-passengers"
                      aria-label="Number of adult passengers"
                      value={passengers}
                      onChange={(event) => setPassengers(event.target.value)}
                    >
                      <option value="1">1 Adult</option>
                      <option value="2">2 Adults</option>
                      <option value="3">3 Adults</option>
                      <option value="4">4 Adults</option>
                      <option value="5">5 Adults</option>
                      <option value="6">6 Adults</option>
                    </select>
                    <span className="passenger-divider" aria-hidden="true" />
                    <select
                      aria-label="Travel class"
                      value={travelClass}
                      onChange={(event) => setTravelClass(event.target.value)}
                    >
                      <option>Economy</option>
                      <option>Premium Economy</option>
                      <option>Business</option>
                      <option>First</option>
                    </select>
                  </div>
                </div>
              </div>

              {tripType === "multi-city" && (
                <div className="additional-flight-legs">
                  {additionalLegs.map((leg, index) => (
                    <div className="additional-flight-row" key={leg.id}>
                      <div className="flight-search-field">
                        <label htmlFor={`multi-city-origin-${leg.id}`}>Flight {index + 2} from</label>
                        <div className="flight-field-control">
                          <MapPin size={18} aria-hidden="true" />
                          <input
                            id={`multi-city-origin-${leg.id}`}
                            aria-label={`Flight ${index + 2} origin`}
                            list="flight-airports"
                            placeholder="City or airport"
                            value={leg.origin}
                            onChange={(event) => updateLeg(index, "origin", event.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="flight-search-field">
                        <label htmlFor={`multi-city-destination-${leg.id}`}>To</label>
                        <div className="flight-field-control">
                          <PlaneTakeoff size={18} aria-hidden="true" />
                          <input
                            id={`multi-city-destination-${leg.id}`}
                            aria-label={`Flight ${index + 2} destination`}
                            list="flight-airports"
                            placeholder="City or airport"
                            value={leg.destination}
                            onChange={(event) => updateLeg(index, "destination", event.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="flight-search-field">
                        <label htmlFor={`multi-city-date-${leg.id}`}>Departure</label>
                        <div className="flight-field-control">
                          <CalendarDays size={18} aria-hidden="true" />
                          <input
                            id={`multi-city-date-${leg.id}`}
                            aria-label={`Flight ${index + 2} departure date`}
                            type="date"
                            min={
                              additionalLegs[index - 1]?.date ||
                              departureDate ||
                              earliestDeparture
                            }
                            value={leg.date}
                            onChange={(event) => updateLeg(index, "date", event.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <button
                        className="remove-flight-leg"
                        type="button"
                        aria-label={`Remove flight ${index + 2}`}
                        onClick={() =>
                          setAdditionalLegs((legs) => legs.filter((item) => item.id !== leg.id))
                        }
                      >
                        <X size={17} aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                  <button
                    className="add-flight-leg"
                    type="button"
                    onClick={() =>
                      setAdditionalLegs((legs) => [
                        ...legs,
                        { id: `${Date.now()}-${legs.length}`, origin: "", destination: "", date: "" },
                      ])
                    }
                  >
                    <Plus size={15} aria-hidden="true" />
                    Add another flight
                  </button>
                </div>
              )}

              <div className="flight-search-submit-row">
                <span className="flight-search-assurance">
                  <Users size={15} aria-hidden="true" />
                  Flexible options for your journey
                </span>
                <button className="flight-search-submit" type="submit" disabled={!canSearch}>
                  <Search size={17} aria-hidden="true" />
                  Search Flights
                </button>
              </div>
              {searchMessage && (
                <p className="flight-search-message" role="status">
                  {searchMessage}
                </p>
              )}
            </form>
          </section>

          <section className="homepage-benefits" aria-labelledby="homepage-benefits-title">
            <div className="homepage-section-heading">
              <p className="booking-eyebrow">TRAVEL, MADE CLEARER</p>
              <h2 id="homepage-benefits-title">The details that make planning easier.</h2>
              <p>Helpful options and clear information, from your first search to takeoff.</p>
            </div>
            <div className="homepage-benefit-grid">
              <article className="homepage-benefit-card">
                <span className="homepage-benefit-icon benefit-icon-lilac"><TicketCheck size={20} aria-hidden="true" /></span>
                <h3>Compare in one place</h3>
                <p>Review schedules, stops, airlines, and fares together to find the trip that suits you.</p>
              </article>
              <article className="homepage-benefit-card">
                <span className="homepage-benefit-icon benefit-icon-green"><BadgeCheck size={20} aria-hidden="true" /></span>
                <h3>Know what your fare includes</h3>
                <p>Check baggage and fare details before continuing with your flight selection.</p>
              </article>
              <article className="homepage-benefit-card">
                <span className="homepage-benefit-icon benefit-icon-blue"><ShieldCheck size={20} aria-hidden="true" /></span>
                <h3>Simple booking steps</h3>
                <p>Follow a clear path from flight details to passenger information and confirmation.</p>
              </article>
              <article className="homepage-benefit-card">
                <span className="homepage-benefit-icon benefit-icon-amber"><Headphones size={20} aria-hidden="true" /></span>
                <h3>Support when you need it</h3>
                <p>Our team can help with questions as you plan your next journey.</p>
              </article>
            </div>
          </section>

          <section className="homepage-deals" aria-labelledby="homepage-deals-title">
            <div className="homepage-section-heading homepage-section-heading-row">
              <div>
                <p className="booking-eyebrow">A LITTLE INSPIRATION</p>
                <h2 id="homepage-deals-title">Sample fares to get you going.</h2>
                <p>Explore a few popular routes and compare the available flights.</p>
              </div>
              <button className="homepage-text-link" type="button" onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}>
                Build your own search <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>
            <div className="homepage-deal-grid">
              {homepageDeals.map((deal) => (
                <article className="homepage-deal-card" key={`${deal.origin}-${deal.destination}`}>
                  <div className="homepage-deal-image" style={{ backgroundImage: `linear-gradient(180deg, transparent 42%, rgba(12, 18, 26, 0.62)), url(${deal.image})` }}>
                    <span>{deal.country}</span>
                  </div>
                  <div className="homepage-deal-info">
                    <div><h3>{deal.city}</h3><p>{deal.origin.split(" (")[0]} <ArrowRight size={13} aria-hidden="true" /> {deal.city}</p></div>
                    <div className="homepage-deal-price"><small>Sample one-way fares from</small><strong>${deal.price}</strong></div>
                  </div>
                  <button type="button" onClick={() => searchHomepageDeal(deal)}>Explore flights <ArrowRight size={14} aria-hidden="true" /></button>
                </article>
              ))}
            </div>
            <p className="homepage-deals-note">Sample prices are for demonstration and may not reflect live fares.</p>
          </section>

          <section className="destination-grid" id="destinations">
            {destinations.map((destination, index) => (
              <a
                key={`${destination.city}-${index}`}
                className="destination-card-link"
                href={destination.href || "#booking"}
                target={destination.href ? "_blank" : undefined}
                rel={destination.href ? "noreferrer" : undefined}
              >
                <article
                  className="destination-card"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(18, 27, 39, 0.14), rgba(10, 10, 15, 0.72)), url(${destination.image})`,
                  }}
                >
                  <div className="card-tag">
                    <Plane size={12} />
                    Flights
                  </div>

                  <div className="card-info">
                    <span className="destination-rating-empty">No ratings yet</span>
                    <h3>{destination.city}</h3>
                    <p>{destination.text}</p>
                  </div>
                </article>
              </a>
            ))}
          </section>

          <section className="homepage-travel-services" id="travel-services" aria-labelledby="travel-services-title">
            <div className="homepage-section-heading homepage-section-heading-row">
              <div>
                <p className="booking-eyebrow">MORE FOR YOUR JOURNEY</p>
                <h2 id="travel-services-title">Make the whole trip yours.</h2>
                <p>We’re working on a few more ways to make travel planning easier.</p>
              </div>
              <Link className="homepage-text-link" to="/flights/search">
                Search flights <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className="homepage-service-grid">
              <article className="homepage-service-card">
                <div
                  className="homepage-service-image"
                  style={{ backgroundImage: "linear-gradient(180deg, transparent 25%, rgba(15, 22, 29, 0.55)), url(https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80)" }}
                >
                  <span className="homepage-service-icon"><Hotel size={20} aria-hidden="true" /></span>
                  <span className="homepage-service-status">Coming soon</span>
                </div>
                <div className="homepage-service-copy">
                  <h3>Find a place to stay</h3>
                  <p>Discover welcoming hotels and stays to make every stop feel like part of the adventure.</p>
                </div>
              </article>
              <article className="homepage-service-card">
                <div
                  className="homepage-service-image"
                  style={{ backgroundImage: "linear-gradient(180deg, transparent 25%, rgba(15, 22, 29, 0.55)), url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80)" }}
                >
                  <span className="homepage-service-icon"><CarFront size={20} aria-hidden="true" /></span>
                  <span className="homepage-service-status">Coming soon</span>
                </div>
                <div className="homepage-service-copy">
                  <h3>Get around your way</h3>
                  <p>Plan ahead with car rental options for city drives, scenic routes, and everything between.</p>
                </div>
              </article>
              <article className="homepage-service-card">
                <div
                  className="homepage-service-image"
                  style={{ backgroundImage: "linear-gradient(180deg, transparent 25%, rgba(15, 22, 29, 0.55)), url(https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80)" }}
                >
                  <span className="homepage-service-icon"><BusFront size={20} aria-hidden="true" /></span>
                  <span className="homepage-service-status">Coming soon</span>
                </div>
                <div className="homepage-service-copy">
                  <h3>Arrive with ease</h3>
                  <p>Airport transfers and local rides will help connect the little details of your journey.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="stats" id="about">
            <div className="stat-item">
              <strong>0</strong>
              <span>Happy travelers</span>
            </div>
            <div className="stat-item">
              <strong>0.0/5</strong>
              <span>Average guest rating</span>
            </div>
            <div className="stat-item">
              <strong>0</strong>
              <span>Destinations to discover</span>
            </div>
            <div className="stat-item">
              <strong>0</strong>
              <span>Countries served</span>
            </div>
          </section>

          <section className="homepage-testimonials" aria-labelledby="homepage-testimonials-title">
            <div className="homepage-section-heading">
              <p className="booking-eyebrow">NOTES FROM THE JOURNEY</p>
              <h2 id="homepage-testimonials-title">Traveler reviews</h2>
            </div>
            <p className="homepage-no-reviews">No reviews or ratings yet. Check back after our first trips.</p>
          </section>

          <section className="homepage-faq" aria-labelledby="homepage-faq-title">
            <div className="homepage-section-heading">
              <p className="booking-eyebrow">GOOD TO KNOW</p>
              <h2 id="homepage-faq-title">A few helpful answers.</h2>
            </div>
            <div className="homepage-faq-list">
              {homepageFaqs.map((faq) => (
                <details className="homepage-faq-item" key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </main>

        <div className="footer-gallery" aria-label="Flight and destination photos">
          <div className="footer-gallery-track">
            {[false, true].map((isDuplicate) => (
              <div
                className="footer-photo-group"
                key={isDuplicate ? "duplicate" : "original"}
                aria-hidden={isDuplicate || undefined}
              >
                {footerPhotos.map((photo) => (
                  <figure className="footer-photo" key={photo.label}>
                    <img src={photo.image} alt={isDuplicate ? "" : photo.label} />
                    {!isDuplicate && <figcaption>{photo.label}</figcaption>}
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>

        <footer className="site-footer">
          <div className="footer-cta">
            <div>
              <p className="footer-eyebrow">YOUR NEXT ADVENTURE STARTS HERE</p>
              <h2>Ready to explore somewhere new?</h2>
            </div>
            <a className="footer-cta-link" href="#booking">
              Plan your trip <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="footer-main">
            <div className="footer-brand">
              <a className="footer-logo" href="#home" aria-label="xxxxxx home">
                <PlaneTakeoff size={19} aria-hidden="true" />
                <span>xxxxxx</span>
              </a>
              <p>
                Thoughtful travel inspiration for the journeys you can’t wait
                to take.
              </p>
            </div>

            <nav className="footer-column" aria-label="Explore">
              <h3>Explore</h3>
              <a href="#destinations">Top destinations</a>
              <a href="#booking">Find a flight</a>
              <a href="#home">Travel inspiration</a>
            </nav>

            <nav className="footer-column" aria-label="Company">
              <h3>Company</h3>
              <a href="#about">About us</a>
              <a href="#destinations">Our destinations</a>
              <a href="#booking">Plan your journey</a>
            </nav>

            <nav className="footer-column" aria-label="Travel help">
              <h3>Travel help</h3>
              <a href="#booking">Booking options</a>
              <a href="#travel-services">Hotels and car rentals</a>
              <a href="#travel-services">Airport transfers</a>
              <a href="#home">Back to top</a>
            </nav>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} xxxxxx. All rights reserved.</span>
            <a href="#home">
              Made for curious travellers <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <FlightBookingProvider>
        <Routes>
          <Route path="/" element={<BookingWebsite />} />
          <Route path="/admin/setup" element={<AuthPage />} />
          <Route path="/admin/sign-in" element={<AuthPage />} />
          <Route path="/flights/search" element={<FlightSearch />} />
          <Route path="/flights/results" element={<FlightResults />} />
          <Route path="/flights/details/:flightId" element={<FlightDetails />} />
          <Route path="/flights/passengers" element={<PassengerDetails />} />
          <Route path="/flights/confirmation/:bookingId" element={<BookingConfirmation />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:bookingId" element={<BookingDetails />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="upcoming" element={<UpcomingTrips />} />
            <Route path="guests" element={<Guests />} />
            <Route path="guests/:guestId" element={<Guests />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </FlightBookingProvider>
    </AuthProvider>
  );
}

export default App;
