import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Input from "../../components/Input";

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [payment, setPayment] = useState({
    utrId: "",
    transactionId: "",
    amount: "",
  });

  const fetchRegistrations = async () => {
    const res = await api.get("/registrations/my-registrations");
    setRegistrations(res.data.registrations);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const submitPayment = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/payments/${selected.id}/submit`, payment);
      toast.success("Payment submitted");
      setSelected(null);
      setPayment({ utrId: "", transactionId: "", amount: "" });
      fetchRegistrations();
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-2xl font-semibold text-black">My Registrations</h1>

      <div className="space-y-4">
        {registrations.map((reg) => (
          <div key={reg.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-lg font-semibold">{reg.event.title}</h2>
                <p className="text-sm text-gray-500">{reg.event.venue}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge status={reg.registrationStatus} />
                  <Badge status={reg.entryStatus} />
                  {reg.payment && <Badge status={reg.payment.status} />}
                </div>
              </div>

              {reg.registrationStatus === "PAYMENT_PENDING" && (
                <Button onClick={() => setSelected(reg)}>Submit Payment</Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Submit Payment</h2>

            <form onSubmit={submitPayment} className="space-y-4">
              <Input
                label="UTR ID"
                value={payment.utrId}
                onChange={(e) => setPayment({ ...payment, utrId: e.target.value })}
                required
              />

              <Input
                label="Transaction ID"
                value={payment.transactionId}
                onChange={(e) => setPayment({ ...payment, transactionId: e.target.value })}
                required
              />

              <Input
                label="Amount"
                type="number"
                value={payment.amount}
                onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
                required
              />

              <div className="flex gap-3">
                <Button type="submit">Submit</Button>
                <Button type="button" variant="secondary" onClick={() => setSelected(null)}>
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

export default MyRegistrations;