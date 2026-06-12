import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axios";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Input from "../../components/Input";

const EventRegistrations = () => {
  const { id } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");

  const fetchRegistrations = async () => {
    const res = await api.get(
      `/registrations/event/${id}/registrations?search=${search}`
    );
    setRegistrations(res.data.registrations);
  };

  useEffect(() => {
    fetchRegistrations();
  }, [search, id]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            Event Registrations
          </h1>
          <p className="text-sm text-gray-500">
            View registered participants
          </p>
        </div>

        <Link to={`/organizer/events/${id}/edit`}>
          <Button variant="secondary">Edit Event</Button>
        </Link>
      </div>

      <div className="mb-5 max-w-md">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4">Participant</th>
              <th className="p-4">Email</th>
              <th className="p-4">Registration</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Entry</th>
            </tr>
          </thead>

          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id} className="border-b">
                <td className="p-4 font-medium">{reg.participant.name}</td>
                <td className="p-4 text-gray-600">{reg.participant.email}</td>
                <td className="p-4">
                  <Badge status={reg.registrationStatus} />
                </td>
                <td className="p-4">
                  {reg.payment ? (
                    <Badge status={reg.payment.status} />
                  ) : (
                    <span className="text-gray-400">No payment</span>
                  )}
                </td>
                <td className="p-4">
                  <Badge status={reg.entryStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {registrations.length === 0 && (
          <p className="p-6 text-center text-sm text-gray-500">
            No registrations found.
          </p>
        )}
      </div>
    </div>
  );
};

export default EventRegistrations;