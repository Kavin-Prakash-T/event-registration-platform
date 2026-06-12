import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";
import Button from "../../components/Button";
import Input from "../../components/Input";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    venue: "",
    category: "",
    startTime: "",
    endTime: "",
    maxCapacity: "",
    upiId: "",
  });

  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await api.get(`/events/${id}`);
      const event = res.data.event;

      setForm({
        title: event.title || "",
        description: event.description || "",
        venue: event.venue || "",
        category: event.category || "",
        startTime: event.startTime?.slice(0, 16) || "",
        endTime: event.endTime?.slice(0, 16) || "",
        maxCapacity: event.maxCapacity || "",
        upiId: event.upiId || "",
      });
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (banner) {
      formData.append("banner", banner);
    }

    try {
      await api.put(`/events/${id}`, formData);
      toast.success("Event updated successfully");
      navigate("/organizer/my-events");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-2xl font-semibold text-black">Edit Event</h1>
        <p className="mb-6 text-sm text-gray-500">
          Update event details and banner
        </p>

        <form onSubmit={updateEvent} className="space-y-4">
          <Input
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="min-h-28 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
            />
          </div>

          <Input
            label="Venue"
            name="venue"
            value={form.venue}
            onChange={handleChange}
            required
          />

          <Input
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
          />

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
              label="UPI ID"
              name="upiId"
              value={form.upiId}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Replace Banner
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBanner(e.target.files[0])}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit">Update Event</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/organizer/my-events")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;