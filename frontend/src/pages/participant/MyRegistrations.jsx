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

    // Validate UTR ID - exactly 12 digits
    const utrRegex = /^\d{12}$/;
    if (!utrRegex.test(payment.utrId)) {
      toast.error("UTR ID must be exactly 12 digits.");
      return;
    }

    if (!payment.transactionId.trim()) {
      toast.error("Please enter the Transaction ID.");
      return;
    }

    if (!payment.amount || Number(payment.amount) <= 0) {
      toast.error("Please enter a valid payment amount.");
      return;
    }

    const requiredFee = selected?.event?.registrationFee;
    if (requiredFee && Number(payment.amount) !== Number(requiredFee)) {
      toast.error(`Incorrect amount. Please pay the exact registration fee of ₹${requiredFee}.`);
      return;
    }

    try {
      await api.post(`/payments/${selected.id}/submit`, payment);
      toast.success("Payment submitted successfully");
      setSelected(null);
      setPayment({ utrId: "", transactionId: "", amount: "" });
      fetchRegistrations();
    } catch (error) {
      const msg = error.response?.data?.message;
      if (msg?.toLowerCase().includes("already")) {
        toast.error("Payment has already been submitted for this registration.");
      } else if (msg?.toLowerCase().includes("incorrect amount") || msg?.toLowerCase().includes("registration fee")) {
        toast.error(msg);
      } else {
        toast.error("Failed to submit payment. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <h1 className="mb-6 text-2xl font-semibold text-black">My Registrations</h1>

      {registrations.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          No registrations yet.
        </div>
      ) : (
        /* ── Scrollable table wrapper ── */
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-gray-600">
              <tr>
                <th className="whitespace-nowrap px-4 py-3">Event</th>
                <th className="whitespace-nowrap px-4 py-3">Venue</th>
                <th className="whitespace-nowrap px-4 py-3">Fee</th>
                <th className="whitespace-nowrap px-4 py-3">Registration</th>
                <th className="whitespace-nowrap px-4 py-3">Payment</th>
                <th className="whitespace-nowrap px-4 py-3">Entry</th>
                <th className="whitespace-nowrap px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-black">{reg.event.title}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600">{reg.event.venue}</td>
                  <td className="px-4 py-3">
                    <Badge status={reg.registrationStatus} />
                  </td>
                  <td className="px-4 py-3">
                    {reg.payment ? (
                      <Badge status={reg.payment.status} />
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge status={reg.entryStatus} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {reg.event.registrationFee
                      ? `₹${reg.event.registrationFee}`
                      : <span className="text-xs text-gray-400">Free</span>
                    }
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {reg.registrationStatus === "PAYMENT_PENDING" && (
                      <Button onClick={() => {
                        setSelected(reg);
                        setPayment({
                          utrId: "",
                          transactionId: "",
                          amount: reg.event.registrationFee ? String(reg.event.registrationFee) : "",
                        });
                      }}>Submit Payment</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Payment Modal ── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div
            className="w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
            style={{ maxHeight: "90vh" }}
          >
            <h2 className="mb-1 text-xl font-semibold">Submit Payment</h2>
            <p className="mb-4 text-sm text-gray-500">{selected.event.title}</p>

            {selected.event.upiId && (
              <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Pay to UPI ID
                </p>
                <p className="select-all break-all text-lg font-semibold text-black">
                  {selected.event.upiId}
                </p>
                <p className="mt-1 text-xs text-gray-400">Tap to select and copy</p>
              </div>
            )}

            {selected.event.registrationFee && (
              <div className="mb-5 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-sm font-medium text-gray-600">Registration Fee</p>
                <p className="text-lg font-bold text-black">₹{selected.event.registrationFee}</p>
              </div>
            )}

            <form onSubmit={submitPayment} className="space-y-4">
              <div className="space-y-1">
                <Input
                  label="UTR ID"
                  value={payment.utrId}
                  onChange={(e) => setPayment({ ...payment, utrId: e.target.value })}
                  required
                  maxLength={12}
                />
                <p className="text-xs text-gray-400">
                  Must be exactly 12 digits ({payment.utrId.length}/12)
                </p>
              </div>

              <Input
                label="Transaction ID"
                value={payment.transactionId}
                onChange={(e) => setPayment({ ...payment, transactionId: e.target.value })}
                required
              />

              <div className="space-y-1">
                <Input
                  label={selected.event.registrationFee ? `Amount (₹) — Required: ₹${selected.event.registrationFee}` : "Amount (₹)"}
                  type="number"
                  value={payment.amount}
                  onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
                  required
                />
                {selected.event.registrationFee && (
                  <p className="text-xs text-gray-400">
                    You must enter exactly ₹{selected.event.registrationFee}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-1">
                <Button type="submit">Submit</Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setSelected(null);
                    setPayment({ utrId: "", transactionId: "", amount: "" });
                  }}
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

export default MyRegistrations;