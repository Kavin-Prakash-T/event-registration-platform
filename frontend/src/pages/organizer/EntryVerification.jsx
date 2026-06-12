import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Badge from "../../components/Badge";

const EntryVerification = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [otp, setOtp] = useState("");

  const fetchEvents = async () => {
    const res = await api.get("/events/my-events");
    setEvents(res.data.events);
  };

  const fetchRegistrations = async () => {
    if (!selectedEventId) return;

    const res = await api.get(
      `/registrations/event/${selectedEventId}/registrations?search=${search}`
    );

    const confirmedOnly = res.data.registrations.filter(
      (reg) => reg.registrationStatus === "CONFIRMED"
    );

    setRegistrations(confirmedOnly);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [selectedEventId, search]);

  const sendOtp = async (registrationId) => {
    try {
      await api.post(`/entry/${registrationId}/send-otp`);
      toast.success("Entry OTP sent");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/entry/${selectedRegistration.id}/verify`, { otp });

      toast.success("Entry verified successfully");
      setSelectedRegistration(null);
      setOtp("");
      fetchRegistrations();
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-black">Entry Verification</h1>
      <p className="mb-6 text-sm text-gray-500">
        Send and verify entry OTP for confirmed participants
      </p>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Select Event</label>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
          >
            <option value="">Choose event</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Search Participant"
          placeholder="Name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4">Participant</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Entry</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id} className="border-b">
                <td className="p-4">
                  <p className="font-medium text-black">{reg.participant.name}</p>
                  <p className="text-xs text-gray-500">{reg.participant.email}</p>
                </td>

                <td className="p-4">
                  {reg.payment ? <Badge status={reg.payment.status} /> : "No payment"}
                </td>

                <td className="p-4">
                  <Badge status={reg.entryStatus} />
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <Button onClick={() => sendOtp(reg.id)}>Send OTP</Button>
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedRegistration(reg)}
                      disabled={reg.entryStatus === "ALLOWED"}
                    >
                      Verify OTP
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {registrations.length === 0 && (
          <p className="p-6 text-center text-sm text-gray-500">
            Select an event to view confirmed participants.
          </p>
        )}
      </div>

      {selectedRegistration && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-black">Verify Entry OTP</h2>
            <p className="mb-5 text-sm text-gray-500">
              {selectedRegistration.participant.name}
            </p>

            <form onSubmit={verifyOtp} className="space-y-4">
              <Input
                label="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />

              <div className="flex gap-3">
                <Button type="submit">Verify</Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setSelectedRegistration(null)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryVerification;