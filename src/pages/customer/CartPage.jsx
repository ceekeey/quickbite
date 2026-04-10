import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiArrowRight, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  const serviceFee = 2.50;
  const deliveryFee = 0.00;
  const grandTotal = cartTotal + serviceFee + deliveryFee;

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar cartCount={cartCount} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-black text-text-main mb-8 flex items-center gap-3">
          Your Food <span className="text-primary italic">Basket</span>
          <span className="text-sm font-medium text-text-muted bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
            {cartCount} items
          </span>
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 px-6">
            <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
              <FiShoppingBag className="text-primary" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-text-main">Your cart is empty</h2>
            <p className="text-text-muted mt-2 text-center max-w-sm">
              Looks like you haven't added anything to your cart yet. Go back to browse some delicious food.
            </p>
            <Link to="/" className="mt-8">
              <Button variant="primary" size="lg" className="gap-2">
                <FiArrowLeft /> Back to Menu
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white p-4 rounded-3xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all border border-gray-100"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-text-main text-lg truncate">{item.name}</h3>
                      <p className="text-text-muted text-sm capitalize">{item.category}</p>
                      <p className="text-primary font-black mt-1 text-lg">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-3 bg-bg-base p-1.5 rounded-2xl border border-gray-50">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-xl bg-white text-text-main hover:text-primary transition-colors shadow-sm disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-xl bg-white text-text-main hover:text-primary transition-colors shadow-sm"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all mr-2"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold text-text-main mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-text-muted">
                    <span>Subtotal</span>
                    <span className="font-bold text-text-main">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Delivery Fee</span>
                    <span className="text-primary font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Service Fee</span>
                    <span className="font-bold text-text-main">${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="h-[1px] bg-gray-100 my-4" />
                  <div className="flex justify-between text-xl font-black">
                    <span className="text-text-main">Total</span>
                    <span className="text-primary">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <Link to="/payment">
                    <Button variant="cta" size="lg" className="w-full gap-2 py-4 shadow-xl shadow-accent/20">
                      Checkout <FiArrowRight />
                    </Button>
                  </Link>
                  <p className="text-[11px] text-text-muted text-center px-4">
                    By clicking checkout, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>

                <div className="mt-8 bg-primary/5 p-4 rounded-2xl border border-primary/10 flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
                    🎟️
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-primary">Got a promo code?</p>
                    <button className="text-[10px] text-primary-dark font-black uppercase tracking-widest hover:underline">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
