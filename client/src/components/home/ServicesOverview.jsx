import React from 'react';
import { Globe, Smartphone, Code2, Palette, TrendingUp, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useModal } from '../../context/ModalContext';

const services = [
  {
    number: '01',
    icon: Globe,
    title: 'Web Development',
    description:
      'High-performance business portals, modern e-commerce storefronts, custom web applications, and high-converting landing pages built for speed.',
    linkService: 'Web Development',
  },
  {
    number: '02',
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Native iOS, Android, and cross-platform apps with smooth gestures, real-time sync, and scalable cloud architectures.',
    linkService: 'Mobile App Development',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Custom Software Development',
    description:
      'Tailored CRM, ERP, business workflow automation systems, and SaaS platforms built around your unique business operations.',
    linkService: 'Custom Software',
  },
  {
    number: '04',
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Intuitive product design, wireframing, mobile & web prototyping, and complete design systems that turn visitors into loyal customers.',
    linkService: 'UI/UX Design',
  },
  {
    number: '05',
    icon: TrendingUp,
    title: 'Digital Marketing',
    description:
      'Strategic Meta Ads, Google Ads, content marketing, social media growth, and brand positioning campaigns driving real ROI.',
    linkService: 'Digital Marketing',
  },
  {
    number: '06',
    icon: Search,
    title: 'SEO & Performance Marketing',
    description:
      'Technical SEO audits, high-intent keyword strategies, conversion rate optimization (CRO), and sustainable search rankings.',
    linkService: 'SEO & Performance Marketing',
  },
];

const ServicesOverview = () => {
  const { openEnquiryModal } = useModal();

  return (
    <section className="py-20 bg-brand-near-black relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-brand-border text-[11px] font-semibold text-brand-magenta uppercase tracking-widest">
            <span>Our Core Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-heading text-white tracking-tight">
            Everything You Need To Grow Digitally
          </h2>
          <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            From technology to marketing, we provide the digital expertise needed to build, launch and scale your business.
          </p>
        </motion.div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card-glow-interactive group shadow-lg"
              >
                <div className="card-glow-inner p-6 flex flex-col justify-between">
                  <div>
                    {/* Top Number & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-xs font-medium text-brand-muted/70 tracking-widest">
                        {svc.number}
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-brand-border group-hover:border-brand-magenta/40 group-hover:bg-brand-purple/10 transition-all flex items-center justify-center text-brand-violet group-hover:text-brand-magenta">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2 mb-6">
                      <h3 className="text-base sm:text-lg font-medium font-heading text-white group-hover:text-brand-offwhite transition-colors">
                        {svc.title}
                      </h3>
                      <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
                        {svc.description}
                      </p>
                    </div>
                  </div>

                  {/* Button / Trigger */}
                  <div className="pt-3 border-t border-white/5 mt-auto">
                    <button
                      onClick={() => openEnquiryModal(svc.linkService)}
                      className="btn-3d-matte-mini px-3.5 py-2 rounded-lg w-full inline-flex items-center justify-between text-[11px] font-semibold tracking-wider text-brand-offwhite group-hover:text-brand-magenta uppercase outline-none focus:outline-none"
                    >
                      <span>Discuss Service</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
