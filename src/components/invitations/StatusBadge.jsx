const colors = {
  Pending: "bg-yellow-200 text-yellow-800",
  Accepted: "bg-green-200 text-green-800",
  Expired: "bg-gray-200 text-gray-700",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`px-2 py-1 rounded text-sm font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}