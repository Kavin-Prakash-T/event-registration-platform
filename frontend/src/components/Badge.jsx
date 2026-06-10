const Badge = ({ status }) => {
  const styles = {
    PAYMENT_PENDING: "bg-yellow-100 text-yellow-700",
    PAYMENT_SUBMITTED: "bg-blue-100 text-blue-700",
    CONFIRMED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    CANCELLED: "bg-gray-100 text-gray-700",
    NOT_ARRIVED: "bg-gray-100 text-gray-700",
    ALLOWED: "bg-green-100 text-green-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
};

export default Badge;