import { Car } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-bg text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-accent" />
            <span className="font-bold"></span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Vehicle Service Booking System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;