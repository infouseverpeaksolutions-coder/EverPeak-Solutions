import React from 'react';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useModal } from '../../context/ModalContext';

const CTASection = () => {
  const { openEnquiryModal } = useModal();
  const whatsappUrl =
    'https://wa.me/917400881232?text=' +
    encodeURIComponent('Hello EverPeak Solutions, I would like to discuss a project with your team.');

  return (
    <section className="py-20 bg-brand-near-black relative overflow-hidden">
      {/* Dynamic Purple/Magenta Ambient Glow with slow pulse */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-brand-purple/20 via-brand-violet/20 to-brand-magenta/20 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 sm:p-10 rounded-2xl bg-brand-dark-gray/80 border border-brand-border shadow-2xl backdrop-blur-xl space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-brand-border text-[11px] font-semibold text-brand-magenta uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready To Scale?</span>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Have a project in mind?
            </h2>
            <p className="text-base sm:text-lg text-brand-offwhite/90 font-semibold">
              Let's turn your idea into something powerful.
            </p>
            <p className="text-xs sm:text-sm text-brand-muted max-w-lg mx-auto leading-relaxed">
              Partner with EverPeak Solutions for high-performance software engineering and high-impact digital marketing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openEnquiryModal()}
              className="btn-3d-matte-primary w-full sm:w-auto px-6 py-3 rounded-xl text-white font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center space-x-2 group outline-none focus:outline-none"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d-matte-secondary w-full sm:w-auto px-6 py-3 rounded-xl text-brand-offwhite hover:text-white text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 outline-none focus:outline-none"
            >
              <MessageSquare className="w-4 h-4 text-brand-magenta" />
              <span>CHAT ON WHATSAPP</span>
            </motion.a>
          </div>

          <div className="pt-2 text-[11px] text-brand-muted">
            ⚡ Direct response within 24 hours • NDA & Full Confidentiality Guaranteed
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
