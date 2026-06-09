import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../api/axios";
import Button from "../../components/Button";
import Input from "../../components/Input";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: location.state?.email || "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/verify-forgot-otp", {
        email: form.email,
        otp: form.otp,
      });

      await api.post("/auth/reset-password", {
        email: form.email,
        newPassword: form.newPassword,
      });

      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-xl font-semibold">Reset Password</h1>
        <p className="mb-6 text-sm text-gray-500">Verify OTP and set new password</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" name="email" value={form.email} onChange={handleChange} required />
          <Input label="OTP" name="otp" value={form.otp} onChange={handleChange} required />
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
            required
          />

          <Button className="w-full">Reset Password</Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;