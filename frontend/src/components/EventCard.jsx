import { CalendarDays, MapPin, Users } from "lucide-react";
import Button from "./Button";

const EventCard = ({ event }) => {
  const imageUrl = event.bannerPublicId
    ? `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/${event.bannerPublicId}`
    : null;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
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
          <h3 className="text-lg font-semibold text-black">
            {event.title}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-500">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <MapPin size={16} /> {event.venue}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays size={16} />
            {new Date(event.startTime).toLocaleString()}
          </p>
          <p className="flex items-center gap-2">
            <Users size={16} />
            Capacity: {event.maxCapacity}
          </p>
        </div>

        <Button className="w-full">View Details</Button>
      </div>
    </div>
  );
};

export default EventCard;