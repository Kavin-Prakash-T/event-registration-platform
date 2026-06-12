import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  CreditCard,
  ShieldCheck,
  LogOut,
  Bot,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white p-5">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
          <CalendarDays size={22} />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-black">EventPass</h1>
          <p className="text-xs text-gray-500">{user?.role}</p>
        </div>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black"
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}

      </nav>

      <button
        onClick={handleLogout}
        className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;