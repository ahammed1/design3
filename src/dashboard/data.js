export function formatDate(date) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getDashboardMetrics(bookings) {
  const paidBookings = bookings.filter((booking) => booking.paymentStatus === "Paid");
  return {
    totalBookings: bookings.length,
    revenue: paidBookings.reduce((total, booking) => total + booking.amount, 0),
    pendingBookings: bookings.filter((booking) => booking.status === "Pending").length,
    activeGuests: new Set(bookings.map((booking) => booking.guestId)).size,
    averageBooking: paidBookings.length
      ? Math.round(paidBookings.reduce((total, booking) => total + booking.amount, 0) / paidBookings.length)
      : 0,
  };
}

export function getMonthlyStats(bookings) {
  const months = new Map();
  bookings.forEach((booking) => {
    if (!booking.date) return;
    const date = new Date(`${booking.date}T12:00:00`);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const current = months.get(key) ?? {
      month: new Intl.DateTimeFormat("en-US", { month: "short" }).format(date),
      bookings: 0,
      revenue: 0,
    };
    current.bookings += 1;
    if (booking.paymentStatus === "Paid") current.revenue += booking.amount;
    months.set(key, current);
  });
  return [...months.entries()]
    .sort(([left], [right]) => left - right)
    .map(([, value]) => value);
}

export function getPopularDestinations(bookings) {
  const counts = new Map();
  bookings.forEach((booking) => {
    const destination = booking.destination?.split(" (")[0] || booking.route?.split(" → ")[1];
    if (destination) counts.set(destination, (counts.get(destination) ?? 0) + 1);
  });
  const maximum = Math.max(1, ...counts.values());
  return [...counts.entries()]
    .map(([name, count]) => ({ name, bookings: count, share: Math.round((count / maximum) * 100) }))
    .sort((left, right) => right.bookings - left.bookings)
    .slice(0, 5);
}
