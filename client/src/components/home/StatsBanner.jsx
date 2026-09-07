import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '600+', label: 'Projects Delivered' },
  { value: '350+', label: 'Happy Clients' },
  { value: '10+', label: 'Digital Services' },
  { value: '24/7', label: 'Support & Communication' },
];

const StatsBanner = () => {
  return (
    <section className="py-16 sm:py-20 bg-brand-near-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-5 rounded-xl bg-brand-dark-gray/60 border border-brand-border/80 hover:border-brand-purple/40 hover:bg-brand-card-hover transition-colors duration-300 group text-center shadow-lg"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white group-hover:text-gradient-purple transition-all duration-300">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs font-medium text-brand-muted mt-1.5">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;
