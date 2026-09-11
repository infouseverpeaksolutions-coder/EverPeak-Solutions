import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import MagneticButton from '../common/MagneticButton';

const headlineWords = ['Future.', 'Market.', 'Industry.'];

const Hero = () => {
  const { openEnquiryModal } = useModal();
  const [wordIndex, setWordIndex] = useState(0);

  // Rotating word timer
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % headlineWords.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const whatsappUrl =
    'https://wa.me/917400881232?text=' +
    encodeURIComponent('Hello EverPeak Solutions, I would like to discuss a project with your team.');

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-10 sm:pt-28 sm:pb-14 overflow-hidden bg-brand-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto flex flex-col justify-center items-center">
        {/* Centered Hero Content */}
        <div className="max-w-5xl mx-auto text-center space-y-5 sm:space-y-6">
          {/* Main Headline arranged into 3 uniform lines with Rotating Word Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-[24px] min-[380px]:text-[27px] sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px] font-semibold font-heading text-white tracking-tight leading-[1.2] sm:leading-[1.18] md:leading-[1.15]"
          >
            {/* Line 1 */}
            <span className="block">
              Elevate Your <span className="text-gradient-purple">Vision Into Reality.</span>
            </span>
            
            {/* Line 2 */}
            <span className="block mt-1 sm:mt-1.5 md:mt-2">
              Innovate <span className="text-brand-magenta">Beyond Expectations.</span>
            </span>
            
            {/* Line 3 */}
            <span className="block mt-1 sm:mt-1.5 md:mt-2">
              <span className="inline-flex items-center justify-center gap-x-2 sm:gap-x-3 whitespace-nowrap">
                <span>Dominate Your Digital</span>
                <span className="relative inline-flex min-w-[110px] sm:min-w-[160px] md:min-w-[205px] lg:min-w-[235px] xl:min-w-[270px] text-left justify-start">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={headlineWords[wordIndex]}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="text-gradient-silver inline-block"
                    >
                      {headlineWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </span>
          </motion.h1>

          {/* Sub-headline & Description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2 max-w-2xl mx-auto text-center"
          >
            <p className="text-base sm:text-lg md:text-xl font-semibold text-brand-offwhite">
              Technology, creativity and digital marketing built around your business goals.
            </p>
            <p className="text-brand-muted text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-xl mx-auto">
              We build powerful digital experiences, scalable technology solutions and growth-driven marketing strategies that help businesses move forward.
            </p>
          </motion.div>

          {/* Magnetic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5 pt-1 sm:pt-2"
          >
            <MagneticButton strength={0.3}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openEnquiryModal()}
                className="btn-3d-matte-primary px-6 py-3 rounded-xl text-white font-semibold text-xs sm:text-sm tracking-wide flex items-center space-x-2 group outline-none focus:outline-none"
              >
                <span>GET STARTED</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>
            </MagneticButton>

            <MagneticButton strength={0.3}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/portfolio"
                  className="btn-3d-matte-secondary px-5 py-3 rounded-xl text-brand-offwhite hover:text-white font-semibold text-xs sm:text-sm flex items-center space-x-2 outline-none focus:outline-none"
                >
                  <span>VIEW OUR WORK</span>
                </Link>
              </motion.div>
            </MagneticButton>

            <MagneticButton strength={0.3}>
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
            </MagneticButton>
          </motion.div>

          {/* Small trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="pt-1 sm:pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 sm:gap-x-8 text-[11px] sm:text-xs text-brand-muted"
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

