const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-xl p-6 shadow-md">
    <p className="text-sm text-gray-500 font-medium mb-2">{label}</p>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

export default StatCard;
