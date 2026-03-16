import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Car,
  CalendarCheck,
  Shield,
  Clock,
  Wrench,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: CalendarCheck,
      title: "Easy Booking",
      desc: "Book your vehicle service appointment in just a few clicks.",
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      desc: "Track your booking status from pending to completed.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      desc: "Your data is protected with industry-standard security.",
    },
    {
      icon: Wrench,
      title: "Multiple Services",
      desc: "Choose from a variety of vehicle service categories.",
    },
  ];

  const steps = [
    { num: "1", title: "Create Account", desc: "Register with your details" },
    { num: "2", title: "Book Service", desc: "Choose service type, date & time" },
    { num: "3", title: "Get Approved", desc: "Admin reviews your booking" },
    { num: "4", title: "Service Done", desc: "Get your vehicle serviced" },
  ];

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-accent/20 p-4 rounded-full">
                <Car className="w-12 h-12 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Vehicle Service{" "}
              <span className="text-accent">Booking System</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Book your vehicle service appointment online. Fast, easy, and
              reliable. No more waiting in queues or making phone calls.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user && (
                <>
                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-2 bg-accent hover:bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 border border-white/20"
                  >
                    Login
                  </Link>
                </>
              )}

              {user && user.role === "user" && (
                <Link
                  to="/book"
                  className="flex items-center justify-center gap-2 bg-accent hover:bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300"
                >
                  <CalendarCheck className="w-5 h-5" />
                  Book a Service
                </Link>
              )}

              {user && user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center justify-center gap-2 bg-accent hover:bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300"
                >
                  <Star className="w-5 h-5" />
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            We provide the best vehicle service experience with modern technology.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-hover bg-white rounded-xl shadow-md p-6 text-center"
              >
                <div className="bg-accent/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-bold text-lg text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg">
                  {step.num}
                </div>
                <h3 className="font-bold text-primary mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[60%] w-[80%] border-t-2 border-dashed border-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center bg-primary rounded-2xl p-10 shadow-xl">
          <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Book Your Service?
          </h2>
          <p className="text-gray-300 mb-6">
            Join us today and experience hassle-free vehicle service booking.
          </p>
          {!user && (
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-accent hover:bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all"
            >
              Register Now <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;