import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import api from '../../services/api';

const categories = [
  'IT & DEVELOPMENT',
  'DIGITAL MARKETING',
  'UI/UX DESIGN',
  'E-COMMERCE',
  'BRANDING',
];

const AdminProjectForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'IT & DEVELOPMENT',
    short_description: '',
    description: '',
    challenge: '',
    solution: '',
    services: '',
    technologies: '',
    project_url: '',
    featured: false,
    published: true,
  });

  const [existingImages, setExistingImages] = useState([]);
  const [deletedImageIds, setDeletedImageIds] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [newFilePreviews, setNewFilePreviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const [initialFetchLoading, setInitialFetchLoading] = useState(isEdit);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Auto-slugify helper
  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');

  useEffect(() => {
    if (isEdit) {
      const fetchProject = async () => {
        try {
          const res = await api.get(`/portfolio/admin/${id}`);
          if (res.data.success) {
            const p = res.data.data;
            setFormData({
              title: p.title || '',
              slug: p.slug || '',
              category: p.category || 'IT & DEVELOPMENT',
              short_description: p.short_description || '',
              description: p.description || '',
              challenge: p.challenge || '',
              solution: p.solution || '',
              services: p.services
                ? Array.isArray(p.services)
                  ? p.services.join(', ')
                  : p.services.startsWith('[')
                  ? JSON.parse(p.services).join(', ')
                  : p.services
                : '',
              technologies: p.technologies
                ? Array.isArray(p.technologies)
                  ? p.technologies.join(', ')
                  : p.technologies.startsWith('[')
                  ? JSON.parse(p.technologies).join(', ')
                  : p.technologies
                : '',
              project_url: p.project_url || '',
              featured: Boolean(p.featured),
              published: Boolean(p.published),
            });
            setExistingImages(p.images || []);
          }
        } catch (err) {
          console.error('Failed to load project:', err);
          setError('Failed to load project details.');
        } finally {
          setInitialFetchLoading(false);
        }
      };

      fetchProject();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
      // Auto-generate slug on title change if new project
      if (name === 'title' && !isEdit) {
        updated.slug = slugify(value);
      }
      return updated;
    });
    if (error) setError(null);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setNewFiles((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      size: (file.size / 1024 / 1024).toFixed(2),
    }));

    setNewFilePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeNewFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewFilePreviews((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith('image/')
      );
      if (files.length === 0) {
        setToast({ type: 'error', message: 'Please drop valid image files (PNG, JPG, WEBP, SVG).' });
        return;
      }
      setNewFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
        size: (file.size / 1024 / 1024).toFixed(2),
      }));
      setNewFilePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeExistingImage = (imageId) => {
    setDeletedImageIds((prev) => [...prev, imageId]);
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.category.trim() || !formData.short_description.trim() || !formData.description.trim()) {
      const msg = 'Please fill in all required fields (Title, Category, Short Description, Full Description).';
      setError(msg);
      setToast({ type: 'error', message: msg });
      return;
    }

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const payload = new FormData();
      payload.append('title', formData.title.trim());
      payload.append('slug', formData.slug.trim() || slugify(formData.title));
      payload.append('category', formData.category.trim());
      payload.append('short_description', formData.short_description.trim());
      payload.append('description', formData.description.trim());
      payload.append('challenge', formData.challenge ? formData.challenge.trim() : '');
      payload.append('solution', formData.solution ? formData.solution.trim() : '');
      payload.append('project_url', formData.project_url ? formData.project_url.trim() : '');
      payload.append('featured', String(formData.featured));
      payload.append('published', String(formData.published));

      // Services & Technologies arrays
      const servicesArray = formData.services
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const techArray = formData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      payload.append('services', JSON.stringify(servicesArray));
      payload.append('technologies', JSON.stringify(techArray));

      // Append new files
      newFiles.forEach((file) => {
        payload.append('images', file);
      });

      const axiosConfig = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percent);
          }
        },
      };

      if (isEdit) {
        deletedImageIds.forEach((delId) => {
          payload.append('deleted_image_ids', delId);
        });

        await api.put(`/portfolio/${id}`, payload, axiosConfig);
      } else {
        await api.post('/portfolio', payload, axiosConfig);
      }

      setToast({
        type: 'success',
        message: isEdit ? 'Project updated successfully!' : 'Project created successfully!',
      });
      setTimeout(() => {
        navigate('/admin/portfolio');
      }, 1000);
    } catch (err) {
      console.error('Failed to save project:', err);
      const msg = err.response?.data?.message || 'Failed to save project. Please verify inputs and try again.';
      setError(msg);
      setToast({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  if (initialFetchLoading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-3 text-brand-muted">
        <Loader2 className="w-8 h-8 text-brand-magenta animate-spin" />
        <p className="text-xs uppercase tracking-wider">Loading project details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      <Helmet>
        <title>{isEdit ? 'Edit Project' : 'New Project'} | Admin | EverPeak Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/portfolio"
            className="p-2 rounded-xl bg-brand-dark-gray border border-brand-border text-brand-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold font-heading text-white">
              {isEdit ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
            </h1>
            <p className="text-xs text-brand-muted mt-0.5">
              {isEdit ? 'Update case study details and screenshots' : 'Create a new client case study in MySQL'}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-panel-strong p-8 rounded-3xl space-y-6">
          <h2 className="text-lg font-medium font-heading text-white pb-3 border-b border-white/5">
            Core Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-offwhite mb-1.5 small-caps">
                Project Title <span className="text-brand-magenta">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Devangi Vastra — Luxury Ethnic E-Commerce"
                className="w-full px-4 py-3 rounded-xl bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-offwhite mb-1.5 small-caps">
                URL Slug <span className="text-brand-magenta">*</span>
              </label>
              <input
                type="text"
                name="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. devangi-vastra-ecommerce"
                className="w-full px-4 py-3 rounded-xl bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-offwhite mb-1.5 small-caps">
                Category <span className="text-brand-magenta">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white text-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-brand-dark-gray text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-offwhite mb-1.5 small-caps">
                Short Description (Card Summary) <span className="text-brand-magenta">*</span>
              </label>
              <textarea
                name="short_description"
                rows="2"
                required
                value={formData.short_description}
                onChange={handleChange}
                placeholder="1-2 sentences summarizing the project for the portfolio grid..."
                className="w-full px-4 py-3 rounded-xl bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white text-sm resize-none"
              ></textarea>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-offwhite mb-1.5 small-caps">
                Full Project Overview <span className="text-brand-magenta">*</span>
              </label>
              <textarea
                name="description"
                rows="5"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed case study overview of what was built, business goals, and architecture..."
                className="w-full px-4 py-3 rounded-xl bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white text-sm resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Case Study Details */}
        <div className="glass-panel-strong p-8 rounded-3xl space-y-6">
          <h2 className="text-lg font-medium font-heading text-white pb-3 border-b border-white/5">
            Case Study Depth & Tech Stack
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-offwhite mb-1.5 small-caps">
                The Challenge Faced
              </label>
              <textarea
                name="challenge"
                rows="3"
                value={formData.challenge}
                onChange={handleChange}
                placeholder="What bottlenecks, performance problems or hurdles did the client face?"
                className="w-full px-4 py-3 rounded-xl bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white text-sm resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-offwhite mb-1.5 small-caps">
                The Solution Delivered
              </label>
              <textarea
                name="solution"
                rows="3"
                value={formData.solution}
                onChange={handleChange}
                placeholder="How did EverPeak Solutions solve it with engineering & marketing?"
                className="w-full px-4 py-3 rounded-xl bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white text-sm resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-offwhite mb-1.5 small-caps">
                Services Provided (Comma separated)
              </label>
              <input
                type="text"
                name="services"
                value={formData.services}
                onChange={handleChange}
                placeholder="e.g. Custom E-Commerce, UI/UX Design, SEO Audit"
                className="w-full px-4 py-3 rounded-xl bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-offwhite mb-1.5 small-caps">
                Technologies Used (Comma separated)
              </label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="e.g. React.js, Node.js, MySQL, TailwindCSS"
                className="w-full px-4 py-3 rounded-xl bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white text-sm font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-offwhite mb-1.5 small-caps">
                Live Project URL (Optional)
              </label>
              <input
                type="url"
                name="project_url"
                value={formData.project_url}
                onChange={handleChange}
                placeholder="https://clientwebsite.com"
                className="w-full px-4 py-3 rounded-xl bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* Media & Image Uploads */}
        <div className="glass-panel-strong p-8 rounded-3xl space-y-6">
          <h2 className="text-lg font-medium font-heading text-white pb-3 border-b border-white/5">
            Project Images & Screenshots
          </h2>

          {/* Upload Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
              isDragging
                ? 'border-brand-magenta bg-brand-purple/15 shadow-glow-sm scale-[1.01]'
                : 'border-brand-border hover:border-brand-purple/50 bg-brand-black/40'
            }`}
          >
            <input
              type="file"
              id="file-upload"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-magenta transition-transform group-hover:scale-110">
                <Upload className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold text-white small-caps tracking-wider">
                Drag & Drop or Click to Upload — up to 10 images
              </div>
              <p className="text-[11px] text-brand-muted font-mono">
                PNG, JPG, WEBP or SVG up to 10MB each (First image is main thumbnail)
              </p>
            </label>
          </div>

          {/* Upload Progress Bar */}
          {loading && uploadProgress > 0 && (
            <div className="space-y-1.5 p-4 rounded-xl bg-brand-black/50 border border-brand-border">
              <div className="flex justify-between text-xs font-mono text-brand-muted">
                <span className="flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 text-brand-magenta animate-spin" />
                  Uploading project assets...
                </span>
                <span className="text-brand-magenta font-bold">{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-everpeak transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Existing Images (Edit mode) */}
          {existingImages.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                Existing Images in Database
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {existingImages.map((img, idx) => (
                  <div
                    key={img.id}
                    className="relative group rounded-xl overflow-hidden border border-brand-border aspect-[16/10] bg-brand-black"
                  >
                    <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeExistingImage(img.id)}
                        className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700"
                        title="Delete image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 text-[10px] text-brand-muted font-mono">
                      {idx === 0 ? 'Thumbnail' : `Slide ${idx + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Selected Files Previews */}
          {newFilePreviews.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-magenta">
                Newly Selected Files (To be uploaded on save)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {newFilePreviews.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl overflow-hidden border border-brand-purple/40 aspect-[16/10] bg-brand-black"
                  >
                    <img src={file.url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewFile(idx)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-mono truncate max-w-[80%]">
                      {file.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Status & Options */}
        <div className="glass-panel-strong p-8 rounded-3xl space-y-6">
          <h2 className="text-lg font-medium font-heading text-white pb-3 border-b border-white/5">
            Publishing Options
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5 rounded bg-brand-black border-brand-border text-brand-purple focus:ring-brand-purple"
              />
              <div>
                <div className="text-sm font-semibold text-white">Publish Project</div>
                <p className="text-xs text-brand-muted">Visible on public portfolio and homepage</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 rounded bg-brand-black border-brand-border text-brand-magenta focus:ring-brand-magenta"
              />
              <div>
                <div className="text-sm font-semibold text-white">Featured Project</div>
                <p className="text-xs text-brand-muted">Pinned to homepage spotlight carousel</p>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <Link
            to="/admin/portfolio"
            className="btn-3d-matte-secondary px-6 py-3 rounded-xl text-brand-offwhite text-xs font-semibold uppercase tracking-wider"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="btn-3d-matte-primary px-8 py-3.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Project...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEdit ? 'Update Project' : 'Save Project'}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Non-blocking Glass Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fadeIn">
          <div
            className={`glass-panel-strong px-5 py-3.5 rounded-2xl flex items-center space-x-3 border shadow-2xl ${
              toast.type === 'success'
                ? 'border-green-500/40 text-green-300'
                : 'border-red-500/40 text-red-300'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <p className="text-xs font-medium text-white">{toast.message}</p>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="ml-auto p-1 text-brand-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjectForm;
