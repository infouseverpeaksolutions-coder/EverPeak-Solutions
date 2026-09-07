import React from 'react';
import { Search, Compass, Palette, Code2, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    step: '01',
    title: 'DISCOVER',
    icon: Search,
    subtitle: 'Deep Immersion',
    description: 'Understand your business objectives, target audience, competitive landscape, and key system requirements.',
  },
  {
    step: '02',
    title: 'STRATEGIZE',
    icon: Compass,
    subtitle: 'Blueprint Architecture',
    description: 'Design the architectural roadmap, tech stack selection, conversion funnels, and milestone timelines.',
  },
  {
    step: '03',
    title: 'DESIGN',
    icon: Palette,
    subtitle: 'Visual & UX Crafting',
    description: 'Create premium user experiences, interactive prototypes, design systems, and responsive wireframes.',
  },
  {
    step: '04',
    title: 'DEVELOP',
    icon: Code2,
    subtitle: 'Clean Implementation',
    description: 'Engineer high-performance code, scalable MySQL databases, security layers, and execute quality assurance.',
  },
  {
    step: '05',
    title: 'LAUNCH & GROW',
    icon: Rocket,
    subtitle: 'Scale & Optimize',
    description: 'Deploy to cloud infrastructure, initiate growth marketing loops, monitor analytics, and continuously scale.',
  },
];

const ProcessSection = () => {
  return (
    <section className="py-20 bg-brand-black relative overflow-hidden border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-brand-border text-[11px] font-semibold text-brand-magenta uppercase tracking-widest">
            <span>Our Proven Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white tracking-tight">
            How We Work
          </h2>
          <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            A structured, 5-stage execution process designed for maximum speed, security, and measurable ROI.
          </p>
        </motion.div>

        {/* Process Steps (Horizontal on desktop, vertical on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-5 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-brand-purple via-brand-violet to-brand-magenta opacity-25 -translate-y-12 z-0" />

          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative z-10 p-6 rounded-2xl bg-brand-dark-gray/80 border border-brand-border hover:border-brand-purple/40 hover:bg-brand-card-hover transition-colors duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  {/* Top Step badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-brand-magenta bg-brand-purple/10 px-2.5 py-1 rounded-md border border-brand-purple/20">
                      STEP {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-brand-border group-hover:border-brand-magenta/40 group-hover:bg-brand-purple/20 transition-all flex items-center justify-center text-white">
                      <Icon className="w-5 h-5 text-brand-violet group-hover:text-brand-magenta" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-white mb-1 tracking-wide group-hover:text-brand-offwhite">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-brand-muted/70 mb-3">
                    {item.subtitle}
                  </div>

                  <p className="text-brand-muted text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-brand-muted">
                  <span>Phase {idx + 1}/5</span>
                  <span className="text-brand-purple font-semibold">100% Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
