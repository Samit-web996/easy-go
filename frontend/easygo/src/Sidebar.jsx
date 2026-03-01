import { Menu, X, LayoutDashboard, Users,BarChart3, LogOut, Car } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  

  return (
    <>
      
      <aside className="sticky h-165 top-0 left-0 w-64 bg-zinc-900 flex flex-col overflow-hidden">
        <nav className="flex-1 ">

          <NavLink
            to="/admin"
            className={"flex items-center gap-3 h-12 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"}><br/>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/employee"
            className={"flex items-center gap-3 h-12 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"}><br/>
            <Users size={18} />
            Employees
          </NavLink>

          <NavLink
            to="/admin/vehicles"
            className="flex items-center gap-3 h-12 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"><br />
            <Car size={18} />
            Vehicles
          </NavLink>

          <NavLink
            to="/admin/financial"
            className="flex items-center gap-3 h-12 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"><br />
            <BarChart3 size={18} />
            Financial
          </NavLink>

          
        </nav>

        {/* Logout */}
        <div className="p-4 border-t dark:border-gray-700">
          <NavLink to="/"><button className="mt-auto w-64 rounded-lg flex items-center h-12 gap-3 text-gray-700 dark:text-gray-300 hover:bg-red-500 dark:hover:bg-red-500 transition"><br />
            <LogOut size={18} />
            Logout
          </button>
          </NavLink>
        </div>
      </aside>
    </>
  );
}