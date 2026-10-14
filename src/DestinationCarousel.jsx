import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const destinations = [
  {
    name: "Dubai",
    country: "United Arab Emirates",
    tagline: "Desert horizons meet city lights.",
    bestFor: "Luxury & family breaks",
    bestSeason: "November – March",
    featured: "Desert safari",
    extra: "Curated stays and tours",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Maldives",
    country: "Maldives",
    tagline: "Slow days on quiet island shores.",
    bestFor: "Beach & honeymoon",
    bestSeason: "November – April",
    featured: "Private island escape",
    extra: "Island packages",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Bali",
    country: "Indonesia",
    tagline: "Lush landscapes and island air.",
    bestFor: "Culture & couples",
    bestSeason: "April – October",
    featured: "Temple and village visits",
    extra: "Culture and beach stays",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Paris",
    country: "France",
    tagline: "Little cafés, long walks, slow mornings.",
    bestFor: "Culture & couples",
    bestSeason: "April – June",
    featured: "Neighbourhood city tour",
    extra: "City-break packages",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Singapore",
    country: "Singapore",
    tagline: "Garden paths and lively waterfront nights.",
    bestFor: "Family & city breaks",
    bestSeason: "February – April",
    featured: "Gardens by the Bay",
    extra: "City and family stays",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Tokyo",
    country: "Japan",
    tagline: "Find calm between the city’s bright streets.",
    bestFor: "Culture & city breaks",
    bestSeason: "March – May",
    featured: "Neighbourhood food tour",
    extra: "Guided city stays",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=85",
  },
];

export default function DestinationCarousel({ items = destinations }) {
  const scrollerRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const resumeAutoplayRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateEdges = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cards = [...scroller.querySelectorAll("[data-destination-card]")];
    if (cards.length === 0) return;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    const closestIndex = cards.reduce((closest, card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const closestCenter = cards[closest].offsetLeft + cards[closest].clientWidth / 2;
      return Math.abs(cardCenter - center) < Math.abs(closestCenter - center) ? index : closest;
    }, 0);
    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    updateEdges();
    scroller.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      scroller.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [items, updateEdges]);

  const showDestination = useCallback((index) => {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelectorAll("[data-destination-card]")[index];
    if (!scroller || !card) return;
    scroller.scrollTo({
      left: card.offsetLeft - (scroller.clientWidth - card.clientWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (items.length < 2) return undefined;
    const timer = window.setInterval(() => {
      if (isDragging || Date.now() < (resumeAutoplayRef.current ?? 0)) return;
      showDestination((activeIndex + 1) % items.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [activeIndex, isDragging, items.length, showDestination]);

  const pauseAutoplay = () => {
    resumeAutoplayRef.current = Date.now() + 6000;
  };

  const handlePointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || event.target.closest("a, button")) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: scroller.scrollLeft,
      moved: false,
    };
    suppressClickRef.current = false;
    setIsDragging(true);
    pauseAutoplay();
    scroller.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5) {
      drag.moved = true;
      suppressClickRef.current = true;
    }
    if (drag.moved) {
      event.preventDefault();
      scrollerRef.current.scrollLeft = drag.startScroll - distance;
    }
  };

  const stopDragging = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setIsDragging(false);
    if (scrollerRef.current?.hasPointerCapture(event.pointerId)) {
      scrollerRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const handleClickCapture = (event) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <div className="destination-carousel-wrapper">
      <div
        ref={scrollerRef}
        className={`destination-scroller ${isDragging ? "is-dragging" : ""}`}
        aria-label="Destinations"
        role="region"
        tabIndex={0}
        onTouchStart={pauseAutoplay}
        onWheel={pauseAutoplay}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onClickCapture={handleClickCapture}
      >
        {items.map((destination, index) => (
          <article
            key={destination.name}
            data-destination-card
            className={`destination-card-item ${activeIndex === index ? "is-active" : ""}`}
          >
            <img className="destination-card-img" src={destination.image} alt="" loading="lazy" />
            <div className="destination-card-shade" aria-hidden="true" />
            <span className="destination-country-badge">{destination.country}</span>
            <div className="destination-card-copy">
              <h3>{destination.name}</h3>
              <p>{destination.tagline}</p>
              <dl className="destination-dl">
                <div>
                  <dt>Best for</dt>
                  <dd>{destination.bestFor}</dd>
                </div>
                <div>
                  <dt>Best season</dt>
                  <dd>{destination.bestSeason}</dd>
                </div>
                <div>
                  <dt>Featured</dt>
                  <dd>{destination.featured}</dd>
                </div>
              </dl>
              <a className="destination-link" href="#contact">
                Explore <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <span className="sr-only">{destination.extra}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}