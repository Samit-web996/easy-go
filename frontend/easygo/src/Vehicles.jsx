import React from 'react'

function Vehicles() {
  return (
    <div className='flex-1 space-y-6 min-h-screen p-4 bg-gray-50 dark:bg-black transition-colors duration-300'>
      
      <h2 className='mt-20 text-3xl font-bold text-gray-900 dark:text-white'>
        Vehicles
      </h2>
      
      <div className='bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 rounded-xl shadow-sm'>
        
        <div className='p-10 text-blue-600 dark:text-blue-400 space-y-4 text-lg'>
          <p className='font-medium'>Vehicle management system coming soon...</p>
        
          <div className='p-4 bg-blue-50 dark:bg-zinc-800/50 rounded-lg border border-blue-100 dark:border-zinc-700 text-sm text-gray-600 dark:text-gray-400'>
            <p>Data was exporting from out of the world, PLEASE WAIT!!!</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Vehicles