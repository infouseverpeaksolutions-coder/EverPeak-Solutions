import React from 'react';
import { Search, Share2, Target, PenTool, Sparkles, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useModal } from '../../context/ModalContext';

const marketingServices = [
  {
    title: 'Performance Marketing',
    icon: Target,
    tagline: 'ROI-Driven Paid Advertising',
    description:
      'High-precision advertising across Google, Meta (Instagram & Facebook), and YouTube. Every campaign is engineered for lowest Cost Per Lead (CPL) and maximum Return On Ad Spend (ROAS).',
    bullets: [
      'Google Search & Display Ads',
      'Meta (Facebook & Instagram) Funnels',
      'High-Intent Lead Generation',
      'Conversion Rate Optimization (CRO)',
      'Advanced Retargeting Audiences',
      'Transparent Weekly Reporting',
    ],
  },
  {
    title: 'Search Engine Optimization (SEO)',
    icon: Search,
    tagline: 'Organic Rankings & Sustainable Traffic',
    description:
      'Dominate search engine results with data-backed technical SEO, keyword mapping, semantic on-page optimizations, and high-authority link acquisition.',
    bullets: [
      'Deep Technical SEO Audits',
      'On-Page & Schema Markup',
      'High-Intent Keyword Research',
      'Local SEO & Google Business Profile',
      'Competitor Gap Analysis',
      'Continuous Rank Tracking',
    ],
  },
  {
    title: 'Social Media Management',
    icon: Share2,
    tagline: 'Community Growth & Engagement',
    description:
      'Build an active, loyal brand community. We produce engaging motion graphic reels, carousels, and high-conversion content calendars.',
    bullets: [
      'Instagram & Facebook Strategy',
      'LinkedIn B2B Authority Building',
      'High-Engagement Reels & Creatives',
      'Active Community Management',
      'Influencer Marketing Campaigns',
      'Brand Tone & Voice Alignment',
    ],
  },
  {
    title: 'Brand Identity & Strategy',
    icon: Sparkles,
    tagline: 'Futuristic Visual Presence',
    description:
      'Position your business as an industry leader with iconic visual identity systems, bespoke logos, marketing collateral, and comprehensive style guides.',
    bullets: [
      'Distinctive Logo & Monogram Systems',
      'Color Palettes & Typography Rules',
      'Social Media Brand Toolkits',
      'Marketing Collateral & Pitch Decks',
      'Brand Positioning & Voice Guidelines',
      'Packaging & Print Ready Assets',
    ],
  },
  {
    title: 'Content Marketing & Copywriting',
    icon: PenTool,
    tagline: 'High-Converting Messaging',
    description:
      'Compelling storytelling that educates prospects, builds unquestioned authority, and guides visitors effortlessly into high-value sales conversations.',
    bullets: [
      'High-Conversion Landing Page Copy',
      'SEO-Optimized Thought Leadership Blogs',
      'Email Marketing & Drip Sequences',
      'Ad Creative Copy & Hooks',
      'Video Scripting & Storyboarding',
      'Case Study Writing & Proof Points',
    ],
  },
];

const DigitalMarketingSection = () => {
  const { openEnquiryModal } = useModal();

  return (
    <section className="py-20 bg-brand-near-black relative overflow-hidden border-t border-brand-border">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-magenta/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-brand-border text-[11px] font-semibold text-brand-magenta uppercase tracking-widest">
            <span>Growth & Customer Acquisition</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white tracking-tight">
            Turn Attention Into Growth
          </h2>
          <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            Strategic digital marketing designed to attract the right audience, generate leads and grow your brand.
          </p>
        </motion.div>

        {/* Marketing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {marketingServices.map((service, idx) => {
            const Icon = service.icon;
            const isFeatured = idx === 0;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`p-6 rounded-xl border transition-colors duration-300 flex flex-col justify-between group shadow-lg ${
                  isFeatured
                    ? 'bg-brand-dark-gray border-brand-purple/40 shadow-glow-sm'
                    : 'bg-brand-dark-gray/60 border-brand-border hover:border-brand-magenta/40 hover:bg-brand-card-hover'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-brand-border group-hover:border-brand-magenta/40 group-hover:bg-brand-purple/10 transition-all flex items-center justify-center text-brand-magenta">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider">
                      {service.tagline}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-heading text-white mb-2.5 group-hover:text-brand-offwhite transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-brand-muted text-xs sm:text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center space-x-2 text-xs text-brand-offwhite">
                        <Check className="w-3.5 h-3.5 text-brand-violet shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <button
                    onClick={() => openEnquiryModal(service.title)}
                    className="btn-3d-matte-mini px-3.5 py-2 rounded-lg w-full inline-flex items-center justify-between text-[11px] font-semibold tracking-wider text-brand-offwhite group-hover:text-brand-magenta uppercase outline-none focus:outline-none"
                  >
                    <span>Scale Marketing</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
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

export default DigitalMarketingSection;
