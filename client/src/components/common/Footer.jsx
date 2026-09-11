import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

const Footer = () => {
  const { openEnquiryModal } = useModal();
  const whatsappUrl = 'https://wa.me/917400881232?text=' + encodeURIComponent('Hello EverPeak Solutions, I would like to discuss a project with your team.');

  const services = [
    'Web Development',
    'Mobile App Development',
    'Custom Software',
    'E-Commerce Development',
    'UI/UX Design',
    'Digital Marketing',
    'SEO & Performance Marketing',
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Selected Work', path: '/portfolio' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Admin Portal', path: '/admin/login' },
  ];

  return (
    <footer className="bg-brand-near-black relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-brand-magenta/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Col 1: Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="EverPeak Solutions"
                className="h-10 w-auto object-contain"
                loading="lazy"
              />
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed max-w-sm">
              Technology solutions and digital growth strategies built for ambitious businesses. We engineer scalable platforms and high-converting marketing systems.
            </p>
            <div className="text-xs font-semibold tracking-wider text-brand-magenta uppercase flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Elevate. Innovate. Dominate.</span>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => openEnquiryModal()}
                className="btn-3d-matte-primary px-4 py-2.5 rounded-xl text-white text-xs font-semibold tracking-wide flex items-center space-x-1.5"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d-matte-secondary px-4 py-2.5 rounded-xl text-brand-offwhite text-xs font-medium flex items-center space-x-1.5"
              >
                <MessageSquare className="w-4 h-4 text-brand-magenta" />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold font-heading text-white tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-brand-muted hover:text-white transition-colors duration-200 flex items-center space-x-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold font-heading text-white tracking-wider uppercase">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => openEnquiryModal(service)}
                    className="text-brand-muted hover:text-white transition-colors duration-200 text-left flex items-center space-x-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {service}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold font-heading text-white tracking-wider uppercase">Contact</h4>
            <ul className="space-y-3.5 text-sm text-brand-muted">
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                <a
                  href="mailto:career.everpeaksolutions@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  career.everpeaksolutions@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                <a href="tel:+917400881232" className="hover:text-white transition-colors">
                  +91 74008 81232
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                <span>Gravity Mall 5th floor Vijay Nagar, Mechinic Nagar Indore 452011</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider and Copyright */}
        <div className="pt-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>© 2026 EverPeak Solutions. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1 text-brand-offwhite">
              <ShieldCheck className="w-4 h-4 text-brand-purple" />
              <span>Enterprise Grade Quality</span>
            </span>
            <span>•</span>
            <span>Built for Modern Business</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
