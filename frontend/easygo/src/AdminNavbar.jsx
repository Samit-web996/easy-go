import React from "react";
import { Menu } from "lucide-react";

const AdminNavbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-white shadow-sm border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-30 shrink-0 transition-colors">

      <div className="px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <Menu size={24} />
          </button>

          <h1 className="text-xl font-semibold md:hidden">
            EasyGo Admin
          </h1>
        </div>

        <div className="flex items-center gap-4">

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">

            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
              AD
            </div>

            <span className="text-sm font-medium">
              Admin
            </span>

          </div>

        </div>

      </div>

    </nav>
  );
};

export default AdminNavbar;