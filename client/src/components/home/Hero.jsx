import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useModal } from '../../context/ModalContext';

const Hero = () => {
  const { openEnquiryModal } = useModal();
  const whatsappUrl =
    'https://wa.me/917400881232?text=' +
    encodeURIComponent('Hello EverPeak Solutions, I would like to discuss a project with your team.');

  return (
    <section className="relative min-h-[94vh] flex flex-col justify-center items-center pt-32 pb-20 overflow-hidden bg-brand-black">
      {/* Background ambient lighting and grid with subtle pulse */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.18, 0.12] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-brand-magenta/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        {/* Centered Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-7">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold font-heading text-white tracking-tight leading-[1.18]"
          >
            Elevate Your <span className="text-gradient-purple">Vision Into Reality.</span>
            <br />
            Innovate <span className="text-brand-magenta">Beyond Expectations.</span>
            <br />
            Dominate Your <span className="text-gradient-silver">Digital Future.</span>
          </motion.h1>

          {/* Sub-headline & Description */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2.5 max-w-2xl mx-auto text-center"
          >
            <p className="text-sm sm:text-base md:text-lg font-semibold text-brand-offwhite">
              Technology, creativity and digital marketing built around your business goals.
            </p>
            <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              We build powerful digital experiences, scalable technology solutions and growth-driven marketing strategies that help businesses move forward.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openEnquiryModal()}
              className="btn-3d-matte-primary px-6 py-3 rounded-xl text-white font-semibold text-xs sm:text-sm tracking-wide flex items-center space-x-2 group outline-none focus:outline-none"
            >
              <span>GET STARTED</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/portfolio"
                className="btn-3d-matte-secondary px-5 py-3 rounded-xl text-brand-offwhite hover:text-white font-semibold text-xs sm:text-sm flex items-center space-x-2 outline-none focus:outline-none"
              >
                <span>VIEW OUR WORK</span>
              </Link>
            </motion.div>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d-matte-secondary px-5 py-3 rounded-xl text-brand-offwhite hover:text-white text-xs sm:text-sm font-semibold flex items-center space-x-2 group outline-none focus:outline-none"
            >
              <MessageSquare className="w-4 h-4 text-brand-magenta group-hover:scale-110 transition-transform" />
              <span>CHAT ON WHATSAPP</span>
            </motion.a>
          </motion.div>

          {/* Small trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="pt-2 flex flex-wrap items-center justify-center gap-y-2.5 gap-x-8 text-[11px] sm:text-xs text-brand-muted"
          >
            <span className="flex items-center space-x-1.5 hover:text-brand-offwhite transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple" />
              <span>Custom Architecture</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-brand-offwhite transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-violet" />
              <span>ROI & Performance Focused</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-brand-offwhite transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-magenta" />
              <span>End-to-End Execution</span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
