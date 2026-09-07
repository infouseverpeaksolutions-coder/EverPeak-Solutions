import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import api from '../services/api';

const services = [
  'Web Development',
  'Mobile App Development',
  'Custom Software',
  'E-Commerce Development',
  'UI/UX Design',
  'Digital Marketing',
  'SEO & Performance Marketing',
  'Social Media Marketing',
  'Google Ads & Meta Ads',
  'Brand Identity',
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

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    city: '',
    company_name: '',
    service: 'Web Development',
    budget: '',
    project_details: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact Us | EverPeak Solutions';
  }, []);

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
      console.error('Contact form submission error:', err);
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
    <div className="bg-brand-black min-h-screen">
      {/* 1. Page Hero Section */}
      <section className="relative pt-36 sm:pt-44 pb-14 bg-brand-black overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-brand-border text-[11px] font-semibold text-brand-magenta uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Collaboration</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold font-heading text-white tracking-tight">
              Let's Build <span className="text-gradient-purple">What's Next.</span>
            </h1>

            <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Have a project in mind? Tell us what you're looking to build, improve or grow. We respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Contact Cards & Form Section */}
      <section className="py-20 bg-brand-near-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Direct Contact Info (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-6 sm:p-7 rounded-2xl bg-brand-dark-gray/80 border border-brand-border space-y-5 shadow-xl">
                <h3 className="text-lg font-bold font-heading text-white pb-3 border-b border-white/5">
                  Contact Details
                </h3>

                {/* Email Card */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center text-brand-magenta shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted">
                      Email Inquiries
                    </span>
                    <a
                      href="mailto:career.everpeaksolutions@gmail.com"
                      className="text-xs sm:text-sm font-semibold text-white hover:text-brand-magenta transition-colors block mt-0.5 break-all"
                    >
                      career.everpeaksolutions@gmail.com
                    </a>
                    <p className="text-[10px] text-brand-muted mt-0.5">Official Agency Mailbox</p>
                  </div>
                </div>

                {/* Phone / WhatsApp Card */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted">
                      Direct Phone / WhatsApp
                    </span>
                    <a
                      href="tel:+917400881232"
                      className="text-xs sm:text-sm font-semibold text-white hover:text-[#25D366] transition-colors block mt-0.5"
                    >
                      +91 74008 81232
                    </a>
                    <p className="text-[10px] text-brand-muted mt-0.5">Mon - Sat: 10:00 AM - 8:00 PM IST</p>
                  </div>
                </div>

                {/* Address Card */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-magenta/20 border border-brand-magenta/30 flex items-center justify-center text-brand-magenta shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted">
                      Corporate Office
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-white mt-0.5 leading-snug">
                      Gravity Mall 5th floor Vijay Nagar, Mechinic Nagar Indore 452011
                    </p>
                    <p className="text-[10px] text-brand-muted mt-0.5">India Operations Center</p>
                  </div>
                </div>

                {/* WhatsApp Quick Action Button */}
                <div className="pt-3 border-t border-white/5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-3d-matte-whatsapp w-full py-3 px-4 rounded-xl text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg outline-none focus:outline-none"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>CHAT DIRECTLY ON WHATSAPP</span>
                  </a>
                </div>
              </div>

              {/* Response Guarantee Badge */}
              <div className="p-5 rounded-xl bg-brand-dark-gray/40 border border-brand-border space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-brand-offwhite">
                  <Clock className="w-4 h-4 text-brand-purple" />
                  <span>24-Hour Fast Response Guarantee</span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">
                  All submitted enquiries are directly assigned to our principal solutions architect and digital growth leads.
                </p>
              </div>
            </div>

            {/* Right Column: Contact & Enquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-brand-dark-gray/80 border border-brand-border shadow-2xl backdrop-blur-xl">
                {status.success ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-brand-purple/20 border border-brand-magenta/40 flex items-center justify-center text-brand-magenta">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">Thank You!</h3>
                    <p className="text-brand-muted text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                      Your message has been submitted successfully. Our team will review your project requirements and get back to you within 24 hours.
                    </p>
                    <div className="pt-3">
                      <button
                        onClick={() => setStatus({ submitting: false, success: false, error: null })}
                        className="btn-3d-matte-secondary px-5 py-2.5 rounded-xl text-white text-xs font-semibold uppercase tracking-wider outline-none focus:outline-none"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold font-heading text-white">
                        Send Us A Message
                      </h3>
                      <p className="text-xs text-brand-muted mt-1">
                        Fill out the form below and we will prepare a customized proposal for your business.
                      </p>
                    </div>

                    {status.error && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{status.error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-offwhite mb-1">
                          Your Name <span className="text-brand-magenta">*</span>
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          required
                          value={formData.full_name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white placeholder-brand-muted/60 text-xs transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-offwhite mb-1">
                          Email Address <span className="text-brand-magenta">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white placeholder-brand-muted/60 text-xs transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-offwhite mb-1">
                          Phone / WhatsApp <span className="text-brand-magenta">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white placeholder-brand-muted/60 text-xs transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-offwhite mb-1">
                          City / Location
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="e.g. Indore, Mumbai, Delhi"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white placeholder-brand-muted/60 text-xs transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-offwhite mb-1">
                          Service Required <span className="text-brand-magenta">*</span>
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white text-xs transition-all outline-none"
                        >
                          {services.map((svc) => (
                            <option key={svc} value={svc} className="bg-brand-dark-gray text-white">
                              {svc}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-offwhite mb-1">
                          Estimated Budget
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white text-xs transition-all outline-none"
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
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-offwhite mb-1">
                        Company Name (Optional)
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        placeholder="e.g. Acme Enterprises"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white placeholder-brand-muted/60 text-xs transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-offwhite mb-1">
                        Message & Requirements <span className="text-brand-magenta">*</span>
                      </label>
                      <textarea
                        name="project_details"
                        rows="3"
                        required
                        value={formData.project_details}
                        onChange={handleChange}
                        placeholder="Tell us about your project goals, scope, and target launch timeline..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white placeholder-brand-muted/60 text-xs transition-all resize-none outline-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={status.submitting}
                      className="btn-3d-matte-primary w-full py-3 px-6 rounded-xl text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 disabled:opacity-50 outline-none focus:outline-none"
                    >
                      {status.submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>SENDING ENQUIRY...</span>
                        </>
                      ) : (
                        <>
                          <span>SEND ENQUIRY</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
