import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const location = useLocation();
  const { openEnquiryModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const activeLink = navLinks.find((l) => isActive(l.path))?.path || '/';
  const currentHighlight = hoveredPath !== null ? hoveredPath : activeLink;

  const whatsappUrl = 'https://wa.me/917400881232?text=' + encodeURIComponent('Hello EverPeak Solutions, I would like to discuss a project with your team.');

  return (
    <motion.header
      animate={{
        paddingTop: isScrolled ? '12px' : '20px',
        paddingBottom: isScrolled ? '12px' : '20px',
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.88)' : 'rgba(0, 0, 0, 0)',
        borderBottomColor: isScrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0)',
        boxShadow: isScrolled ? '0 10px 25px -5px rgba(0, 0, 0, 0.5)' : 'none',
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with initial spring entrance */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              initial={{ scale: 0.8, rotate: -8, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <img
                src="/logo.png"
                alt="EverPeak Solutions"
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation with Shared layoutId Indicator */}
          <nav
            onMouseLeave={() => setHoveredPath(null)}
            className="hidden md:flex items-center space-x-1"
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const isTarget = currentHighlight === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-200 relative px-3.5 py-1.5 rounded-lg outline-none focus:outline-none focus-visible:outline-none ${
                    active || isTarget
                      ? 'text-white'
                      : 'text-brand-muted hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isTarget && (
                    <motion.div
                      layoutId="navIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-white/5 border border-white/10"
                    >
                      <span className="absolute bottom-0 inset-x-2 h-[2px] bg-gradient-everpeak rounded-full shadow-glow-sm" />
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d-matte-secondary inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-brand-offwhite hover:text-white outline-none focus:outline-none"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-brand-magenta" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => openEnquiryModal()}
              className="btn-3d-matte-primary flex items-center space-x-1.5 px-4 py-2 rounded-lg text-white text-xs font-semibold uppercase tracking-wider outline-none focus:outline-none"
            >
              <span>GET STARTED</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => openEnquiryModal()}
              className="btn-3d-matte-primary px-3.5 py-1.5 rounded-lg text-white text-xs font-semibold tracking-wider"
            >
              START
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-3d-matte-secondary p-2 rounded-lg text-brand-offwhite hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden fixed inset-x-0 top-full bg-brand-dark/95 backdrop-blur-xl border-b border-brand-border px-6 py-6 shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-lg font-medium px-3 py-2 rounded-lg transition-colors ${
                      active
                        ? 'text-white bg-brand-purple/15 border-l-2 border-brand-magenta'
                        : 'text-brand-muted hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-brand-border space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openEnquiryModal();
                  }}
                  className="btn-3d-matte-primary w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-white font-semibold text-sm"
                >
                  <span>GET STARTED</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d-matte-whatsapp w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-white font-medium text-sm"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>CHAT ON WHATSAPP</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
