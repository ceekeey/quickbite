import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import { FiBell, FiSearch, FiUser } from 'react-icons/fi';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-bg-base">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 bg-bg-base px-4 py-2 rounded-2xl w-full max-w-md group border border-transparent focus-within:border-primary/20 transition-all">
            <FiSearch className="text-text-muted group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search data, reports..."
              className="bg-transparent border-none outline-none text-sm font-medium w-full text-text-main"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-text-muted hover:text-primary transition-colors">
              <FiBell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-gray-100" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-text-main leading-none">Admin User</p>
                <p className="text-[11px] text-text-muted font-medium mt-1 uppercase tracking-wider">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
