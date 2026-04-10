import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import * as Icons from 'react-icons/fi';

const StatCard = ({ label, value, change, icon, index }) => {
  const IconComponent = Icons[icon] || Icons.FiActivity;
  const isPositive = change.startsWith('+');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-xl hover:shadow-primary/5 transition-all"
    >
      <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <IconComponent size={28} />
      </div>
      
      <div className="flex-1">
        <p className="text-sm font-medium text-text-muted uppercase tracking-wider">{label}</p>
        <div className="flex items-end gap-3 mt-1">
          <h3 className="text-2xl font-black text-text-main">{value}</h3>
          <span className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-lg ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {isPositive ? <FiArrowUpRight className="mr-0.5" /> : <FiArrowDownRight className="mr-0.5" />}
            {change}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
