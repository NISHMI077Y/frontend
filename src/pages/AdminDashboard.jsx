import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import DashboardCard from "../components/DashboardCard";
import {
  LayoutDashboard,
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
  ThumbsUp,
  CalendarDays,
  Loader2,
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, bookingsRes] = await Promise.all([
          API.get("/bookings/stats/dashboard"),
          API.get("/bookings"),
        ]);
        setStats(statsRes.data);
        setRecentBookings(bookingsRes.data.slice(0, 5));
      } catch (err) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusConfig = (status) => {
    switch (status) {
      case "Pending":
        return { bg: "bg-yellow-100", text: "text-yellow-800" };
      case "Approved":
        return { bg: "bg-blue-100", text: "text-blue-800" };
      case "Completed":
        return { bg: "bg-green-100", text: "text-green-800" };
      case "Rejected":
        return { bg: "bg-red-100", text: "text-red-800" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 page-transition">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8 text-accent" />
          Admin Dashboard
        </h2>
        <p className="text-gray-500 mt-1">Overview of all service bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
        <DashboardCard
          title="Total Bookings"
          value={stats?.total || 0}
          icon={BookOpen}
          color="#3b82f6"
        />
        <DashboardCard
          title="Pending"
          value={stats?.pending || 0}
          icon={Clock}
          color="#f59e0b"
        />
        <DashboardCard
          title="Approved"
          value={stats?.approved || 0}
          icon={ThumbsUp}
          color="#06b6d4"
        />
        <DashboardCard
          title="Completed"
          value={stats?.completed || 0}
          icon={CheckCircle}
          color="#22c55e"
        />
        <DashboardCard
          title="Rejected"
          value={stats?.rejected || 0}
          icon={XCircle}
          color="#ef4444"
        />
        <DashboardCard
          title="Today"
          value={stats?.todayBookings || 0}
          icon={CalendarDays}
          color="#8b5cf6"
        />
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-primary">Recent Bookings</h3>
        </div>

        {recentBookings.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No bookings yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Service
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentBookings.map((b) => {
                  const sc = getStatusConfig(b.status);
                  return (
                    <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {b.customerName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {b.vehicleNumber}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {b.serviceType}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {b.date}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;