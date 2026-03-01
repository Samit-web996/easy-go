import React, { useState } from "react";

const AdminNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-zinc-900 text-white shadow-lg w-full h-18 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <p className="text-4xl font-bold text-gray-800 dark:text-white">
            EasyGo Admin
          </p>

          
        </div>

          {/* Desktop Menu */}
          {/* <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-blue-400 transition-colors px-3 py-2 text-sm font-medium border-b-2 border-blue-500">Dashboard</a>
            <a href="#" className="hover:text-blue-400 transition-colors px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-400">Manage Cars</a>
            <a href="#" className="hover:text-blue-400 transition-colors px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-400">Bookings</a>
            <a href="#" className="hover:text-blue-400 transition-colors px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-400">Customers</a>
          </div> */}

          {/* Profile/Logout Section */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 mr-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">AD</div>
              <span className="text-sm">Admin</span>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm transition-all">
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-blue-400 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-800 px-2 pt-2 pb-3 space-y-1">
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-zinc-700">Dashboard</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-zinc-700">Manage Cars</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-zinc-700">Bookings</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-red-400 border-t border-zinc-700 mt-2">Logout</a>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;