import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight, FiSearch, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import FoodCard from '../../components/customer/FoodCard';
import Button from '../../components/ui/Button';
import { categories, foods } from '../../data/dummyData';
import { useCart } from '../../context/CartContext';
import Footer from '../../components/Footer';
import PromoBanner from '../../components/customer/PromoBanner';
import Testimonials from '../../components/customer/Testimonials';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const reduceMotion = useReducedMotion();

  const filteredFoods = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return foods.filter((food) => {
      const matchesCategory = activeCategory === 'All' || food.category === activeCategory;
      const searchableText = `${food.name ?? ''} ${food.description ?? ''} ${food.category ?? ''}`.toLowerCase();
      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [activeCategory, searchQuery]);

  const sectionMotion = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.35 } };

  const heading = searchQuery.trim()
    ? 'Search results'
    : activeCategory === 'All'
      ? 'Popular dishes'
      : activeCategory;

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar cartCount={cartCount} />
      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <motion.section
          {...(reduceMotion ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45 } })}
          aria-labelledby="home-hero-title"
          className="group relative isolate mb-12 min-h-[360px] overflow-hidden rounded-2xl bg-gray-900 shadow-xl shadow-gray-900/10 sm:min-h-[420px] md:mb-16 md:rounded-[2rem] lg:min-h-[470px]"
        >
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/10" />
          <div className="flex min-h-[360px] max-w-3xl flex-col items-start justify-center px-6 py-12 sm:min-h-[420px] sm:px-10 md:min-h-[470px] md:px-14 lg:px-16">
            <span className="mb-4 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur">
              Fresh meals • Fast delivery
            </span>
            <h1 id="home-hero-title" className="max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              Good food, <span className="text-orange-300">good mood.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Discover satisfying meals from the QuickBite menu and order your next favorite.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                type="button"
                variant="cta"
                size="lg"
                className="gap-2 rounded-xl px-6 py-3.5 text-base shadow-lg"
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })}
              >
                Explore menu <FiArrowRight aria-hidden="true" />
              </Button>
              <Link
                to="/cart"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                View cart ({cartCount})
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.section {...sectionMotion} aria-labelledby="categories-heading" className="mb-10 md:mb-12">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">Find your craving</p>
              <h2 id="categories-heading" className="text-2xl font-extrabold tracking-tight text-text-main sm:text-3xl">Browse categories</h2>
            </div>
          </div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter food by category">
            {categories.map((cat) => {
              const selected = activeCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    selected
                      ? 'border-primary bg-primary text-white shadow-sm'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  <span aria-hidden="true" className="text-lg">{cat.icon}</span>
                  {cat.name}
                </button>
              );
            })}
          </div>
        </motion.section>

        <motion.section {...sectionMotion} id="menu" aria-labelledby="menu-heading" className="scroll-mt-28">
          <div className="mb-5 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">Made for your appetite</p>
              <h2 id="menu-heading" className="text-2xl font-extrabold tracking-tight text-text-main sm:text-3xl">{heading}</h2>
              <p className="mt-1 text-sm text-text-muted" aria-live="polite">
                {filteredFoods.length} {filteredFoods.length === 1 ? 'item' : 'items'} found
              </p>
            </div>
            <div className="relative w-full sm:max-w-sm">
              <FiSearch aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search meals or ingredients"
                aria-label="Search meals or ingredients"
                className="min-h-12 w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-11 text-sm text-text-main shadow-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <FiX aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {filteredFoods.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {filteredFoods.map((food) => <FoodCard key={food.id} food={food} />)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center sm:py-20">
              <span aria-hidden="true" className="mb-4 text-5xl">🍽️</span>
              <h3 className="text-xl font-bold text-text-main">No matching meals</h3>
              <p className="mt-2 max-w-md text-sm text-text-muted">
                {searchQuery ? 'Try another search term or clear your search to see all meals.' : 'There are no meals in this category right now. Try another category.'}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    Clear search
                  </button>
                )}
                <button type="button" onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  Show all meals
                </button>
              </div>
            </div>
          )}
        </motion.section>

        <div className="mt-14 md:mt-20"><PromoBanner /></div>
        <div className="mt-14 md:mt-20"><Testimonials /></div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
