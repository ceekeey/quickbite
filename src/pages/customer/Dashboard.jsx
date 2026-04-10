import React from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiMapPin, FiHeart, FiSettings, FiLogOut, FiArrowRight, FiStar } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import { orders } from '../../data/dummyData';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const recentOrders = orders.slice(0, 2);

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar cartCount={cartCount} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Profile Card */}
          <aside className="w-full lg:w-80">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-primary/10 group-hover:border-primary/30 transition-all">
                  <img 
                    src={user?.avatar || "https://i.pravatar.cc/150?u=quickbite"} 
                    alt="Profile" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg">
                  <FiSettings size={18} />
                </div>
              </div>
              
              <h2 className="mt-6 text-2xl font-black text-text-main">{user?.name || 'User Name'}</h2>
              <p className="text-text-muted font-medium text-sm">{user?.email || 'user@example.com'}</p>
              
              <div className="mt-8 w-full space-y-2">
                <button className="w-full flex items-center justify-between p-4 bg-primary/5 text-primary rounded-2xl font-bold transition-all hover:bg-primary/10">
                  <span className="flex items-center gap-3"><FiPackage /> My Orders</span>
                  <FiArrowRight />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-bg-base text-text-muted rounded-2xl font-bold transition-all group">
                  <span className="flex items-center gap-3 group-hover:text-text-main group-hover:translate-x-1 transition-all">
                    <FiMapPin /> Addresses
                  </span>
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-bg-base text-text-muted rounded-2xl font-bold transition-all group">
                  <span className="flex items-center gap-3 group-hover:text-text-main group-hover:translate-x-1 transition-all">
                    <FiHeart /> Favorites
                  </span>
                </button>
              </div>

              <div className="h-[1px] bg-gray-100 w-full my-6" />

              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-6 py-3 rounded-xl transition-all w-full justify-center"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {/* Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Orders', value: orders.length, icon: <FiPackage />, color: 'bg-blue-500' },
                { label: 'Saved Places', value: '3', icon: <FiMapPin />, color: 'bg-primary' },
                { label: 'Reviews', value: '12', icon: <FiStar />, color: 'bg-accent' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4"
                >
                  <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-current/20`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-text-muted text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-black text-text-main">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-text-main flex items-center gap-2">
                  <FiPackage className="text-primary" /> Recent Orders
                </h3>
                <button 
                  onClick={() => navigate('/orders')}
                  className="text-primary font-bold text-sm hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 divide-y divide-gray-50 overflow-hidden">
                {recentOrders.map((order, i) => (
                  <div key={order.id} className="p-6 flex flex-wrap items-center justify-between gap-6 hover:bg-bg-base/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-bg-base rounded-2xl flex items-center justify-center text-2xl">
                        🍱
                      </div>
                      <div>
                        <h4 className="font-bold text-text-main">{order.items.slice(0, 2).join(', ')}{order.items.length > 2 ? '...' : ''}</h4>
                        <p className="text-xs text-text-muted font-medium">{order.date} • {order.items.length} items</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-sm font-black text-text-main">${order.total.toFixed(2)}</p>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                          order.status === 'Delivered' ? 'text-green-500' : 'text-primary'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">Track</Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* App Promo / Info Card */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-primary p-8 md:p-12 text-white group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-md">
                  <h3 className="text-3xl font-black mb-4 leading-tight">Want to enjoy more rewards?</h3>
                  <p className="text-white/80 font-medium mb-8">
                    Download the QuickBite mobile app to get exclusive discounts, track your delivery in real-time and even more!
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="cta" className="bg-white text-primary border-none shadow-xl shadow-black/10">App Store</Button>
                    <Button variant="cta" className="bg-white text-primary border-none shadow-xl shadow-black/10">Play Store</Button>
                  </div>
                </div>
                <div className="w-48 h-48 bg-white/20 rounded-[2.5rem] backdrop-blur-md flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                  📱
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
