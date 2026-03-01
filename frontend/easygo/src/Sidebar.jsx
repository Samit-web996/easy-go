import { Menu, X, LayoutDashboard, Users, BarChart3, LogOut, Car } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col 
        transition-transform duration-300 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 md:flex h-full
      `}>
        
        {/* Logo/Title Area */}
        <div className="flex items-center justify-between p-6 h-16 border-b border-zinc-800 shrink-0">
          <span className="text-xl font-bold text-white tracking-tight">EasyGo Admin</span>
          <button onClick={toggleSidebar} className="md:hidden text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
          <NavLink
            to="/admin"
            end
            onClick={() => { if(window.innerWidth < 768) toggleSidebar(); }}
            className={({ isActive }) => 
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-gray-400 hover:bg-zinc-800 hover:text-white"
              }`
            }
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/employee"
            onClick={() => { if(window.innerWidth < 768) toggleSidebar(); }}
            className={({ isActive }) => 
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-gray-400 hover:bg-zinc-800 hover:text-white"
              }`
            }
          >
            <Users size={20} />
            <span className="font-medium">Employees</span>
          </NavLink>

          <NavLink
            to="/admin/vehicles"
            onClick={() => { if(window.innerWidth < 768) toggleSidebar(); }}
            className={({ isActive }) => 
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-gray-400 hover:bg-zinc-800 hover:text-white"
              }`
            }
          >
            <Car size={20} />
            <span className="font-medium">Vehicles</span>
          </NavLink>

          <NavLink
            to="/admin/financial"
            onClick={() => { if(window.innerWidth < 768) toggleSidebar(); }}
            className={({ isActive }) => 
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-gray-400 hover:bg-zinc-800 hover:text-white"
              }`
            }
          >
            <BarChart3 size={20} />
            <span className="font-medium">Financial</span>
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-zinc-800 mt-auto shrink-0">
          <NavLink to="/">
            <button className="flex items-center gap-3 w-full p-3 text-gray-400 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-200 group">
              <LogOut size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Logout</span>
            </button>
          </NavLink>
        </div>
      </aside>
    </>
  );
}