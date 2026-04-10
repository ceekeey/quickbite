import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight, FiGithub, FiTwitter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import authHero from '../assets/auth_hero.png';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        login({
          name: formData.name || formData.email.split('@')[0],
          email: formData.email,
          avatar: 'https://i.pravatar.cc/150?u=' + formData.email
        });
        toast.success(`Welcome back, ${formData.name || formData.email.split('@')[0]}!`);
        navigate('/dashboard');
      } else {
        toast.error('Please fill in all required fields');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side: Image Aside */}
      <div className="hidden lg:flex w-[60%] relative overflow-hidden bg-primary group">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={authHero} 
            alt="Flavorful experience" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        </motion.div>

        {/* Floating Branding Info */}
        <div className="relative z-20 p-16 flex flex-col justify-between h-full w-full">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl transform shadow-white/20">
              <span className="text-primary font-black text-2xl italic">Q</span>
            </div>
            <span className="text-white text-2xl font-black tracking-tight">QuickBite</span>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-xl"
          >
            <h2 className="text-6xl font-black text-white leading-tight mb-6">
              Flavor <span className="text-accent italic">Awaits</span> you.
            </h2>
            <p className="text-white/80 text-xl font-medium leading-relaxed max-w-md">
              Join our community of food lovers. The best meals from top restaurants, delivered with love and speed.
            </p>
            
            <div className="mt-12 flex gap-12">
              <div>
                <p className="text-4xl font-black text-white">50k+</p>
                <p className="text-white/60 text-sm font-bold uppercase tracking-widest mt-1">Happy Users</p>
              </div>
              <div>
                <p className="text-4xl font-black text-white">100+</p>
                <p className="text-white/60 text-sm font-bold uppercase tracking-widest mt-1">Restaurants</p>
              </div>
            </div>
          </motion.div>

          <div className="text-white/40 text-sm font-medium">
            © 2026 QuickBite Food Delivery. Quality Guaranteed.
          </div>
        </div>
      </div>

      {/* Right Side: Form Aside */}
      <div className="w-full lg:w-[40%] flex flex-col items-center justify-center p-8 md:p-12 relative">
        <div className="w-full max-w-sm">
          <div className="lg:hidden text-center mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-12 shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-3xl italic">Q</span>
            </div>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-black text-text-main">
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </h1>
            <p className="text-text-muted mt-3 font-medium text-lg leading-relaxed">
              {isLogin ? 'Good to see you again! Please enter your details.' : 'Create an account to start your culinary journey.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="signup-field"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <label className="text-xs font-black text-text-main ml-1 mb-2 block uppercase tracking-[0.15em]">Full Name</label>
                  <div className="relative group">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-bg-base border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-bold placeholder:font-medium shadow-inner"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-xs font-black text-text-main ml-1 mb-2 block uppercase tracking-[0.15em]">Email Address</label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="hello@quickbite.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-bg-base border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-bold placeholder:font-medium shadow-inner"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-black text-text-main ml-1 uppercase tracking-[0.15em]">Password</label>
                {isLogin && (
                  <button type="button" className="text-xs font-black text-primary hover:text-primary-dark transition-colors uppercase tracking-widest">Forgot?</button>
                )}
              </div>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-bg-base border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-bold placeholder:font-medium shadow-inner"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="cta" 
              size="lg" 
              className="w-full py-5 mt-4 gap-3 shadow-xl shadow-accent/20 rounded-[1.25rem]"
              disabled={loading}
            >
              {loading ? (
                <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="font-black text-lg">{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <FiArrowRight size={20} />
                </>
              )}
            </Button>
          </form>

          <div className="mt-10 flex items-center gap-4 text-text-muted">
            <div className="h-[1px] bg-gray-100 flex-1" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Social Auth</span>
            <div className="h-[1px] bg-gray-100 flex-1" />
          </div>

          <div className="mt-8 flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-3 py-4 px-4 bg-white border border-gray-100 rounded-2xl hover:bg-bg-base hover:border-transparent transition-all font-black text-xs text-text-main shadow-sm uppercase tracking-wider group">
              <FiGithub size={20} className="group-hover:scale-110 transition-transform" /> Github
            </button>
            <button className="flex-1 flex items-center justify-center gap-3 py-4 px-4 bg-white border border-gray-100 rounded-2xl hover:bg-bg-base hover:border-transparent transition-all font-black text-xs text-text-main shadow-sm uppercase tracking-wider group">
              <FiTwitter size={20} className="text-blue-400 group-hover:scale-110 transition-transform" /> Twitter
            </button>
          </div>

          <p className="mt-12 text-center text-text-muted font-bold text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-primary font-black hover:text-primary-dark transition-colors underline underline-offset-4"
            >
              {isLogin ? 'Join Now' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;