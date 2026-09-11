import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Send, MessageSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import api from '../../services/api';

const servicesList = [
  'Web Development',
  'Mobile App Development',
  'Custom Software',
  'E-Commerce Development',
  'UI/UX Design',
  'SEO & Performance Marketing',
  'Social Media Marketing',
  'Google Ads',
  'Meta Ads',
  'Digital Marketing',
  'Branding & Identity',
  'API & Cloud Solutions',
  'Other',
];

const budgetOptions = [
  'Under ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹2,00,000',
  '₹2,00,000+',
  'Not Sure',
];

const EnquiryModal = () => {
  const { isOpen, initialService, closeEnquiryModal } = useModal();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    city: '',
    company_name: '',
    service: '',
    budget: '',
    project_details: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    if (initialService) {
      // Find matching service
      const matched = servicesList.find(
        (s) => s.toLowerCase() === initialService.toLowerCase() || initialService.toLowerCase().includes(s.toLowerCase())
      );
      setFormData((prev) => ({
        ...prev,
        service: matched || initialService || 'Web Development',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        service: prev.service || 'Web Development',
      }));
    }
  }, [initialService, isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeEnquiryModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeEnquiryModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.error) setStatus((prev) => ({ ...prev, error: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.full_name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.project_details.trim()) {
      setStatus({ submitting: false, success: false, error: 'Please fill out all required fields.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    try {
      const res = await api.post('/enquiries', formData);
      if (res.data.success) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          city: '',
          company_name: '',
          service: 'Web Development',
          budget: '',
          project_details: '',
        });
      }
    } catch (err) {
      console.error('Enquiry submission error:', err);
      setStatus({
        submitting: false,
        success: false,
        error:
          err.response?.data?.message ||
          'Something went wrong. Please try again or contact us directly on WhatsApp.',
      });
    }
  };

  const whatsappUrl =
    'https://wa.me/917400881232?text=' +
    encodeURIComponent('Hello EverPeak Solutions, I would like to discuss a project with your team.');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeEnquiryModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
        >
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-brand-dark-gray border border-brand-border rounded-2xl shadow-2xl shadow-purple-950/30 overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accent Gradient Bar */}
            <div className="h-1.5 w-full bg-gradient-everpeak" />

            {/* Close Button */}
            <button
              onClick={closeEnquiryModal}
              className="absolute top-5 right-5 p-2 rounded-full text-brand-muted hover:text-white bg-white/5 hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {status.success ? (
            <div className="py-12 px-4 text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-full bg-brand-purple/20 border border-brand-magenta/40 flex items-center justify-center text-brand-magenta">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">
                Thank You!
              </h3>
              <p className="text-brand-muted text-sm max-w-md mx-auto leading-relaxed">
                Your enquiry has been submitted successfully. Our team will review your project requirements and get back to you shortly.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setStatus({ submitting: false, success: false, error: null });
                    closeEnquiryModal();
                  }}
                  className="btn-3d-matte-secondary w-full sm:w-auto px-6 py-2.5 rounded-xl text-white text-sm font-medium"
                >
                  Close Window
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d-matte-whatsapp w-full sm:w-auto px-6 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6 space-y-1">
                <div className="flex items-center space-x-2 text-xs font-semibold text-brand-magenta tracking-wider uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>Start Your Project</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
                  Let's Build Something Great
                </h2>
                <p className="text-brand-muted text-sm">
                  Tell us about your project and our technology & growth team will get back to you.
                </p>
              </div>

              {/* Error Banner */}
              {status.error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-sm flex items-start space-x-3">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{status.error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-offwhite uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-brand-magenta">*</span>
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white placeholder-brand-muted/60 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-offwhite uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-brand-magenta">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@company.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white placeholder-brand-muted/60 text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-offwhite uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp Number <span className="text-brand-magenta">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white placeholder-brand-muted/60 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-offwhite uppercase tracking-wider mb-1.5">
                      City / Location
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Indore, Mumbai, Bangalore"
                      className="w-full px-4 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white placeholder-brand-muted/60 text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-offwhite uppercase tracking-wider mb-1.5">
                      Service Required <span className="text-brand-magenta">*</span>
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white text-sm transition-all"
                    >
                      {servicesList.map((svc) => (
                        <option key={svc} value={svc} className="bg-brand-dark-gray text-white">
                          {svc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-offwhite uppercase tracking-wider mb-1.5">
                      Estimated Budget <span className="text-brand-magenta">*</span>
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white text-sm transition-all"
                    >
                      <option value="" className="bg-brand-dark-gray text-brand-muted">
                        Select budget range
                      </option>
                      {budgetOptions.map((b) => (
                        <option key={b} value={b} className="bg-brand-dark-gray text-white">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-offwhite uppercase tracking-wider mb-1.5">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-4 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white placeholder-brand-muted/60 text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-offwhite uppercase tracking-wider mb-1.5">
                    Project Details <span className="text-brand-magenta">*</span>
                  </label>
                  <textarea
                    name="project_details"
                    rows="4"
                    required
                    value={formData.project_details}
                    onChange={handleChange}
                    placeholder="Tell us what you're looking to build, your key features, timeline, or current challenges..."
                    className="w-full px-4 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple focus:ring-1 focus:ring-brand-purple text-white placeholder-brand-muted/60 text-sm transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit & WhatsApp Alternative */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="btn-3d-matte-primary w-full sm:flex-1 py-3 px-6 rounded-xl text-white font-semibold text-sm flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {status.submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND ENQUIRY</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-3d-matte-secondary w-full sm:w-auto py-3 px-5 rounded-xl text-brand-offwhite text-xs font-medium flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4 text-brand-magenta" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                <p className="text-[11px] text-brand-muted text-center pt-2">
                  🔒 Your information is private & secure. We respond within 24 hours.
                </p>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
  );
};

export default EnquiryModal;
