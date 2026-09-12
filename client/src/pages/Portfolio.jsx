import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Search, Loader2, ExternalLink, ArrowRight, FolderKanban, Sparkles } from 'lucide-react';
import api from '../services/api';
import CTASection from '../components/home/CTASection';
import SectionLabel from '../components/common/SectionLabel';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const categories = [
  'ALL',
  'IT & DEVELOPMENT',
  'DIGITAL MARKETING',
  'UI/UX DESIGN',
  'E-COMMERCE',
  'BRANDING',
];

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory !== 'ALL') {
          params.category = selectedCategory;
        }
        if (searchQuery.trim()) {
          params.search = searchQuery.trim();
        }
        const res = await api.get('/portfolio', { params });
        if (res.data.success) {
          setProjects(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load portfolio projects:', err);
        setError('Failed to load portfolio projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchProjects();
    }, 250);

    return () => clearTimeout(debounceTimer);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-brand-black min-h-screen">
      <Helmet>
        <title>Portfolio & Case Studies | EverPeak Solutions</title>
        <meta
          name="description"
          content="Explore our portfolio of web applications, mobile apps, e-commerce stores, and digital marketing campaigns built for modern brands."
        />
        <link rel="canonical" href="https://everpeaksolutions.com/portfolio" />
        <meta property="og:title" content="Portfolio & Case Studies | EverPeak Solutions" />
        <meta
          property="og:description"
          content="Explore our portfolio of web applications, mobile apps, e-commerce stores, and digital marketing campaigns built for modern brands."
        />
        <meta property="og:url" content="https://everpeaksolutions.com/portfolio" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* 1. Page Hero & Controls Section */}
      <section className="relative min-h-[calc(100vh-72px)] flex flex-col justify-center items-center pt-28 pb-16 bg-brand-black overflow-hidden">
        <div className="absolute top-20 right-1/3 w-[700px] h-[350px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto"
        >
          <div className="text-center max-w-5xl mx-auto mb-10 sm:mb-12 space-y-4">
            <motion.div variants={itemVariants} className="flex justify-center">
              <SectionLabel label="Selected Work · Digital Experiences" />
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-semibold font-heading text-white tracking-tight leading-[1.18]">
              Explore the Work We’ve Built to{' '}
              <span className="text-gradient-purple">Elevate Brands,</span>{' '}
              <span className="text-brand-magenta">Empower Businesses,</span> and{' '}
              <span className="text-gradient-silver">Drive Digital Growth.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-brand-muted text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Explore our proven track record across custom full-stack web platforms, mobile apps, e-commerce storefronts, and high-ROI performance marketing campaigns.
            </motion.p>
          </div>

          {/* Centered Controls Container */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto space-y-4 pt-1">
            {/* Centered Category Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap outline-none focus:outline-none ${
                    selectedCategory === cat
                      ? 'btn-3d-matte-primary text-white'
                      : 'btn-3d-matte-secondary text-brand-muted hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Long Centered 3D Matte Search Bar */}
            <div className="w-full max-w-2xl mx-auto pt-2">
              <div className="relative rounded-2xl bg-brand-dark-gray/90 border border-brand-border/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.4)] focus-within:border-brand-purple/60 focus-within:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_0_18px_rgba(168,85,247,0.25)] transition-all duration-300">
                <Search className="w-4 h-4 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by project name, industry, or tech stack (e.g. React, E-Commerce, Meta Ads)..."
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-transparent text-white placeholder-brand-muted text-xs sm:text-sm transition-all outline-none"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Projects Grid Section */}
      <section className="py-20 bg-brand-near-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-4 text-brand-muted">
              <Loader2 className="w-7 h-7 text-brand-magenta animate-spin" />
              <p className="text-xs font-medium">Fetching portfolio from MySQL...</p>
            </div>
          ) : error ? (
            <div className="py-16 text-center text-red-400 text-xs">
              <p>{error}</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="py-20 text-center space-y-3 bg-brand-dark-gray/40 rounded-2xl border border-brand-border p-8 max-w-md mx-auto">
              <FolderKanban className="w-10 h-10 mx-auto text-brand-muted" />
              <h4 className="text-base font-semibold text-white">No projects found</h4>
              <p className="text-xs text-brand-muted max-w-sm mx-auto">
                No portfolio items match your current filter or search criteria. Try switching categories or clearing search.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {projects.map((project) => {
                const thumbnail =
                  project.images && project.images.length > 0
                    ? project.images[0].image_url
                    : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';

                return (
                  <motion.div
                    variants={itemVariants}
                    key={project.id}
                    className="group rounded-2xl glass-panel hover:glass-panel-strong overflow-hidden transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview */}
                      <Link to={`/portfolio/${project.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-brand-black">
                        <img
                          src={thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-gray via-transparent to-transparent opacity-80" />

                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-brand-black/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-brand-magenta uppercase small-caps tracking-wider">
                          {project.category}
                        </span>
                      </Link>

                      {/* Content */}
                      <div className="p-5 space-y-2">
                        <Link to={`/portfolio/${project.slug}`}>
                          <h3 className="text-base font-medium font-heading text-white group-hover:text-brand-offwhite transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                        </Link>

                        <p className="text-brand-muted text-xs leading-relaxed line-clamp-2">
                          {project.short_description}
                        </p>

                        {/* Tech badges */}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1.5">
                            {project.technologies.slice(0, 3).map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded bg-white/5 border border-brand-border text-[10px] font-mono text-brand-offwhite"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="px-1.5 py-0.5 text-[10px] font-mono text-brand-muted">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-white/5 mt-3">
                      <Link
                        to={`/portfolio/${project.slug}`}
                        className="inline-flex items-center space-x-1 text-[11px] font-semibold tracking-wider text-brand-offwhite group-hover:text-brand-magenta uppercase small-caps transition-colors"
                      >
                        <span>Case Study Details</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </Link>

                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md text-brand-muted hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                          title="Open Live Website"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* 3. Call To Action Section */}
      <CTASection />
    </div>
  );
};

export default Portfolio;
