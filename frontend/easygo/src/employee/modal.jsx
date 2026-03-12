import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddEmployeeModal = ({ isOpen, onClose, onSuccess }) => {
  const [employee, setEmployee] = useState({
    eid: "",
    name: "",
    addhar: "",
    mobile: "",
    address: "",
    email: "",
    role: "",
    joining_Date: "",
    salary: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3006/add-employee", employee);
      if (onSuccess){onSuccess();}
      toast.success("Employee profile created successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      onSuccess()
      onClose();
      setEmployee({
        eid: "",
        name: "",
        addhar: "",
        mobile: "",
        address: "",
        email: "",
        role: "",
        joining_Date: "",
        salary: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error saving employee.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  const roles = [
    "Select Role",
    "Admin",
    "Finance Manager",
    "Payroll Executive",
    "Account Executive",
    "Chartered Accountant",
    "Manager",
    "Digital Marketing Executive",
    "Social Media Executive",
    "Marketing Executive",
    "Booking Management",
    "Drivers Manager",
    "Drivers",
    "Vehicle Manager",
    "Vehicle Engineer",
    "Mechanic",
    "Hiring Staff",
    "Hiring Driver",
    "Frontend Developer",
    "App Developer",
    "Backend Developer",
  ];

  //  const handleRoleChange = async (eid, role) => {
  //     try {
  //       const res = await fetch("http://localhost:3006/update-role", {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ eid, role }),
  //       });
  //       if (!res.ok) throw new Error("Update failed");
  //     } catch (err) {
  //       console.error("Role update failed:", err.message);
  //     }
  //   };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-2xl h-[90vh] bg-[#fdfdfd] dark:bg-[#0d0d0e] rounded-[20px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/40 overflow-hidden flex flex-col transform transition-all animate-in slide-in-from-bottom-10 duration-500">
        <div className="absolute top-0 left-0 w-full h-32 from-indigo-500/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="flex items-center justify-between px-12 pt-12 pb-6 shrink-0">
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
              New Profile
            </h2>
            <p className="text-slate-400 font-medium mt-2">
              Onboard your next team member to Easy-Go.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-12 py-8 space-y-12 custom-scrollbar"
        >
          <section className="space-y-8">
            <h4 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-white/5 pb-2">
              Identity Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Employee ID
                </label>
                <input
                  type="text"
                  name="eid"
                  required
                  onChange={handleChange}
                  value={employee.eid}
                  placeholder="ID Number"
                  className="w-full bg-white dark:bg-[#161618] border-2 border-slate-100 dark:border-white/5 rounded-xl px-6 py-4 text-slate-800 dark:text-white focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={handleChange}
                  value={employee.name}
                  placeholder="Employee's Name"
                  className="w-full bg-white dark:bg-[#161618] border-2 border-slate-100 dark:border-white/5 rounded-xl px-6 py-4 text-slate-800 dark:text-white focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                />
              </div>
            </div>
          </section>
          <section className="space-y-8">
            {/* <h4 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-white/5 pb-2">Identity Details</h4> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3 ">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Addhar Number
                </label>
                <input
                  type="number"
                  name="addhar"
                  required
                  onChange={handleChange}
                  value={employee.addhar}
                  placeholder="Addhar Number"
                  className="w-full bg-white dark:bg-[#161618] border-2 border-slate-100 dark:border-white/5 rounded-xl px-6 py-4 text-slate-800 dark:text-white focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  onChange={handleChange}
                  value={employee.address}
                  placeholder="Employee's Address"
                  className="w-full bg-white dark:bg-[#161618] border-2 border-slate-100 dark:border-white/5 rounded-xl px-6 py-4 text-slate-800 dark:text-white focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                />
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h4 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-white/5 pb-2">
              Professional Network
            </h4>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Official Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    value={employee.email}
                    placeholder="Email"
                    className="w-full bg-white dark:bg-[#161618] border-2 border-slate-100 dark:border-white/5 rounded-xl px-6 py-4 text-slate-800 dark:text-white focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                    Role
                  </label>

                  <select
                    name="role"
                    value={employee.role}
                    required
                    onChange={handleChange}
                    className="bg-zinc-800 border border-zinc-800 text-white rounded-lg p-1 outline-none"
                  >
                    <option value="">Select Role</option>

                    {roles.slice(1).map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    onChange={handleChange}
                    value={employee.mobile}
                    placeholder="Contact Number"
                    className="w-full bg-white dark:bg-[#161618] border-2 border-slate-100 dark:border-white/5 rounded-xl px-6 py-4 text-slate-800 dark:text-white focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Annual CTC
                  </label>
                  <input
                    type="number"
                    name="salary"
                    required
                    onChange={handleChange}
                    value={employee.salary}
                    placeholder="₹ Amount"
                    className="w-full bg-white dark:bg-[#161618] border-2 border-slate-100 dark:border-white/5 rounded-xl px-6 py-4 text-slate-800 dark:text-white focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h4 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-white/5 pb-2">
              Administrative Info
            </h4>
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Date of Joining
              </label>
              <input
                type="date"
                name="joining_Date"
                required
                onChange={handleChange}
                value={employee.joining_Date}
                className="w-full bg-white dark:bg-[#161618] border-2 border-slate-100 dark:border-white/5 rounded-xl px-6 py-4 text-slate-800 dark:text-white focus:border-indigo-500 focus:ring-0 transition-all outline-none cursor-pointer"
              />
            </div>
          </section>
        </form>

        <div className="px-12 h-10 py-8 shrink-0 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-black text-slate-400 hover:text-slate-600 transition-colors tracking-widest uppercase"
          >
            Discard
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-indigo-600  h-7 w-40 hover:bg-indigo-500 text-white text-sm font-black px-12 py-5 rounded-[20px] shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)] transition-all hover:-translate-y-1 active:scale-95 tracking-widest uppercase"
          >
            Create Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
