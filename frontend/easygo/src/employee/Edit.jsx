import React from "react";
import API from "../api";
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

  const handleChange = (e) => {
    setEditEmp({
      ...editEmp,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await API.patch(`/update-emp/${editEmp.eid}`, editEmp);
      toast.success("Employee profile updated successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      setEditEmp(res.data);
      onUpdateSuccess();
      onClose();
    } catch (err) {
      console.log("Update error:", err);
      toast.error("Failed to update employee details.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-opacity-0 flex items-center justify-center p-4 transition-all duration-300">
      <div
        className="absolute inset-0 transition-opacity bg-white/10 dark:bg-black/20"
        style={{
          backdropFilter: "blur(200px)",
          WebkitBackdropFilter: "blur(200px)",
          zIndex: -100,
        }}
        onClick={onClose}
      />

      <div className="w-full flex flex-col bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 max-w-[540px] rounded-2xl shadow-[0_0_50px_0_rgba(0,0,0,0.15)] dark:shadow-[0_0_60px_0_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-200 relative">
        <div
          className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 bg-gray-50/70 dark:bg-zinc-900/50"
          style={{ padding: "24px 28px" }}
        >
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-wide m-0">
              Update Employee Settings
            </h2>
            <p className="text-gray-500 dark:text-gray-400 m-0 mt-1.5 text-xs">
              Modify profile configurations and operational assignments.
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 hover:text-gray-700 dark:hover:text-white text-lg bg-transparent border-none cursor-pointer p-1 transition-colors"
          >
            ✕
          </button>
        </div>

        <div
          className="overflow-y-auto text-gray-900 dark:text-white flex flex-col gap-5"
          style={{ padding: "28px", maxHeight: "65vh" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                Mobile Registry
              </label>
              <input
                type="text"
                name="mobile"
                value={editEmp.mobile || ""}
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white rounded-xl focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all"
                style={{ padding: "12px 16px", fontSize: "14px" }}
                placeholder="Enter mobile no."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                Salary Tier (INR)
              </label>
              <input
                type="text"
                name="salary"
                value={editEmp.salary || ""}
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white rounded-xl focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all"
                style={{ padding: "12px 16px", fontSize: "14px" }}
                placeholder="Enter monthly payout"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
              Corporate Email Identifier
            </label>
            <input
              type="email"
              name="email"
              value={editEmp.email || ""}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white rounded-xl focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all"
              style={{ padding: "12px 16px", fontSize: "14px" }}
              placeholder="name@company.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
              Residential Location Address
            </label>
            <input
              type="text"
              name="address"
              value={editEmp.address || ""}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white rounded-xl focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all"
              style={{ padding: "12px 16px", fontSize: "14px" }}
              placeholder="Street location, City block"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                Department Unit
              </label>
              <select
                name="deptid"
                value={editEmp.deptid || ""}
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white rounded-xl focus:border-blue-500 outline-none cursor-pointer transition-all"
                style={{ padding: "12px 16px", fontSize: "14px" }}
              >
                <option
                  value=""
                  className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                >
                  Select Dept
                </option>
                {depts.map((d) => (
                  <option
                    key={d.deptid}
                    value={d.deptid}
                    className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                  >
                    {d.deptname}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                Organizational Role
              </label>
              <select
                name="roleid"
                value={editEmp.roleid || ""}
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/60 text-gray-900 dark:text-white rounded-xl focus:border-blue-500 outline-none cursor-pointer transition-all"
                style={{ padding: "12px 16px", fontSize: "14px" }}
              >
                <option
                  value=""
                  className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                >
                  Select Role
                </option>
                {roles.map((r) => (
                  <option
                    key={r.roleid}
                    value={r.roleid}
                    className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
                  >
                    {r.rolename}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-end gap-4 border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50"
          style={{ padding: "20px 28px" }}
        >
          <button
            onClick={onClose}
            type="button"
            className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer"
            style={{ padding: "12px 24px", fontSize: "12px" }}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            type="button"
            className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold uppercase tracking-wider shadow-md hover:shadow-lg rounded-xl border-none transition-all cursor-pointer"
            style={{ padding: "12px 26px", fontSize: "12px" }}
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}
