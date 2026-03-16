import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";
import {
  ClipboardList,
  Car,
  Calendar,
  Clock,
  Wrench,
  Phone,
  Loader2,
  CalendarPlus,
  AlertCircle,
} from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings/my-bookings");
        setBookings(res.data);
      } catch (err) {
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusConfig = (status) => {
    switch (status) {
      case "Pending":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          dot: "bg-yellow-500",
        };
      case "Approved":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          dot: "bg-blue-500",
        };
      case "Completed":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          dot: "bg-green-500",
        };
      case "Rejected":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          dot: "bg-red-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          dot: "bg-gray-500",
        };
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
    <div className="max-w-5xl mx-auto px-4 py-8 page-transition">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary flex items-center justify-center gap-3">
          <ClipboardList className="w-8 h-8 text-accent" />
          My Bookings
        </h2>
        <p className="text-gray-500 mt-2">Track all your service appointments</p>
      </div>

      {/* Empty State */}
      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Bookings Yet
          </h3>
          <p className="text-gray-400 mb-6">
            You haven't booked any service yet. Book your first appointment!
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 bg-accent hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            <CalendarPlus className="w-5 h-5" />
            Book a Service
          </Link>
        </div>
      ) : (
        /* Booking Cards */
        <div className="grid gap-4">
          {bookings.map((b) => {
            const statusConfig = getStatusConfig(b.status);
            return (
              <div
                key={b._id}
                className="bg-white rounded-xl shadow-md p-6 card-hover border-l-4"
                style={{
                  borderLeftColor:
                    b.status === "Pending"
                      ? "#f59e0b"
                      : b.status === "Approved"
                      ? "#3b82f6"
                      : b.status === "Completed"
                      ? "#22c55e"
                      : "#ef4444",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left - Details */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-400">Vehicle</p>
                        <p className="font-semibold text-sm">{b.vehicleNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-400">Service</p>
                        <p className="font-semibold text-sm">{b.serviceType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-400">Phone</p>
                        <p className="font-semibold text-sm">{b.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="font-semibold text-sm">{b.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-400">Time</p>
                        <p className="font-semibold text-sm">{b.time}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right - Status */}
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${statusConfig.bg} ${statusConfig.text}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></span>
                      {b.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;