import React from 'react';

export default function RequestView({ isOpen, vehicleInfo, onClose }) {
  if (!isOpen || !vehicleInfo) return null;
  const IMAGE_BASE_URL = import.meta.env.VITE_API_URL

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60 transition-all duration-300">
      {/* Modal Container: Height and padding optimized */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl bg-white text-gray-800 dark:bg-[#0d1117] dark:text-gray-200 border border-gray-100 dark:border-gray-800/80 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        
        {/* Header (Properly Padded) */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-gray-50 dark:bg-[#161b22] border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold tracking-wide bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
            Vehicle Specification Details
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Body Content Wrapper with generous spacing */}
        <div className="p-6 space-y-6">
          
          {vehicleInfo.image && (
            <div className="relative group w-full h-56 sm:h-72 rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-900 border border-gray-200/50 dark:border-white/5 mb-2">
              <img
                src={`IMAGE_BASE_URL/uploads/${vehicleInfo.image}`}
                alt="vehicle"
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500"
                onError={(e) => {
                  console.log("Original format loading failed, trying webp fallback...");
                  const currentSrc = e.target.src;
                  const baseName = currentSrc.substring(0, currentSrc.lastIndexOf('.'));
                  if (!currentSrc.endsWith('.webp')) {
                     e.target.src = `${baseName}.webp`;
                  }
                }}
              />
              <div className="absolute top-4 right-4 text-sm font-semibold tracking-wider uppercase shadow-md  text-white ">
                {vehicleInfo.status}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Host & Ownership Box (Padded nicely) */}
            <div className="p-5 rounded-xl bg-gray-50/50 dark:bg-[#161b22]/40 border border-gray-100 dark:border-gray-800/60 sm:col-span-2 space-y-3">
              <h3 className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">Host & Ownership</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pt-1">
                <p className="flex flex-col sm:flex-row sm:gap-2"><span className="text-gray-400 font-medium">Name on RC:</span> <span className="font-semibold text-gray-900 dark:text-gray-100">{vehicleInfo.owner_name}</span></p>
                <p className="flex flex-col sm:flex-row sm:gap-2"><span className="text-gray-400 font-medium">Email Address:</span> <span className="font-semibold text-gray-900 dark:text-gray-100 break-all">{vehicleInfo.email}</span></p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gray-50/50 dark:bg-[#161b22]/40 border border-gray-100 dark:border-gray-800/60 space-y-3 text-sm">
              <h3 className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">Identity & Build</h3>
              <div className="space-y-1">
                <p className="flex justify-between border-b border-gray-100 dark:border-gray-800/80 py-2"><span className="text-gray-400">Reg Num:</span> <span className="font-mono font-bold tracking-wider text-gray-900 dark:text-white">{vehicleInfo.registrationNum}</span></p>
                <p className="flex justify-between border-b border-gray-100 dark:border-gray-800/80 py-2"><span className="text-gray-400">Car Model:</span> <span className="font-medium text-gray-900 dark:text-gray-100">{vehicleInfo.carName}</span></p>
                <p className="flex justify-between border-b border-gray-100 dark:border-gray-800/80 py-2"><span className="text-gray-400">Brand Family:</span> <span className="font-medium text-gray-900 dark:text-gray-100">{vehicleInfo.brand}</span></p>
                <p className="flex justify-between py-2"><span className="text-gray-400">Variant:</span> <span className="font-medium text-gray-900 dark:text-gray-100 text-right max-w-[150px] truncate">{vehicleInfo.model}</span></p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gray-50/50 dark:bg-[#161b22]/40 border border-gray-100 dark:border-gray-800/60 space-y-3 text-sm">
              <h3 className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">Capacity & Financials</h3>
              <div className="space-y-1">
                <p className="flex justify-between border-b border-gray-100 dark:border-gray-800/80 py-2"><span className="text-gray-400">Seat Configuration:</span> <span className="font-medium text-gray-900 dark:text-gray-100">{vehicleInfo.seat} Seater</span></p>
                <p className="flex justify-between border-b border-gray-100 dark:border-gray-800/80 py-2"><span className="text-gray-400">Fuel Setup:</span> <span className="font-medium text-gray-900 dark:text-gray-100">{vehicleInfo.fuelType}</span></p>
                <p className="flex justify-between border-b border-gray-100 dark:border-gray-800/80 py-2"><span className="text-gray-400">Model Year:</span> <span className="font-medium text-gray-900 dark:text-gray-100">{vehicleInfo.modelYear}</span></p>
                <p className="flex justify-between py-2"><span className="text-gray-400">Pricing:</span> <span className="font-bold text-blue-600 dark:text-blue-400 text-base">₹{vehicleInfo.pricePerDay}/Day</span></p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gray-50/50 dark:bg-[#161b22]/40 border border-gray-100 dark:border-gray-800/60 sm:col-span-2 space-y-4 text-sm">
              <div>
                <h4 className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-1.5">Features Included</h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed bg-white dark:bg-[#0d1117] p-3 rounded-lg border border-gray-100 dark:border-gray-800/40">{vehicleInfo.features || "Standard Features applied"}</p>
              </div>
              
              <div className="pt-1">
                <h4 className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-1.5">Operational Area</h4>
                <p className="font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0d1117] p-3 rounded-lg border border-gray-100 dark:border-gray-800/40">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-900 dark:text-gray-100">{vehicleInfo.city_name || "Location not available"}</span>
                </p>
              </div>
              
              <div className="pt-1">
                <h4 className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-1.5">Vehicle Description</h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed bg-white dark:bg-[#0d1117] p-3 rounded-lg border border-gray-100 dark:border-gray-800/40">{vehicleInfo.description}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer (Padded properly with distinct spacing) */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-[#161b22] border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold tracking-wide border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all shadow-sm"
          >
            Close View
          </button>
        </div>

      </div>
    </div>
  );
}