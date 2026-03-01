import React from "react";
import { Menu, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const AdminNavbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-zinc-900 text-white shadow-sm border-b border-zinc-800 sticky top-0 z-30 shrink-0">
      <div className="px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <h1 className="text-xl font-semibold md:hidden">EasyGo Admin</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold">AD</div>
            <span className="text-sm font-medium">Admin</span>
          </div>

          <Link to="/">
            <button className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all border border-red-600/20">
              <LogOut size={16} />
              <span className="hidden xs:inline">Logout</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;