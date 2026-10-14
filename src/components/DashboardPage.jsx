import {
  ArrowDownRight,
  Boxes,
  CircleDollarSign,
  Layers3,
  PackagePlus,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import StatCard from "./StatCard.jsx";
import "./DashboardPage.css";

const sampleProducts = [
  { id: 1, name: "Laptop", sku: "SKU-0001", category: "Electronics", price: 1200, quantity: 25 },
  { id: 2, name: "iPhone", sku: "SKU-0002", category: "Electronics", price: 800, quantity: 15 },
  { id: 3, name: "Headphones", sku: "SKU-0003", category: "Accessories", price: 150, quantity: 40 },
  { id: 4, name: "Keyboard", sku: "SKU-0004", category: "Accessories", price: 90, quantity: 8 },
  { id: 5, name: "Office Chair", sku: "SKU-0005", category: "Furniture", price: 250, quantity: 3 },
];

const dashboardVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
};

function normalizeProducts(data) {
  const products = Array.isArray(data) ? data : data?.products;
  if (!Array.isArray(products)) throw new Error("The products response must be an array.");

  return products.map((product, index) => ({
    id: product.id ?? `${product.sku ?? product.name}-${index}`,
    name: String(product.name ?? "Unnamed product"),
    sku: String(product.sku ?? `SKU-${String(product.id ?? index + 1).padStart(4, "0")}`),
    category: String(product.category ?? "Uncategorized"),
    price: Number(product.price) || 0,
    quantity: Number(product.quantity ?? product.stock) || 0,
  }));
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function ProductRow({ product, reduceMotion }) {
  return (
    <motion.article
      className="dashboard-product-card"
      variants={itemVariants}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <span className="dashboard-product-mark" aria-hidden="true">
        <Boxes size={18} strokeWidth={1.7} />
      </span>
      <div className="dashboard-product-details">
        <h3>{product.name}</h3>
        <p>{product.sku} <span>·</span> {product.category}</p>
      </div>
      <div className="dashboard-product-quantity">
        <strong>{product.quantity}</strong>
        <span>units</span>
      </div>
    </motion.article>
  );
}

export default function DashboardPage() {
  const reduceMotion = useReducedMotion();
  const [products, setProducts] = useState(sampleProducts);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch("/api/products", { signal: controller.signal });
        if (!response.ok) throw new Error(`Products request failed with ${response.status}.`);
        setProducts(normalizeProducts(await response.json()));
      } catch (error) {
        if (error.name !== "AbortError") {
          console.warn("Unable to load dashboard products; showing sample products.", error);
          setProducts(sampleProducts);
        }
      }
    }

    loadProducts();
    return () => controller.abort();
  }, []);

  const totalUnits = products.reduce((total, product) => total + product.quantity, 0);
  const inventoryValue = products.reduce(
    (total, product) => total + product.quantity * product.price,
    0,
  );
  const categoryCount = new Set(products.map((product) => product.category)).size;
  const stats = [
    { label: "Products", value: products.length, detail: "Items in your catalog", icon: Boxes },
    { label: "Units in stock", value: totalUnits.toLocaleString(), detail: "Across all products", icon: Layers3 },
    { label: "Categories", value: categoryCount, detail: "Distinct product groups", icon: PackagePlus },
    { label: "Inventory value", value: formatCurrency(inventoryValue), detail: "Based on current quantities", icon: CircleDollarSign },
  ];

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <header className="dashboard-topbar">
          <a className="dashboard-brand" href="/login" aria-label="Forma home">
            <span className="dashboard-brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
            <span>forma<span>.</span></span>
          </a>
          <button className="dashboard-add-button" type="button">
            <PackagePlus size={16} strokeWidth={1.8} aria-hidden="true" />
            Add product
          </button>
        </header>

        <section className="dashboard-intro" aria-labelledby="dashboard-title">
          <p className="dashboard-eyebrow">YOUR WORKSPACE / OVERVIEW</p>
          <div className="dashboard-intro-row">
            <div>
              <h1 id="dashboard-title">A little more in order.</h1>
              <p>A clear view of your inventory, all in one place.</p>
            </div>
            <span className="dashboard-updated"><i /> Inventory overview</span>
          </div>
        </section>

        <motion.section
          className="dashboard-stat-grid"
          aria-label="Inventory statistics"
          variants={dashboardVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} reduceMotion={reduceMotion} />
          ))}
        </motion.section>

        <section className="dashboard-inventory-section" aria-labelledby="dashboard-inventory-title">
          <div className="dashboard-section-heading">
            <div>
              <p className="dashboard-eyebrow">ON YOUR SHELVES</p>
              <h2 id="dashboard-inventory-title">Inventory</h2>
            </div>
            <span>{products.length} items</span>
          </div>

          <motion.div
            className="dashboard-product-grid"
            aria-label="Products"
            variants={dashboardVariants}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "visible"}
          >
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                reduceMotion={reduceMotion}
              />
            ))}
          </motion.div>
        </section>

        <footer className="dashboard-footer">
          <span>Made for the details that keep things moving.</span>
          <span><ArrowDownRight size={14} aria-hidden="true" /> Stock at a glance</span>
        </footer>
      </div>
    </main>
  );
}
