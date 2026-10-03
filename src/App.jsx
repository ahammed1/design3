import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BusFront,
  CarFront,
  ChevronLeft,
  ChevronRight,
  Compass,
  Heart,
  Hotel,
  Landmark,
  LifeBuoy,
  MapPin,
  Mountain,
  Palmtree,
  PlaneTakeoff,
  Star,
  Sparkles,
  Users,
  WandSparkles,
} from "lucide-react";
import { useRef, useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AuthPage from "./auth/AuthPage.jsx";
import { AuthProvider } from "./auth/AuthProvider.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import DashboardLayout from "./dashboard/DashboardLayout.jsx";
import Analytics from "./dashboard/pages/Analytics.jsx";
import BookingDetails from "./dashboard/pages/BookingDetails.jsx";
import Bookings from "./dashboard/pages/Bookings.jsx";
import Guests from "./dashboard/pages/Guests.jsx";
import Settings from "./dashboard/pages/Settings.jsx";
import UpcomingTrips from "./dashboard/pages/UpcomingTrips.jsx";
import "./App.css";

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

const seasonalDestinations = [
  {
    season: "Winter sun",
    city: "Dubai",
    country: "United Arab Emirates",
    description: "Warm days, open-air evenings, and striking city views.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=820&q=78",
  },
  {
    season: "Spring city breaks",
    city: "Paris",
    country: "France",
    description: "A lovely season for long walks and neighbourhood cafés.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=820&q=78",
  },
  {
    season: "Summer discoveries",
    city: "Singapore",
    country: "Singapore",
    description: "Garden paths, waterfront views, and delicious late nights.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=820&q=78",
  },
  {
    season: "Autumn culture",
    city: "Tokyo",
    country: "Japan",
    description: "Explore lively streets, peaceful temples, and seasonal colour.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=820&q=78",
  },
];

const popularDestinations = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    description: "A striking mix of desert calm and city energy.",
    bestFor: "Luxury & family breaks",
    interests: ["Luxury escapes", "Family trips", "Culture & heritage"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=780&q=78",
  },
  {
    city: "Maldives",
    country: "Maldives",
    description: "Turquoise lagoons, quiet islands, and slow days by the sea.",
    bestFor: "Beach & honeymoon",
    interests: ["Beach holidays", "Honeymoon", "Luxury escapes"],
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=780&q=78",
  },
  {
    city: "Bali",
    country: "Indonesia",
    description: "Green landscapes, island air, and room to unwind.",
    bestFor: "Culture & couples",
    interests: ["Beach holidays", "Honeymoon", "Adventure", "Culture & heritage"],
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=780&q=78",
  },
  {
    city: "Paris",
    country: "France",
    description: "Slow mornings, grand avenues, and little cafés.",
    bestFor: "Culture & couples",
    interests: ["Honeymoon", "Luxury escapes", "Culture & heritage"],
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=780&q=78",
  },
  {
    city: "Switzerland",
    country: "Switzerland",
    description: "Alpine scenery, lakeside towns, and scenic rail journeys.",
    bestFor: "Adventure & family",
    interests: ["Adventure", "Family trips", "Luxury escapes"],
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=780&q=78",
  },
  {
    city: "Singapore",
    country: "Singapore",
    description: "Waterfront gardens, delicious food, and lively city days.",
    bestFor: "Family & city breaks",
    interests: ["Family trips", "Culture & heritage", "Luxury escapes"],
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=780&q=78",
  },
  {
    city: "Thailand",
    country: "Thailand",
    description: "Island escapes, vivid markets, and rich local traditions.",
    bestFor: "Beach & adventure",
    interests: ["Beach holidays", "Adventure", "Culture & heritage"],
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=780&q=78",
  },
  {
    city: "London",
    country: "United Kingdom",
    description: "Historic corners and a different plan every day.",
    bestFor: "Family & culture",
    interests: ["Family trips", "Culture & heritage", "Luxury escapes"],
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=780&q=78",
  },
];

