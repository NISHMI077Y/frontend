const DashboardCard = ({ title, value, icon: Icon, color, bgColor }) => {
  return (
    <div className="card-hover bg-white rounded-xl shadow-md p-6 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold" style={{ color: color }}>
            {value}
          </p>
        </div>
        {Icon && (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: bgColor || `${color}15` }}
          >
            <Icon className="w-6 h-6" style={{ color: color }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;