import React from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiArrowRight, FiActivity, FiUsers } from 'react-icons/fi';
import StatCard from '../../components/admin/StatCard';
import { orders, stats } from '../../data/dummyData';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  return (
    <div className="space-y-10">
      {/* Welcome Heading */}
      <div>
        <h1 className="text-3xl font-black text-text-main">Dashboard Overview</h1>
        <p className="text-text-muted mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} {...stat} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="xl:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <FiShoppingBag />
              </div>
              <h2 className="text-xl font-bold text-text-main">Recent Orders</h2>
            </div>
            <Button variant="ghost" className="gap-2">
              View All <FiArrowRight />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="pb-4 font-bold text-text-muted text-xs uppercase tracking-widest">Order ID</th>
                  <th className="pb-4 font-bold text-text-muted text-xs uppercase tracking-widest">Customer</th>
                  <th className="pb-4 font-bold text-text-muted text-xs uppercase tracking-widest">Amount</th>
                  <th className="pb-4 font-bold text-text-muted text-xs uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order.id} className="group hover:bg-bg-base/50 transition-colors">
                    <td className="py-4 font-bold text-text-main">{order.id}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold">
                          {order.user.charAt(0)}
                        </div>
                        <span className="text-sm font-medium">{order.user}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-bold text-primary">${order.total.toFixed(2)}</td>
                    <td className="py-4 text-right">
                      <span className={`
                        px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                          order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}
                      `}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed / Promo Section */}
        <div className="xl:col-span-1 space-y-8">
          <div className="bg-gradient-to-br from-primary to-primary-dark p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/20">
            <FiActivity size={40} className="mb-6 opacity-50" />
            <h3 className="text-2xl font-bold mb-3">Peak Hour Alert!</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              You're currently in a peak hour window. Expect higher traffic for Pizza and Burgers categories.
            </p>
            <Button variant="cta" size="md" className="w-full bg-white text-primary hover:bg-gray-100">
              Go to Analytics
            </Button>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-2">
              <FiUsers className="text-primary" /> New Customers
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-bg-base transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl" />
                    <div>
                      <p className="text-sm font-bold">Customer {i}</p>
                      <p className="text-[10px] text-text-muted">New Registration</p>
                    </div>
                  </div>
                  <FiArrowRight className="text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
