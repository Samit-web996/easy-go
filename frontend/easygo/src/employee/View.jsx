import React from 'react';
import { X, Mail, Phone, Calendar, CreditCard, DollarSign, Briefcase, Building2 } from "lucide-react";
const DetailItem = ({ icon:Icon , label, value, iconColor }) => (
  <div 
    className="flex items-start gap-4 transition-all duration-200"
    style={{
      backgroundColor: "rgba(22, 27, 39, 0.5)",
      border: "1px solid #1f2937",
      borderRadius: "12px",
      padding: "12px 16px"
    }}
  >
    <div 
      className="flex items-center justify-center"
      style={{
        padding: "10px",
        backgroundColor: "#161b27",
        border: "1px solid #374151",
        borderRadius: "10px",
        marginTop: "2px"
      }}
    >
      <Icon className={iconColor} size={16} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <p className="text-gray-500 uppercase tracking-wider m-0" style={{ fontSize: "10px", fontW_bold: "bold" }}>{label}</p>
      <p className="text-gray-200 m-0 truncate" style={{ fontSize: "14px", fontWeight: "600", marginTop: "4px" }}>{value || 'N/A'}</p>
    </div>
  </div>
);

export default function ViewEmployeeModal({ isOpen, employee, onClose }) {
  if (!isOpen || !employee) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ 
        backgroundColor: "rgba(10, 15, 30, 0.7)", 
        backdropFilter: "blur(12px)",
        padding: "16px"
      }}
    >
      <div className="fixed inset-0" onClick={onClose} style={{ cursor: "default" }}></div>
      
      <div 
        className="relative w-full flex flex-col border border-gray-800 animate-in zoom-in-95 duration-200"
        style={{ 
          backgroundColor: "#0d1117",
          maxWidth: "540px",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          maxHeight: "90vh",
          overflow: "hidden"
        }}
      >
        
        <div 
          className="relative border-b border-gray-800"
          style={{ 
            padding: "24px 28px",
            backgroundColor: "#0f141c",
            borderRadius: "16px 16px 0 0"
          }}
        >
          <button 
            onClick={onClose} 
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              padding: "8px",
              backgroundColor: "rgba(22, 27, 39, 0.6)",
              border: "1px solid #1f2937",
              borderRadius: "10px",
              color: "#9ca3af",
              cursor: "pointer",
              lineHeight: "0"
            }}
            className="hover:text-white transition-colors"
          >
            <X size={15} />
          </button>
          
          <div 
            className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left"
            style={{ gap: "20px" }}
          >
            <div 
              className="flex items-center justify-center text-blue-500 font-black uppercase shadow-inner"
              style={{
                width: "72px",
                height: "72px",
                backgroundColor: "#161b27",
                border: "1px solid #1f2937",
                borderRadius: "14px",
                fontSize: "26px"
              }}
            >
              {employee.name?.charAt(0)}
            </div>
            
            <div style={{ flex: 1 }}>
              <h2 className="text-xl font-extrabold text-white tracking-tight m-0">{employee.name}</h2>
              <p className="text-gray-400 flex items-center justify-center sm:justify-start gap-1.5 text-xs font-medium m-0 mt-1.5">
                <Briefcase size={13} className="text-blue-500" /> {employee.rolename || 'Employee'}
              </p>
              <div style={{ marginTop: "10px" }}>
                <span 
                  className="inline-block text-gray-400 font-bold uppercase tracking-wider"
                  style={{
                    padding: "3px 10px",
                    backgroundColor: "#161b27",
                    border: "1px solid #1f2937",
                    borderRadius: "6px",
                    fontSize: "10px"
                  }}
                >
                  ID: #{String(employee.eid).padStart(3, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800"
          style={{ 
            padding: "24px 28px", 
            maxHeight: "50vh",
            display: "flex",
            flexDirection: "column",
            gap: "14px"
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <DetailItem icon={Mail} label="Corporate Email" value={employee.email} iconColor="text-blue-400" />
            <DetailItem icon={Phone} label="Contact Line" value={employee.mobile} iconColor="text-emerald-400" />
            <DetailItem icon={CreditCard} label="Aadhar Registry" value={employee.aadhar ? "[Aadhaar Redacted]" : "N/A"} iconColor="text-amber-400" />
            <DetailItem icon={DollarSign} label="Monthly Payout" value={`₹${employee.salary?.toLocaleString('en-IN')}`} iconColor="text-purple-400" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <DetailItem icon={Building2} label="Assigned Department" value={employee.deptname} iconColor="text-pink-400" />
            <DetailItem icon={Calendar} label="Joining Date" value={employee.joining_Date?.split("T")[0]} iconColor="text-cyan-400" />
          </div>
        </div>

        <div 
          className="flex items-center justify-end"
          style={{ 
            padding: "20px 28px", 
            borderTop: "1px solid #1f2937",
            backgroundColor: "#0f141c",
            borderRadius: "0 0 16px 16px"
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 24px",
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#d1d5db",
              cursor: "pointer"
            }}
            className="hover:text-white hover:bg-gray-700 transition-all duration-150 active:scale-95"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
}