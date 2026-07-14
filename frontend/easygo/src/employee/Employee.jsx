import { useEffect, useState } from "react";
import AddEmployeeModal from "./modal";
import EmployeeTable from "./EmployeeTable";
import API from "../api";
function Employee() {
  const [ModalOpen, setModalOpen] = useState(false);
  // Employee data ke liye state (taaki dashboard cards dynamic ho sakein)
  const [data, setData] = useState([]);

  const fetchEmployees = () => {
    API.get("/employees")
      .then((res) => setData(res.data)) // Axios me data 'res.data' ke andar hota hai
      .catch((err) => console.error("Error fetching employees:", err));
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="flex-1 space-y-6 p-4 min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Employee Card */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 dark:text-gray-400 font-medium">
            Total Employee
          </h3>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            {data.length || 77}
          </p>
        </div>

        {/* Active Card */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 dark:text-gray-400 font-medium">
            Active
          </h3>
          <p className="text-2xl font-bold mt-2 text-emerald-600 dark:text-emerald-500">
            45
          </p>
        </div>

        {/* Non-Active Card */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 dark:text-gray-400 font-medium">
            Non-Active
          </h3>
          <p className="text-2xl font-bold mt-2 text-blue-600 dark:text-blue-400">
            32
          </p>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Employee List
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors shadow-lg shadow-blue-600/20 w-full sm:w-auto"
        >
          + Add Employee
        </button>
      </div>

      {/* Modal & Table */}
      <AddEmployeeModal
        isOpen={ModalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchEmployees}
      />

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <EmployeeTable data={data} />
      </div>
    </div>
  );
}

export default Employee;
