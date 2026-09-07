import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, ArrowRight } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const whatsappUrl = 'https://wa.me/917400881232?text=' + encodeURIComponent('Hello EverPeak Solutions, I would like to discuss a project with your team.');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-black/90 backdrop-blur-md border-b border-brand-border py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/logo.png"
              alt="EverPeak Solutions"
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-200 relative py-1.5 outline-none focus:outline-none focus-visible:outline-none ${
                    active
                      ? 'text-white'
                      : 'text-brand-muted hover:text-white'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-everpeak rounded-full shadow-glow-sm" />
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
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-brand-dark/95 backdrop-blur-xl border-b border-brand-border px-6 py-6 shadow-2xl animate-fade-in">
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
        </div>
      )}
    </header>
  );
};

export default Navbar;
