import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu } from 'react-icons/fi';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Magnetic from '../ui/Magnetic';

const Navbar = ({ cartCount = 0 }) => {
  const { user, isAuthenticated } = useAuth();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-xl' : 'bg-transparent pb-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <Magnetic amount={0.2}>
            <div className="w-12 h-12 bg-primary rounded-[1.25rem] flex items-center justify-center transform group-hover:rotate-12 transition-all shadow-xl shadow-primary/30">
              <span className="text-white font-black text-2xl uppercase italic">Q</span>
            </div>
          </Magnetic>
          <span className={`text-2xl font-black tracking-tight hidden sm:block ${
            isScrolled ? 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent' : 'text-text-main'
          }`}>
            QuickBite
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl hidden md:flex items-center relative group">
          <FiSearch className="absolute left-5 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search for delicious food..."
            className="w-full bg-white border-2 border-transparent rounded-[1.5rem] py-4 pl-14 pr-6 focus:ring-0 focus:border-primary/20 transition-all outline-none text-text-main shadow-xl shadow-gray-200/50 font-medium"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Magnetic amount={0.3}>
            <button className="md:hidden p-3 text-text-main hover:bg-bg-base rounded-2xl transition-colors">
              <FiSearch size={22} />
            </button>
          </Magnetic>
          
          <Magnetic amount={0.3}>
            <Link to="/cart" className="relative p-3.5 text-text-main hover:bg-bg-base rounded-2xl transition-all group">
              <FiShoppingCart size={24} className="group-hover:text-primary transition-colors" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 bg-accent text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-4 border-white shadow-lg shadow-accent/20"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </Magnetic>

          <Link to="/orders" className="hidden sm:flex items-center gap-2 px-6 py-3 text-text-muted hover:text-primary transition-all font-black text-xs uppercase tracking-[0.2em]">
            Orders
          </Link>

          <div className="h-10 w-[2px] bg-gray-100 mx-2 hidden sm:block opacity-50"></div>

          {isAuthenticated ? (
            <Magnetic amount={0.2}>
              <Link to="/dashboard" className="flex items-center gap-3 p-1.5 pr-5 bg-white rounded-full transition-all group border-2 border-transparent hover:border-primary/20 shadow-lg shadow-gray-200/50">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark text-white rounded-full flex items-center justify-center font-black">
                  {user?.name?.[0] || 'U'}
                </div>
                <span className="text-sm font-black text-text-main hidden lg:block">{user?.name || 'User'}</span>
              </Link>
            </Magnetic>
          ) : (
            <Link to="/auth">
              <Button variant="primary" size="lg" className="hidden sm:flex rounded-full px-8">
                Sign In
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" className="lg:hidden">
            <FiMenu size={24} />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