const holidayPackages = [
  {
    name: "Dubai Escape",
    destination: "Dubai, United Arab Emirates",
    duration: "4 Nights / 5 Days",
    type: "Luxury",
    interests: ["Luxury escapes", "Family trips", "Culture & heritage"],
    description: "A city stay with landmark views, desert discovery, and time to unwind.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Maldives Paradise",
    destination: "Maldives",
    duration: "3 Nights / 4 Days",
    type: "Honeymoon",
    interests: ["Beach holidays", "Honeymoon", "Luxury escapes"],
    description: "An island retreat with blue-water views and unhurried beach days.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Bali Experience",
    destination: "Bali, Indonesia",
    duration: "5 Nights / 6 Days",
    type: "Cultural",
    interests: ["Beach holidays", "Honeymoon", "Adventure", "Culture & heritage"],
    description: "Explore lush landscapes, local traditions, and beautiful island shores.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Swiss Adventure",
    destination: "Switzerland",
    duration: "6 Nights / 7 Days",
    type: "Adventure",
    interests: ["Adventure", "Family trips", "Luxury escapes"],
    description: "Discover mountain scenery, lakeside towns, and memorable alpine journeys.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80",
  },
];

const travelExperiences = [
  {
    name: "Desert safari",
    location: "Dubai",
    description: "Take in golden dunes, wide-open skies, and an evening in the desert.",
    image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Island hopping",
    location: "Thailand",
    description: "Spend a day discovering clear-water coves and laid-back island life.",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mountain trekking",
    location: "Switzerland",
    description: "Follow scenic trails through fresh alpine air and dramatic landscapes.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "City tours",
    location: "Paris",
    description: "See celebrated landmarks and charming neighbourhoods at your own pace.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Cultural experiences",
    location: "Bali",
    description: "Connect with local art, traditions, and the stories behind each place.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Scuba diving",
    location: "Maldives",
    description: "Explore the colour and calm of a vibrant world beneath the water.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
  },
];

const travelInterests = [
  { label: "Beach holidays", icon: Palmtree },
  { label: "Honeymoon", icon: Heart },
  { label: "Family trips", icon: Users },
  { label: "Adventure", icon: Mountain },
  { label: "Luxury escapes", icon: Sparkles },
  { label: "Culture & heritage", icon: Landmark },
];

const agencyBenefits = [
  {
    title: "Trips shaped around you",
    description: "Choose a ready-made holiday or build an itinerary around your interests.",
    icon: WandSparkles,
  },
  {
    title: "More than a destination",
    description: "Bring stays, guided tours, local experiences, and time to explore together.",
    icon: Compass,
  },
  {
    title: "Options for every kind of traveler",
    description: "Find inspiration for couples, families, adventurers, and culture seekers.",
    icon: Heart,
  },
  {
    title: "Helpful travel assistance",
    description: "Get practical guidance as you plan the details of your next trip.",
    icon: LifeBuoy,
  },
];

