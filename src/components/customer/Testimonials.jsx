import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Food Blogger",
    image: "https://i.pravatar.cc/150?u=sarah",
    content: "QuickBite has completely changed my weekends. The delivery is always on time, and the food arrives piping hot!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?u=michael",
    content: "The best user interface I've used for food ordering. So smooth and the tracking is incredibly accurate.",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Fitness Coach",
    image: "https://i.pravatar.cc/150?u=elena",
    content: "I love the healthy categories! It's so easy to find nutritious meals that actually taste amazing.",
    rating: 4
  }
];

const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
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

  return (
    <section className="py-32 bg-white rounded-[4rem] my-24 border border-gray-100 shadow-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-primary rotate-12">
        <FaQuoteRight size={300} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-6xl font-black text-text-main tracking-tight"
          >
            Loved by <span className="text-primary italic">Foodies</span>
          </motion.h2>
          <p className="text-text-muted mt-6 text-xl font-medium">Hear why thousands of users trust QuickBite for every meal.</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {testimonials.map((t, i) => (
            <motion.div
              variants={itemVariants}
              key={t.id}
              whileHover={{ y: -15 }}
              className="bg-bg-base p-10 rounded-[3rem] relative group hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-transparent hover:border-primary/10"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, index) => (
                  <FiStar
                    key={index}
                    className={index < t.rating ? "text-accent fill-accent" : "text-gray-200"}
                    size={16}
                  />
                ))}
              </div>

              <p className="text-text-main font-medium italic leading-relaxed text-lg mb-8">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-110">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-text-main text-sm">{t.name}</h4>
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
