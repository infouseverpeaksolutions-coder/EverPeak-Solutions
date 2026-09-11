import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, CheckCircle2, Code2, TrendingUp, Smartphone, Search } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import MagneticButton from '../common/MagneticButton';

const headlineWords = ['Future.', 'Market.', 'Industry.'];

const Hero = () => {
  const { openEnquiryModal } = useModal();
  const [wordIndex, setWordIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Rotating word timer
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % headlineWords.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Mouse parallax motion values for ambient mesh gradient interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const parallaxY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.04;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.04;
    mouseX.set(x);
    mouseY.set(y);
  };

  const whatsappUrl =
    'https://wa.me/917400881232?text=' +
    encodeURIComponent('Hello EverPeak Solutions, I would like to discuss a project with your team.');

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-10 sm:pt-28 sm:pb-14 overflow-hidden bg-brand-black"
    >
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Stripe-style continuously animated mesh gradient background */}
      <motion.div
        style={prefersReducedMotion ? undefined : { x: parallaxX, y: parallaxY }}
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      >
        {/* Blob 1: Brand Purple */}
        <motion.div
          animate={
            prefersReducedMotion
              ? { opacity: 0.14 }
              : {
                  x: [0, 50, -40, 20, 0],
                  y: [0, -40, 30, -20, 0],
                  scale: [1, 1.15, 0.95, 1.08, 1],
                  opacity: [0.12, 0.18, 0.14, 0.20, 0.12],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[420px] bg-brand-purple rounded-full blur-[140px]"
        />

        {/* Blob 2: Brand Magenta */}
        <motion.div
          animate={
            prefersReducedMotion
              ? { opacity: 0.12 }
              : {
                  x: [0, -60, 30, -40, 0],
                  y: [0, 45, -30, 25, 0],
                  scale: [1, 0.92, 1.18, 0.96, 1],
                  opacity: [0.10, 0.16, 0.12, 0.18, 0.10],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute top-1/3 right-10 w-[550px] h-[380px] bg-brand-magenta rounded-full blur-[130px]"
        />

        {/* Blob 3: Brand Violet */}
        <motion.div
          animate={
            prefersReducedMotion
              ? { opacity: 0.14 }
              : {
                  x: [0, 45, -55, 30, 0],
                  y: [0, -35, 40, -15, 0],
                  scale: [0.95, 1.12, 0.9, 1.15, 0.95],
                  opacity: [0.12, 0.19, 0.10, 0.17, 0.12],
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-10 left-1/3 -translate-x-1/2 w-[600px] h-[400px] bg-brand-violet rounded-full blur-[140px]"
        />

        {/* Blob 4: Brand Pink */}
        <motion.div
          animate={
            prefersReducedMotion
              ? { opacity: 0.10 }
              : {
                  x: [0, -35, 50, -25, 0],
                  y: [0, 35, -45, 20, 0],
                  scale: [1, 1.16, 0.94, 1.1, 1],
                  opacity: [0.08, 0.15, 0.11, 0.16, 0.08],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
          className="absolute bottom-20 right-1/4 w-[500px] h-[350px] bg-brand-pink rounded-full blur-[120px]"
        />
      </motion.div>

      {/* Floating Tech & Marketing Chips */}
      {/* Chip 1: Top Left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.3 },
          scale: { duration: 0.8, delay: 0.3 },
          y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute top-[20%] left-4 xl:left-12 hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-brand-dark-gray/80 border border-brand-border/80 shadow-xl backdrop-blur-md text-xs font-semibold text-brand-offwhite pointer-events-none z-10"
      >
        <div className="w-6 h-6 rounded-lg bg-brand-purple/20 flex items-center justify-center text-brand-magenta">
          <Code2 className="w-3.5 h-3.5" />
        </div>
        <span>Full-Stack Web</span>
      </motion.div>

      {/* Chip 2: Top Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.45 },
          scale: { duration: 0.8, delay: 0.45 },
          y: { duration: 5.1, repeat: Infinity, ease: 'easeInOut', delay: 1 },
        }}
        className="absolute top-[18%] right-4 xl:right-12 hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-brand-dark-gray/80 border border-brand-border/80 shadow-xl backdrop-blur-md text-xs font-semibold text-brand-offwhite pointer-events-none z-10"
      >
        <div className="w-6 h-6 rounded-lg bg-brand-magenta/20 flex items-center justify-center text-brand-magenta">
          <TrendingUp className="w-3.5 h-3.5" />
        </div>
        <span>High-ROI Ads</span>
      </motion.div>

      {/* Chip 3: Bottom Left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.6 },
          scale: { duration: 0.8, delay: 0.6 },
          y: { duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
        }}
        className="absolute bottom-[20%] left-6 xl:left-14 hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-brand-dark-gray/80 border border-brand-border/80 shadow-xl backdrop-blur-md text-xs font-semibold text-brand-offwhite pointer-events-none z-10"
      >
        <div className="w-6 h-6 rounded-lg bg-brand-violet/20 flex items-center justify-center text-brand-violet">
          <Smartphone className="w-3.5 h-3.5" />
        </div>
        <span>Mobile Apps</span>
      </motion.div>

      {/* Chip 4: Bottom Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -9, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.75 },
          scale: { duration: 0.8, delay: 0.75 },
          y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 },
        }}
        className="absolute bottom-[20%] right-6 xl:right-14 hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-brand-dark-gray/80 border border-brand-border/80 shadow-xl backdrop-blur-md text-xs font-semibold text-brand-offwhite pointer-events-none z-10"
      >
        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
          <Search className="w-3.5 h-3.5" />
        </div>
        <span>SEO & Growth</span>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto flex flex-col justify-center items-center">
        {/* Centered Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-5 md:space-y-6">
          {/* Main Headline with Rotating Word Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-extrabold font-heading text-white tracking-tight leading-[1.15]"
          >
            Elevate Your <span className="text-gradient-purple">Vision Into Reality.</span>
            <br />
            Innovate <span className="text-brand-magenta">Beyond Expectations.</span>
            <br />
            <span className="inline-flex flex-wrap items-center justify-center gap-x-2">
              <span>Dominate Your Digital</span>
              <span className="relative inline-flex min-w-[120px] sm:min-w-[160px] md:min-w-[190px] text-left justify-start">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={headlineWords[wordIndex]}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="text-gradient-silver inline-block"
                  >
                    {headlineWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
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
            <p className="text-sm sm:text-base md:text-lg font-semibold text-brand-offwhite">
              Technology, creativity and digital marketing built around your business goals.
            </p>
            <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
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

