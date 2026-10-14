import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function StatCard({ label, value, detail, icon: Icon, reduceMotion }) {
  return (
    <motion.article
      className="dashboard-stat-card"
      variants={cardVariants}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className="dashboard-stat-card-top">
        <span>{label}</span>
        <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
      </div>
      <strong className="dashboard-stat-card-value">{value}</strong>
      <p>{detail}</p>
    </motion.article>
  );
}
