import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  CreditCard,
  ShieldCheck,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const organizerLinks = [
    { name: "Dashboard", path: "/organizer/dashboard", icon: LayoutDashboard },
    { name: "Create Event", path: "/organizer/create-event", icon: PlusCircle },
    { name: "My Events", path: "/organizer/my-events", icon: CalendarDays },
    { name: "Payments", path: "/organizer/payments", icon: CreditCard },
    { name: "Entry Verification", path: "/organizer/entry", icon: ShieldCheck },
  ];

  const participantLinks = [
    { name: "Dashboard", path: "/participant/dashboard", icon: LayoutDashboard },
    { name: "Events", path: "/participant/events", icon: CalendarDays },
    { name: "My Registrations", path: "/participant/registrations", icon: CreditCard },
  ];

  const links = user?.role === "ORGANIZER" ? organizerLinks : participantLinks;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r border-gray-200 bg-white p-5 md:flex">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
            <CalendarDays size={22} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-black">EventPass</h1>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive(link.path)
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
                }`}
              >
                <Icon size={18} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* ── Mobile Top Bar ── */}
      <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
            <CalendarDays size={18} />
          </div>
          <span className="text-base font-semibold text-black">EventPass</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ── Mobile Drawer Overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ── */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 transform bg-white p-5 shadow-xl transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
              <CalendarDays size={22} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-black">EventPass</h1>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive(link.path)
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
                }`}
              >
                <Icon size={18} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 flex w-full items-center gap-3 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;