import {
  ArrowDown,
  ArrowLeftRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Plane,
  PlaneTakeoff,
  Plus,
  Search,
  Star,
  Users,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
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

const airports = [
  { value: "Bengaluru (BLR)", label: "Kempegowda International Airport" },
  { value: "Dubai (DXB)", label: "Dubai International Airport" },
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
                    <div className="stars" aria-label="5 star rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill="currentColor" strokeWidth={1.5} />
                      ))}
                    </div>
                    <h3>{destination.city}</h3>
                    <p>{destination.text}</p>
                  </div>
                </article>
              </a>
            ))}
          </section>

          <section className="stats" id="about">
            <div className="stat-item">
              <strong>50,000+</strong>
              <span>Happy travelers</span>
            </div>
            <div className="stat-item">
              <strong>4.9/5</strong>
              <span>Average guest rating</span>
            </div>
            <div className="stat-item">
              <strong>1,200+</strong>
              <span>Destinations to discover</span>
            </div>
            <div className="stat-item">
              <strong>50+</strong>
              <span>Countries served</span>
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
              <a href="#booking">Hotels and car rentals</a>
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
    <FlightBookingProvider>
      <Routes>
        <Route path="/" element={<BookingWebsite />} />
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
  );
}

export default App;
