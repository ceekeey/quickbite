import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu } from 'react-icons/fi';
import Button from '../ui/Button';

const Navbar = ({ cartCount = 0 }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent hidden sm:block">
            CeeKeey
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl hidden md:flex items-center relative group">
          <FiSearch className="absolute left-4 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search for delicious food..."
            className="w-full bg-bg-base border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none text-text-main shadow-inner"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="md:hidden p-2 text-text-main hover:bg-bg-base rounded-lg">
            <FiSearch size={22} />
          </button>
          
          <Link to="/cart" className="relative p-2.5 text-text-main hover:bg-bg-base rounded-xl transition-colors group">
            <FiShoppingCart size={22} className="group-hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce-subtle">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/orders" className="hidden sm:flex items-center gap-2 px-4 py-2 text-text-muted hover:text-primary transition-colors font-medium">
            My Orders
          </Link>

          <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden sm:block"></div>

          <Link to="/profile" className="flex items-center gap-2 p-1 pr-3 hover:bg-bg-base rounded-full transition-colors group">
            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-text-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <FiUser size={20} />
            </div>
            <span className="text-sm font-semibold text-text-main hidden lg:block">Guest</span>
          </Link>

          <Button variant="ghost" size="icon" className="lg:hidden">
            <FiMenu size={24} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
