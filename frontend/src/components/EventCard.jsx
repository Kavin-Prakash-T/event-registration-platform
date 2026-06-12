import { CalendarDays, Clock, IndianRupee, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;

const EventCard = ({ event }) => {
  const imageUrl = event.bannerPublicId
    ? `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${event.bannerPublicId}`
    : null;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="h-40 bg-gray-100">
        {imageUrl ? (
          <img src={imageUrl} alt={event.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">No Banner</div>
        )}
      </div>

      <div className="space-y-3 p-5">
        <h3 className="text-lg font-semibold text-black">{event.title}</h3>
        <p className="line-clamp-2 text-sm text-gray-500">{event.description}</p>

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

        <Link to={`/participant/events/${event.id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;