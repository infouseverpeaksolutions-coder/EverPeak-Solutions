import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, Mail, Loader2, AlertCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4 relative overflow-hidden">
      <Helmet>
        <title>Admin Login | EverPeak Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel-strong border border-brand-border shadow-2xl space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <Link to="/" className="inline-block outline-none">
              <img src="/logo.png" alt="EverPeak Solutions" className="h-10 w-auto mx-auto object-contain" />
            </Link>
            <div className="flex items-center justify-center space-x-1.5 text-brand-magenta small-caps">
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Management Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal font-heading text-white">Sign In to Dashboard</h2>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex items-start space-x-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-offwhite mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@everpeaksolutions.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-black/70 border border-brand-border focus:border-brand-purple text-white placeholder-brand-muted/60 text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-offwhite mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-black/70 border border-brand-border focus:border-brand-purple text-white placeholder-brand-muted/60 text-sm transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-3d-matte-primary w-full py-3.5 px-4 rounded-xl text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 text-center">
            <Link
              to="/"
              className="text-xs text-brand-muted hover:text-white transition-colors"
            >
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
