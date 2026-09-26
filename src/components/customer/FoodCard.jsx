import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiPlus, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();
  const reduceMotion = useReducedMotion();
  const price = Number(food.price);
  const formattedPrice = Number.isFinite(price)
    ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 2 }).format(price)
    : 'Price unavailable';

  const handleAdd = () => {
    addToCart(food);
    toast.success(`${food.name} added to cart`);
  };

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.25 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg hover:shadow-gray-900/5"
    >
      <Link to={`/food/${food.id}`} className="relative m-2 block aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]"
        />
        {food.category && (
          <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm">
            {food.category}
          </span>
        )}
        {Number.isFinite(Number(food.rating)) && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-bold text-gray-800 shadow-sm" aria-label={`Rated ${food.rating} out of 5`}>
            <FiStar aria-hidden="true" className="fill-orange-400 text-orange-400" />
            {food.rating}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-2 sm:px-5 sm:pb-5">
        <Link to={`/food/${food.id}`} className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <h3 className="line-clamp-2 min-h-12 text-base font-bold leading-snug text-text-main transition-colors group-hover:text-primary sm:text-lg">
            {food.name}
          </h3>
        </Link>
        {food.description && (
          <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-text-muted">
            {food.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-lg font-extrabold tracking-tight text-primary sm:text-xl">{formattedPrice}</span>
          <Button
            type="button"
            variant="cta"
            size="icon"
            aria-label={`Add ${food.name} to cart`}
            title={`Add ${food.name} to cart`}
            className="h-11 w-11 shrink-0 rounded-xl p-0 shadow-sm"
            onClick={handleAdd}
            whileHover={reduceMotion ? {} : { scale: 1.04 }}
            whileTap={reduceMotion ? {} : { scale: 0.96 }}
          >
            <FiPlus aria-hidden="true" size={20} />
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default FoodCard;
