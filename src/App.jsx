import {
  ArrowDown,
  CalendarDays,
  Car,
  Hotel,
  MapPin,
  Plane,
  Star,
  Users,
} from "lucide-react";
import Navbar from "./components/Navbar.jsx";
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
    city: "Mumbai, India",
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
    city: "Paris, France",
    text: "A globally loved destination with timeless charm, romance, and classic views.",
    image:
      "https://images.unsplash.com/photo-1505761671935-60eb3f5f7f30?auto=format&fit=crop&w=900&q=80",
  },
];

function App() {
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
              <p className="hero-kicker">Flight Booking</p>
              <h1>
                Fly Smarter,
                <br />
                Explore Further.
              </h1>
              <p className="hero-description">
                Elevate your journey with intelligent travel that takes you
                farther, faster, and with unmatched ease.
              </p>
              <button className="primary-btn" type="button">
                Get Ticket Now
              </button>
            </div>

            <div className="plane-visual">
              <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80"
                alt="Airplane in the sky"
              />
            </div>

            <button className="scroll-btn" type="button" aria-label="Scroll down">
              <ArrowDown size={17} />
            </button>
          </section>

          <section className="booking-area" id="booking">
            <div className="booking-header">
              <h2>
                Explore New Horizons,
                <br />
                One Destination at a Time.
              </h2>

              <div className="option-tabs">
                <button className="tab-btn active" type="button">
                  <Plane size={13} />
                  Flights
                </button>
                <button className="tab-btn" type="button">
                  <Hotel size={13} />
                  Hotels
                </button>
                <button className="tab-btn" type="button">
                  <Car size={13} />
                  Cars
                </button>
              </div>
            </div>

            <div className="search-bar">
              <div className="field">
                <label>From</label>
                <div className="field-value">
                  <MapPin size={14} />
                  <span>Origin</span>
                </div>
              </div>

              <div className="field">
                <label>To</label>
                <div className="field-value">
                  <MapPin size={14} />
                  <span>Destination</span>
                </div>
              </div>

              <div className="field">
                <label>Departure</label>
                <div className="field-value">
                  <CalendarDays size={14} />
                  <span>02/04/2025</span>
                </div>
              </div>

              <div className="field">
                <label>Guests</label>
                <div className="field-value">
                  <Users size={14} />
                  <span>2 Guests</span>
                </div>
              </div>

              <button className="primary-btn search-btn" type="button">
                Get Ticket Now
              </button>
            </div>
          </section>

          <section className="destination-grid" id="destinations">
            {destinations.map((destination, index) => (
              <a
                key={`${destination.city}-${index}`}
                className="destination-card-link"
                href={destination.href || "#"}
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
              <span>Unique Decors from</span>
            </div>
            <div className="stat-item">
              <strong>4.9/5</strong>
              <span>Star Rating from our clients</span>
            </div>
            <div className="stat-item">
              <strong>1,200+</strong>
              <span>Successful Home Transformations</span>
            </div>
            <div className="stat-item">
              <strong>50+</strong>
              <span>Talented Team of Designers</span>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;