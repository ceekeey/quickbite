import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiPieChart, 
  FiBox, 
  FiShoppingBag, 
  FiUsers, 
  FiSettings, 
  FiLogOut,
  FiChevronLeft
} from 'react-icons/fi';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <FiPieChart />, path: '/admin' },
    { name: 'Foods', icon: <FiBox />, path: '/admin/foods' },
    { name: 'Orders', icon: <FiShoppingBag />, path: '/admin/orders' },
    { name: 'Users', icon: <FiUsers />, path: '/admin/users' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">C</span>
        </div>
        <span className="text-xl font-bold text-text-main">Admin Panel</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group
              ${isActive 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'text-text-muted hover:bg-bg-base hover:text-primary'}
            `}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
            {/* Active Indicator Dot */}
            <div className={`ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-0 transition-opacity`} />
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 mb-4">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors font-medium">
          <FiLogOut className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
