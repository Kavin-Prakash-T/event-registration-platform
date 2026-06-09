import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/organizer/dashboard"
        element={
          <ProtectedRoute role="ORGANIZER">
            <h1 className="p-6 text-2xl font-semibold">Organizer Dashboard</h1>
          </ProtectedRoute>
        }
      />

      <Route
        path="/participant/dashboard"
        element={
          <ProtectedRoute role="PARTICIPANT">
            <h1 className="p-6 text-2xl font-semibold">Participant Dashboard</h1>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;