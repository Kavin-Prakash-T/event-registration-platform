import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CalendarPlus } from "lucide-react";

import api from "../../api/axios";
import Button from "../../components/Button";
import Input from "../../components/Input";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "PARTICIPANT",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.name.trim()) {
      toast.error("Please enter your name.");
      return false;
    }
    if (!form.email.trim()) {
      toast.error("Please enter your email address.");
      return false;
    }
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!form.password) {
      toast.error("Please enter a password.");
      return false;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    if (form.password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await api.post("/auth/signup", form);
      toast.success("OTP sent to your email. Please verify.");
      navigate("/verify-email", { state: { email: form.email } });
    } catch (error) {
      const msg = error.response?.data?.message;
      if (msg?.toLowerCase().includes("email") && msg?.toLowerCase().includes("exist")) {
        toast.error("An account with this email already exists.");
      } else {
        toast.error("Sign up failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
            <CalendarPlus size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-black">Create Account</h1>
            <p className="text-sm text-gray-500">Join EventPass</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" name="name" value={form.name} onChange={handleChange} required />

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
            >
              <option value="PARTICIPANT">Participant</option>
              <option value="ORGANIZER">Organizer</option>
            </select>
          </div>

          <Button className="w-full" loading={loading}>Create Account</Button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-black">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;