import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Smartphone, Code2, Palette, TrendingUp, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import SectionLabel from '../common/SectionLabel';

const services = [
  {
    number: '01',
    icon: Globe,
    title: 'Web Development',
    description:
      'High-performance business portals, modern e-commerce storefronts, custom web applications, and high-converting landing pages built for speed.',
    linkService: 'Web Development',
    tint: 'border-brand-purple/30 bg-brand-purple/15 text-brand-purple',
  },
  {
    number: '02',
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Native iOS, Android, and cross-platform apps with smooth gestures, real-time sync, and scalable cloud architectures.',
    linkService: 'Mobile App Development',
    tint: 'border-brand-magenta/30 bg-brand-magenta/15 text-brand-magenta',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Custom Software Development',
    description:
      'Tailored CRM, ERP, business workflow automation systems, and SaaS platforms built around your unique business operations.',
    linkService: 'Custom Software',
    tint: 'border-brand-pink/30 bg-brand-pink/15 text-brand-pink',
  },
  {
    number: '04',
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Intuitive product design, wireframing, mobile & web prototyping, and complete design systems that turn visitors into loyal customers.',
    linkService: 'UI/UX Design',
    tint: 'border-brand-purple/30 bg-brand-purple/15 text-brand-purple',
  },
  {
    number: '05',
    icon: TrendingUp,
    title: 'Digital Marketing',
    description:
      'Strategic Meta Ads, Google Ads, content marketing, social media growth, and brand positioning campaigns driving real ROI.',
    linkService: 'Digital Marketing',
    tint: 'border-brand-magenta/30 bg-brand-magenta/15 text-brand-magenta',
  },
  {
    number: '06',
    icon: Search,
    title: 'SEO & Performance Marketing',
    description:
      'Technical SEO audits, high-intent keyword strategies, conversion rate optimization (CRO), and sustainable search rankings.',
    linkService: 'SEO & Performance Marketing',
    tint: 'border-brand-pink/30 bg-brand-pink/15 text-brand-pink',
  },
];

const ServicesOverview = () => {
  const { openEnquiryModal } = useModal();

  return (
    <section className="py-24 bg-brand-near-black relative overflow-hidden">
      {/* Subtle Background Light */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-magenta/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          {/* SectionLabel */}
          <SectionLabel label="Our Core Capabilities" />

          {/* Heading with gradient-clipped phrase */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-heading text-white tracking-tight leading-tight">
            Pioneering the <span className="text-gradient-purple">Future of Work</span> Solutions
          </h2>

          <p className="text-brand-muted text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            From architecture to growth marketing, we build, launch, and scale modern digital products that accelerate your business.
          </p>

          {/* Gradient "Explore All Services" pill with rotating arrow */}
          <div className="pt-2">
            <Link
              to="/services"
              className="btn-3d-matte-primary px-6 py-3 rounded-full text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center space-x-2.5 group shadow-lg"
            >
              <span>Explore All Services</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative glass-panel-strong rounded-3xl p-8 border border-white/10 hover:border-white/35 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/50 flex flex-col justify-between cursor-pointer"
              >
                {/* Card Header: Eyebrow + Tinted Icon Container */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-brand-muted">
                      {svc.number}
                    </span>
                    <div
                      className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 ${svc.tint} group-hover:border-white/25`}
                    >
                      <Icon className="w-7 h-7 transition-transform duration-300 group-hover:scale-105" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-normal font-heading text-white mb-3">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                {/* Card Footer: Discuss Service Trigger */}
                <div className="relative z-10 pt-8 mt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                  <button
                    onClick={() => openEnquiryModal(svc.linkService)}
                    className="small-caps text-brand-pink group-hover:text-white transition-colors flex items-center gap-2 outline-none"
                  >
                    <span>Discuss Service</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </button>
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
