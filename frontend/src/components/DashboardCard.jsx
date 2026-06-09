const DashboardCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="mt-2 text-2xl font-semibold text-black">
            {value}
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-black">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;