import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiCheckCircle, FiPackage, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Button from '../../components/ui/Button';
import { orders } from '../../data/dummyData';
import { useCart } from '../../context/CartContext';

const OrdersPage = () => {
  const { cartCount } = useCart();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Preparing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FiCheckCircle />;
      case 'Pending':
        return <FiClock />;
      case 'Preparing':
        return <FiPackage />;
      default:
        return <FiClock />;
    }
  };

  const orderList = orders || [];

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar cartCount={cartCount} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black text-text-main mb-2">My Orders</h1>
        <p className="text-text-muted mb-10">Track your current and past culinary journeys.</p>

        {orderList.length > 0 ? (
          <div className="space-y-6">
            {orderList.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 overflow-hidden relative group"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-text-main">{order.id}</h3>
                      <p className="text-xs text-text-muted font-medium">{order.date}</p>
                    </div>
                  </div>

                  <div className={`px-4 py-2 rounded-xl text-sm font-bold border flex items-center gap-2 ${getStatusStyle(order.status)} animate-pulse-subtle`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                </div>

                <div className="bg-bg-base rounded-2xl p-4 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {order.items?.map((item, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-sm text-text-main font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                  <div className="flex flex-col">
                    <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Total Amount</span>
                    <span className="text-2xl font-black text-text-main">₦{order.total?.toFixed(2)}</span>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" size="md">
                      Order Details
                    </Button>
                    <Button variant="primary" size="md" className="gap-2">
                      Reorder <FiArrowRight />
                    </Button>
                  </div>
                </div>

                {/* Decorative side accent */}
                <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${order.status === 'Delivered' ? 'bg-primary' :
                    order.status === 'Pending' ? 'bg-accent' : 'bg-blue-500'
                  }`} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <p className="text-text-muted text-lg">You haven't placed any orders yet.</p>
            <Link to="/">
              <Button variant="primary" className="mt-4">Start Ordering</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrdersPage;