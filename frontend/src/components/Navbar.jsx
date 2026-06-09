import { CalendarDays, LogOut } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
            <CalendarDays size={20} />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-black">
              EventPass
            </h1>
            <p className="text-xs text-gray-500">
              Event registration platform
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;