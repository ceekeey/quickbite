import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-xl italic uppercase">Q</span>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-primary via-primary-dark to-accent bg-clip-text text-transparent tracking-tight">
                QuickBite
              </span>
            </div>
            <p className="text-text-muted font-medium leading-relaxed">
              Bringing the best flavors from top restaurants straight to your doorstep. Quality and speed are our passion.
            </p>
            <div className="flex gap-4">
              {[FiFacebook, FiTwitter, FiInstagram].map((Icon, i) => (
                <button key={i} className="w-10 h-10 bg-bg-base text-text-muted hover:bg-primary hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-black text-text-main mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Menu', path: '/' },
                { name: 'My Orders', path: '/orders' },
                { name: 'Dashboard', path: '/dashboard' },
                { name: 'Admin Panel', path: '/admin' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-text-muted font-bold hover:text-primary transition-colors flex items-center gap-2 group text-sm">
                    <FiArrowRight className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" size={12} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-lg font-black text-text-main mb-6 uppercase tracking-widest text-sm">Support</h4>
            <ul className="space-y-4 text-sm font-bold text-text-muted">
              <li><Link to="/" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Safety & Security</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Cookie Settings</Link></li>
            </ul>
          </div>

          {/* Column 4: Reach Us */}
          <div className="space-y-6">
            <h4 className="text-lg font-black text-text-main mb-6 uppercase tracking-widest text-sm text-center md:text-left">Reach Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                  <FiMapPin size={16} />
                </div>
                <p className="text-sm font-bold text-text-muted leading-relaxed">
                  Fedral Low Cost,<br />Gombe State
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                  <FiPhone size={16} />
                </div>
                <p className="text-sm font-bold text-text-muted">+234 9134585734</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                  <FiMail size={16} />
                </div>
                <p className="text-sm font-bold text-text-muted">xozuzionoow67@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-text-muted font-bold uppercase tracking-[0.2em]">
            © 2011 - {new Date().getFullYear()} QuickBite Food Delivery. All rights reserved.
          </p>
          <div className="flex gap-8">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-3 opacity-30 grayscale" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 opacity-30 grayscale" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="Paypal" className="h-3 opacity-30 grayscale" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;