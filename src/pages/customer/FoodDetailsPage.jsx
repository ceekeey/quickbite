import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiPlus, FiMinus, FiShoppingCart, FiStar, FiClock } from 'react-icons/fi';
import Navbar from '../../components/layout/Navbar';
import Button from '../../components/ui/Button';
import { foods } from '../../data/dummyData';
import { useCart } from '../../context/CartContext';

const FoodDetailsPage = () => {
  const { id } = useParams();
  const { addToCart, cartCount } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const food = foods.find((f) => f.id === parseInt(id));

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Food not found</h2>
          <Link to="/" className="text-primary mt-4 inline-block hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(food, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar cartCount={cartCount} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 group"
        >
          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
            <FiArrowLeft />
          </div>
          <span className="font-medium">Back to menu</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl relative"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 flex gap-2">
              <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-sm font-bold shadow-sm">
                <FiStar className="text-yellow-400 fill-yellow-400" />
                {food.rating} (50+ reviews)
              </span>
              <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 text-sm font-bold shadow-sm">
                <FiClock className="text-primary" />
                20-30 min
              </span>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-primary font-bold uppercase tracking-widest text-sm bg-primary/10 px-4 py-1.5 rounded-full w-fit mb-4">
              {food.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-text-main leading-tight">
              {food.name}
            </h1>

            <div className="flex items-center gap-4 mt-6">
              <span className="text-3xl font-black text-primary">₦{food.price.toFixed(2)}</span>
            </div>

            <p className="mt-8 text-text-muted text-lg leading-relaxed">
              {food.description}
            </p>

            <div className="mt-10 border-y border-gray-100 py-8 flex flex-wrap items-center gap-8">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-text-main"
                >
                  <FiMinus />
                </button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-text-main"
                >
                  <FiPlus />
                </button>
              </div>

              {/* Add to Cart Button */}
              <div className="flex-1">
                <Button
                  onClick={handleAddToCart}
                  variant={isAdded ? "primary" : "cta"}
                  size="lg"
                  className="w-full gap-3 py-4 shadow-xl shadow-accent/20 relative overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {isAdded ? (
                      <motion.span
                        key="added"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        ✓ Added to Cart
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <FiShoppingCart /> Add to Cart — ₦{(food.price * quantity).toFixed(2)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-50 shadow-sm">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                  🚚
                </div>
                <div>
                  <p className="text-xs text-text-muted font-medium">Delivery</p>
                  <p className="text-sm font-bold">Free Shipping</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-50 shadow-sm">
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                  🔥
                </div>
                <div>
                  <p className="text-xs text-text-muted font-medium">Freshness</p>
                  <p className="text-sm font-bold">Made to Order</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default FoodDetailsPage;
