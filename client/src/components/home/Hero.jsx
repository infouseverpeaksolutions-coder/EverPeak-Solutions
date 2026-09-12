import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import MagneticButton from '../common/MagneticButton';

const headlineWords = ['Future.', 'Market.', 'Industry.'];

const Hero = () => {
  const { openEnquiryModal } = useModal();
  const [wordIndex, setWordIndex] = useState(0);
  const canvasRef = useRef(null);

  // Rotating word timer
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % headlineWords.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Initialize 3D TubesCursor background
  useEffect(() => {
    let app = null;
    let isMounted = true;

    const loadTubes = async () => {
      try {
        const module = await import(
          /* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'
        );
        const TubesCursor = module.default;
        if (!isMounted || !canvasRef.current) return;

        app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ['#ff008a', '#8b5cf6', '#3b82f6', '#ffffff'],
            lights: {
              intensity: 50,
              colors: ['#ff008a', '#8b5cf6', '#3b82f6', '#ffffff'],
            },
          },
        });
      } catch (err) {
        console.warn('TubesCursor 3D background failed to initialize:', err);
      }
    };

    loadTubes();

    return () => {
      isMounted = false;
      if (app && typeof app.dispose === 'function') {
        app.dispose();
      }
    };
  }, []);

  const whatsappUrl =
    'https://wa.me/917400881232?text=' +
    encodeURIComponent('Hello EverPeak Solutions, I would like to discuss a project with your team.');

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-14 sm:pt-32 sm:pb-20 overflow-hidden bg-brand-black">
      {/* 3D TubesCursor Canvas */}
      <canvas
        ref={canvasRef}
        id="tubes-canvas"
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
      {/* Ambient Gradient Glow Orbs (Framer Motion scale / opacity loop, 9-11s) */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[120px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
        className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-brand-magenta/15 rounded-full blur-[130px] pointer-events-none -z-10"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto flex flex-col justify-center items-center">
        <div className="max-w-5xl mx-auto text-center space-y-6">

          {/* Three-line Serif Headline (Playfair Display) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-[28px] min-[380px]:text-[32px] sm:text-5xl md:text-6xl lg:text-[64px] font-normal font-heading text-white tracking-tight leading-[1.15]"
          >
            {/* Line 1 */}
            <span className="block">
              Elevate Your <span className="text-gradient-purple">Vision Into Reality.</span>
            </span>

            {/* Line 2 */}
            <span className="block mt-1 sm:mt-2">
              Innovate <span className="text-brand-magenta">Beyond Expectations.</span>
            </span>

            {/* Line 3 */}
            <span className="block mt-1 sm:mt-2">
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

          {/* Sub-headline & Description in Inter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2 max-w-2xl mx-auto text-center"
          >
            <p className="text-base sm:text-lg md:text-xl font-normal text-brand-offwhite">
              Technology, creativity and digital marketing built around your business goals.
            </p>
            <p className="text-brand-muted text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-xl mx-auto">
              We build powerful digital experiences, scalable technology solutions and growth-driven marketing strategies that help businesses move forward.
            </p>
          </motion.div>

          {/* Three CTAs: Primary gradient pill + 2 glass-panel secondary pills */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3"
          >
            <MagneticButton strength={0.3}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openEnquiryModal()}
                className="btn-3d-matte-primary px-7 py-3.5 rounded-full text-white font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center space-x-2 group outline-none focus:outline-none"
              >
                <span>Start for free</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>
            </MagneticButton>

            <MagneticButton strength={0.3}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/portfolio"
                  className="glass-panel hover:border-white/20 px-6 py-3.5 rounded-full text-brand-offwhite hover:text-white font-medium text-xs sm:text-sm flex items-center space-x-2 outline-none transition-colors"
                >
                  <span>View our work</span>
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
                className="glass-panel hover:border-white/20 px-6 py-3.5 rounded-full text-brand-offwhite hover:text-white text-xs sm:text-sm font-medium flex items-center space-x-2 group outline-none transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-brand-magenta group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp</span>
              </motion.a>
            </MagneticButton>
          </motion.div>

          {/* Signature Editorial Rule-Line Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="pt-4 max-w-xl mx-auto"
          >
            <div className="rule-line" />
          </motion.div>

          {/* Trust badges rendered in .small-caps with CheckCircle2 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-2 flex flex-wrap items-center justify-center gap-y-2.5 gap-x-6 sm:gap-x-10"
          >
            <span className="flex items-center space-x-2 text-brand-muted hover:text-white transition-colors">
              <CheckCircle2 className="w-4 h-4 text-brand-purple" />
              <span className="small-caps">Custom Architecture</span>
            </span>
            <span className="flex items-center space-x-2 text-brand-muted hover:text-white transition-colors">
              <CheckCircle2 className="w-4 h-4 text-brand-violet" />
              <span className="small-caps">ROI & Performance</span>
            </span>
            <span className="flex items-center space-x-2 text-brand-muted hover:text-white transition-colors">
              <CheckCircle2 className="w-4 h-4 text-brand-magenta" />
              <span className="small-caps">End-to-End Delivery</span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
