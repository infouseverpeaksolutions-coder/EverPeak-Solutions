import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const location = useLocation();
  const { openEnquiryModal } = useModal();

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

  const whatsappUrl =
    'https://wa.me/917400881232?text=' +
    encodeURIComponent('Hello EverPeak Solutions, I would like to discuss a project with your team.');

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-4 px-4 sm:px-6 pointer-events-none">
      {/* Sticky Liquid-Glass Pill */}
      <div className="pointer-events-auto max-w-6xl mx-auto h-20 rounded-[100px] glass-panel px-6 sm:px-8 flex items-center justify-between shadow-2xl transition-all duration-300">
        {/* Logo left */}
        <Link to="/" className="flex items-center space-x-3 group outline-none">
          <motion.div
            initial={{ scale: 0.8, rotate: -6, opacity: 0 }}
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

        {/* Links centered */}
        <nav
          onMouseLeave={() => setHoveredPath(null)}
          className="hidden md:flex items-center space-x-1 lg:space-x-2"
        >
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const isTarget = currentHighlight === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onMouseEnter={() => setHoveredPath(link.path)}
                className={`small-caps transition-colors duration-200 relative px-3.5 py-2 rounded-full outline-none focus:outline-none ${
                  active || isTarget ? 'text-white' : 'text-brand-muted hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isTarget && (
                  <motion.div
                    layoutId="navIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white/5 border border-white/10"
                  >
                    <span className="absolute bottom-1 inset-x-3 h-[2px] bg-gradient-everpeak rounded-full shadow-glow-sm" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions right */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="small-caps text-brand-muted hover:text-white transition-colors flex items-center space-x-1.5 py-1 px-2"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 text-brand-magenta" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => openEnquiryModal()}
            className="btn-3d-matte-primary rounded-full px-5 py-2.5 text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 outline-none group"
          >
            <span>Start for free</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => openEnquiryModal()}
            className="btn-3d-matte-primary px-3.5 py-1.5 rounded-full text-white text-[11px] font-semibold tracking-wider"
          >
            START
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-brand-offwhite hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Liquid-Glass Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="pointer-events-auto md:hidden mt-2 max-w-6xl mx-auto rounded-3xl glass-panel p-6 shadow-2xl overflow-hidden border border-brand-border"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`small-caps text-sm px-4 py-2.5 rounded-xl transition-colors ${
                      active
                        ? 'text-white bg-white/10 border-l-2 border-brand-magenta font-semibold'
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
                  className="btn-3d-matte-primary w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-full text-white font-semibold text-xs uppercase tracking-wider"
                >
                  <span>Start for free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d-matte-whatsapp w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-full text-white font-medium text-xs uppercase tracking-wider"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
