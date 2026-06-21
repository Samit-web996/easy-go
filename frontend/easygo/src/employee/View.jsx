import React from 'react';
import { X, User, Mail, Phone, MapPin, Calendar, CreditCard, DollarSign, Briefcase, Building2 } from "lucide-react";

export default function ViewEmployeeModal({ isOpen, employee, onClose }) {
  if (!isOpen || !employee) return null;

  const DetailItem = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
      <div className={`p-2 rounded-xl ${color} bg-opacity-10 dark:bg-opacity-20 transition-transform group-hover:scale-110`}>
        <Icon className={color.replace('bg-', 'text-')} size={18} />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">{label}</p>
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">{value || 'N/A'}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Profile Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white relative">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-6 mt-2">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold border border-white/30 shadow-xl">
              {employee.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{employee.name}</h2>
              <p className="text-blue-100 flex items-center gap-1.5 text-sm mt-1">
                <Briefcase size={14} /> {employee.rolename || 'Employee'}
              </p>
              <span className="inline-block mt-3 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
                ID: #{String(employee.eid).padStart(3, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white dark:bg-zinc-900">
          <DetailItem icon={Mail} label="Email Address" value={employee.email} color="bg-blue-500" />
          <DetailItem icon={Phone} label="Contact" value={employee.mobile} color="bg-emerald-500" />
          <DetailItem icon={CreditCard} label="Aadhar" value={employee.aadhar} color="bg-amber-500" />
          <DetailItem icon={DollarSign} label="Salary" value={`₹${employee.salary?.toLocaleString('en-IN')}`} color="bg-purple-500" />
          <DetailItem icon={Building2} label="Department" value={employee.deptname} color="bg-pink-500" />
          <DetailItem icon={Calendar} label="Joining Date" value={employee.joining_Date?.split("T")[0]} color="bg-cyan-500" />
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}