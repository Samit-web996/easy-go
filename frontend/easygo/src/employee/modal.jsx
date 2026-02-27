import React from "react";
import { useState } from "react";
import axios from "axios";

const AddEmployeeModal = ({ isOpen, onClose, onSuccess }) => {
  const [employee, setEmployee] = useState({
    eid: "",
    ename: "",
    email: "",
    mobile: "",
    salary: "",
    date: "",
  });
  // Agar isOpen false hai, toh kuch bhi mat dikhao
  if (!isOpen) return null;

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Backend URL dalo (jo API maine pehle di thi)
  //     const response = await axios.post("http://localhost:3006/api/add-employee", employee);
  //     alert("Employee Saved!");
  //     onClose(); // Modal band kar do
  //   } catch (err) {
  //     console.error("Error saving data:", err);
  //     alert("Kuch galti hui hai!");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending Data:", employee); // Console check karo ki data sahi hai ya nahi

    try {
      const response = await axios.post(
        "http://localhost:3006/add-employee",
        employee,
      );
      console.log("Success:", response.data);
      alert("Employee Added!");

      if (typeof onSuccess === "function") {
        onSuccess(); // Ye table ko refresh karega
      }
      // Success ke baad ye line add kar do
      setEmployee({
        eid: "",
        ename: "",
        email: "",
        mobile: "",
        salary: "",
        DOJ: "",
      });
      onClose();
    } catch (err) {
      if (err.response) {
        console.error("Server Error:", err.response.data);
      } else {
        console.error("Error:", err.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] flex justify-center items-center">
      <div className="bg-zinc-400 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-white/20">
          <h3 className="text-xl font-semibold text-white">Add New Employee</h3>
          <button
            onClick={onClose}
            className="text-2xl text-white/70 hover:text-white"
          >
            &times;
          </button>
        </div>
        <br />

        <form onSubmit={handleSubmit}>
          <input
            name="eid"
            onChange={handleChange}
            type="number "
            required
            placeholder="Employee ID"
            className="w-70 border rounded"
          />
          <br />
          <br />
          <input
            name="ename"
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            className="w-70 p-2 border rounded"
          />
          <br />
          <br />
          <input
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-70 p-2 border rounded"
          />
          <br />
          <br />
          <input
            name="mobile"
            onChange={handleChange}
            type="tel"
            placeholder="Mobile Number"
            className="w-70 p-2 border rounded"
          />
          <br />
          <br />
          <input
            name="salary"
            onChange={handleChange}
            type="number"
            placeholder="Salary"
            className="w-70 p-2 border rounded"
          />
          <br />
          <br />
          <input
            name="DOJ"
            onChange={handleChange}
            type="date"
            placeholder="Date of Joining"
            className="w-70 p-2 border rounded"
          />
          <br />
          <br />
          <div className="flex justify-center gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-20 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-8 w-20 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
