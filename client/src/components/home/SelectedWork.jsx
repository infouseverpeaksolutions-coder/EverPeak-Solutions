import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Loader2, Sparkles, FolderKanban } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import SectionLabel from '../common/SectionLabel';

const categories = [
  'ALL',
  'IT & DEVELOPMENT',
  'DIGITAL MARKETING',
  'UI/UX DESIGN',
  'E-COMMERCE',
  'BRANDING',
];

const SelectedWork = () => {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory !== 'ALL') {
          params.category = selectedCategory;
        }
        const res = await api.get('/portfolio', { params });
        if (res.data.success) {
          setProjects(res.data.data.slice(0, 6)); // Show top 6 on home page
        }
      } catch (err) {
        console.error('Failed to load portfolio projects:', err);
        setError('Unable to load portfolio projects right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedCategory]);

  return (
    <section className="py-20 bg-brand-black relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
        >
          <div className="space-y-3 max-w-2xl">
            <SectionLabel label="Real Client Impact" centered={false} className="!justify-start mb-2" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-heading text-white tracking-tight">
              Selected Work
            </h2>
            <p className="text-brand-muted text-xs sm:text-sm max-w-lg leading-relaxed">
              A look at some of the digital experiences, high-performance platforms, and growth solutions we've created.
            </p>
          </div>

          <Link
            to="/portfolio"
            className="btn-3d-matte-secondary inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-brand-offwhite hover:text-white text-xs font-semibold uppercase tracking-wider shrink-0 outline-none focus:outline-none"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center space-x-2 overflow-x-auto pb-3 mb-8 no-scrollbar"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap outline-none focus:outline-none transition-all ${
                selectedCategory === cat
                  ? 'btn-3d-matte-primary text-white'
                  : 'btn-3d-matte-secondary text-brand-muted hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4 text-brand-muted">
            <Loader2 className="w-8 h-8 text-brand-magenta animate-spin" />
            <p className="text-sm">Loading portfolio from database...</p>
          </div>
        ) : error ? (
          <div className="py-16 text-center text-brand-muted">
            <p>{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-brand-dark-gray/40 rounded-2xl border border-brand-border">
            <FolderKanban className="w-10 h-10 mx-auto text-brand-muted" />
            <h4 className="text-lg font-semibold text-white">Portfolio projects coming soon.</h4>
            <p className="text-sm text-brand-muted">New case studies are being published soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, idx) => {
              const thumbnail =
                project.images && project.images.length > 0
                  ? project.images[0].image_url
                  : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group rounded-2xl bg-brand-dark-gray/70 border border-brand-border overflow-hidden hover:border-brand-purple/40 hover:bg-brand-card-hover transition-colors duration-300 flex flex-col justify-between shadow-lg"
                >
                  <div>
                    {/* Thumbnail Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-brand-black">
                      <img
                        src={thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-gray via-transparent to-transparent opacity-80" />

                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-black/80 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-brand-magenta uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-medium font-heading text-white group-hover:text-brand-offwhite transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-brand-muted text-xs sm:text-sm leading-relaxed line-clamp-2">
                        {project.short_description}
                      </p>

                      {/* Tech Pills */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.technologies.slice(0, 3).map((tech, tIdx) => (
                            <span
                              key={tIdx}
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
                  <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5 mt-4">
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="inline-flex items-center space-x-1 text-xs font-semibold tracking-wider text-brand-offwhite group-hover:text-brand-magenta uppercase transition-colors"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SelectedWork;
