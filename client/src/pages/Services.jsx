import React, { useEffect, useState } from 'react';
import {
  Globe,
  Smartphone,
  Code2,
  ShoppingCart,
  Palette,
  Cloud,
  Search,
  Share2,
  Target,
  Megaphone,
  PenTool,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';
import { useModal } from '../context/ModalContext';
import CTASection from '../components/home/CTASection';

const techServices = [
  {
    icon: Globe,
    title: 'Web Development',
    category: 'Technology',
    description:
      'We engineer fast, accessible, and scalable web applications and websites designed to convert visitors and streamline business operations.',
    deliverables: [
      'Custom React.js / Next.js web applications',
      'Corporate & enterprise web platforms',
      'High-converting sales landing pages',
      'Progressive Web Apps (PWAs)',
      'Headless CMS & API integrations',
      'Sub-second page speed optimization',
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    category: 'Technology',
    description:
      'Turn ideas into high-performing native iOS, Android, and cross-platform apps with engaging user experiences and robust cloud backends.',
    deliverables: [
      'Native Android app engineering (Kotlin/Java)',
      'Native iOS app development (Swift)',
      'Cross-platform Flutter & React Native apps',
      'Push notifications & offline sync',
      'Payment gateways & in-app purchases',
      'Google Play & Apple App Store deployment',
    ],
  },
  {
    icon: Code2,
    title: 'Custom Software Development',
    category: 'Technology',
    description:
      'Bespoke software systems designed to automate workflows, eliminate operational bottlenecks, and scale your business operations.',
    deliverables: [
      'Custom ERP & enterprise management systems',
      'Tailored CRM & lead tracking pipelines',
      'Internal workflow automation engines',
      'Multi-tenant SaaS platforms',
      'Custom business analytics dashboards',
      'Role-based access control & security',
    ],
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Development',
    category: 'Technology',
    description:
      'High-converting online retail experiences built for frictionless checkouts, inventory synchronizations, and peak festive traffic spikes.',
    deliverables: [
      'Shopify Plus custom theme & app development',
      'WooCommerce & headless e-commerce stores',
      'Multi-vendor marketplace architectures',
      'Payment gateways (Razorpay, Stripe, PayU)',
      'Automated inventory, logistics & shipping sync',
      'Abandoned cart recovery automations',
    ],
  },
  {
    icon: Palette,
    title: 'UI/UX Design & Prototyping',
    category: 'Technology',
    description:
      'Aesthetic and conversion-focused product interfaces rooted in user psychology, ergonomic accessibility, and modern design systems.',
    deliverables: [
      'Interactive Figma prototypes & wireframes',
      'Design systems & UI token libraries',
      'Mobile app UI/UX workflows',
      'Web app & executive dashboard interfaces',
      'Usability testing & heuristic reviews',
      'Developer-ready asset handoffs',
    ],
  },
  {
    icon: Cloud,
    title: 'API Development & Cloud Infrastructure',
    category: 'Technology',
    description:
      'Reliable, secure, and lightning-fast backend architectures, RESTful APIs, and cloud deployments built for 99.9% uptime.',
    deliverables: [
      'Node.js & Express.js REST API architecture',
      'MySQL database schema design & indexing',
      'Third-party software & payment integrations',
      'Cloud hosting on AWS, DigitalOcean & Vercel',
      'JWT authentication & rate-limited endpoints',
      'Automated backup & server monitoring',
    ],
  },
];

const growthServices = [
  {
    icon: Target,
    title: 'Performance Marketing (Google & Meta Ads)',
    category: 'Digital Growth',
    description:
      'Data-driven paid media campaigns engineered for highest Return on Ad Spend (ROAS) and lowest Cost Per Acquisition (CPA).',
    deliverables: [
      'Google Search, Display & Performance Max ads',
      'Meta (Facebook & Instagram) conversion funnels',
      'YouTube video ads & lead generation',
      'Advanced custom & lookalike audience targeting',
      'A/B creative testing & conversion optimization',
      'Weekly transparent analytics reporting',
    ],
  },
  {
    icon: Search,
    title: 'Search Engine Optimization (SEO)',
    category: 'Digital Growth',
    description:
      'Dominate organic search rankings and drive high-intent commercial traffic that converts steadily without ad spend dependency.',
    deliverables: [
      'Comprehensive technical SEO audits',
      'High-intent commercial keyword strategy',
      'On-page content & structured schema markup',
      'High-authority white-hat link acquisition',
      'Local SEO & Google Maps optimization',
      'Core Web Vitals & page speed tuning',
    ],
  },
  {
    icon: Share2,
    title: 'Social Media Marketing & Management',
    category: 'Digital Growth',
    description:
      'Build a vibrant community around your brand with thumb-stopping reels, interactive carousels, and consistent omnichannel messaging.',
    deliverables: [
      'End-to-end content calendar & publishing',
      'High-tempo Instagram Reels & video edits',
      'LinkedIn B2B thought leadership branding',
      'Active community management & DM handling',
      'Influencer outreach & collaboration campaigns',
      'Monthly reach & engagement analytics',
    ],
  },
  {
    icon: Sparkles,
    title: 'Brand Identity & Visual Design',
    category: 'Digital Growth',
    description:
      'Elevate your brand presence with iconic logos, modern visual guidelines, social media assets, and executive pitch decks.',
    deliverables: [
      'Logo design & monogram systems',
      'Brand style guidelines & typography tokens',
      'Social media post templates & banners',
      'Marketing collateral, brochures & pitch decks',
      'Brand positioning & messaging frameworks',
      'Vector asset export in all standard formats',
    ],
  },
  {
    icon: Megaphone,
    title: 'Lead Generation & Sales Funnels',
    category: 'Digital Growth',
    description:
      'High-converting sales funnels designed to capture, nurture, and qualify prospects for your sales team automatically.',
    deliverables: [
      'High-converting landing page funnels',
      'Automated email lead nurturing sequences',
      'WhatsApp automated response funnels',
      'Lead qualification forms & CRM integration',
      'Webinar & event registration pipelines',
      'Conversion rate optimization (CRO) audits',
    ],
  },
  {
    icon: PenTool,
    title: 'Content Marketing & Copywriting',
    category: 'Digital Growth',
    description:
      'Persuasive copy and authoritative articles that educate prospects, answer buyer questions, and inspire immediate action.',
    deliverables: [
      'Website conversion copy & sales scripts',
      'SEO-optimized long-form articles & blogs',
      'Email marketing & promotional campaigns',
      'Ad copywriting with viral hooks',
      'Case study & client proof documentation',
      'Video scriptwriting & storytelling',
    ],
  },
];

const Services = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const { openEnquiryModal } = useModal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Services | EverPeak Solutions IT & Digital Growth';
  }, []);

  const displayedTech = activeFilter === 'ALL' || activeFilter === 'TECH' ? techServices : [];
  const displayedGrowth = activeFilter === 'ALL' || activeFilter === 'GROWTH' ? growthServices : [];

  return (
    <div className="bg-brand-black min-h-screen">
      {/* 1. Page Hero & Filter Toolbar */}
      <section className="relative pt-36 sm:pt-44 pb-16 bg-brand-black overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto space-y-5">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/5 border border-brand-border text-[11px] font-semibold text-brand-magenta uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" />
              <span>Full-Stack Capabilities</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold font-heading text-white tracking-tight leading-[1.16]">
              From Technology to Digital Growth, We Build Powerful Solutions That Help Your Business{' '}
              <span className="text-gradient-purple">Stand Out,</span>{' '}
              <span className="text-brand-magenta">Scale Faster,</span> and{' '}
              <span className="text-gradient-silver">Go Further.</span>
            </h1>

            <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              From modern technology and custom software engineering to high-ROI digital marketing, we deliver end-to-end digital solutions designed for sustainable growth.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2.5 pt-4 sm:pt-6">
              <button
                onClick={() => setActiveFilter('ALL')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider outline-none focus:outline-none ${
                  activeFilter === 'ALL'
                    ? 'btn-3d-matte-primary text-white'
                    : 'btn-3d-matte-secondary text-brand-muted hover:text-white'
                }`}
              >
                All Services
              </button>
              <button
                onClick={() => setActiveFilter('TECH')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider outline-none focus:outline-none ${
                  activeFilter === 'TECH'
                    ? 'btn-3d-matte-primary text-white'
                    : 'btn-3d-matte-secondary text-brand-muted hover:text-white'
                }`}
              >
                Technology & IT
              </button>
              <button
                onClick={() => setActiveFilter('GROWTH')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider outline-none focus:outline-none ${
                  activeFilter === 'GROWTH'
                    ? 'btn-3d-matte-primary text-white'
                    : 'btn-3d-matte-secondary text-brand-muted hover:text-white'
                }`}
              >
                Digital Growth & Marketing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Technology Services Section */}
      {displayedTech.length > 0 && (
        <section className="py-20 bg-brand-near-black border-b border-brand-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3 mb-10 pb-4 border-b border-brand-border">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-purple" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight">
                Technology & Software Engineering
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {displayedTech.map((svc, idx) => {
                const Icon = svc.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-brand-dark-gray/70 border border-brand-border hover:border-brand-purple/40 hover:bg-brand-card-hover transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-brand-border group-hover:border-brand-purple/40 group-hover:bg-brand-purple/15 transition-all flex items-center justify-center text-brand-violet mb-5">
                        <Icon className="w-5 h-5" />
                      </div>

                      <h3 className="text-base sm:text-lg font-bold font-heading text-white mb-2 group-hover:text-brand-offwhite">
                        {svc.title}
                      </h3>

                      <p className="text-brand-muted text-xs sm:text-sm leading-relaxed mb-5">
                        {svc.description}
                      </p>

                      <div className="space-y-1.5 mb-6">
                        <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-wider block mb-1.5">
                          Key Deliverables:
                        </span>
                        {svc.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start space-x-2 text-xs text-brand-offwhite">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-magenta shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5">
                      <button
                        onClick={() => openEnquiryModal(svc.title)}
                        className="btn-3d-matte-primary w-full py-2.5 px-4 rounded-lg text-white text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 outline-none focus:outline-none"
                      >
                        <span>DISCUSS YOUR PROJECT</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 3. Digital Growth Services Section */}
      {displayedGrowth.length > 0 && (
        <section className="py-20 bg-brand-black border-b border-brand-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3 mb-10 pb-4 border-b border-brand-border">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-magenta" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight">
                Digital Growth & Performance Marketing
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {displayedGrowth.map((svc, idx) => {
                const Icon = svc.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-brand-dark-gray/70 border border-brand-border hover:border-brand-magenta/40 hover:bg-brand-card-hover transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-brand-border group-hover:border-brand-magenta/40 group-hover:bg-brand-purple/15 transition-all flex items-center justify-center text-brand-magenta mb-5">
                        <Icon className="w-5 h-5" />
                      </div>

                      <h3 className="text-base sm:text-lg font-bold font-heading text-white mb-2 group-hover:text-brand-offwhite">
                        {svc.title}
                      </h3>

                      <p className="text-brand-muted text-xs sm:text-sm leading-relaxed mb-5">
                        {svc.description}
                      </p>

                      <div className="space-y-1.5 mb-6">
                        <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-wider block mb-1.5">
                          Key Deliverables:
                        </span>
                        {svc.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start space-x-2 text-xs text-brand-offwhite">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-violet shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5">
                      <button
                        onClick={() => openEnquiryModal(svc.title)}
                        className="btn-3d-matte-primary w-full py-2.5 px-4 rounded-lg text-white text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 outline-none focus:outline-none"
                      >
                        <span>DISCUSS YOUR PROJECT</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. Call To Action Section */}
      <CTASection />
    </div>
  );
};

export default Services;