function BookingWebsite() {
  const destinationScroller = useRef(null);
  const [seasonalIndex, setSeasonalIndex] = useState(0);
  const [selectedInterest, setSelectedInterest] = useState(travelInterests[0].label);
  const [travelerReviews, setTravelerReviews] = useState([]);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewDestination, setReviewDestination] = useState("");
  const [reviewRating, setReviewRating] = useState("5");
  const [reviewText, setReviewText] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");
  const seasonalDestination = seasonalDestinations[seasonalIndex];

  function scrollDestinations(direction) {
    const scroller = destinationScroller.current;
    if (!scroller) return;
    scroller.scrollBy({
      left: direction * scroller.clientWidth * 0.8,
      behavior: "smooth",
    });
  }

  function showSeasonalDestination(direction) {
    setSeasonalIndex((index) =>
      (index + direction + seasonalDestinations.length) % seasonalDestinations.length,
    );
  }

  function submitTravelerReview(event) {
    event.preventDefault();
    const review = {
      id: `${Date.now()}-${reviewAuthor.trim()}`,
      author: reviewAuthor.trim(),
      destination: reviewDestination.trim(),
      rating: Number(reviewRating),
      text: reviewText.trim(),
    };
    setTravelerReviews((reviews) => [review, ...reviews]);
    setReviewAuthor("");
    setReviewDestination("");
    setReviewRating("5");
    setReviewText("");
    setReviewStatus("Thank you. Your review has been added for this session.");
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
                onClick={() => document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore destinations
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
              aria-label="Scroll to destinations"
              onClick={() => document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" })}
            >
              <ArrowDown size={17} />
            </button>
          </section>

          <section className="homepage-travel-services" id="travel-services" aria-labelledby="travel-services-title">
            <div className="homepage-section-heading homepage-section-heading-row">
              <div>
                <p className="booking-eyebrow">MORE FOR YOUR JOURNEY</p>
                <h2 id="travel-services-title">Make the whole trip yours.</h2>
                <p>We’re working on a few more ways to make travel planning easier.</p>
              </div>
              <Link className="homepage-text-link" to="#destinations">
                Explore destinations <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className="homepage-service-grid">
              <article className="homepage-service-card homepage-service-hotel">
                <div
                  className="homepage-service-image"
                  style={{ backgroundImage: "linear-gradient(180deg, transparent 25%, rgba(15, 22, 29, 0.55)), url(https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=85)" }}
                >
                  <span className="homepage-service-icon"><Hotel size={20} aria-hidden="true" /></span>
                  <span className="homepage-service-status">Coming soon</span>
                </div>
                <div className="homepage-service-copy">
                  <h3>Find a place to stay</h3>
                  <p>Discover welcoming hotels and stays to make every stop feel like part of the adventure.</p>
                </div>
              </article>
              <article className="homepage-service-card homepage-service-car">
                <div
                  className="homepage-service-image"
                  style={{ backgroundImage: "linear-gradient(180deg, transparent 25%, rgba(15, 22, 29, 0.48)), url(https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=85)" }}
                >
                  <span className="homepage-service-icon"><CarFront size={20} aria-hidden="true" /></span>
                  <span className="homepage-service-status">Coming soon</span>
                </div>
                <div className="homepage-service-copy">
                  <h3>Find your perfect drive</h3>
                  <p>From compact city cars to roomy road-trip rides, pick up the keys and explore at your own pace.</p>
                </div>
              </article>
              <article className="homepage-service-card homepage-service-transfer">
                <div
                  className="homepage-service-image"
                  style={{ backgroundImage: "linear-gradient(180deg, rgba(15, 22, 29, 0.08), rgba(15, 22, 29, 0.62)), url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=85)" }}
                >
                  <span className="homepage-service-icon"><BusFront size={20} aria-hidden="true" /></span>
                  <span className="homepage-service-status">Coming soon</span>
                </div>
                <div className="homepage-service-copy">
                  <h3>From runway to roadway</h3>
                  <p>Airport pickups and local transfers to make every connection feel effortless.</p>
                </div>
              </article>
            </div>
          </section>

          <section className="homepage-testimonials" aria-labelledby="homepage-testimonials-title">
            <div className="homepage-section-heading">
              <p className="booking-eyebrow">SHARE YOUR EXPERIENCE</p>
              <h2 id="homepage-testimonials-title">Write a traveler review</h2>
              <p>Tell others what made your journey memorable.</p>
            </div>
            <form
              className="homepage-review-form"
              onSubmit={submitTravelerReview}
            >
              <div className="homepage-review-fields">
                <label className="homepage-review-field">
                  <span>Your name</span>
                  <input
                    autoComplete="name"
                    maxLength={60}
                    onChange={(event) => setReviewAuthor(event.target.value)}
                    placeholder="e.g. Alex Morgan"
                    required
                    value={reviewAuthor}
                  />
                </label>
                <label className="homepage-review-field">
                  <span>Destination</span>
                  <input
                    maxLength={80}
                    onChange={(event) => setReviewDestination(event.target.value)}
                    placeholder="Where did you travel?"
                    required
                    value={reviewDestination}
                  />
                </label>
                <label className="homepage-review-field">
                  <span>Your rating</span>
                  <select
                    onChange={(event) => setReviewRating(event.target.value)}
                    value={reviewRating}
                  >
                    <option value="5">5 — Excellent</option>
                    <option value="4">4 — Very good</option>
                    <option value="3">3 — Good</option>
                    <option value="2">2 — Fair</option>
                    <option value="1">1 — Needs improvement</option>
                  </select>
                </label>
                <label className="homepage-review-field homepage-review-field-message">
                  <span>Your review</span>
                  <textarea
                    maxLength={1000}
                    onChange={(event) => setReviewText(event.target.value)}
                    placeholder="Share a little about your travel experience..."
                    required
                    rows={4}
                    value={reviewText}
                  />
                </label>
              </div>
              <div className="homepage-review-submit-row">
                <p>Reviews are kept in this page session and are not saved.</p>
                <button className="homepage-review-submit" type="submit">
                  Submit review <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
              {reviewStatus && <p className="homepage-review-status" role="status">{reviewStatus}</p>}
            </form>
            {travelerReviews.length > 0 && (
              <div className="homepage-review-grid" aria-label="Reviews submitted this session">
                {travelerReviews.map((review) => (
                  <article className="homepage-review-card" key={review.id}>
                    <div className="homepage-review-rating" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }, (_, index) => (
                        <Star key={index} size={15} fill="currentColor" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="homepage-review-text">“{review.text}”</p>
                    <div className="homepage-review-footer">
                      <span className="homepage-review-avatar" aria-hidden="true">
                        {review.author.charAt(0).toUpperCase()}
                      </span>
                      <span>
                        <strong>{review.author}</strong>
                        <small>{review.destination}</small>
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="home-extra-section home-popular-destinations" id="destinations" aria-labelledby="home-popular-destinations-title">
            <div className="home-extra-heading">
              <p className="booking-eyebrow">A PLACE TO BEGIN</p>
              <h2 id="home-popular-destinations-title">Explore the world</h2>
              <p>Find a place that fits the kind of journey you want to take.</p>
            </div>
            <div className="home-destination-carousel">
              <button
                className="home-destination-scroll-button home-destination-scroll-previous"
                type="button"
                aria-label="Scroll to previous destinations"
                onClick={() => scrollDestinations(-1)}
              >
                <ChevronLeft size={21} aria-hidden="true" />
              </button>
              <div
                className="home-destination-marquee"
                role="region"
                aria-label="Popular destinations"
                tabIndex={0}
                ref={destinationScroller}
              >
                <div className="home-destination-track">
                  {popularDestinations.map((destination) => (
                    <article
                      className="home-destination-card"
                      key={destination.city}
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(10, 16, 22, 0.04) 18%, rgba(10, 16, 22, 0.78) 100%), url(${destination.image})`,
                      }}
                    >
                      <span className="home-destination-country">{destination.country}</span>
                      <div className="home-destination-copy">
                        <h3>{destination.city}</h3>
                        <p>{destination.description}</p>
                        <span className="home-destination-best-for">Best for: {destination.bestFor}</span>
                        <Link to="#destinations">
                          Explore <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <button
                className="home-destination-scroll-button home-destination-scroll-next"
                type="button"
                aria-label="Scroll to more destinations"
                onClick={() => scrollDestinations(1)}
              >
                <ChevronRight size={21} aria-hidden="true" />
              </button>
            </div>
          </section>

          <section className="home-extra-section home-holiday-packages" aria-labelledby="home-holiday-packages-title">
            <div className="home-extra-heading">
              <p className="booking-eyebrow">CURATED GETAWAYS</p>
              <h2 id="home-holiday-packages-title">Popular holiday packages</h2>
              <p>Thoughtfully planned stays to help make every day of your trip count.</p>
            </div>
            <div className="home-package-grid">
              {holidayPackages.map((holiday) => (
                <article className="home-package-card" key={holiday.name}>
                  <div
                    className="home-package-image"
                    style={{ backgroundImage: `linear-gradient(180deg, transparent 34%, rgba(10, 16, 22, 0.68)), url(${holiday.image})` }}
                    role="img"
                    aria-label={holiday.destination}
                  >
                    <span>{holiday.type}</span>
                  </div>
                  <div className="home-package-copy">
                    <p className="home-package-duration">{holiday.duration}</p>
                    <h3>{holiday.name}</h3>
                    <p className="home-package-destination">{holiday.destination}</p>
                    <p className="home-package-description">{holiday.description}</p>
                    <div className="home-package-footer">
                      <a href="#travel-interests">View package <ArrowRight size={14} aria-hidden="true" /></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="home-extra-section home-travel-interests" id="travel-interests" aria-labelledby="home-travel-interests-title">
            <div className="home-extra-heading">
              <p className="booking-eyebrow">YOUR TRIP, YOUR WAY</p>
              <h2 id="home-travel-interests-title">Travel your way</h2>
              <p>Choose what inspires you to see matching holiday ideas.</p>
            </div>
            <div className="home-interest-tabs" role="group" aria-label="Filter trips by interest">
              {travelInterests.map(({ label, icon: Icon }) => (
                <button
                  className={`home-interest-tab${selectedInterest === label ? " is-selected" : ""}`}
                  key={label}
                  type="button"
                  aria-pressed={selectedInterest === label}
                  onClick={() => setSelectedInterest(label)}
                >
                  <Icon size={17} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
            <div className="home-interest-results" aria-live="polite">
              <h3>{selectedInterest} ideas</h3>
              <div className="home-interest-package-list">
                {holidayPackages
                  .filter((holiday) => holiday.interests.includes(selectedInterest))
                  .map((holiday) => (
                    <article className="home-interest-package" key={holiday.name}>
                      <img src={holiday.image} alt="" />
                      <span><strong>{holiday.name}</strong><small>{holiday.destination} · {holiday.duration}</small></span>
                      <a href="#home-holiday-packages-title" aria-label={`View ${holiday.name} package`}>
                        View <ArrowRight size={14} aria-hidden="true" />
                      </a>
                    </article>
                  ))}
              </div>
            </div>
          </section>

          <section className="home-extra-section home-travel-experiences" aria-labelledby="home-travel-experiences-title">
            <div className="home-extra-heading">
              <p className="booking-eyebrow">MAKE MEMORIES ALONG THE WAY</p>
              <h2 id="home-travel-experiences-title">Experiences you’ll remember</h2>
              <p>Discover the moments, places, and local experiences that bring a trip to life.</p>
            </div>
            <div className="home-experience-grid">
              {travelExperiences.map((experience) => (
                <article className="home-experience-card" key={experience.name}>
                  <div
                    className="home-experience-image"
                    style={{ backgroundImage: `linear-gradient(180deg, transparent 35%, rgba(10, 16, 22, 0.68)), url(${experience.image})` }}
                    role="img"
                    aria-label={experience.name}
                  >
                    <span><MapPin size={13} aria-hidden="true" />{experience.location}</span>
                  </div>
                  <div className="home-experience-copy">
                    <h3>{experience.name}</h3>
                    <p>{experience.description}</p>
                    <a href="#travel-interests">Explore <ArrowRight size={14} aria-hidden="true" /></a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="home-extra-section home-agency-benefits" id="about" aria-labelledby="home-agency-benefits-title">
            <div className="home-extra-heading">
              <p className="booking-eyebrow">YOUR TRAVEL PARTNER</p>
              <h2 id="home-agency-benefits-title">Why choose our travel agency</h2>
              <p>Support for the whole journey, from the first idea to the details along the way.</p>
            </div>
            <div className="home-agency-benefit-grid">
              {agencyBenefits.map(({ title, description, icon: Icon }) => (
                <article className="home-agency-benefit-card" key={title}>
                  <span><Icon size={19} aria-hidden="true" /></span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="home-extra-cta" aria-labelledby="home-extra-cta-title">
            <div>
              <p className="booking-eyebrow">YOUR NEXT CHAPTER</p>
              <h2 id="home-extra-cta-title">Ready for your next adventure?</h2>
              <p>Discover a new place and start imagining your next journey.</p>
            </div>
            <Link to="#destinations">Explore destinations <ArrowRight size={16} aria-hidden="true" /></Link>
          </section>

          <section className="home-extra-section home-seasonal-destinations" aria-labelledby="home-seasonal-destinations-title">
            <div className="home-extra-heading">
              <p className="booking-eyebrow">IN SEASON, INSPIRING</p>
              <h2 id="home-seasonal-destinations-title">Seasonal destinations</h2>
              <p>Find a little inspiration for the kind of getaway that sounds right now.</p>
            </div>
            <div className="home-seasonal-carousel" aria-roledescription="carousel" aria-label="Seasonal destination inspiration">
              <article className="home-seasonal-banner" key={seasonalDestination.season}>
                <img
                  className="home-seasonal-banner-image"
                  src={seasonalDestination.image}
                  alt={`${seasonalDestination.city}, ${seasonalDestination.country}`}
                />
                <div className="home-seasonal-banner-content" aria-live="polite">
                  <span className="home-seasonal-banner-season">{seasonalDestination.season}</span>
                  <h3>{seasonalDestination.city}</h3>
                  <p className="home-seasonal-banner-country">{seasonalDestination.country}</p>
                  <p className="home-seasonal-banner-description">{seasonalDestination.description}</p>
                  <button
                    className="home-seasonal-explore"
                    type="button"
                    onClick={() => document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Explore destination <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
                <div className="home-seasonal-controls">
                  <button
                    className="home-seasonal-arrow"
                    type="button"
                    aria-label="Previous seasonal destination"
                    onClick={() => showSeasonalDestination(-1)}
                  >
                    <ChevronLeft size={21} aria-hidden="true" />
                  </button>
                  <div className="home-seasonal-pagination" aria-label={`Slide ${seasonalIndex + 1} of ${seasonalDestinations.length}`}>
                    {seasonalDestinations.map((destination, index) => (
                      <button
                        className={`home-seasonal-dot${index === seasonalIndex ? " is-active" : ""}`}
                        key={destination.season}
                        type="button"
                        aria-label={`Show ${destination.season} destination`}
                        aria-current={index === seasonalIndex ? "true" : undefined}
                        onClick={() => setSeasonalIndex(index)}
                      />
                    ))}
                  </div>
                  <button
                    className="home-seasonal-arrow"
                    type="button"
                    aria-label="Next seasonal destination"
                    onClick={() => showSeasonalDestination(1)}
                  >
                    <ChevronRight size={21} aria-hidden="true" />
                  </button>
                </div>
              </article>
            </div>
          </section>
        </main>

        <div className="footer-gallery" aria-label="Travel and destination photos">
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
            <a className="footer-cta-link" href="#destinations">
              Explore destinations <ArrowUpRight size={17} aria-hidden="true" />
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
              <a href="#destinations">Discover destinations</a>
              <a href="#home">Travel inspiration</a>
            </nav>

            <nav className="footer-column" aria-label="Company">
              <h3>Company</h3>
              <a href="#about">About us</a>
              <a href="#destinations">Our destinations</a>
              <a href="#destinations">Plan your journey</a>
            </nav>

            <nav className="footer-column" aria-label="Travel help">
              <h3>Travel help</h3>
              <a href="#travel-services">Travel services</a>
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
      <Routes>
        <Route path="/" element={<BookingWebsite />} />
        <Route path="/admin/setup" element={<AuthPage />} />
        <Route path="/admin/sign-in" element={<AuthPage />} />
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
    </AuthProvider>
  );
}

export default App;
