import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import "./HeroShowcase.css";

const productLayouts = [
  {
    left: "3%",
    top: "8%",
    width: "38%",
    height: "48%",
    rotation: -6,
    layer: 5,
    depth: 0.45,
    duration: 5.3,
    art: "cleanser",
  },
  {
    left: "37%",
    top: "2%",
    width: "34%",
    height: "43%",
    rotation: 5,
    layer: 4,
    depth: 0.8,
    duration: 4.7,
    art: "serum",
  },
  {
    left: "26%",
    top: "27%",
    width: "45%",
    height: "57%",
    rotation: -1,
    layer: 1,
    depth: 1,
    duration: 5.8,
    art: "cream",
  },
  {
    left: "63%",
    top: "19%",
    width: "33%",
    height: "46%",
    rotation: 6,
    layer: 3,
    depth: 0.65,
    duration: 4.9,
    art: "balm",
  },
  {
    left: "5%",
    top: "51%",
    width: "37%",
    height: "44%",
    rotation: 3,
    layer: 2,
    depth: 0.35,
    duration: 5.6,
    art: "oil",
  },
];

const sampleProducts = [
  { name: "Cloud cleanser", sku: "SKU-1001", quantity: 48 },
  { name: "Daily serum", sku: "SKU-1002", quantity: 120 },
  { name: "Soft glow cream", sku: "SKU-1003", quantity: 86 },
  { name: "Restore balm", sku: "SKU-1004", quantity: 12 },
  { name: "Silk body oil", sku: "SKU-1005", quantity: 34 },
].map((product, index) => ({
  ...product,
  ...productLayouts[index],
  delay: index * 0.12,
}));

const tags = [
  { kind: "low", left: "60%", top: "68%", duration: 4.2, delay: 0 },
  { label: "+120 IN", kind: "in", left: "9%", top: "38%", duration: 5, delay: 0.6 },
  { label: "SKU-1004", kind: "sku", left: "65%", top: "10%", duration: 4.6, delay: 1.1 },
];

function getResponseProducts(data) {
  const products = Array.isArray(data) ? data : data?.products;
  if (!Array.isArray(products)) {
    throw new Error("The products response must be an array.");
  }

  return products
    .map((product, index) => {
      const quantity = Number(product.quantity ?? product.stock);
      if (typeof product.name !== "string" || !Number.isFinite(quantity)) return null;

      return {
        name: product.name,
        sku: String(product.sku ?? `SKU-${String(product.id ?? index + 1).padStart(4, "0")}`),
        quantity,
      };
    })
    .filter(Boolean)
    .sort((first, second) => second.quantity - first.quantity)
    .slice(0, productLayouts.length);
}

function getLowStockCount(data) {
  const summary = data?.data?.summary ?? data?.data ?? data?.summary ?? data;
  const count =
    summary?.lowStockCount ??
    summary?.low_stock_count ??
    summary?.lowStock ??
    summary?.low_stock ??
    summary?.inventory?.lowStockCount ??
    summary?.inventory?.low_stock_count;

  if (
    (typeof count === "number" || (typeof count === "string" && count.trim() !== "")) &&
    Number.isFinite(Number(count))
  ) {
    return Number(count);
  }
  if (Array.isArray(summary?.lowStockProducts)) return summary.lowStockProducts.length;
  if (Array.isArray(summary?.low_stock_products)) return summary.low_stock_products.length;
  throw new Error("The stats response did not include a low-stock count.");
}

const entranceVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardEntranceVariants = {
  hidden: { opacity: 0, y: 72 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 17 },
  },
};

