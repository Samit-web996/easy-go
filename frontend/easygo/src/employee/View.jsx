import React from 'react';

export default function ViewEmployeeModal({ isOpen, employee, onClose }) {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="p-6 w-[350px] rounded-xl shadow-xl bg-white text-gray-800 dark:bg-[#0d1117] dark:text-gray-200 border border-gray-200 dark:border-white/10">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
          Employee Details
        </h2>

        <div className="space-y-2 text-sm">
          <p><strong>ID:</strong> {employee.eid}</p>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Mobile:</strong> {employee.mobile}</p>
          <p><strong>Aadhar:</strong> {employee.aadhar}</p>
          <p><strong>Joining Date:</strong> {employee.joining_Date?.split("T")[0]}</p>
          <p><strong>Salary:</strong> ₹{employee.salary?.toLocaleString('en-IN')}</p>
          <p><strong>Role:</strong> {employee.rolename}</p>
          <p><strong>Department:</strong> {employee.deptname}</p>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}