import { useEffect, useState } from "react";
import AddEmployeeModal from "./modal";  
import EmployeeTable from "./EmployeeTable";

function Employee() {
  // const [data, setData] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);

  const fetchEmployees = () => {
    fetch("http://localhost:3006/employees")
      .then(res => res.json())
      // .then(data => setData(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  
//   const handleRoleChange = async (eid, role) => {
//   try {
//     const res = await fetch("http://localhost:3006/update-role", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ eid, role })
//     });

//     const result = await res.json();
//     console.log(result);
//     fetchEmployees();
//   } catch (error) {
//     console.error("Update failed", error);
//   }
// };


  return (
    
    <div className="flex-1 space-y-6"> 
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-400">Total Employee</h3>
          <p className="text-2xl font-bold mt-2 text-white">77</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-400">Active</h3>
          <p className="text-2xl font-bold mt-2 text-emerald-500">₹ 45</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-400">Non-Active</h3>
          <p className="text-2xl font-bold mt-2 text-blue-500">32</p>
        </div>
      </div>
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
    <EmployeeTable />

      {/* <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-800px">
            <thead className="bg-zinc-800/50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 border-b border-zinc-800">EID</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 border-b border-zinc-800">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 border-b border-zinc-800">Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 border-b border-zinc-800">Mobile</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 border-b border-zinc-800">Salary</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 border-b border-zinc-800">DOJ</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400 border-b border-zinc-800">Role</th>
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
                    <td className="px-6 py-4 border-b border-zinc-800 font-medium text-white">{emp.name}</td>
                    <td className="px-6 py-4 border-b border-zinc-800">{emp.email}</td>
                    <td className="px-6 py-4 border-b border-zinc-800">{emp.mobile}</td>
                    <td className="px-6 py-4 border-b border-zinc-800 font-medium text-emerald-500">
                      ₹ {emp.salary?.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 border-b border-zinc-800 text-sm">
                      {new Date(emp.joining_Date).toLocaleDateString("en-IN", {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td>
                      <select defaultValue="Not assigned" className="bg-zinc-800 border border-zinc-800 rounded-lg p-1 outline-none"
                      value={emp.role}
                      onChange={(e)=>{ handleRoleChange(emp.eid,e.target.value)}}>
                       <option value="Not assigned" disabled>Select Role</option>
                       <option value="Admin">Admin</option>
                       <option value="Finance Manager"> Finance Manager</option>
                       <option value="Payroll Executive">Payroll Executive</option>
                       <option value="Account Executive">Account Executive</option>
                       <option value="Chartered Accountant  ">Chartered Accountant</option>
                       <option value="Manager">Manager</option>
                       <option value="Digital Marketing Executive">Digital Marketing Executive</option>
                       <option value="Social Media Executive">Social Media Executive</option>
                       <option value="Marketing Executive">Marketing Executive</option>
                       <option value="Booking Management"> Booking Management </option>
                       <option value="Drivers Manager">Drivers Manager</option>
                       <option value="Drivers">Drivers</option>
                       <option value="Vehicle Manger">Vehicle Manger</option>
                       <option value="Vehicle Engineer">Vehicle Engineer</option>
                       <option value="Mechanic">Mechanic</option>
                       <option value="Hiring Staff">Hiring Staff</option>
                       <option value="Hiring Driver">Hiring Driver</option>
                       <option value="Frontend Developer">Frontend Developer</option>
                       <option value="App Developer">App Developer</option>
                       <option value="Backend Developer">Backend Developer</option>
                      </select>
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
      </div> */}
    </div>
  );
}

export default Employee;