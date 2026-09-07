import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Loader2,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import api from '../services/api';
import { useModal } from '../context/ModalContext';

const PortfolioDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { openEnquiryModal } = useModal();

  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/portfolio/slug/${slug}`);
        if (res.data.success) {
          setProject(res.data.data);
          setRelated(res.data.related || []);
          document.title = `${res.data.data.title} | EverPeak Solutions Case Study`;
        }
      } catch (err) {
        console.error('Failed to load project:', err);
        setError('Case study not found or currently unavailable.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-brand-black min-h-screen pt-40 pb-20 flex flex-col items-center justify-center space-y-4 text-brand-muted">
        <Loader2 className="w-10 h-10 text-brand-magenta animate-spin" />
        <p className="text-sm font-medium">Loading case study details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="bg-brand-black min-h-screen pt-40 pb-20 px-4 text-center space-y-6">
        <div className="max-w-md mx-auto p-8 rounded-2xl bg-brand-dark-gray border border-brand-border space-y-4">
          <h2 className="text-2xl font-bold font-heading text-white">Case Study Not Found</h2>
          <p className="text-brand-muted text-sm">{error || 'This portfolio project does not exist.'}</p>
          <Link
            to="/portfolio"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-gradient-everpeak text-white text-xs font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
        </div>
      </div>
    );
  }

  const mainImage =
    project.images && project.images.length > 0
      ? project.images[0].image_url
      : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="bg-brand-black min-h-screen">
      {/* 1. Page Header Section */}
      <section className="relative pt-36 sm:pt-44 pb-12 bg-brand-black overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[700px] h-[350px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Link */}
          <div className="mb-6">
            <Link
              to="/portfolio"
              className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-brand-muted hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all projects</span>
            </Link>
          </div>

          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-[11px] font-semibold text-brand-magenta uppercase tracking-wider">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-[11px] font-semibold text-yellow-300 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Featured Project</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold font-heading text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-sm sm:text-base text-brand-offwhite leading-relaxed font-medium">
              {project.short_description}
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.project_url && (
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d-matte-primary px-5 py-2.5 rounded-xl text-white font-semibold text-xs uppercase tracking-wider flex items-center space-x-1.5 outline-none focus:outline-none"
                >
                  <span>VISIT LIVE PROJECT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={() => openEnquiryModal(`Similar project to: ${project.title}`)}
                className="btn-3d-matte-secondary px-5 py-2.5 rounded-xl text-brand-offwhite hover:text-white font-semibold text-xs uppercase tracking-wider outline-none focus:outline-none"
              >
                START A SIMILAR PROJECT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Media Showcase & Content Section */}
      <section className="py-16 bg-brand-near-black border-b border-brand-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Showcase Banner Image */}
          <div className="rounded-2xl overflow-hidden border border-brand-border bg-brand-dark-gray shadow-2xl mb-12 aspect-[16/9] relative">
            <img
              src={mainImage}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Main Content (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Overview */}
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-white pb-2.5 border-b border-brand-border">
                  Project Overview
                </h2>
                <div className="text-brand-muted text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {project.description}
                </div>
              </div>

              {/* Challenge & Solution */}
              {(project.challenge || project.solution) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  {project.challenge && (
                    <div className="p-5 rounded-xl bg-brand-dark-gray/60 border border-brand-border space-y-2">
                      <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider">
                        The Challenge
                      </span>
                      <h3 className="text-base font-bold font-heading text-white">What we tackled</h3>
                      <p className="text-xs text-brand-muted leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>
                  )}

                  {project.solution && (
                    <div className="p-5 rounded-xl bg-brand-dark-gray/60 border border-brand-border space-y-2">
                      <span className="text-[10px] font-mono font-bold text-green-400 uppercase tracking-wider">
                        The Solution
                      </span>
                      <h3 className="text-base font-bold font-heading text-white">How we solved it</h3>
                      <p className="text-xs text-brand-muted leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Additional Project Screenshots */}
              {project.images && project.images.length > 1 && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-bold font-heading text-white">Project Screenshots</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.images.slice(1).map((img, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl overflow-hidden border border-brand-border bg-brand-dark-gray aspect-[16/10]"
                      >
                        <img
                          src={img.image_url}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar Metadata (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              {/* Meta Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-brand-dark-gray/70 border border-brand-border space-y-5 sticky top-28">
                <h3 className="text-xs font-bold font-heading text-white tracking-wider uppercase pb-2.5 border-b border-brand-border">
                  Project Scope
                </h3>

                {/* Services Provided */}
                {project.services && project.services.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold text-brand-offwhite uppercase tracking-wider flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5 text-brand-purple" />
                      <span>Services Provided</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.services.map((svc, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/5 border border-brand-border text-[11px] text-brand-offwhite font-medium"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies Used */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold text-brand-offwhite uppercase tracking-wider flex items-center space-x-1.5">
                      <Cpu className="w-3.5 h-3.5 text-brand-magenta" />
                      <span>Technologies Used</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/5 border border-brand-border text-[10px] font-mono text-brand-offwhite"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quality Standards */}
                <div className="pt-3 border-t border-white/5 space-y-1.5 text-[11px] text-brand-muted">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                    <span>Verified EverPeak Solutions Project</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span>Production Live System</span>
                  </div>
                </div>

                {/* Bottom CTA Box */}
                <div className="pt-2">
                  <button
                    onClick={() => openEnquiryModal(`Consultation for ${project.title}`)}
                    className="btn-3d-matte-primary w-full py-3 px-4 rounded-xl text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 outline-none focus:outline-none"
                  >
                    <span>REQUEST CONSULTATION</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Related Projects & CTA Section */}
      <section className="py-20 bg-brand-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Related Projects */}
          {related.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Related Projects in {project.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((relProj) => {
                  const relThumbnail =
                    relProj.images && relProj.images.length > 0
                      ? relProj.images[0].image_url
                      : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';

                  return (
                    <Link
                      key={relProj.id}
                      to={`/portfolio/${relProj.slug}`}
                      className="p-3.5 rounded-xl bg-brand-dark-gray/60 border border-brand-border hover:border-brand-purple/40 transition-all duration-200 group block"
                    >
                      <div className="aspect-[16/10] rounded-lg overflow-hidden bg-brand-black mb-2.5">
                        <img
                          src={relThumbnail}
                          alt={relProj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-magenta transition-colors line-clamp-1">
                        {relProj.title}
                      </h4>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Have a similar project CTA Banner */}
          <div className="p-8 sm:p-10 rounded-2xl bg-brand-dark-gray/80 border border-brand-border text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
              Have a Similar Project?
            </h3>
            <p className="text-brand-muted text-xs sm:text-sm max-w-lg mx-auto">
              Let's discuss how we can tailor our technology, software engineering, and marketing capabilities to achieve your business goals.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => openEnquiryModal(`Similar project to: ${project.title}`)}
                className="btn-3d-matte-primary px-6 py-3 rounded-xl text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-2 outline-none focus:outline-none"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioDetail;
