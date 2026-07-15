import React from "react";
import {
  X,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  DollarSign,
  Briefcase,
  Building2,
} from "lucide-react";

const DetailItem = ({ icon: Icon, label, value, iconColor }) => (
  <div
    className="flex items-start gap-4 transition-all duration-200 border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/40 rounded-xl"
    style={{
      padding: "12px 16px",
    }}
  >
    <div
      className="flex items-center justify-center border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-lg"
      style={{
        padding: "10px",
        marginTop: "2px",
      }}
    >
      <Icon className={iconColor} size={16} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <p
        className="text-gray-400 dark:text-gray-500 uppercase tracking-wider m-0 font-bold"
        style={{ fontSize: "10px" }}
      >
        {label}
      </p>
      <p
        className="text-gray-800 dark:text-gray-200 m-0 truncate font-semibold"
        style={{ fontSize: "14px", marginTop: "4px" }}
      >
        {value || "N/A"}
      </p>
    </div>
  </div>
);

export default function ViewEmployeeModal({ isOpen, employee, onClose }) {
  if (!isOpen || !employee) return null;

  return (
    // Fixed Parent Overlay setup for perfect positioning
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300">
      <div
        className="absolute inset-0 transition-opacity bg-white/10 dark:bg-black/20"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          zIndex: -1,
        }}
        onClick={onClose}
      />

      {/* Main Form Box Card Container */}
      <div
        className="relative w-full flex flex-col bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 max-w-[540px] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        style={{
          maxHeight: "90vh",
        }}
      >
        {/* Header Block Section */}
        <div
          className="relative border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50"
          style={{
            padding: "24px 28px",
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-gray-100 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-xl transition-colors cursor-pointer"
            style={{
              lineHeight: "0",
            }}
          >
            <X size={15} />
          </button>

          <div
            className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left"
            style={{ gap: "20px" }}
          >
            <div
              className="flex items-center justify-center text-blue-500 font-black uppercase shadow-inner border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/60 rounded-xl"
              style={{
                width: "72px",
                height: "72px",
                fontSize: "26px",
              }}
            >
              {employee.name?.charAt(0)}
            </div>

            <div style={{ flex: 1 }}>
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight m-0">
                {employee.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-1.5 text-xs font-medium m-0 mt-1.5">
                <Briefcase size={13} className="text-blue-500" />{" "}
                {employee.rolename || "Employee"}
              </p>
              <div style={{ marginTop: "10px" }}>
                <span
                  className="inline-block text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/60 rounded-md"
                  style={{
                    padding: "3px 10px",
                    fontSize: "10px",
                  }}
                >
                  ID: #{String(employee.eid).padStart(3, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid Content Scroll Area */}
        <div
          className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-800 text-gray-900 dark:text-white flex flex-col gap-3.5"
          style={{
            padding: "24px 28px",
            maxHeight: "50vh",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <DetailItem
              icon={Mail}
              label="Corporate Email"
              value={employee.email}
              iconColor="text-blue-500 dark:text-blue-400"
            />
            <DetailItem
              icon={Phone}
              label="Contact Line"
              value={employee.mobile}
              iconColor="text-emerald-500 dark:text-emerald-400"
            />
            <DetailItem
              icon={CreditCard}
              label="Aadhar Registry"
              value={employee.aadhar}
              iconColor="text-amber-500 dark:text-amber-400"
            />
            <DetailItem
              icon={DollarSign}
              label="Monthly Payout"
              value={`₹${employee.salary?.toLocaleString("en-IN")}`}
              iconColor="text-purple-500 dark:text-purple-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <DetailItem
              icon={Building2}
              label="Assigned Department"
              value={employee.deptname}
              iconColor="text-pink-500 dark:text-pink-400"
            />
            <DetailItem
              icon={Calendar}
              label="Joining Date"
              value={employee.joining_Date?.split("T")[0]}
              iconColor="text-cyan-500 dark:text-cyan-400"
            />
          </div>
        </div>

        {/* Footer Operational Control Block */}
        <div
          className="flex items-center justify-end border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50"
          style={{
            padding: "20px 28px",
          }}
        >
          <button
            onClick={onClose}
            type="button"
            className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700/80 rounded-xl font-bold uppercase tracking-wider transition-all duration-150 active:scale-95 cursor-pointer"
            style={{
              padding: "10px 24px",
              fontSize: "12px",
              letterSpacing: "0.05em",
            }}
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
