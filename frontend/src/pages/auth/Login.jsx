import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CalendarDays } from "lucide-react";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import Input from "../../components/Input";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
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
      const res = await api.post("/auth/login", form);

      login(res.data);

      toast.success("Login successful");

      if (res.data.user.role === "ORGANIZER") {
        navigate("/organizer/dashboard");
      } else {
        navigate("/participant/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
            <CalendarDays size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-black">EventPass</h1>
            <p className="text-sm text-gray-500">Login to your account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button className="w-full">Login</Button>
        </form>

        <div className="mt-5 flex justify-between text-sm">
          <Link to="/signup" className="text-gray-700 hover:text-black">
            Create account
          </Link>
          <Link to="/forgot-password" className="text-gray-700 hover:text-black">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;