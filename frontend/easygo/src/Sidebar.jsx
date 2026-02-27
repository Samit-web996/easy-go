import { useState } from "react";
import { Menu, X, LayoutDashboard, Users, Calendar, BarChart3, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 p-2 rounded-md shadow"
        onClick={() => setOpen(true)}
      >
        <Menu size={22} className="text-gray-700 dark:text-white" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-screen bg-zinc-900 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <p className="text-4xl font-bold text-gray-800 dark:text-white">
            EasyGo Admin
          </p>

          
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">

          <NavLink
            to="/admin"
            className={"flex items-center gap-3 h-12 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"}><br /><br />
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/employee"
            className={"flex items-center gap-3 h-12 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"}
          ><br />
            <Users size={18} />
            Employees
          </NavLink>

          <NavLink
            to="/admin/Vehicles"
            className="flex items-center gap-3 h-12 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          ><br /><br />
            <Calendar size={18} />
            Vehicles
          </NavLink>

          <NavLink
            to="/reports"
            className="flex items-center gap-3 h-12 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          ><br /><br />
            <BarChart3 size={18} />
            Reports
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t dark:border-gray-700">
          <NavLink to="/"><button className="mt-auto w-64 rounded-lg flex items-center h-12 gap-3 text-gray-700 dark:text-gray-300 hover:bg-red-500 dark:hover:bg-red-500 transition">
            <LogOut size={18} />
            Logout
          </button>
          </NavLink>
        </div>
      </aside>
    </>
  );
}