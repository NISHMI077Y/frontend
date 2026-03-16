import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Car,
  LogIn,
  UserPlus,
  CalendarPlus,
  ClipboardList,
  LayoutDashboard,
  BookOpen,
  Wrench,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? "bg-accent text-white"
        : "text-gray-300 hover:bg-white/10 hover:text-white"
    }`;

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="gradient-bg shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-bold text-xl hover:text-accent transition-colors"
            onClick={closeMobile}
          >
            <Car className="w-7 h-7 text-accent" />
            <span className="hidden sm:inline">Vehicle Service</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {/* Not logged in */}
            {!user && (
              <>
                <Link to="/login" className={linkClass("/login")}>
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link to="/register" className={linkClass("/register")}>
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
              </>
            )}

            {/* User links */}
            {user && user.role === "user" && (
              <>
                <Link to="/book" className={linkClass("/book")}>
                  <CalendarPlus className="w-4 h-4" />
                  Book Service
                </Link>
                <Link to="/my-bookings" className={linkClass("/my-bookings")}>
                  <ClipboardList className="w-4 h-4" />
                  My Bookings
                </Link>
              </>
            )}

            {/* Admin links */}
            {user && user.role === "admin" && (
              <>
                <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link to="/admin/bookings" className={linkClass("/admin/bookings")}>
                  <BookOpen className="w-4 h-4" />
                  Bookings
                </Link>
                <Link to="/admin/services" className={linkClass("/admin/services")}>
                  <Wrench className="w-4 h-4" />
                  Services
                </Link>
              </>
            )}

            {/* User info & Logout */}
            {user && (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
                <div className="flex items-center gap-2 text-accent text-sm">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{user.username}</span>
                  <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-accent hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {!user && (
              <>
                <Link to="/login" className={linkClass("/login")} onClick={closeMobile}>
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link to="/register" className={linkClass("/register")} onClick={closeMobile}>
                  <UserPlus className="w-4 h-4" /> Register
                </Link>
              </>
            )}

            {user && user.role === "user" && (
              <>
                <Link to="/book" className={linkClass("/book")} onClick={closeMobile}>
                  <CalendarPlus className="w-4 h-4" /> Book Service
                </Link>
                <Link to="/my-bookings" className={linkClass("/my-bookings")} onClick={closeMobile}>
                  <ClipboardList className="w-4 h-4" /> My Bookings
                </Link>
              </>
            )}

            {user && user.role === "admin" && (
              <>
                <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")} onClick={closeMobile}>
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link to="/admin/bookings" className={linkClass("/admin/bookings")} onClick={closeMobile}>
                  <BookOpen className="w-4 h-4" /> Bookings
                </Link>
                <Link to="/admin/services" className={linkClass("/admin/services")} onClick={closeMobile}>
                  <Wrench className="w-4 h-4" /> Services
                </Link>
              </>
            )}

            {user && (
              <div className="pt-2 border-t border-white/20">
                <div className="flex items-center gap-2 text-accent text-sm px-3 py-2">
                  <User className="w-4 h-4" />
                  {user.username} ({user.role})
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 text-red-400 hover:bg-white/10 rounded-lg text-sm"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;