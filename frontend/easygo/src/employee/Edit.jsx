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
      const res = await API.patch(
        `/update-emp/${editEmp.eid}`, editEmp);
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
    <div 
    className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300"
    style={{ 
      backgroundColor: "rgba(10, 15, 30, 0.65)", // Black ke bajay dashboard se matching translucent dark slate overlay
      backdropFilter: "blur(12px)", // Solid layer ko todne ke liye smooth glass blur effect
    }}
  >
    <div 
      className="w-full flex flex-col border border-gray-800"
      style={{ 
        backgroundColor: "#0d1117",
        maxWidth: "520px",
        borderRadius: "16px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
      }}
    >
        
        <div 
          className="flex items-center justify-between"
          style={{ 
            padding: "20px 24px", 
            borderBottom: "1px solid #1f2937",
            backgroundColor: "#0f141c",
            borderRadius: "16px 16px 0 0"
          }}
        >
          <div>
            <h2 className="text-base font-bold text-white tracking-wide m-0">
              Update Employee Settings
            </h2>
            <p className="text-gray-500 m-0 mt-1" style={{ fontSize: "11px" }}>
              Modify profile configurations and operational assignments.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}
          >
            ✕
          </button>
        </div>

        <div 
          className="space-y-4 overflow-y-auto"
          style={{ padding: "24px", maxHeight: "60vh" }}
        >
          
          {/* Dual Input Grid Framework Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Mobile Registry</label>
              <input
                type="text"
                name="mobile"
                value={editEmp.mobile || ""}
                onChange={handleChange}
                className="w-full border border-gray-800"
                style={{
                  backgroundColor: "#161b27",
                  color: "#ffffff",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  fontSize: "14px",
                  outline: "none"
                }}
                placeholder="Enter mobile no."
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Salary Tier (INR)</label>
              <input
                type="text"
                name="salary"
                value={editEmp.salary || ""}
                onChange={handleChange}
                className="w-full border border-gray-800"
                style={{
                  backgroundColor: "#161b27",
                  color: "#ffffff",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  fontSize: "14px",
                  outline: "none"
                }}
                placeholder="Enter monthly payout"
              />
            </div>
          </div>

          {/* Email Form Field Block */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Corporate Email Identifier</label>
            <input
              type="email"
              name="email"
              value={editEmp.email || ""}
              onChange={handleChange}
              className="w-full border border-gray-800"
              style={{
                backgroundColor: "#161b27",
                color: "#ffffff",
                borderRadius: "10px",
                padding: "10px 14px",
                fontSize: "14px",
                outline: "none"
              }}
              placeholder="name@company.com"
            />
          </div>

          {/* Address Form Field Block */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Residential Location Address</label>
            <input
              type="text"
              name="address"
              value={editEmp.address || ""}
              onChange={handleChange}
              className="w-full border border-gray-800"
              style={{
                backgroundColor: "#161b27",
                color: "#ffffff",
                borderRadius: "10px",
                padding: "10px 14px",
                fontSize: "14px",
                outline: "none"
              }}
              placeholder="Street location, City block"
            />
          </div>

          {/* Dropdowns Configuration Layout Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Department Unit</label>
              <select
                name="deptid"
                value={editEmp.deptid || ""}
                onChange={handleChange}
                className="w-full border border-gray-800"
                style={{
                  backgroundColor: "#161b27",
                  color: "#ffffff",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  fontSize: "14px",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value="" style={{ backgroundColor: "#0d1117" }}>Select Dept</option>
                {depts.map((d) => (
                  <option key={d.deptid} value={d.deptid} style={{ backgroundColor: "#0d1117" }}>
                    {d.deptname}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Organizational Role</label>
              <select
                name="roleid"
                value={editEmp.roleid || ""}
                onChange={handleChange}
                className="w-full border border-gray-800"
                style={{
                  backgroundColor: "#161b27",
                  color: "#ffffff",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  fontSize: "14px",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value="" style={{ backgroundColor: "#0d1117" }}>Select Role</option>
                {roles.map((r) => (
                  <option key={r.roleid} value={r.roleid} style={{ backgroundColor: "#0d1117" }}>
                    {r.rolename}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Footer Actions Operational Controls Area */}
        <div 
          className="flex items-center justify-end gap-3"
          style={{ 
            padding: "20px 24px", 
            borderTop: "1px solid #1f2937",
            backgroundColor: "#0f141c",
            borderRadius: "0 0 16px 16px"
          }}
        >
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-all duration-150"
            style={{
              padding: "10px 20px",
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="text-white transition-all duration-150"
            style={{
              padding: "10px 22px",
              backgroundColor: "#2563eb",
              border: "none",
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              cursor: "pointer"
            }}
          >
            Apply Changes
          </button>
        </div>

      </div>
    </div>
  );
}