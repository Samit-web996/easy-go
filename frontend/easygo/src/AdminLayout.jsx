import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-zinc-950 h-screen overflow-hidden">
      
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      
      <div className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300">
        <AdminNavbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-zinc-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;