import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What services does EverPeak Solutions provide?',
    answer:
      'EverPeak Solutions is a full-service technology and digital marketing agency. We specialize in custom web development, mobile app development (iOS & Android), custom ERP/CRM software, UI/UX design, performance marketing (Google & Meta Ads), technical SEO, social media management, and end-to-end branding.',
  },
  {
    question: 'Do you work with startups and small businesses?',
    answer:
      'Yes! We work with ambitious startups, growing SMBs, and established enterprises alike. We offer flexible execution models ranging from rapid MVP launches for early-stage ventures to scalable custom enterprise software and full-funnel digital marketing.',
  },
  {
    question: 'Can you build custom software tailored to our specific operations?',
    answer:
      'Absolutely. We engineer custom web applications, SaaS products, CRM systems, automated inventory trackers, and internal portals using modern technologies like React, Node.js, Express, and MySQL.',
  },
  {
    question: 'Do you provide full-service digital marketing?',
    answer:
      'Yes. Our digital marketing division handles Meta Ads (Facebook & Instagram), Google Search & Display Ads, high-authority SEO, creative content generation, social media management, and conversion rate optimization (CRO) with complete weekly ROI reporting.',
  },
  {
    question: 'Can you manage both technical SEO and paid advertising?',
    answer:
      'Yes, we integrate both organic and paid acquisition channels to build a sustainable growth pipeline. We audit and optimize technical on-page architecture for search engines while concurrently running high-ROI paid ad funnels.',
  },
  {
    question: 'How can I start a project with EverPeak Solutions?',
    answer:
      'Starting is simple: click the "GET STARTED" button anywhere on our website or connect directly via WhatsApp at +91 74008 81232. We will schedule a free discovery consultation to discuss your requirements, timeline, and deliverables.',
  },
  {
    question: 'How long does a website or software project typically take?',
    answer:
      'Standard business websites and landing pages typically take 1 to 2 weeks. Comprehensive custom e-commerce stores, mobile apps, or enterprise software take 3 to 6 weeks depending on feature complexity and scope.',
  },
  {
    question: 'Can I see examples of your previous client work?',
    answer:
      'Yes! You can explore our live portfolio page on this website to view published case studies across e-commerce, fintech, matchmaking, education, and real estate, complete with live project links and outcomes.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-brand-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 space-y-3"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-brand-border text-[11px] font-semibold text-brand-offwhite uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-brand-magenta" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            Everything you need to know about partnering with EverPeak Solutions.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-xl bg-brand-dark-gray/60 border border-brand-border overflow-hidden transition-colors duration-200 hover:border-brand-purple/30"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-semibold text-white font-heading">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-white/5 border border-brand-border flex items-center justify-center text-brand-magenta shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-brand-purple/20 border-brand-purple/40' : ''
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-white/5 pt-3.5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
