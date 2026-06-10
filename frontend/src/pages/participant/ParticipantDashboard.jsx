import { useEffect, useState } from "react";
import { CalendarDays, CreditCard, ShieldCheck, Ticket, CheckCircle } from "lucide-react";
import api from "../../api/axios";

const Card = ({ title, value, icon: Icon }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="mt-2 text-2xl font-semibold text-black">{value}</h2>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
        <Icon size={20} />
      </div>
    </div>
  </div>
);

const ParticipantDashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await api.get("/dashboard/participant");
      setDashboard(res.data.dashboard);
    };

    fetchDashboard();
  }, []);

  if (!dashboard) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-black">Participant Dashboard</h1>
      <p className="mb-6 text-sm text-gray-500">Your event activity summary</p>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        <Card title="Registrations" value={dashboard.totalRegistrations} icon={Ticket} />
        <Card title="Pending Payments" value={dashboard.pendingPayments} icon={CreditCard} />
        <Card title="Submitted" value={dashboard.paymentSubmitted} icon={CheckCircle} />
        <Card title="Confirmed" value={dashboard.confirmedEvents} icon={CalendarDays} />
        <Card title="Entry Allowed" value={dashboard.entryAllowed} icon={ShieldCheck} />
      </div>
    </div>
  );
};

export default ParticipantDashboard;