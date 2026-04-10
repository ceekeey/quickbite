import React from 'react';
import { FiSearch, FiFilter, FiChevronDown, FiExternalLink } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import { orders } from '../../data/dummyData';

const ManageOrdersPage = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-text-main">Manage Orders</h1>
        <p className="text-text-muted mt-1">Review and update status for all incoming orders.</p>
      </div>

      {/* Overview Cards (Mini) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'All', count: 124, color: 'bg-gray-100' },
          { label: 'Pending', count: 12, color: 'bg-amber-100 text-amber-700' },
          { label: 'Preparing', count: 8, color: 'bg-blue-100 text-blue-700' },
          { label: 'Delivered', count: 104, color: 'bg-green-100 text-green-700' },
        ].map((item) => (
          <div key={item.label} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <span className="text-sm font-bold text-text-muted uppercase tracking-wider">{item.label}</span>
            <span className={`px-3 py-1 rounded-lg font-black text-sm ${item.color}`}>{item.count}</span>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 bg-bg-base px-5 py-3 rounded-2xl w-full max-w-sm group">
            <FiSearch className="text-text-muted group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by order ID or customer..."
              className="bg-transparent border-none outline-none text-sm font-medium w-full text-text-main"
            />
          </div>
          <Button variant="ghost" className="gap-2 bg-bg-base text-text-muted hover:text-primary">
            <FiFilter /> Advanced Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg-base/30">
                <th className="px-8 py-5 font-black text-text-muted text-[10px] uppercase tracking-[0.2em]">Order Details</th>
                <th className="px-8 py-5 font-black text-text-muted text-[10px] uppercase tracking-[0.2em]">Customer</th>
                <th className="px-8 py-5 font-black text-text-muted text-[10px] uppercase tracking-[0.2em]">Date & Time</th>
                <th className="px-8 py-5 font-black text-text-muted text-[10px] uppercase tracking-[0.2em]">Total</th>
                <th className="px-8 py-5 font-black text-text-muted text-[10px] uppercase tracking-[0.2em]">Status Action</th>
                <th className="px-8 py-5 font-black text-text-muted text-[10px] uppercase tracking-[0.2em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="group hover:bg-bg-base/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-extrabold text-text-main">{order.id}</span>
                      <span className="text-[10px] text-text-muted font-bold mt-1 uppercase truncate max-w-[150px]">
                        {order.items.join(', ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-text-main">{order.user}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-medium text-text-muted">{order.date}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-black text-text-main">${order.total.toFixed(2)}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="relative inline-block w-full min-w-[140px]">
                      <select 
                        defaultValue={order.status}
                        className={`
                          w-full appearance-none px-4 py-2 pr-10 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all outline-none cursor-pointer
                          ${order.status === 'Delivered' ? 'bg-green-50 border-green-200 text-green-700' : 
                            order.status === 'Pending' ? 'bg-amber-50 border-amber-200 text-amber-700' : 
                            'bg-blue-50 border-blue-200 text-blue-700'}
                        `}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-3 text-text-muted hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                      <FiExternalLink size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between">
          <p className="text-xs font-bold text-text-muted">Showing 1 to 3 of 124 entries</p>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="bg-bg-base opacity-50">Prev</Button>
            <Button variant="ghost" size="sm" className="bg-primary text-white">1</Button>
            <Button variant="ghost" size="sm" className="bg-bg-base">2</Button>
            <Button variant="ghost" size="sm" className="bg-bg-base">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrdersPage;
