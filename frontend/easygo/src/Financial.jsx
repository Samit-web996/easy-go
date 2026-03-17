import React from 'react'

function Financial() {
  return (
    // 'min-h-screen' aur flexible background colors add kiye hain
    <div className='flex-1 space-y-6 min-h-screen p-4 bg-gray-50 dark:bg-black transition-colors duration-300'>
      
      {/* text-gray-900 (light) aur dark:text-white (dark) */}
      <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
        Financial
      </h2>
      
      {/* Main Card: bg-white (light) / bg-zinc-900 (dark) */}
      <div className='bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 rounded-xl shadow-sm'>
        
        {/* emerald text ko light/dark ke hisaab se adjust kiya */}
        <div className='text-emerald-600 dark:text-emerald-500 space-y-4 text-lg'>
          <p className='font-medium'>Financial overview and reports coming soon...</p>
          
          {/* Inner box ko light mode mein emerald theme diya hai */}
          <div className='p-4 bg-emerald-50 dark:bg-zinc-800/50 rounded-lg border border-emerald-100 dark:border-zinc-700 text-sm text-gray-600 dark:text-gray-400'>
            <p>Financial reports correctly styled within the dashboard layout.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Financial