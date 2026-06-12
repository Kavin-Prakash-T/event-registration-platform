import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CalendarDays, Clock, IndianRupee, MapPin, Users, Wallet } from "lucide-react";
import api from "../../api/axios";
import Button from "../../components/Button";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;

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
      const msg = error.response?.data?.message;
      if (msg?.toLowerCase().includes("already")) {
        toast.error("You are already registered for this event.");
      } else if (msg?.toLowerCase().includes("full") || msg?.toLowerCase().includes("capacity")) {
        toast.error("This event is fully booked.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
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

          <div className="grid gap-3 text-sm text-gray-700 sm:grid-cols-2 md:grid-cols-3">
            <p className="flex items-center gap-2"><MapPin size={16} /> {event.venue}</p>
            <p className="flex items-center gap-2">
              <CalendarDays size={16} />
              <span>Start: {new Date(event.startTime).toLocaleString()}</span>
            </p>
            {event.endTime && (
              <p className="flex items-center gap-2">
                <Clock size={16} />
                <span>End: {new Date(event.endTime).toLocaleString()}</span>
              </p>
            )}
            <p className="flex items-center gap-2"><Users size={16} /> Capacity: {event.maxCapacity}</p>
            <p className="flex items-center gap-2 font-medium">
              <IndianRupee size={16} />
              {event.registrationFee ? (
                <span className="text-black">Fee: ₹{event.registrationFee}</span>
              ) : (
                <span className="text-green-600">Free</span>
              )}
            </p>
          </div>

          {/* UPI ID Section */}
          {event.upiId && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                Pay via UPI
              </p>
              {event.registrationFee && (
                <p className="mb-2 text-2xl font-bold text-black">₹{event.registrationFee}</p>
              )}
              <div className="flex items-center gap-2">
                <Wallet size={18} className="shrink-0 text-gray-600" />
                <p className="select-all break-all text-base font-semibold text-black">
                  {event.upiId}
                </p>
              </div>
              <p className="mt-1 text-xs text-gray-400">Tap to select and copy the UPI ID</p>
            </div>
          )}

          <Button onClick={registerEvent}>Register Event</Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;