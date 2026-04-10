import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Navbar from '../../components/layout/Navbar';
import FoodCard from '../../components/customer/FoodCard';
import Button from '../../components/ui/Button';
import { categories, foods } from '../../data/dummyData';
import { useCart } from '../../context/CartContext';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { cartCount } = useCart();

  const filteredFoods = activeCategory === 'All' 
    ? foods 
    : foods.filter(food => food.category === activeCategory);

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar cartCount={cartCount} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative rounded-[2rem] overflow-hidden mb-12 bg-primary group">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop" 
            alt="Delicious food"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="relative z-20 p-8 md:p-16 flex flex-col items-start justify-center min-h-[400px]">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-black text-white leading-tight"
            >
              Deliciousness <br /> 
              <span className="text-accent">Delivered</span> to You
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/80 mt-6 max-w-lg text-lg"
            >
              Order from the best restaurants in town. Fast delivery and premium quality food at your doorstep.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <Button variant="cta" size="lg" className="gap-2">
                Download App <FiArrowRight />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-main">Categories</h2>
          </div>
          <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`
                  flex flex-col items-center gap-2 px-6 py-4 rounded-2xl transition-all duration-300 min-w-[100px]
                  ${activeCategory === cat.name 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-white text-text-muted hover:bg-primary/5 hover:text-primary'
                  }
                `}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-bold uppercase tracking-wider">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Food Grid Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-text-main">
              Popular <span className="text-primary">{activeCategory}</span> Dishes
            </h2>
            <span className="text-text-muted text-sm font-medium">{filteredFoods.length} items found</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>

          {filteredFoods.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <span className="text-6xl mb-4">🔍</span>
              <h3 className="text-xl font-bold text-text-main">No food found</h3>
              <p className="text-text-muted">Try searching for something else!</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer / App Promo */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <p className="text-text-muted max-w-md mx-auto mb-8 font-medium">
            Satisfying your cravings with Every Bite. Premium food delivery service.
          </p>
          <div className="flex justify-center gap-8 text-text-muted font-bold text-sm tracking-widest uppercase">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Help Center</span>
          </div>
          <div className="mt-8 text-text-muted text-xs">
            © 2026 CeeKeey Food Ordering. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
