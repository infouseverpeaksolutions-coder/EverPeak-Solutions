import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FolderKanban,
  MailCheck,
  TrendingUp,
  Sparkles,
  Plus,
  ArrowUpRight,
  Loader2,
  Clock,
  Eye,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats/dashboard');
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const response = await api.get('/enquiries/export/csv', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv;charset=utf-8;' }));
      const link = document.createElement('a');
      link.href = url;
      const dateStr = new Date().toISOString().slice(0, 10);
      link.setAttribute('download', `EverPeak_Enquiries_${dateStr}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export CSV:', err);
      alert('Failed to export enquiries. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-3 text-brand-muted">
        <Loader2 className="w-8 h-8 text-brand-magenta animate-spin" />
        <p className="text-xs uppercase tracking-wider">Loading dashboard analytics...</p>
      </div>
    );
  }

  const { projects = {}, enquiries = {}, recentEnquiries = [] } = stats || {};

  const statCards = [
    {
      title: 'Total Projects',
      value: projects.total ?? 0,
      sub: `${projects.published ?? 0} Published • ${projects.drafts ?? 0} Drafts`,
      icon: FolderKanban,
      color: 'from-blue-600 to-indigo-600',
    },
    {
      title: 'Featured Projects',
      value: projects.featured ?? 0,
      sub: 'Showcased on homepage',
      icon: Sparkles,
      color: 'from-brand-purple to-brand-magenta',
    },
    {
      title: 'Total Enquiries',
      value: enquiries.total ?? 0,
      sub: `${enquiries.new ?? 0} New / Pending`,
      icon: MailCheck,
      color: 'from-brand-magenta to-pink-600',
    },
    {
      title: 'Converted Leads',
      value: enquiries.converted ?? 0,
      sub: `${enquiries.contacted ?? 0} In Discussion`,
      icon: TrendingUp,
      color: 'from-emerald-600 to-teal-600',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <Helmet>
        <title>Admin Dashboard | EverPeak Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold font-heading text-white">Dashboard Overview</h1>
          <p className="text-xs text-brand-muted mt-1">Real-time MySQL metrics, portfolio stats & client inquiries.</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/portfolio/new"
            className="px-4 py-2.5 rounded-xl bg-gradient-everpeak hover:opacity-95 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-glow-sm flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </Link>
          <Link
            to="/admin/enquiries"
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-brand-border text-brand-offwhite text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            All Enquiries
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-brand-dark-gray/80 border border-brand-border space-y-4 hover:border-brand-purple/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  {card.title}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-brand-border flex items-center justify-center text-brand-magenta">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="text-3xl font-semibold font-heading text-white">{card.value}</div>
                <div className="text-xs text-brand-muted mt-1">{card.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Enquiries Table Card */}
      <div className="rounded-2xl bg-brand-dark-gray/80 border border-brand-border overflow-hidden">
        <div className="p-6 border-b border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-medium font-heading text-white">Recent Website Enquiries</h2>
            <p className="text-xs text-brand-muted">Latest leads captured through modal & contact forms</p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handleExportCSV}
              disabled={exporting}
              className="btn-3d-matte-mini inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-brand-offwhite hover:text-white uppercase tracking-wider"
              title="Download enquiries spreadsheet (.CSV / Excel / Google Sheets)"
            >
              {exporting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>{exporting ? 'Exporting...' : 'Export Excel'}</span>
            </button>
            <Link
              to="/admin/enquiries"
              className="btn-3d-matte-mini inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-brand-magenta hover:text-white uppercase tracking-wider"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="py-12 text-center text-xs text-brand-muted">No recent inquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-brand-muted uppercase font-mono tracking-wider border-b border-brand-border">
                <tr>
                  <th className="px-6 py-3.5">Client Name</th>
                  <th className="px-6 py-3.5">Service</th>
                  <th className="px-6 py-3.5">Phone / Email</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Submitted</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-brand-offwhite">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{enq.full_name}</div>
                      {enq.company_name && (
                        <div className="text-[11px] text-brand-muted">{enq.company_name}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-brand-purple/15 text-brand-magenta font-medium">
                        {enq.service}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>{enq.phone}</div>
                      <div className="text-[11px] text-brand-muted">{enq.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          enq.status === 'New'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : enq.status === 'Contacted'
                            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                            : enq.status === 'Converted'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-white/10 text-brand-muted'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-brand-muted">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to="/admin/enquiries"
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-brand-offwhite hover:text-white transition-colors"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
