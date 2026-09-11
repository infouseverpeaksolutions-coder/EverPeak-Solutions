import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const stats = [
  { target: 600, suffix: '+', label: 'Projects Delivered' },
  { target: 350, suffix: '+', label: 'Happy Clients' },
  { target: 10, suffix: '+', label: 'Digital Services' },
  { target: 24, suffix: '/7', label: 'Support & Communication' },
];

const CountUp = ({ target, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setCount(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono">
      {count}
      <span className="text-brand-magenta">{suffix}</span>
    </span>
  );
};

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
              className="p-5 rounded-xl bg-brand-dark-gray/60 border border-brand-border/80 hover:border-brand-purple/40 hover:bg-brand-card-hover transition-colors duration-300 group text-center shadow-lg"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white group-hover:text-gradient-purple transition-all duration-300">
                <CountUp target={stat.target} suffix={stat.suffix} />
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
