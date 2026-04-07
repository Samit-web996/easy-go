import { Menu, X, LayoutDashboard, Users, BarChart3, LogOut, Car } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStores from "./store/authStore";

export default function Sidebar({ isOpen, toggleSidebar }) {

  const logout = useAuthStores((state)=> state.logout);
const navigate = useNavigate();

const handlelogout = ()=>{
  logout()
  navigate('/')
}
  
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64
        bg-white dark:bg-zinc-900
        border-r border-gray-200 dark:border-zinc-800
        flex flex-col
        transition-transform duration-300 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:flex h-full
      `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 h-16 border-b border-gray-200 dark:border-zinc-800">
          <div>
            <span className="text-3xl font-bold text-sky-500">EasyGo</span>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin
            </span>
          </div>

          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLink
            to="/admin"
            end
            onClick={() => {
              if (window.innerWidth < 768) toggleSidebar();
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white"
              }`
            }
          ><br /><br />
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/employee"
            onClick={() => {
              if (window.innerWidth < 768) toggleSidebar();
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white"
              }`
            }
          ><br /><br />
            <Users size={20} />
            <span className="font-medium">Employees</span>
          </NavLink>

          <NavLink
            to="/admin/vehicles"
            onClick={() => {
              if (window.innerWidth < 768) toggleSidebar();
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white"
              }`
            }
          ><br /><br />
            <Car size={20} />
            <span className="font-medium">Vehicles</span>
          </NavLink>

          <NavLink
            to="/admin/financial"
            onClick={() => {
              if (window.innerWidth < 768) toggleSidebar();
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white"
              }`
            }
          ><br /><br />
            <BarChart3 size={20} />
            <span className="font-medium">Financial</span>
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-zinc-800 mt-auto">
          <NavLink to="/">
            <button onClick={handlelogout} className="flex items-center gap-3 h-10 w-full p-3 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-200 group">
              <LogOut
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="font-medium">Logout</span>
            </button>
          </NavLink>
        </div>
      </aside>
    </>
  );
} 