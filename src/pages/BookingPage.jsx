import { useState, useEffect } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function BookingPage() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    vehicleNumber: "",
    serviceType: "",
    date: "",
    time: ""
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await API.get("/services");
    setServices(res.data);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/bookings", formData);
    toast.success("Booking Submitted Successfully ✅");
    setFormData({
      customerName: "",
      phone: "",
      vehicleNumber: "",
      serviceType: "",
      date: "",
      time: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-900">
          Book Vehicle Service
        </h2>

        <input
          name="customerName"
          placeholder="Customer Name"
          className="w-full p-2 border mb-3"
          onChange={handleChange}
          value={formData.customerName}
        />

        <input
          name="phone"
          placeholder="Phone"
          className="w-full p-2 border mb-3"
          onChange={handleChange}
          value={formData.phone}
        />

        <input
          name="vehicleNumber"
          placeholder="Vehicle Number"
          className="w-full p-2 border mb-3"
          onChange={handleChange}
          value={formData.vehicleNumber}
        />

        <select
          name="serviceType"
          className="w-full p-2 border mb-3"
          onChange={handleChange}
        >
          <option>Select Service</option>
          {services.map((service) => (
            <option key={service._id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          className="w-full p-2 border mb-3"
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          className="w-full p-2 border mb-3"
          onChange={handleChange}
        />

        <button
          className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800"
        >
          Book Now
        </button>
      </form>
    </div>
  );
}

export default BookingPage;