import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ShieldCheck } from "lucide-react";

import api from "../../api/axios";
import Button from "../../components/Button";
import Input from "../../components/Input";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: location.state?.email || "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await api.post("/auth/verify-email", form);
      toast.success("Email verified");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Verify Email</h1>
            <p className="text-sm text-gray-500">Enter the OTP sent to email</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" name="email" value={form.email} onChange={handleChange} required />
          <Input label="OTP" name="otp" value={form.otp} onChange={handleChange} required />

          <Button className="w-full" loading={loading}>Verify</Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;