import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ParticipantDashboard from "../pages/participant/ParticipantDashboard";
import Events from "../pages/participant/Events";
import EventDetails from "../pages/participant/EventDetails";
import MyRegistrations from "../pages/participant/MyRegistrations";

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
      <Route
        path="/participant/dashboard"
        element={
          <ProtectedRoute role="PARTICIPANT">
            <ParticipantDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/participant/events"
        element={
          <ProtectedRoute role="PARTICIPANT">
            <Events />
          </ProtectedRoute>
        }
      />

      <Route
        path="/participant/events/:id"
        element={
          <ProtectedRoute role="PARTICIPANT">
            <EventDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/participant/registrations"
        element={
          <ProtectedRoute role="PARTICIPANT">
            <MyRegistrations />
          </ProtectedRoute>
        }
      />
    </Routes>

  );
};

export default AppRoutes;