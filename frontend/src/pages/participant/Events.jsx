import { useEffect, useState } from "react";
import api from "../../api/axios";
import EventCard from "../../components/EventCard";
import Input from "../../components/Input";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const fetchEvents = async () => {
    const res = await api.get(`/events?search=${search}`);
    setEvents(res.data.events);
  };

  useEffect(() => {
    fetchEvents();
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Events</h1>
          <p className="text-sm text-gray-500">Browse and register for events</p>
        </div>
      </div>

      <div className="mb-6 max-w-md">
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;