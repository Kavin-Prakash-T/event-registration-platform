import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock, IndianRupee, MapPin, Users } from "lucide-react";
import toast from "react-hot-toast";

import api from "../../api/axios";
import Button from "../../components/Button";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;

const MyEvents = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events/my-events");
      setEvents(res.data.events);
    } catch {
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const deleteEvent = async (id) => {
    try {
      if (!window.confirm("Delete this event?")) return;

      await api.delete(`/events/${id}`);
      toast.success("Event deleted");
      fetchEvents();
    } catch {
      toast.error("Failed to delete the event. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">My Events</h1>
          <p className="text-sm text-gray-500">Manage created events</p>
        </div>

        <Link to="/organizer/create-event">
          <Button>Create Event</Button>
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          No events created yet.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const imageUrl = event.bannerPublicId
              ? `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${event.bannerPublicId}`
              : null;

            return (
              <div
                key={event.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="h-40 bg-gray-100">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      No Banner
                    </div>
                  )}
                </div>

                <div className="space-y-3 p-5">
                  <div>
                    <h2 className="text-lg font-semibold text-black">
                      {event.title}
                    </h2>
                    <p className="line-clamp-2 text-sm text-gray-500">
                      {event.description}
                    </p>
                  </div>

                  <p className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} /> {event.venue}
                  </p>

                  <p className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays size={16} />
                    <span>Start: {new Date(event.startTime).toLocaleString()}</span>
                  </p>

                  {event.endTime && (
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>End: {new Date(event.endTime).toLocaleString()}</span>
                    </p>
                  )}

                  <p className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={16} /> Capacity: {event.maxCapacity}
                  </p>

                  <p className="flex items-center gap-2 text-sm font-medium">
                    <IndianRupee size={16} />
                    {event.registrationFee ? (
                      <span className="text-black">Fee: ₹{event.registrationFee}</span>
                    ) : (
                      <span className="text-green-600">Free</span>
                    )}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Link to={`/organizer/events/${event.id}/edit`}>
                      <Button variant="secondary">Edit</Button>
                    </Link>

                    <Link to={`/organizer/events/${event.id}/registrations`}>
                      <Button variant="secondary">Registrations</Button>
                    </Link>

                    <Button
                      variant="danger"
                      onClick={() => deleteEvent(event.id)}
                    >
                      Delete
                    </Button>
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

export default MyEvents;