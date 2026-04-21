import React from 'react';

export default function RequestView({ isOpen, vehicleInfo, onClose }) {
  if (!isOpen || !vehicleInfo) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="p-6 w-[350px] rounded-xl shadow-xl bg-white text-gray-800 dark:bg-[#0d1117] dark:text-gray-200 border border-gray-200 dark:border-white/10">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
          Vehicle Details
        </h2>

         {vehicleInfo.image && (
          <img
            src={`http://localhost:3006/uploads/${vehicleInfo.image}`}
            alt="vehicle"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        )}

        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {vehicleInfo.owner_name}</p>
          <p><strong>Email:</strong> {vehicleInfo.email}</p>
          <p><strong>Registration Number:</strong> {vehicleInfo.registrationNum}</p>
          <p><strong>Car Name:</strong> {vehicleInfo.carName}</p>
          <p><strong>Brand:</strong> {vehicleInfo.brand}</p>
          <p><strong>Model:</strong> {vehicleInfo.model}</p>
          <p><strong>Seat:</strong> {vehicleInfo.seat}</p>
          <p><strong>Features:</strong> {vehicleInfo.features}</p>
          <p><strong>FuelType:</strong> {vehicleInfo.fuelType}</p>
          <p><strong>Price Per Day:</strong> {vehicleInfo.pricePerDay}</p>
          <p><strong>Model Year:</strong> {vehicleInfo.modelYear}</p>
          <p><strong>Status:</strong> {vehicleInfo.status}</p>
          <p><strong>Description:</strong> {vehicleInfo.description}</p>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}