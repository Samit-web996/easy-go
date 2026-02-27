import { useEffect, useState } from "react";
import AddEmployeeModal from "./modal";  

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
    <div className="min-h-screen bg-orange-100 dark:bg-black p-6 transition-colors duration-300">
      
      
      <div className="w-screen bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-colors duration-300">
      <button 
        onClick={() => setModalOpen(true)} 
        className="bg-purple-600 text-white rounded-md h-10 w-35"
      >
        + Add Employee
      </button>
      <AddEmployeeModal 
        isOpen={ModalOpen} 
        onClose={() => setModalOpen(false)} 
        onSuccess={fetchEmployees}
      />
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-6">
          Employee List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-screen border border-gray-200 dark:border-gray-700">
            
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 border dark:border-gray-600">EID</th>
                <th className="px-4 py-2 border dark:border-gray-600">Name</th>
                <th className="px-4 py-2 border dark:border-gray-600">Email</th>
                <th className="px-4 py-2 border dark:border-gray-600">Mobile</th>
                <th className="px-4 py-2 border dark:border-gray-600">Salary</th>
                <th className="px-4 py-2 border dark:border-gray-600">DOJ</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 dark:text-gray-200">
              {data.map(emp => (
                <tr 
                  key={emp.eid} 
                  className="text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-2 border dark:border-gray-600">
                    {String(emp.eid).padStart(3, "0")}
                  </td>
                  <td className="px-4 py-2 border dark:border-gray-600">{emp.ename}</td>
                  <td className="px-4 py-2 border dark:border-gray-600">{emp.email}</td>
                  <td className="px-4 py-2 border dark:border-gray-600">{emp.mobile}</td>
                  <td className="px-4 py-2 border dark:border-gray-600">
                    ₹ {emp.salary}
                  </td>
                  <td className="px-4 py-2 border dark:border-gray-600">
                    {new Date(emp.DOJ).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default Employee;