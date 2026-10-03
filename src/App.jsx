import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
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
import "./App.css";

const footerPhotos = [
  {
    label: "Lakeside escape",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Open-road adventure",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Old-town streets",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=80",
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
    bestSeason: "November – March",
    featuredExperience: "Desert safari",
    packageAvailability: "Curated stays and tours",
    interests: ["Luxury escapes", "Family trips", "Culture & heritage"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=780&q=78",
  },
  {
    city: "Maldives",
    country: "Maldives",
    description: "Turquoise lagoons, quiet islands, and slow days by the sea.",
    bestFor: "Beach & honeymoon",
    bestSeason: "November – April",
    featuredExperience: "Island experience",
    packageAvailability: "Island packages",
    interests: ["Beach holidays", "Honeymoon", "Luxury escapes"],
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=780&q=78",
  },
  {
    city: "Bali",
    country: "Indonesia",
    description: "Green landscapes, island air, and room to unwind.",
    bestFor: "Culture & couples",
    bestSeason: "April – October",
    featuredExperience: "Temple and village visits",
    packageAvailability: "Culture and beach stays",
    interests: ["Beach holidays", "Honeymoon", "Adventure", "Culture & heritage"],
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=780&q=78",
  },
  {
    city: "Paris",
    country: "France",
    description: "Slow mornings, grand avenues, and little cafés.",
    bestFor: "Culture & couples",
    bestSeason: "April – June",
    featuredExperience: "Neighbourhood city tour",
    packageAvailability: "City-break packages",
    interests: ["Honeymoon", "Luxury escapes", "Culture & heritage"],
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=780&q=78",
  },
  {
    city: "Switzerland",
    country: "Switzerland",
    description: "Alpine scenery, lakeside towns, and scenic rail journeys.",
    bestFor: "Adventure & family",
    bestSeason: "June – September",
    featuredExperience: "Scenic mountain rail",
    packageAvailability: "Alpine itineraries",
    interests: ["Adventure", "Family trips", "Luxury escapes"],
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=780&q=78",
  },
  {
    city: "Singapore",
    country: "Singapore",
    description: "Waterfront gardens, delicious food, and lively city days.",
    bestFor: "Family & city breaks",
    bestSeason: "February – April",
    featuredExperience: "Gardens by the Bay",
    packageAvailability: "City and family stays",
    interests: ["Family trips", "Culture & heritage", "Luxury escapes"],
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=780&q=78",
  },
  {
    city: "Delhi",
    country: "India",
    description: "Discover historic landmarks, colourful markets, and a celebrated food scene.",
    bestFor: "Culture & food",
    bestSeason: "October – March",
    featuredExperience: "Old Delhi food walk",
    packageAvailability: "Cultural city itineraries",
    interests: ["Culture & heritage", "Family trips", "Adventure"],
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=780&q=78",
  },
  {
    city: "Tokyo",
    country: "Japan",
    description: "Move between tranquil temples, lively neighbourhoods, and memorable local food.",
    bestFor: "Culture & city breaks",
    bestSeason: "March – May",
    featuredExperience: "Neighbourhood food tour",
    packageAvailability: "Guided city stays",
    interests: ["Culture & heritage", "Family trips", "Adventure"],
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=780&q=78",
  },
  {
    city: "New York",
    country: "United States",
    description: "Explore iconic city views, world-class museums, and distinctive neighbourhoods.",
    bestFor: "City & family breaks",
    bestSeason: "April – June",
    featuredExperience: "Neighbourhood discovery tour",
    packageAvailability: "City stays and guided tours",
    interests: ["Family trips", "Culture & heritage", "Luxury escapes"],
    image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=780&q=78",
  },
];

const holidayPackages = [
  {
    name: "Dubai Escape",
    destination: "Dubai, United Arab Emirates",
    destinationCity: "Dubai",
    duration: "4 Nights / 5 Days",
    nights: 4,
    type: "Luxury",
    budgetStyle: ["Comfort-first", "Premium"],
    stay: "Sample 4-night city hotel stay",
    activities: ["Desert safari", "Guided city tour"],
    inclusions: ["Hotel stay", "Desert safari", "Guided city tour", "Airport transfer"],
    interests: ["Luxury escapes", "Family trips", "Culture & heritage"],
    description: "A city stay with landmark views, desert discovery, and time to unwind.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Maldives Paradise",
    destination: "Maldives",
    destinationCity: "Maldives",
    duration: "3 Nights / 4 Days",
    nights: 3,
    type: "Honeymoon",
    budgetStyle: ["Premium"],
    stay: "Sample 3-night island resort stay",
    activities: ["Island experience"],
    inclusions: ["Island resort stay", "Island experience", "Leisure time", "Arrival transfer"],
    interests: ["Beach holidays", "Honeymoon", "Luxury escapes"],
    description: "An island retreat with blue-water views and unhurried beach days.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Bali Experience",
    destination: "Bali, Indonesia",
    destinationCity: "Bali",
    duration: "5 Nights / 6 Days",
    nights: 5,
    type: "Cultural",
    budgetStyle: ["Value-conscious", "Comfort-first"],
    stay: "Sample 5-night boutique stay",
    activities: ["Temple visit", "Local cultural experience"],
    inclusions: ["Boutique hotel stay", "Temple visit", "Local cultural experience", "Airport transfer"],
    interests: ["Beach holidays", "Honeymoon", "Adventure", "Culture & heritage"],
    description: "Explore lush landscapes, local traditions, and beautiful island shores.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Swiss Adventure",
    destination: "Switzerland",
    destinationCity: "Switzerland",
    duration: "6 Nights / 7 Days",
    nights: 6,
    type: "Adventure",
    budgetStyle: ["Comfort-first", "Premium"],
    stay: "Sample 6-night alpine hotel stay",
    activities: ["Mountain excursion", "Scenic rail experience"],
    inclusions: ["Alpine hotel stay", "Mountain excursion", "Scenic rail experience", "Local transfers"],
    interests: ["Adventure", "Family trips", "Luxury escapes"],
    description: "Discover mountain scenery, lakeside towns, and memorable alpine journeys.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80",
  },
];

const tripPlannerStyles = [
  "Beach",
  "Adventure",
  "Luxury",
  "Honeymoon",
  "Family",
  "Culture",
];

const tripPlannerBudgetStyles = [
  "Flexible",
  "Value-conscious",
  "Comfort-first",
  "Premium",
];

const defaultTripPlanner = {
  destination: "Any destination",
  style: "Any style",
  duration: "Any duration",
  travelers: "2",
  budget: "Flexible",
};

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
  const tripPlannerRef = useRef(null);
  const [seasonalIndex, setSeasonalIndex] = useState(0);
  const [selectedInterest, setSelectedInterest] = useState("All packages");
  const [planner, setPlanner] = useState(defaultTripPlanner);
  const [travelerReviews, setTravelerReviews] = useState([]);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewDestination, setReviewDestination] = useState("");
  const [reviewRating, setReviewRating] = useState("5");
  const [reviewText, setReviewText] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");
  const seasonalDestination = seasonalDestinations[seasonalIndex];
  const plannerSuggestions = holidayPackages.filter((holiday) => {
    const matchesDestination =
      planner.destination === "Any destination" || holiday.destinationCity === planner.destination;
    const plannerInterest = {
      Beach: "Beach holidays",
      Luxury: "Luxury escapes",
      Family: "Family trips",
      Culture: "Culture & heritage",
    }[planner.style] || planner.style;
    const matchesStyle =
      planner.style === "Any style" ||
      holiday.interests.includes(plannerInterest) ||
      holiday.type.toLowerCase() === planner.style.toLowerCase();
    const matchesDuration =
      planner.duration === "Any duration" ||
      (planner.duration === "3–4 nights" && holiday.nights >= 3 && holiday.nights <= 4) ||
      (planner.duration === "5–7 nights" && holiday.nights >= 5 && holiday.nights <= 7);
    const matchesBudget =
      planner.budget === "Flexible" || holiday.budgetStyle.includes(planner.budget);
    return matchesDestination && matchesStyle && matchesDuration && matchesBudget;
  });

  function updatePlanner(field, value) {
    setPlanner((current) => ({ ...current, [field]: value }));
  }

  function focusTripPlanner() {
    tripPlannerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function planPackage(holiday) {
    setPlanner((current) => ({
      ...current,
      destination: holiday.destinationCity,
      style: "Any style",
      duration: "Any duration",
      budget: "Flexible",
    }));
    focusTripPlanner();
  }

  function scrollDestinations(direction) {
    const scroller = destinationScroller.current;
    if (!scroller) return;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const target = scroller.scrollLeft + direction * scroller.clientWidth * 0.8;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    const wrappedTarget = target > maxScroll ? 0 : target < 0 ? maxScroll : target;
    scroller.scrollTo({ left: wrappedTarget, behavior });
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
    setTravelerReviews((reviews) => [review, ...reviews].slice(0, 3));
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
                <span className="hero-title-line hero-title-line-left">Travel Further.</span>
                <span className="hero-title-line hero-title-line-right">Experience More.</span>
              </h1>
              <p className="hero-description">
                Discover destinations, thoughtful stays, and memorable experiences
                in journeys shaped around the way you want to travel.
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
                <p>Bring together stays, local discoveries, and thoughtful support for every part of your journey.</p>
              </div>
              <Link className="homepage-text-link" to="#destinations">
                Explore destinations <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className="homepage-service-grid homepage-service-grid-curated">
              <article className="homepage-service-card">
                <div
                  className="homepage-service-image"
                  style={{ backgroundImage: "linear-gradient(180deg, transparent 25%, rgba(15, 22, 29, 0.55)), url(https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=85)" }}
                >
                  <span className="homepage-service-icon"><Hotel size={20} aria-hidden="true" /></span>
                  <span className="homepage-service-status">Hotels & stays</span>
                </div>
                <div className="homepage-service-copy">
                  <h3>Hotels & stays</h3>
                  <p>Find a comfortable base for every stop, from boutique hideaways to welcoming city hotels.</p>
                  <a href="#popular-packages">Explore stay ideas <ArrowRight size={14} aria-hidden="true" /></a>
                </div>
              </article>
              <article className="homepage-service-card">
                <div
                  className="homepage-service-image"
                  style={{ backgroundImage: "linear-gradient(180deg, transparent 25%, rgba(15, 22, 29, 0.55)), url(https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1000&q=85)" }}
                >
                  <span className="homepage-service-icon"><Compass size={20} aria-hidden="true" /></span>
                  <span className="homepage-service-status">Private tours</span>
                </div>
                <div className="homepage-service-copy">
                  <h3>Private tours</h3>
                  <p>Explore with a local guide and a pace that suits the way you like to travel.</p>
                  <a href="#home-trip-planner">Browse experiences <ArrowRight size={14} aria-hidden="true" /></a>
                </div>
              </article>
              <article className="homepage-service-card">
                <div
                  className="homepage-service-image"
                  style={{ backgroundImage: "linear-gradient(180deg, transparent 25%, rgba(15, 22, 29, 0.55)), url(https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=85)" }}
                >
                  <span className="homepage-service-icon"><MapPin size={20} aria-hidden="true" /></span>
                  <span className="homepage-service-status">Local experiences</span>
                </div>
                <div className="homepage-service-copy">
                  <h3>Local experiences</h3>
                  <p>Add food, culture, and memorable moments to your time in each destination.</p>
                  <a href="#home-trip-planner">Explore experiences <ArrowRight size={14} aria-hidden="true" /></a>
                </div>
              </article>
              <article className="homepage-service-card">
                <div
                  className="homepage-service-image"
                  style={{ backgroundImage: "linear-gradient(180deg, transparent 25%, rgba(15, 22, 29, 0.55)), url(https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=85)" }}
                >
                  <span className="homepage-service-icon"><WandSparkles size={20} aria-hidden="true" /></span>
                  <span className="homepage-service-status">Custom itineraries</span>
                </div>
                <div className="homepage-service-copy">
                  <h3>Custom itineraries</h3>
                  <p>Bring your ideas together with practical travel assistance along the way.</p>
                  <a href="#home-trip-planner">Plan your trip <ArrowRight size={14} aria-hidden="true" /></a>
                </div>
              </article>
            </div>
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
                        <span className="home-destination-detail">Best season: {destination.bestSeason}</span>
                        <span className="home-destination-detail">Featured: {destination.featuredExperience}</span>
                        <span className="home-destination-detail">{destination.packageAvailability}</span>
                        <a href="#popular-packages">
                          Explore <ArrowRight size={14} aria-hidden="true" />
                        </a>
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

          <section className="home-extra-section home-holiday-packages" id="popular-packages" aria-labelledby="home-holiday-packages-title">
            <div className="home-extra-heading">
              <p className="booking-eyebrow">CURATED GETAWAYS</p>
              <h2 id="home-holiday-packages-title">Popular holiday packages</h2>
              <p>Thoughtfully planned stays to help make every day of your trip count.</p>
            </div>
            <div className="home-interest-tabs" role="group" aria-label="Filter packages by travel interest">
              {[
                { label: "All packages", icon: Compass },
                ...travelInterests,
              ].map(({ label, icon: Icon }) => (
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
            <div className="home-package-grid">
              {holidayPackages
                .filter((holiday) => selectedInterest === "All packages" || holiday.interests.includes(selectedInterest))
                .map((holiday) => (
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
                    <p className="home-package-stay"><Hotel size={14} aria-hidden="true" />{holiday.stay}</p>
                    <p className="home-package-activity-count">{holiday.activities.length} included {holiday.activities.length === 1 ? "activity" : "activities"}</p>
                    <ul className="home-package-inclusions" aria-label={`${holiday.name} sample inclusions`}>
                      {holiday.inclusions.map((inclusion) => (
                        <li key={inclusion}>{inclusion}</li>
                      ))}
                    </ul>
                    <p className="home-package-price"><span>Starting price</span><strong>On request</strong></p>
                    <div className="home-package-footer">
                      <button type="button" onClick={() => planPackage(holiday)}>
                        View package <ArrowRight size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="home-extra-section home-trip-planner" id="home-trip-planner" ref={tripPlannerRef} aria-labelledby="home-trip-planner-title">
            <div className="home-extra-heading">
              <p className="booking-eyebrow">A FEW DETAILS, A GOOD PLACE TO START</p>
              <h2 id="home-trip-planner-title">Plan a trip that feels like yours.</h2>
              <p>Choose what matters to you and explore matching ideas from our sample packages.</p>
            </div>
            <div className="home-trip-planner-panel">
              <div className="home-trip-planner-fields">
                <label>
                  Destination
                  <select value={planner.destination} onChange={(event) => updatePlanner("destination", event.target.value)}>
                    <option>Any destination</option>
                    {popularDestinations.map((destination) => (
                      <option key={destination.city}>{destination.city}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Travel style
                  <select value={planner.style} onChange={(event) => updatePlanner("style", event.target.value)}>
                    <option>Any style</option>
                    {tripPlannerStyles.map((style) => <option key={style}>{style}</option>)}
                  </select>
                </label>
                <label>
                  Duration
                  <select value={planner.duration} onChange={(event) => updatePlanner("duration", event.target.value)}>
                    <option>Any duration</option>
                    <option>3–4 nights</option>
                    <option>5–7 nights</option>
                  </select>
                </label>
                <label>
                  Travelers
                  <select value={planner.travelers} onChange={(event) => updatePlanner("travelers", event.target.value)}>
                    {Array.from({ length: 8 }, (_, index) => (
                      <option key={index + 1} value={String(index + 1)}>{index + 1} {index === 0 ? "traveler" : "travelers"}</option>
                    ))}
                    <option value="9+">9+ travelers</option>
                  </select>
                </label>
                <label>
                  Budget preference
                  <select value={planner.budget} onChange={(event) => updatePlanner("budget", event.target.value)}>
                    {tripPlannerBudgetStyles.map((budget) => <option key={budget}>{budget}</option>)}
                  </select>
                </label>
              </div>
              <div className="home-trip-planner-results" aria-live="polite">
                <div className="home-trip-planner-results-heading">
                  <div>
                    <p className="booking-eyebrow">SUGGESTED STARTING POINTS</p>
                    <h3>Ideas for {planner.travelers} {planner.travelers === "1" ? "traveler" : "travelers"}</h3>
                  </div>
                  <span>{plannerSuggestions.length} {plannerSuggestions.length === 1 ? "match" : "matches"}</span>
                </div>
                {plannerSuggestions.length > 0 ? (
                  <div className="home-trip-planner-suggestions">
                    {plannerSuggestions.map((holiday) => (
                      <article className="home-trip-planner-suggestion" key={holiday.name}>
                        <div>
                          <span>{holiday.type} · {holiday.duration}</span>
                          <h4>{holiday.name}</h4>
                          <p>{holiday.destination}</p>
                        </div>
                        <button type="button" onClick={() => planPackage(holiday)}>
                          View package <ArrowRight size={14} aria-hidden="true" />
                        </button>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="home-trip-planner-empty">
                    <p>No sample package matches every choice yet. Try a broader destination, style, or duration.</p>
                    <button type="button" onClick={() => setPlanner(defaultTripPlanner)}>Clear selections</button>
                  </div>
                )}
                <p className="home-trip-planner-note">These are frontend demo ideas. Final availability and pricing need to be confirmed.</p>
              </div>
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

        </main>

        <div className="footer-gallery" id="travel-inspiration" aria-label="Travel and destination photos">
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

        <section className="home-extra-cta" aria-labelledby="home-extra-cta-title">
          <div>
            <p className="booking-eyebrow">A JOURNEY THAT STARTS WITH YOU</p>
            <h2 id="home-extra-cta-title">Don’t see the perfect package?</h2>
            <p>Tell us how you want to travel and shape a journey around your plans.</p>
          </div>
          <button type="button" onClick={focusTripPlanner}>Create my trip <ArrowRight size={16} aria-hidden="true" /></button>
        </section>

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
              <a href="#travel-inspiration">Travel inspiration</a>
            </nav>

            <nav className="footer-column" aria-label="Company">
              <h3>Company</h3>
              <a href="#about">About us</a>
              <a href="#destinations">Our destinations</a>
              <a href="#home-trip-planner">Plan your journey</a>
            </nav>

            <nav className="footer-column" aria-label="Travel help">
              <h3>Travel help</h3>
              <a href="#travel-services">Travel services</a>
              <a href="#travel-services">Hotels and stays</a>
              <a href="#travel-services">Private tours and local experiences</a>
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
    <Routes>
      <Route path="/" element={<BookingWebsite />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
