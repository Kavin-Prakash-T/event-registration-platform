import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../api/axios";
import Button from "../../components/Button";
import Input from "../../components/Input";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("OTP sent to email");
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-xl font-semibold">Forgot Password</h1>
        <p className="mb-6 text-sm text-gray-500">Enter your email to receive OTP</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button className="w-full" loading={loading}>Send OTP</Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;