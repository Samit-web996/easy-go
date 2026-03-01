import { useEffect, useState } from "react";
import AddEmployeeModal from "./modal";  
import Sidebar from "../Sidebar";

function Employee() {
  const [data, setData] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);

  const fetchEmployees = () => {
    fetch("http://localhost:3006/employees")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="flex-1 space-y-6"> 
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-white">Employee List</h2>
        <button 
          onClick={() => setModalOpen(true)} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow-lg shadow-blue-600/20 w-full sm:w-auto"
        >
          + Add Employee
        </button>
      </div>

      <AddEmployeeModal 
        isOpen={ModalOpen} 
        onClose={() => setModalOpen(false)} 
        onSuccess={fetchEmployees}
      />

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-zinc-800/50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 border-b border-zinc-800">EID</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 border-b border-zinc-800">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 border-b border-zinc-800">Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 border-b border-zinc-800">Mobile</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 border-b border-zinc-800">Salary</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 border-b border-zinc-800">DOJ</th>
              </tr>
            </thead>

            <tbody className="text-gray-300">
              {data.length > 0 ? (
                data.map(emp => (
                  <tr 
                    key={emp.eid} 
                    className="hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="px-6 py-4 border-b border-zinc-800">
                      <span className="bg-zinc-800 px-2 py-1 rounded text-xs font-mono">
                        #{String(emp.eid).padStart(3, "0")}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b border-zinc-800 font-medium text-white">{emp.ename}</td>
                    <td className="px-6 py-4 border-b border-zinc-800">{emp.email}</td>
                    <td className="px-6 py-4 border-b border-zinc-800">{emp.mobile}</td>
                    <td className="px-6 py-4 border-b border-zinc-800 font-medium text-emerald-500">
                      ₹ {emp.salary.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 border-b border-zinc-800 text-sm">
                      {new Date(emp.DOJ).toLocaleDateString("en-IN", {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employee;