import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiPieChart,
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiLogOut
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <FiPieChart />, path: '/admin' },
    { name: 'Foods', icon: <FiBox />, path: '/admin/foods' },
    { name: 'Orders', icon: <FiShoppingBag />, path: '/admin/orders' },
    { name: 'Users', icon: <FiUsers />, path: '/admin/users' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 shadow-sm">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
          <span className="text-white font-black text-xl italic uppercase">Q</span>
        </div>
        <span className="text-xl font-black text-text-main tracking-tight">
          QuickBite <span className="text-primary italic">Admin</span>
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all group relative
              ${isActive
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'text-text-muted hover:bg-bg-base hover:text-text-main'}
            `}
          >
            {({ isActive }) => (
              <>
                <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-text-muted group-hover:text-primary'}`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
                {/* Active Indicator Dot */}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-100 mb-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3.5 rounded-2xl w-full text-text-muted hover:text-red-600 hover:bg-red-50 transition-all font-bold group"
        >
          <FiLogOut className="text-xl transition-transform group-hover:-translate-x-1" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;