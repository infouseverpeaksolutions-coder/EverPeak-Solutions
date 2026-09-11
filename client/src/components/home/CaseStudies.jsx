import React from 'react';
import { TrendingUp, Users, DollarSign, Award, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const caseStudies = [
  {
    tag: 'E-COMMERCE GROWTH',
    client: 'Online Fashion & Ethnic Store',
    goal: 'Scale festive season sales with high ROAS',
    results: '1,200+ direct orders generated with a 4.5x ROAS and doubled customer retention.',
    icon: TrendingUp,
    metric: '4.5x ROAS',
    metricLabel: 'Ad Spend Return',
  },
  {
    tag: 'REAL ESTATE ADS',
    client: 'Premier Real Estate Developer',
    goal: 'Acquire high-intent buyers for luxury residences',
    results: '300+ pre-qualified site-visit leads delivered in 60 days with an average CPL of ₹50.',
    icon: Users,
    metric: '300+ Leads',
    metricLabel: 'CPL of ₹50',
  },
  {
    tag: 'PERFORMANCE ADS',
    client: 'Consumer Tech & Accessories',
    goal: 'Lower customer acquisition cost & increase checkout rate',
    results: 'Generated 500+ verified customer leads with CPC down to ₹2.5 and 200% ROI surge.',
    icon: DollarSign,
    metric: '₹2.5 CPC',
    metricLabel: '500+ Leads',
  },
  {
    tag: 'FITNESS & WELLNESS',
    client: 'Local Premium Fitness Studio',
    goal: 'Drive gym memberships & annual subscriptions',
    results: '350+ new paying memberships acquired with hyper-localized ads at ₹10 Cost Per Lead.',
    icon: Target,
    metric: '350+ Members',
    metricLabel: 'CPL at ₹10',
  },
  {
    tag: 'SOCIAL MEDIA VIRALITY',
    client: 'Lifestyle & Apparel Brand',
    goal: 'Build brand presence and organic engagement',
    results: '150% boost in organic Instagram followers and active inbound customer queries in 90 days.',
    icon: Zap,
    metric: '+150%',
    metricLabel: 'Organic Growth',
  },
  {
    tag: 'FULL-STACK PLATFORM',
    client: 'B2B SaaS & Business Operations',
    goal: 'Replace legacy systems with custom React/Node portal',
    results: '40% surge in daily user engagement, 0 downtime, and instant real-time data synchronization.',
    icon: Award,
    metric: '+40%',
    metricLabel: 'User Engagement',
  },
];

const CaseStudies = () => {
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
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-brand-border text-[11px] font-semibold text-brand-purple uppercase tracking-widest">
            <span>Verified Results</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white tracking-tight">
            Proof Through Performance
          </h2>
          <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            Real outcomes delivered for ambitious businesses across e-commerce, real estate, education, and SaaS.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {caseStudies.map((study, idx) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 rounded-xl bg-brand-dark-gray/60 border border-brand-border hover:border-brand-magenta/40 hover:bg-brand-card-hover transition-colors duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold text-brand-magenta uppercase tracking-wider">
                      {study.tag}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-brand-border group-hover:border-brand-purple/40 flex items-center justify-center text-brand-violet">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-heading text-white mb-1.5 group-hover:text-brand-offwhite">
                    {study.client}
                  </h3>

                  <div className="text-xs text-brand-muted mb-3">
                    <span className="text-white/60 font-medium">Objective:</span> {study.goal}
                  </div>

                  <p className="text-xs sm:text-sm text-brand-offwhite/80 leading-relaxed mb-5">
                    {study.results}
                  </p>
                </div>

                {/* Highlight Metric Badge */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="text-lg sm:text-xl font-extrabold font-heading text-gradient-purple">
                    {study.metric}
                  </div>
                  <div className="text-[11px] font-mono text-brand-muted">
                    {study.metricLabel}
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

export default CaseStudies;
