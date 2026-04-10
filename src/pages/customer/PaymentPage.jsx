import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCreditCard, FiArrowLeft, FiShield, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import PaystackPop from '@paystack/inline-js';
import Navbar from '../../components/layout/Navbar';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const PaymentPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const serviceFee = 2.50;
  const deliveryFee = 0.00;
  const grandTotal = cartTotal + serviceFee + deliveryFee;

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handlePaystackPayment = () => {
    setProcessing(true);
    
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: 'pk_test_placeholder_key', // This would be the user's key
      email: user?.email || 'customer@example.com',
      amount: Math.round(grandTotal * 100), // Amount in kobo/cents
      currency: 'USD', 
      onSuccess: (transaction) => {
        toast.success('Payment successful! Your order is being prepared.');
        clearCart();
        navigate('/orders');
      },
      onCancel: () => {
        setProcessing(false);
        toast.error('Payment cancelled.');
      },
      onError: (error) => {
        setProcessing(false);
        toast.error('Payment failed. Please try again.');
        console.error('Paystack Error:', error);
      }
    });
  };

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar cartCount={cart.length} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/cart" className="inline-flex items-center gap-2 text-text-muted hover:text-primary font-bold mb-8 transition-colors group">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Cart
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="space-y-8">
            <h1 className="text-3xl font-black text-text-main">Finalize <span className="text-primary italic">Payment</span></h1>
            
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-text-main mb-6">Order Summary</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-text-muted">
                      <span className="font-bold text-text-main">{item.quantity}x</span> {item.name}
                    </span>
                    <span className="font-bold text-text-main">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="h-[1px] bg-gray-50 my-6" />
                
                <div className="space-y-3">
                  <div className="flex justify-between text-text-muted text-sm">
                    <span>Subtotal</span>
                    <span className="font-bold text-text-main">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-text-muted text-sm">
                    <span>Service Fee</span>
                    <span className="font-bold text-text-main">${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-text-muted text-sm">
                    <span>Delivery</span>
                    <span className="text-green-500 font-bold uppercase tracking-wider">Free</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xl font-bold text-text-main">Total to Pay</span>
                  <span className="text-3xl font-black text-primary">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <FiShield size={24} />
              </div>
              <div>
                <h3 className="font-bold text-primary text-sm">Secure Payment</h3>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  Your payment information is encrypted and processed securely powered by Paystack.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-primary/10 border-2 border-primary/20 relative"
            >
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                Recommended
              </div>

              <div className="w-16 h-16 bg-bg-base rounded-2xl flex items-center justify-center mb-8">
                <FiCreditCard className="text-primary" size={32} />
              </div>

              <h2 className="text-2xl font-black text-text-main mb-2">Pay with Card</h2>
              <p className="text-text-muted mb-8 text-sm">
                Pay securely using your Debit/Credit card or Bank Transfer via Paystack.
              </p>

              <Button 
                variant="cta" 
                size="lg" 
                className="w-full py-5 text-lg shadow-xl shadow-accent/20"
                onClick={handlePaystackPayment}
                disabled={processing}
              >
                {processing ? (
                  <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  `Pay $${grandTotal.toFixed(2)} Now`
                )}
              </Button>

              <div className="mt-8 flex justify-center items-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="Paypal" className="h-4 object-contain" />
              </div>
            </motion.div>

            <div className="mt-8 text-center px-8">
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest leading-loose">
                By clicking pay, you authorize QuickBite to charge your card for the amount shown. All transactions are final.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
