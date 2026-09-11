import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  ExternalLink,
  Loader2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import api from '../../services/api';

const categories = [
  'ALL',
  'IT & DEVELOPMENT',
  'DIGITAL MARKETING',
  'UI/UX DESIGN',
  'E-COMMERCE',
  'BRANDING',
];

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== 'ALL') params.category = selectedCategory;
      if (search.trim()) params.search = search.trim();

      const res = await api.get('/portfolio/admin/all', { params });
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch admin projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory, search]);

  const handleTogglePublish = async (id) => {
    try {
      const res = await api.patch(`/portfolio/${id}/publish`);
      if (res.data.success) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, published: res.data.published } : p))
        );
      }
    } catch (err) {
      console.error('Failed to toggle publish status:', err);
      alert('Failed to update publish status.');
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const res = await api.patch(`/portfolio/${id}/featured`);
      if (res.data.success) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, featured: res.data.featured } : p))
        );
      }
    } catch (err) {
      console.error('Failed to toggle featured status:', err);
      alert('Failed to update featured status.');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await api.delete(`/portfolio/${id}`);
      if (res.data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete project:', err);
      alert('Failed to delete project.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <Helmet>
        <title>Portfolio Management | Admin | EverPeak Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold font-heading text-white">Portfolio Projects</h1>
          <p className="text-xs text-brand-muted mt-1">
            Manage your case studies, publish/unpublish, feature highlights, and media.
          </p>
        </div>

        <Link
          to="/admin/portfolio/new"
          className="btn-3d-matte-primary px-5 py-2.5 rounded-xl text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-brand-dark-gray/60 p-4 rounded-2xl border border-brand-border">
        <div className="flex items-center space-x-2.5 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${
                selectedCategory === cat
                  ? 'btn-3d-matte-primary text-white'
                  : 'btn-3d-matte-secondary text-brand-muted hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white text-xs placeholder-brand-muted"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl bg-brand-dark-gray/80 border border-brand-border overflow-hidden">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-3 text-brand-muted">
            <Loader2 className="w-8 h-8 text-brand-magenta animate-spin" />
            <p className="text-xs uppercase tracking-wider">Loading portfolio data...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="text-sm text-brand-muted">No projects found for the selected filter.</p>
            <Link
              to="/admin/portfolio/new"
              className="inline-flex items-center space-x-1.5 text-xs text-brand-magenta hover:underline"
            >
              <Plus className="w-4 h-4" />
              <span>Create your first project</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-brand-muted uppercase font-mono tracking-wider border-b border-brand-border">
                <tr>
                  <th className="px-6 py-3.5">Project</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Featured</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Created</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-brand-offwhite">
                {projects.map((proj) => {
                  const thumb =
                    proj.images && proj.images.length > 0
                      ? proj.images[0].image_url
                      : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80';

                  return (
                    <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Project Title & Thumbnail */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3.5">
                          <img
                            src={thumb}
                            alt=""
                            className="w-12 h-9 object-cover rounded-lg bg-brand-black shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-white truncate max-w-xs">{proj.title}</div>
                            <div className="text-[11px] text-brand-muted font-mono truncate">
                              /{proj.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-md bg-white/5 border border-brand-border text-[11px] font-semibold text-brand-offwhite">
                          {proj.category}
                        </span>
                      </td>

                      {/* Featured Toggle */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleFeatured(proj.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            proj.featured
                              ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400'
                              : 'bg-white/5 border-brand-border text-brand-muted hover:text-white'
                          }`}
                          title={proj.featured ? 'Featured Project' : 'Mark as Featured'}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </td>

                      {/* Published Status Toggle */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePublish(proj.id)}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                            proj.published
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                              : 'bg-white/10 text-brand-muted border border-white/10'
                          }`}
                        >
                          {proj.published ? (
                            <>
                              <Eye className="w-3 h-3" />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-4 text-brand-muted">
                        {new Date(proj.created_at).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/portfolio/${proj.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-brand-muted hover:text-white transition-colors"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <Link
                            to={`/admin/portfolio/edit/${proj.id}`}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-brand-purple hover:text-brand-magenta transition-colors"
                            title="Edit Project"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            onClick={() => handleDelete(proj.id, proj.title)}
                            disabled={deletingId === proj.id}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                            title="Delete Project"
                          >
                            {deletingId === proj.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