function ProductCard({ product, index, activeCard, setActiveCard, pointerX, pointerY, reduceMotion }) {
  const parallaxX = useTransform(pointerX, (value) => (reduceMotion ? 0 : value * product.depth));
  const parallaxY = useTransform(pointerY, (value) => (reduceMotion ? 0 : value * product.depth));
  const isActive = activeCard === index;

  return (
    <motion.div
      className="hero-showcase-card-position"
      variants={reduceMotion ? undefined : cardEntranceVariants}
      style={{
        left: product.left,
        top: product.top,
        width: product.width,
        height: product.height,
        zIndex: isActive ? 20 : product.layer,
      }}
      onHoverStart={() => setActiveCard(index)}
      onHoverEnd={() => setActiveCard(null)}
    >
      <motion.div
        className="hero-showcase-card-float"
        animate={reduceMotion ? undefined : { y: [0, -10, 10, 0] }}
        transition={{
          duration: product.duration,
          delay: product.delay + 0.7,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <motion.article
          className="hero-showcase-product-card"
          style={{ x: parallaxX, y: parallaxY, rotate: product.rotation }}
          whileHover={reduceMotion ? undefined : { rotate: 0, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 240, damping: 20 }}
        >
          <div className={`hero-showcase-product-art hero-showcase-product-art-${product.art}`}>
            <span className="hero-showcase-product-object" aria-hidden="true" />
            <span className="hero-showcase-product-mark">FORME / 01</span>
          </div>
          <div className="hero-showcase-product-info">
            <div className="hero-showcase-product-heading">
              <h2>{product.name}</h2>
              <span>{product.sku}</span>
            </div>
            <p><span>Quantity</span><strong>{product.quantity}</strong></p>
          </div>
        </motion.article>
      </motion.div>
    </motion.div>
  );
}

function FloatingTag({ tag, reduceMotion }) {
  return (
    <motion.div
      className={`hero-showcase-tag hero-showcase-tag-${tag.kind}`}
      style={{ left: tag.left, top: tag.top }}
      animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
      transition={{
        duration: tag.duration,
        delay: tag.delay,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <span aria-hidden="true" />
      {tag.label}
    </motion.div>
  );
}

export default function HeroShowcase() {
  const reduceMotion = useReducedMotion();
  const pointerX = useSpring(useMotionValue(0), { stiffness: 90, damping: 22, mass: 0.5 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 90, damping: 22, mass: 0.5 });
  const [activeCard, setActiveCard] = useState(null);
  const [products, setProducts] = useState(sampleProducts);
  const [lowStockCount, setLowStockCount] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch("/api/products", { signal: controller.signal });
        if (!response.ok) throw new Error(`Products request failed with ${response.status}.`);
        const data = await response.json();
        const loadedProducts = getResponseProducts(data);
        if (loadedProducts.length > 0) {
          setProducts(
            loadedProducts.map((product, index) => ({
              ...product,
              ...productLayouts[index],
              delay: index * 0.12,
            })),
          );
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.warn("Unable to load inventory products; showing sample products.", error);
          setProducts(sampleProducts);
        }
      }
    }

    async function loadStats() {
      try {
        const response = await fetch("/api/stats/summary", { signal: controller.signal });
        if (!response.ok) throw new Error(`Stats request failed with ${response.status}.`);
        const data = await response.json();
        setLowStockCount(getLowStockCount(data));
      } catch (error) {
        if (error.name !== "AbortError") {
          console.warn("Unable to load the low-stock count from the inventory stats API.", error);
          setLowStockCount(null);
        }
      }
    }

    loadProducts();
    loadStats();

    return () => controller.abort();
  }, []);

  function handlePointerMove(event) {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <main className="hero-showcase-page">
      <div className="hero-showcase-layout">
        <section className="hero-showcase-copy" aria-labelledby="hero-showcase-title">
          <a className="hero-showcase-brand" href="/" aria-label="Forma home">
            <span className="hero-showcase-logo" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>forma<span className="hero-showcase-brand-period">.</span></span>
          </a>

          <div className="hero-showcase-message">
            <p className="hero-showcase-eyebrow">A clearer view of your stock</p>
            <h1 id="hero-showcase-title">
              Track, restock,
              <br />
              <span>&amp; manage inventory</span>
              <br />
              with ease.
            </h1>
            <p className="hero-showcase-description">
              Your products, orders, and stock levels—together in one calm, clear workspace.
            </p>
            <div className="hero-showcase-actions">
              <a className="hero-showcase-primary-link" href="#products">
                Get started <span aria-hidden="true">↗</span>
              </a>
              <a className="hero-showcase-text-link" href="#showcase-details">Read more</a>
            </div>
          </div>

          <p className="hero-showcase-footnote" id="showcase-details">
            A little more clarity for everything you keep in stock.
          </p>
        </section>

        <section
          className="hero-showcase-visual"
          id="products"
          aria-label="Product inventory preview"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
          <div className="hero-showcase-visual-note" aria-hidden="true">
            <span /> INVENTORY / 01
          </div>
          <motion.div
            className="hero-showcase-card-stage"
            variants={reduceMotion ? undefined : entranceVariants}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "visible"}
          >
            {products.map((product, index) => (
              <ProductCard
                key={product.sku}
                product={product}
                index={index}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
                pointerX={pointerX}
                pointerY={pointerY}
                reduceMotion={reduceMotion}
              />
            ))}

            {tags.map((tag) => (
              <FloatingTag
                key={tag.kind}
                tag={tag.kind === "low"
                  ? { ...tag, label: lowStockCount === null ? "Low stock" : `Low stock · ${lowStockCount}` }
                  : tag}
                reduceMotion={reduceMotion}
              />
            ))}
          </motion.div>
          <p className="hero-showcase-visual-caption" aria-hidden="true">
            A live look at what’s on your shelves.
          </p>
        </section>
      </div>
    </main>
  );
}
