import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Truck, MapPin, DollarSign, Layers } from "lucide-react";

const menuItems = [
  { name: "STAFF", icon: Users },
  { name: "UNITS", icon: Layers },
  { name: "DRIVERS", icon: Truck },
  { name: "CUSTOMERS", icon: Users },
  { name: "TRACKING", icon: MapPin },
  { name: "FINANCIAL", icon: DollarSign },
];

const dataMap = {
  STAFF: [
    { name: "Ravi", status: "Active", performance: 90 },
    { name: "Amit", status: "Inactive", performance: 60 },
  ],
  UNITS: [
    { name: "Unit 1", status: "Running", performance: 75 },
    { name: "Unit 2", status: "Stopped", performance: 40 },
  ],
  DRIVERS: [
    { name: "Driver A", status: "On Duty", performance: 88 },
    { name: "Driver B", status: "Off Duty", performance: 55 },
  ],
  CUSTOMERS: [
    { name: "Customer X", status: "Active", performance: 95 },
    { name: "Customer Y", status: "Inactive", performance: 50 },
  ],
  TRACKING: [
    { name: "Truck 101", status: "Moving", performance: 80 },
    { name: "Truck 102", status: "Stopped", performance: 30 },
  ],
  FINANCIAL: [
    { name: "Revenue", status: "Stable", performance: 70 },
    { name: "Expenses", status: "High", performance: 40 },
  ],
};

export default function Dashboard() {
  const [active, setActive] = useState("STAFF");
  const data = dataMap[active];

  return (
    <div className="w-screen h-screen flex bg-[#020617] text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 h-full bg-gradient-to-b from-[#020617] via-[#020617] to-[#020617] border-r border-gray-800 p-6 flex flex-col relative">
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-purple-600/10 blur-3xl opacity-30"></div>

        <h1 className="text-4xl font-extrabold mb-10 leading-tight">
          🚀 <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 text-transparent bg-clip-text">Premium</span><br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">Panel</span>
        </h1>

        <ul className="space-y-3 relative z-10">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActive(item.name)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 group
                ${
                  active === item.name
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(168,85,247,0.6)] scale-[1.03]"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <item.icon className="group-hover:scale-110 transition" size={18} />
                <span className="font-medium tracking-wide">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <motion.h2
          key={active}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-10 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
        >
          {active} Dashboard
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {data.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-[#0f172a] to-[#020617] border border-gray-800 p-8 rounded-2xl shadow-xl backdrop-blur-xl"
            >
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-400 text-sm mt-1">{item.status}</p>
              <p className="text-3xl font-bold mt-4 text-purple-400">{item.performance}%</p>
            </motion.div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#020617] border border-gray-800 rounded-2xl p-8 shadow-xl backdrop-blur-xl">
          <h3 className="text-2xl mb-6 font-semibold">{active} Data</h3>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="p-4">Name</th>
                <th className="p-4">Status</th>
                <th className="p-4">Performance</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-900 hover:bg-white/5 transition"
                >
                  <td className="p-4">{row.name}</td>
                  <td className="p-4">{row.status}</td>
                  <td className="p-4 text-purple-400 font-semibold">{row.performance}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}