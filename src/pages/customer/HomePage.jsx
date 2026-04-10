import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Navbar from '../../components/layout/Navbar';
import FoodCard from '../../components/customer/FoodCard';
import Button from '../../components/ui/Button';
import { categories, foods } from '../../data/dummyData';
import { useCart } from '../../context/CartContext';
import Footer from '../../components/Footer';

import PromoBanner from '../../components/customer/PromoBanner';
import Testimonials from '../../components/customer/Testimonials';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { cartCount } = useCart();

  const filteredFoods = activeCategory === 'All' 
    ? foods 
    : foods.filter(food => food.category === activeCategory);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-bg-base"
    >
      <Navbar cartCount={cartCount} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section 
          variants={itemVariants}
          className="relative rounded-[3rem] overflow-hidden mb-20 bg-primary group shadow-2xl shadow-primary/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" />
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop" 
            alt="Delicious food"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="relative z-20 p-8 md:p-20 flex flex-col items-start justify-center min-h-[500px]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                Savor the <br /> 
                <span className="text-accent italic">QuickBite</span> Experience
              </h1>
              <p className="text-white/80 mt-8 max-w-lg text-xl font-medium leading-relaxed">
                Premium food delivery from the finest kitchens in the city. Fast, fresh, and exceptionally flavorful.
              </p>
              <div className="mt-12 flex flex-wrap gap-6">
                <Button variant="cta" size="lg" className="gap-3 py-5 px-10 text-xl shadow-2xl shadow-accent/40">
                  Explore Menu <FiArrowRight />
                </Button>
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-12 h-12 rounded-full border-4 border-primary shadow-lg" alt="User" />
                  ))}
                  <div className="w-12 h-12 rounded-full bg-accent border-4 border-primary flex items-center justify-center text-white text-xs font-black shadow-lg">
                    12k+
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Categories Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-3xl font-black text-text-main tracking-tight">Browse <span className="text-primary italic">Categories</span></h2>
          </div>
          <div className="flex items-center gap-6 overflow-x-auto pb-6 no-scrollbar scroll-smooth">
            {categories.map((cat) => (
              <motion.button
                variants={itemVariants}
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex flex-col items-center gap-3 px-8 py-6 rounded-[2.5rem] transition-all duration-500 min-w-[120px] border-2
                  ${activeCategory === cat.name 
                    ? 'bg-primary border-primary text-white shadow-2xl shadow-primary/30' 
                    : 'bg-white border-transparent text-text-muted hover:border-primary/20 hover:text-primary shadow-sm hover:shadow-xl'
                  }
                `}
              >
                <span className="text-4xl filter drop-shadow-md">{cat.icon}</span>
                <span className="text-xs font-black uppercase tracking-[0.2em]">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Food Grid Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center justify-between mb-10 px-2">
            <h2 className="text-3xl font-black text-text-main tracking-tight">
              Best <span className="text-primary italic">Sellers</span>
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                {filteredFoods.length} items available
              </span>
            </div>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </motion.div>

          {filteredFoods.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100"
            >
              <span className="text-7xl mb-6">🏜️</span>
              <h3 className="text-2xl font-black text-text-main">Nothing on the menu today</h3>
              <p className="text-text-muted font-medium mt-2">Try switching categories or come back later!</p>
            </motion.div>
          )}
        </motion.section>

        {/* Promo Banner Section */}
        <PromoBanner />

        {/* Testimonials Section */}
        <Testimonials />
      </main>

      <Footer />
    </motion.div>
  );
};

export default HomePage;
