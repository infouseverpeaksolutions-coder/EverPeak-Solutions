import React, { useState } from 'react';
import { Globe, Smartphone, Server, ShoppingCart, Layout, Cloud, Check, ArrowRight, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';

const itCategories = [
  {
    id: 'web',
    title: 'Web Development',
    icon: Globe,
    headline: 'High-Performance Web Solutions Engineered For Scale',
    description:
      'We design and build bespoke web portals, corporate platforms, and web applications utilizing modern component frameworks and robust backends.',
    items: [
      'Business & Corporate Websites',
      'High-Converting E-Commerce Stores',
      'Custom SaaS & Web Platforms',
      'Client Portals & Booking Systems',
      'High-Speed Landing Pages',
      'API-driven Progressive Web Apps',
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    icon: Smartphone,
    headline: 'Native & Cross-Platform Mobile Applications',
    description:
      'From concept to Google Play & App Store deployment, we create fluid, responsive mobile apps tailored for customer engagement and operational efficiency.',
    items: [
      'Native Android Applications',
      'Native iOS Applications',
      'Cross-Platform (Flutter / React Native)',
      'Enterprise & B2B Apps',
      'On-demand Customer Apps',
      'Real-time Push & Geolocation',
    ],
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    icon: Server,
    headline: 'Tailored Automation, ERP & CRM Platforms',
    description:
      'Eliminate manual inefficiencies with custom-engineered software designed around your organization’s specific workflows and databases.',
    items: [
      'Custom ERP & Inventory Software',
      'Tailored CRM & Sales Pipelines',
      'Workflow Automation Engines',
      'Custom Multi-tenant SaaS Platforms',
      'Executive Analytics Dashboards',
      'Role-based Enterprise Access',
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    icon: ShoppingCart,
    headline: 'Scalable Stores Optimized for Maximum Conversion',
    description:
      'Turn online visitors into repeat buyers with frictionless shopping funnels, lightning-fast cart experiences, and localized payment integrations.',
    items: [
      'Shopify Plus & Custom Stores',
      'WooCommerce Custom Solutions',
      'Headless & Custom React E-Commerce',
      'Marketplace & Multi-Vendor Systems',
      'Payment Gateway Integrations',
      'Automated Order & Shipping Sync',
    ],
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    icon: Layout,
    headline: 'Human-Centered Digital Product Design',
    description:
      'We combine aesthetic elegance with user psychology to build intuitive user interfaces and design systems that users love.',
    items: [
      'Modern Website UI/UX Design',
      'Mobile App UI/UX Interfaces',
      'Complex Dashboard & Web App Design',
      'Design Systems & UI Token Kits',
      'Interactive Figma Prototyping',
      'User Journey & Wireframe Mapping',
    ],
  },
  {
    id: 'cloud',
    title: 'API & Cloud',
    icon: Cloud,
    headline: 'Secure Backend Architecture & Cloud Integrations',
    description:
      'Build dependable infrastructure with robust RESTful APIs, MySQL database clustering, third-party integrations, and cloud deployment pipelines.',
    items: [
      'REST & GraphQL API Architecture',
      'Third-party Webhook Integrations',
      'MySQL & Relational Database Solutions',
      'Cloud Deployment (AWS, GCP, Vercel)',
      'Payment & SMS Gateway APIs',
      'Microservices & Serverless Functions',
    ],
  },
];

const ITServicesSection = () => {
  const [activeTab, setActiveTab] = useState('web');
  const { openEnquiryModal } = useModal();

  const currentCategory = itCategories.find((c) => c.id === activeTab) || itCategories[0];
  const Icon = currentCategory.icon;

  return (
    <section className="py-20 bg-brand-black relative overflow-hidden">
      {/* Ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-brand-border text-[11px] font-semibold text-brand-purple uppercase tracking-widest">
            <Code2 className="w-3.5 h-3.5" />
            <span>IT & Software Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white tracking-tight">
            Scalable IT Solutions Built For Enterprise Growth
          </h2>
          <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            From modern responsive web applications to enterprise-grade cloud systems, our engineering team builds resilient digital architectures.
          </p>
        </motion.div>

        {/* Tab Navigation Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10"
        >
          {itCategories.map((cat) => {
            const isSelected = activeTab === cat.id;
            const TabIcon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold outline-none focus:outline-none transition-all ${
                  isSelected
                    ? 'btn-3d-matte-primary text-white'
                    : 'btn-3d-matte-secondary text-brand-muted hover:text-white'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Active Tab Showcase Box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-glow-interactive !rounded-2xl shadow-2xl"
        >
          <div className="card-glow-inner !rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Content (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-magenta">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-brand-magenta uppercase tracking-wider">
                        {currentCategory.title}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                        {currentCategory.headline}
                      </h3>
                    </div>
                  </div>

                  <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
                    {currentCategory.description}
                  </p>

                  {/* Items List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {currentCategory.items.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-brand-offwhite">
                        <div className="w-4 h-4 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-magenta shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => openEnquiryModal(currentCategory.title)}
                      className="btn-3d-matte-primary px-5 py-2.5 rounded-lg text-white font-semibold text-xs uppercase tracking-wider flex items-center space-x-2 group outline-none focus:outline-none"
                    >
                      <span>DISCUSS YOUR PROJECT</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Right Graphic Representation (5 cols) */}
                <div className="lg:col-span-5">
                  <div className="p-5 rounded-xl bg-brand-black/70 border border-brand-border space-y-3.5">
                    <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
                      <span className="text-[11px] font-mono text-brand-muted">TECH_STACK // MODULE</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-green-500/20 text-green-400">
                        Production Ready
                      </span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                        <span className="text-brand-muted">Architecture:</span>
                        <span className="text-white font-semibold">Modular & Scalable</span>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                        <span className="text-brand-muted">Database:</span>
                        <span className="text-brand-magenta font-semibold">MySQL / High Availability</span>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                        <span className="text-brand-muted">Performance:</span>
                        <span className="text-white font-semibold">Sub-second Latency</span>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                        <span className="text-brand-muted">Security:</span>
                        <span className="text-white font-semibold">JWT, CORS, Encrypted</span>
                      </div>
                    </div>

                    <div className="pt-2 text-center text-[11px] text-brand-muted">
                      Custom engineered for EverPeak clients
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ITServicesSection;
