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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100"
    >
      {/* Image Container */}
      <Link to={`/food/${food.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <FiStar className="text-yellow-400 fill-yellow-400" size={14} />
          <span className="text-xs font-bold text-text-main">{food.rating}</span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 bg-primary text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
            {food.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/food/${food.id}`}>
          <h3 className="font-bold text-text-main text-lg group-hover:text-primary transition-colors line-clamp-1">
            {food.name}
          </h3>
        </Link>
        <p className="text-text-muted text-sm mt-1 line-clamp-2 h-10">
          {food.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-text-muted">Price</span>
            <span className="text-xl font-extrabold text-primary">${food.price.toFixed(2)}</span>
          </div>
          
          <Button
            variant="primary"
            size="icon"
            className="w-10 h-10 rounded-xl"
            onClick={() => addToCart(food)}
          >
            <FiPlus size={20} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
