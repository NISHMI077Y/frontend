import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import {
  BookOpen,
  CheckCircle,
  XCircle,
  ThumbsUp,
  Trash2,
  Loader2,
  Filter,
  Search,
  AlertCircle,
} from "lucide-react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBookings = async (status = "", date = "") => {
    try {
      let query = [];
      if (status) query.push(`status=${status}`);
      if (date) query.push(`date=${date}`);
      const queryString = query.length > 0 ? `?${query.join("&")}` : "";
      const res = await API.get(`/bookings${queryString}`);
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleFilter = (status) => {
    setFilter(status);
    setLoading(true);
    fetchBookings(status, searchDate);
  };

  const handleDateSearch = (date) => {
    setSearchDate(date);
    setLoading(true);
    fetchBookings(filter, date);
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}/status`, { status });
      toast.success(`Booking ${status.toLowerCase()}`);
      fetchBookings(filter, searchDate);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await API.delete(`/bookings/${id}`);
      toast.success("Booking deleted");
      fetchBookings(filter, searchDate);
    } catch (err) {
      toast.error("Failed to delete booking");
    }
  };

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

  const filterButtons = [
    { label: "All", value: "", color: "bg-gray-600" },
    { label: "Pending", value: "Pending", color: "bg-yellow-500" },
    { label: "Approved", value: "Approved", color: "bg-blue-500" },
    { label: "Completed", value: "Completed", color: "bg-green-500" },
    { label: "Rejected", value: "Rejected", color: "bg-red-500" },
  ];

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
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-accent" />
          Manage Bookings
        </h2>
        <p className="text-gray-500 mt-1">
          View, approve, reject and manage all bookings
        </p>
      </div>

      {/* Filters Row */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Status Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400" />
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => handleFilter(btn.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filter === btn.value
                    ? `${btn.color} text-white shadow-md`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={searchDate}
              onChange={(e) => handleDateSearch(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            {searchDate && (
              <button
                onClick={() => handleDateSearch("")}
                className="text-xs text-red-500 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing <span className="font-semibold text-primary">{bookings.length}</span>{" "}
        booking(s)
      </p>

      {/* Bookings Table */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No bookings found for this filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-3 text-xs font-semibold uppercase text-left">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase text-left">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase text-left">
                    Vehicle
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase text-left">
                    Service
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase text-left">
                    Date
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase text-left">
                    Time
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase text-left">
                    Status
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((b) => {
                  const sc = getStatusConfig(b.status);
                  return (
                    <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">
                        {b.customerName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {b.phone}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-mono">
                        {b.vehicleNumber}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {b.serviceType}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {b.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {b.time}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          {b.status === "Pending" && (
                            <>
                              <button
                                onClick={() => updateStatus(b._id, "Approved")}
                                title="Approve"
                                className="p-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                              >
                                <ThumbsUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => updateStatus(b._id, "Rejected")}
                                title="Reject"
                                className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {b.status === "Approved" && (
                            <button
                              onClick={() => updateStatus(b._id, "Completed")}
                              title="Mark Completed"
                              className="p-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteBooking(b._id)}
                            title="Delete"
                            className="p-1.5 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-700 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;