import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../pages/LandingPage";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import ParticipantDashboard from "../pages/participant/ParticipantDashboard";
import Events from "../pages/participant/Events";
import EventDetails from "../pages/participant/EventDetails";
import MyRegistrations from "../pages/participant/MyRegistrations";

import OrganizerDashboard from "../pages/organizer/OrganizerDashboard";
import CreateEvent from "../pages/organizer/CreateEvent";
import MyEvents from "../pages/organizer/MyEvents";
import EventRegistrations from "../pages/organizer/EventRegistrations";
import PaymentVerification from "../pages/organizer/PaymentVerification";
import EntryVerification from "../pages/organizer/EntryVerification";
import EditEvent from "../pages/organizer/EditEvent";

import ProtectedRoute from "../components/ProtectedRoute";

import AppLayout from "../components/AppLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/participant/dashboard"
        element={
          <ProtectedRoute role="PARTICIPANT">
            <AppLayout>
              <ParticipantDashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/participant/events"
        element={
          <ProtectedRoute role="PARTICIPANT">
            <AppLayout>
              <Events />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/participant/events/:id"
        element={
          <ProtectedRoute role="PARTICIPANT">
            <AppLayout>
              <EventDetails />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/participant/registrations"
        element={
          <ProtectedRoute role="PARTICIPANT">
            <AppLayout>
              <MyRegistrations />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/dashboard"
        element={
          <ProtectedRoute role="ORGANIZER">
            <AppLayout>
              <OrganizerDashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/create-event"
        element={
          <ProtectedRoute role="ORGANIZER">
            <AppLayout>
              <CreateEvent />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/my-events"
        element={
          <ProtectedRoute role="ORGANIZER">
            <AppLayout>
              <MyEvents />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/events/:id/registrations"
        element={
          <ProtectedRoute role="ORGANIZER">
            <AppLayout>
              <EventRegistrations />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/payments"
        element={
          <ProtectedRoute role="ORGANIZER">
            <AppLayout>
              <PaymentVerification />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/entry"
        element={
          <ProtectedRoute role="ORGANIZER">
            <AppLayout>
              <EntryVerification />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/events/:id/edit"
        element={
          <ProtectedRoute role="ORGANIZER">
            <AppLayout>
              <EditEvent />
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>

  );
};

export default AppRoutes;