import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import Button from "../../components/Button";
import Input from "../../components/Input";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    venue: "",
    category: "",
    startTime: "",
    endTime: "",
    maxCapacity: "",
    registrationFee: "",
    upiId: "",
  });

  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate start < end time
    if (form.startTime && form.endTime) {
      if (new Date(form.startTime) >= new Date(form.endTime)) {
        toast.error("End time must be after the start time.");
        return;
      }
    }

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (banner) {
      formData.append("banner", banner);
    }

    setLoading(true);
    try {
      await api.post("/events", formData);
      toast.success("Event created successfully");

      setForm({
        title: "",
        description: "",
        venue: "",
        category: "",
        startTime: "",
        endTime: "",
        maxCapacity: "",
        registrationFee: "",
        upiId: "",
      });

      setBanner(null);
    } catch (error) {
      const msg = error.response?.data?.message;
      if (msg?.toLowerCase().includes("capacity")) {
        toast.error("Please enter a valid capacity number.");
      } else if (msg?.toLowerCase().includes("title")) {
        toast.error("Event title is required.");
      } else {
        toast.error("Failed to create event. Please check your details and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-2xl font-semibold text-black">Create Event</h1>
        <p className="mb-6 text-sm text-gray-500">Add a new event for participants</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" name="title" value={form.title} onChange={handleChange} required />

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="min-h-28 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
            />
          </div>

          <Input label="Venue" name="venue" value={form.venue} onChange={handleChange} required />
          <Input label="Category" name="category" value={form.category} onChange={handleChange} />

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Start Time"
              name="startTime"
              type="datetime-local"
              value={form.startTime}
              onChange={handleChange}
              required
            />

            <Input
              label="End Time"
              name="endTime"
              type="datetime-local"
              value={form.endTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Max Capacity"
              name="maxCapacity"
              type="number"
              value={form.maxCapacity}
              onChange={handleChange}
              required
            />

            <Input
              label="Registration Fee (₹)"
              name="registrationFee"
              type="number"
              value={form.registrationFee}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input label="UPI ID" name="upiId" value={form.upiId} onChange={handleChange} />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Event Banner</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBanner(e.target.files[0])}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <Button loading={loading}>Create Event</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;