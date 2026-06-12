import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import Button from "../../components/Button";

const PaymentVerification = () => {
  const [payments, setPayments] = useState([]);
  const [processingId, setProcessingId] = useState(null);

  const fetchPayments = async () => {
    const res = await api.get("/payments/pending");
    setPayments(res.data.payments);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const approvePayment = async (paymentId) => {
    try {
      setProcessingId(paymentId);
      await api.patch(`/payments/${paymentId}/approve`);
      toast.success("Payment approved");
      fetchPayments();
    } catch {
      toast.error("Failed to approve payment. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  const rejectPayment = async (paymentId) => {
    const reason = prompt("Enter rejection reason:");

    if (!reason) return;

    try {
      setProcessingId(paymentId);
      await api.patch(`/payments/${paymentId}/reject`, { reason });
      toast.success("Payment rejected");
      fetchPayments();
    } catch {
      toast.error("Failed to reject payment. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-black">
        Payment Verification
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        Approve or reject submitted UPI payments
      </p>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-600">
            <tr>
              <th className="whitespace-nowrap p-4">Participant</th>
              <th className="whitespace-nowrap p-4">Event</th>
              <th className="whitespace-nowrap p-4">UTR ID</th>
              <th className="whitespace-nowrap p-4">Transaction ID</th>
              <th className="whitespace-nowrap p-4">Amount</th>
              <th className="whitespace-nowrap p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4">
                  <p className="font-medium">
                    {payment.registration.participant.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {payment.registration.participant.email}
                  </p>
                </td>
                <td className="whitespace-nowrap p-4">{payment.registration.event.title}</td>
                <td className="whitespace-nowrap p-4">{payment.utrId}</td>
                <td className="whitespace-nowrap p-4">{payment.transactionId}</td>
                <td className="whitespace-nowrap p-4">₹{payment.amount}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => approvePayment(payment.id)}
                      loading={processingId === payment.id}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => rejectPayment(payment.id)}
                      disabled={processingId === payment.id}
                    >
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <p className="p-6 text-center text-sm text-gray-500">
            No pending payments.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentVerification;