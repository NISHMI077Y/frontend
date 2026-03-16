import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import {
  Wrench,
  Plus,
  Trash2,
  Loader2,
  AlertCircle,
  FileText,
} from "lucide-react";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data);
    } catch (err) {
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await API.post("/services", form);
      toast.success("Service added successfully!");
      setForm({ name: "", description: "" });
      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add service");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}" service?`)) return;
    try {
      await API.delete(`/services/${id}`);
      toast.success("Service deleted");
      fetchServices();
    } catch (err) {
      toast.error("Failed to delete service");
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
    <div className="max-w-3xl mx-auto px-4 py-8 page-transition">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary flex items-center justify-center gap-3">
          <Wrench className="w-8 h-8 text-accent" />
          Service Categories
        </h2>
        <p className="text-gray-500 mt-1">
          Add and manage vehicle service types
        </p>
      </div>

      {/* Add Service Form */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-accent" />
          Add New Service
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Service Name (e.g., Oil Change)"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            />
          </div>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              placeholder="Description (optional)"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows="3"
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-accent hover:bg-red-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add Service
              </>
            )}
          </button>
        </form>
      </div>

      {/* Services List */}
      <div>
        <h3 className="text-lg font-bold text-primary mb-4">
          Existing Services ({services.length})
        </h3>

        {services.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No services added yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((s, index) => (
              <div
                key={s._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center justify-between card-hover"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-accent/10 w-10 h-10 rounded-full flex items-center justify-center text-accent font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">{s.name}</h4>
                    {s.description && (
                      <p className="text-sm text-gray-400 mt-0.5">
                        {s.description}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(s._id, s.name)}
                  className="p-2 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServices;