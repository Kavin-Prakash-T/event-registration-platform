import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CalendarDays, MapPin, Users } from "lucide-react";
import api from "../../api/axios";
import Button from "../../components/Button";

const CLOUD_NAME = "YOUR_CLOUDINARY_NAME";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data.event);
    };

    fetchEvent();
  }, [id]);

  const registerEvent = async () => {
    try {
      await api.post(`/registrations/${id}/register`);
      toast.success("Registered successfully");
      navigate("/participant/registrations");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  if (!event) return <p className="p-6">Loading...</p>;

  const imageUrl = event.bannerPublicId
    ? `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${event.bannerPublicId}`
    : null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="h-72 bg-gray-100">
          {imageUrl ? (
            <img src={imageUrl} alt={event.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">No Banner</div>
          )}
        </div>

        <div className="space-y-5 p-6">
          <div>
            <h1 className="text-3xl font-semibold text-black">{event.title}</h1>
            <p className="mt-2 text-gray-600">{event.description}</p>
          </div>

          <div className="grid gap-3 text-sm text-gray-700 md:grid-cols-3">
            <p className="flex items-center gap-2"><MapPin size={16} /> {event.venue}</p>
            <p className="flex items-center gap-2"><CalendarDays size={16} /> {new Date(event.startTime).toLocaleString()}</p>
            <p className="flex items-center gap-2"><Users size={16} /> Capacity: {event.maxCapacity}</p>
          </div>

          <Button onClick={registerEvent}>Register Event</Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;