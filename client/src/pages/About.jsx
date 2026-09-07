import React, { useEffect } from 'react';
import { Target, Compass, Eye, Shield, Users, Award, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import CTASection from '../components/home/CTASection';

const values = [
  {
    title: 'Innovation First',
    description:
      'We constantly evaluate cutting-edge technologies and performance marketing methodologies to give our clients an unfair competitive advantage.',
    icon: Sparkles,
  },
  {
    title: 'Results Driven',
    description:
      'Every project milestone and marketing rupee spent is measured against real commercial impact: conversion, revenue, and customer retention.',
    icon: Target,
  },
  {
    title: 'Client-Centric Collaboration',
    description:
      'We operate as an agile extension of your internal team with transparent timelines, direct technical communication, and zero bureaucratic delays.',
    icon: Users,
  },
  {
    title: 'Long-Term Partnership',
    description:
      'We build architectures and growth funnels that last, standing by our clients long after launch with proactive maintenance and iterative scaling.',
    icon: Shield,
  },
];

const teamRoles = [
  {
    role: 'Full-Stack Web & Software Engineers',
    desc: 'Expert technologists delivering robust React, Node.js, and MySQL applications.',
  },
  {
    role: 'Performance Marketing Specialists',
    desc: 'Analytical media buyers skilled in executing high-ROAS Meta & Google ad campaigns.',
  },
  {
    role: 'UI/UX & Product Designers',
    desc: 'Creative minds crafting intuitive Figma design systems and frictionless flows.',
  },
  {
    role: 'Social Media & Brand Strategists',
    desc: 'Viral storytelling experts building engaged online communities and authority.',
  },
  {
    role: 'SEO & Content Strategists',
    desc: 'Search specialists ensuring organic dominance and continuous rank gains.',
  },
  {
    role: 'Technical Project Managers',
    desc: 'Dedicated delivery leaders ensuring on-time launch and rigorous quality assurance.',
  },
];

const industries = [
  'E-Commerce & Retail',
  'Real Estate & Infrastructure',
  'Fintech & Financial Services',
  'Education & EdTech',
  'Health & Fitness',
  'Logistics & Supply Chain',
  'Tour & Travel',
  'Food & Delivery',
  'Manufacturing & Industrial',
  'Beauty & Lifestyle',
];

const About = () => {
  const { openEnquiryModal } = useModal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Us | EverPeak Solutions';
  }, []);

  return (
    <div className="bg-brand-black min-h-screen">
      {/* 1. Page Hero Section */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-24 bg-brand-black overflow-hidden">
        <div className="absolute top-24 right-1/4 w-[600px] h-[350px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-brand-border text-[11px] font-semibold text-brand-magenta uppercase tracking-widest mx-auto">
              <Compass className="w-3.5 h-3.5" />
              <span>About EverPeak Solutions</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold font-heading text-white tracking-tight leading-[1.18] max-w-4xl mx-auto">
              Where Technology Meets{' '}
              <span className="text-gradient-purple">Creativity,</span>{' '}
              <span className="text-brand-magenta">Strategy,</span> and Ambition to{' '}
              <span className="text-gradient-silver">Build What’s Next.</span>
            </h1>

            <p className="text-base sm:text-lg text-brand-offwhite leading-relaxed max-w-2xl mx-auto font-medium">
              EverPeak Solutions combines technology, design and digital marketing to help businesses build stronger digital experiences, reach the right audiences and achieve sustainable growth.
            </p>

            <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Based in Indore, MP, with pan-India reach, we empower ambitious brands with full-stack engineering, custom software systems, and data-driven marketing campaigns.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Big Numbers Strip */}
      <section className="py-16 bg-brand-near-black border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-2xl bg-brand-dark-gray/50 border border-brand-border text-center">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-gradient-purple">
                6+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-1.5">Years Experience</div>
              <p className="text-[11px] text-brand-muted mt-0.5">Delivering verified digital solutions</p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-dark-gray/50 border border-brand-border text-center">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                600+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-1.5">Projects Delivered</div>
              <p className="text-[11px] text-brand-muted mt-0.5">Across 12+ diverse industries</p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-dark-gray/50 border border-brand-border text-center">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-gradient-purple">
                350+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-1.5">Happy Clients</div>
              <p className="text-[11px] text-brand-muted mt-0.5">Startups to established enterprises</p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-dark-gray/50 border border-brand-border text-center">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                98%
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white mt-1.5">Satisfaction Rate</div>
              <p className="text-[11px] text-brand-muted mt-0.5">Long-term ongoing client retainers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-20 bg-brand-black border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="p-8 sm:p-10 rounded-2xl bg-brand-dark-gray/60 border border-brand-border space-y-4 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-magenta">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">Our Mission</h3>
              <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-md">
                Deliver innovative IT & marketing solutions, empower businesses to scale online efficiently, and build long-term, transparent partnerships founded on measurable commercial results.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-2xl bg-brand-dark-gray/60 border border-brand-border space-y-4 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-brand-magenta/20 border border-brand-magenta/40 flex items-center justify-center text-brand-magenta">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">Our Vision</h3>
              <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-md">
                Become India's most trusted digital growth partner by continuously fusing high-performance software engineering, cutting-edge creative design, and data-driven marketing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. One Partner Ecosystem Banner */}
      <section className="py-20 bg-brand-near-black border-b border-brand-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-card border border-brand-border space-y-5">
            <span className="text-[11px] font-mono font-bold text-brand-magenta uppercase tracking-wider inline-block">
              Integrated Digital Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
              One Partner. Multiple Digital Solutions.
            </h2>
            <p className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Why manage separate development agencies, freelance designers, and ad consultants? EverPeak Solutions gives you a unified multidisciplinary team under one roof — ensuring brand consistency, rapid execution, and seamless communication.
            </p>
            <div className="pt-3 flex justify-center">
              <button
                onClick={() => openEnquiryModal()}
                className="btn-3d-matte-primary px-6 py-3 rounded-xl text-white font-semibold text-xs sm:text-sm tracking-wide flex items-center space-x-2 outline-none focus:outline-none"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="py-20 bg-brand-black border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-[11px] font-semibold text-brand-purple uppercase tracking-widest">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-brand-dark-gray/50 border border-brand-border space-y-3 hover:border-brand-purple/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-brand-border flex items-center justify-center text-brand-violet">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold font-heading text-white">{val.title}</h4>
                  <p className="text-xs text-brand-muted leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Specialist Teams */}
      <section className="py-20 bg-brand-near-black border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-[11px] font-semibold text-brand-magenta uppercase tracking-widest">
              Multidisciplinary Talent
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white">
              Meet Our Specialist Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {teamRoles.map((role, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-brand-dark-gray/60 border border-brand-border space-y-2 hover:border-white/20 transition-colors"
              >
                <h4 className="text-base font-bold text-white font-heading">{role.role}</h4>
                <p className="text-xs text-brand-muted leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Industries Served */}
      <section className="py-20 bg-brand-black border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-brand-dark-gray/40 border border-brand-border text-center space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Industries We Empower Pan-India
            </h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto">
              {industries.map((ind, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-brand-border text-xs font-medium text-brand-offwhite"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Call To Action */}
      <CTASection />
    </div>
  );
};

export default About;
