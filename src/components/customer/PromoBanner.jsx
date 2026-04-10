import React from 'react';
import { motion } from 'framer-motion';
import { FiGift, FiArrowRight } from 'react-icons/fi';
import Button from '../ui/Button';

const PromoBanner = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-16 relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-accent to-accent-dark p-8 md:p-12 text-white shadow-2xl shadow-accent/20"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-8"
          >
            <FiGift className="animate-bounce" /> Special Reward
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tighter"
          >
            Savor the <br /> 
            <span className="text-primary italic underline decoration-white/30 underline-offset-8">QuickBite</span> <br /> 
            Deal!
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-xl font-medium max-w-lg mb-10 leading-relaxed"
          >
            Get an instant <span className="bg-white text-accent px-4 py-1 rounded-xl font-black mx-1 shadow-lg shadow-black/10">50% OFF</span> on your very first order using code <span className="underline decoration-2 underline-offset-4">QUICK50</span>.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <Button variant="cta" size="lg" className="bg-white text-accent hover:bg-gray-100 border-none shadow-2xl shadow-black/20 gap-3 py-5 px-10 text-xl font-black">
              Claim Now <FiArrowRight />
            </Button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-full md:w-2/5 aspect-square bg-white/10 rounded-[4rem] backdrop-blur-md flex items-center justify-center text-[10rem] md:text-[15rem] border border-white/20 shadow-2xl group relative"
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [-5, 5, -5]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🍕
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[4rem]" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PromoBanner;
