import React from 'react'
import Sidebar from './Sidebar'
import AdminNavbar from './AdminNavbar'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className='min-h-screen flex bg-zinc-950'>
      
        <Sidebar />
      
      

      <div className='flex-1 flex flex-col ml-64'>
        <AdminNavbar />

        <main className='p-8 flex-1 overflow-y-auto'>
          <Outlet /> 
        </main>

      </div>
    </div>
  )
}

export default AdminLayout