import React from 'react'
import BasicTable from "./VehicleReqTable"
import RegisteredVehicles from './RegisteredVehiclesTab'

function Vehicles() {
  return (
    <div className='flex-1 space-y-6 min-h-screen p-4 bg-gray-50 dark:bg-black transition-colors duration-300'>
      
      <h2 className='mt-20 text-3xl font-bold text-gray-900 dark:text-white'>
        Vehicles
      </h2>
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Card 1 */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 dark:text-gray-400 font-medium">Total Vehicle</h3>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            120
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 dark:text-gray-400 font-medium">Revenue by vehicle</h3>
          <p className="text-2xl font-bold mt-2 text-emerald-600 dark:text-emerald-400">
            ₹ 20,000
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 dark:text-gray-400 font-medium">Active Cars</h3>
          <p className="text-2xl font-bold mt-2 text-blue-600 dark:text-blue-400">
            100
          </p>
        </div>
      </div>
      <div>
         <BasicTable/>
      </div>
      <div>
      <h2 className='mt-20 text-3xl font-bold text-gray-900 dark:text-white'>
        Registered vehicles
      </h2>
      <div><RegisteredVehicles/></div>
      </div>
    </div>
  )
}

export default Vehicles