import React from "react";
import { Menu } from "lucide-react";

const AdminNavbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-white shadow-sm border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-30 shrink-0 transition-colors duration-200">
      <div className="px-4 h-16 flex items-center justify-between">
        {/* Left Control Group */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={toggleSidebar}
            type="button"
            className="md:hidden p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            <Menu size={22} />
          </button>

          <h1 className="text-lg font-bold md:hidden tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            EasyGo Admin
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 shadow-sm transition-all select-none">
            <div className="w-6 h-6 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
              AD
            </div>

            <span className="text-sm font-semibold text-gray-700 dark:text-zinc-200">
              Admin
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
