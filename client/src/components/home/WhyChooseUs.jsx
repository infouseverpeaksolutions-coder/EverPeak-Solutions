import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  {
    number: '01',
    title: 'BUSINESS-FOCUSED',
    description:
      'We build solutions around actual business objectives, not just technology. Every line of code and marketing campaign directly serves your bottom line.',
  },
  {
    number: '02',
    title: 'MODERN TECHNOLOGY',
    description:
      'We use modern technologies and development practices to build reliable, high-speed, and secure digital products designed to stay ahead of the curve.',
  },
  {
    number: '03',
    title: 'SCALABLE SOLUTIONS',
    description:
      'Our solutions are designed to grow alongside your business, supporting traffic spikes, increased transactions, and new feature requirements effortlessly.',
  },
  {
    number: '04',
    title: 'TRANSPARENT COMMUNICATION',
    description:
      'Clear, honest communication throughout every stage of your project. You receive direct access to leads, live progress demos, and clear milestones.',
  },
  {
    number: '05',
    title: 'PERFORMANCE DRIVEN',
    description:
      'We focus on measurable outcomes and meaningful growth — whether that is sub-second page loads, higher conversion rates, or lower advertising acquisition costs.',
  },
  {
    number: '06',
    title: 'LONG-TERM PARTNERSHIP',
    description:
      'We aim to become a long-term technology and digital growth partner for our clients, providing ongoing evolution, monitoring, and proactive optimization.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-brand-near-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-brand-border text-[11px] font-semibold text-brand-offwhite uppercase tracking-widest">
            <span>The EverPeak Advantage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-heading text-white tracking-tight">
            Why Businesses Choose EverPeak
          </h2>
          <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            Engineering excellence combined with strategic digital growth methodologies.
          </p>
        </motion.div>

        {/* Editorial / Numbered Grid (2x3 or 3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {reasons.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-glow-interactive group shadow-lg"
            >
              <div className="card-glow-inner p-6 flex flex-col justify-between">
                <div>
                  {/* Large Number Watermark */}
                  <div className="font-mono text-2xl font-semibold text-white/10 group-hover:text-brand-magenta/40 transition-colors mb-3">
                    {item.number}
                  </div>

                  <h3 className="text-base font-medium font-heading text-white mb-2 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Subtle Accent */}
                <div className="mt-5 w-8 h-[2px] bg-white/10 group-hover:w-full group-hover:bg-gradient-everpeak transition-all duration-300 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
