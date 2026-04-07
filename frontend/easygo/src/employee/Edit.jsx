import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditEmployeeModal({
  isOpen,
  editEmp,
  setEditEmp,
  onClose,
  roles,
  depts,
  onUpdateSuccess,
}) {
  if (!isOpen || !editEmp) return null;

  // Input change handle karne ke liye
  const handleChange = (e) => {
    setEditEmp({
      ...editEmp,
      [e.target.name]: e.target.value,
    });
  };

  // Update API call
  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3006/update-emp/${editEmp.eid}`,
        editEmp,
      );
      toast.success("Employee profile updation successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      // console.log("Updated:", res.data);
      setEditEmp(res.data)
      onUpdateSuccess();
      onClose();
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#0d1117] p-6 rounded-xl w-[450px] shadow-xl border border-white/10">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
          Update Employee
        </h2>

        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <label className="text-xs text-gray-500 ml-1">Mobile</label>
            <input
              name="mobile"
              value={editEmp.mobile || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-[#161b27] dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 ml-1">Email</label>
            <input
              name="email"
              value={editEmp.email || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-[#161b27] dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 ml-1">Address</label>
            <input
              name="address"
              value={editEmp.address || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-[#161b27] dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 ml-1">Salary</label>
            <input
              name="salary"
              value={editEmp.salary || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-[#161b27] dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 ml-1">Department</label>
            <select
              name="deptid"
              value={editEmp.deptid || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-[#161b27] dark:text-white"
            >
              <option value="">Select Dept</option>
              {depts.map((d) => (
                <option key={d.deptid} value={d.deptid}>
                  {d.deptname}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 ml-1">Role</label>
            <select
              name="roleid"
              value={editEmp.roleid || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-[#161b27] dark:text-white"
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r.roleid} value={r.roleid}>
                  {r.rolename}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleUpdate}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
