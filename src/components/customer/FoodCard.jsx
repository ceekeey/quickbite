import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 30 
      }}
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-500 border border-gray-100/50"
    >
      {/* Image Container */}
      <Link to={`/food/${food.id}`} className="block relative aspect-[4/3] overflow-hidden m-3 rounded-[2rem]">
        <motion.img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-lg">
          <FiStar className="text-accent fill-accent" size={14} />
          <span className="text-xs font-black text-text-main">{food.rating}</span>
        </div>
        
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-primary text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg">
            {food.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 pt-2">
        <Link to={`/food/${food.id}`}>
          <h3 className="font-black text-text-main text-xl group-hover:text-primary transition-colors line-clamp-1 tracking-tight">
            {food.name}
          </h3>
        </Link>
        <p className="text-text-muted text-sm mt-2 line-clamp-2 h-10 font-medium leading-relaxed">
          {food.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Price</span>
            <span className="text-2xl font-black text-primary tracking-tighter">${food.price.toFixed(2)}</span>
          </div>
          
          <Button
            variant="cta"
            size="icon"
            className="w-12 h-12 rounded-2xl shadow-xl shadow-accent/20"
            onClick={() => addToCart(food)}
            whileHover={{ rotate: 90, scale: 1.1 }}
          >
            <FiPlus size={24} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
