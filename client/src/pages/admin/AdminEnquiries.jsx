import React, { useState, useEffect } from 'react';
import {
  MailCheck,
  Search,
  Trash2,
  Eye,
  Loader2,
  X,
  Phone,
  Mail,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  MessageSquare,
  Sparkles,
  FileSpreadsheet,
  Download,
} from 'lucide-react';
import api from '../../services/api';

const statusList = ['ALL', 'New', 'Contacted', 'In Progress', 'Converted', 'Closed'];
const allStatuses = ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'];

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [exporting, setExporting] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedStatus !== 'ALL') params.status = selectedStatus;
      if (search.trim()) params.search = search.trim();

      const res = await api.get('/enquiries', { params });
      if (res.data.success) {
        setEnquiries(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [selectedStatus, search]);

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const params = {};
      if (selectedStatus !== 'ALL') params.status = selectedStatus;
      if (search.trim()) params.search = search.trim();

      const response = await api.get('/enquiries/export/csv', {
        params,
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

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await api.patch(`/enquiries/${id}/status`, { status: newStatus });
      if (res.data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update enquiry status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id, clientName) => {
    if (!window.confirm(`Are you sure you want to delete the enquiry from "${clientName}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await api.delete(`/enquiries/${id}`);
      if (res.data.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete enquiry:', err);
      alert('Failed to delete enquiry.');
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Contacted':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'In Progress':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Converted':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Closed':
        return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
      default:
        return 'bg-white/10 text-brand-muted border-white/10';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Client Enquiries & Leads
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Review incoming leads from website forms, manage status pipeline, and connect via WhatsApp.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={exporting}
          className="btn-3d-matte-primary inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-white text-xs font-semibold uppercase tracking-wider outline-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          title="Download leads as Excel / CSV spreadsheet"
        >
          {exporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          )}
          <span>{exporting ? 'Exporting...' : 'Export to Excel / Sheets'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-brand-dark-gray/60 p-4 rounded-2xl border border-brand-border">
        <div className="flex items-center space-x-2.5 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
          {statusList.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${
                selectedStatus === st
                  ? 'btn-3d-matte-primary text-white'
                  : 'btn-3d-matte-secondary text-brand-muted hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-brand-black/60 border border-brand-border focus:border-brand-purple text-white text-xs placeholder-brand-muted"
          />
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="rounded-2xl bg-brand-dark-gray/80 border border-brand-border overflow-hidden">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-3 text-brand-muted">
            <Loader2 className="w-8 h-8 text-brand-magenta animate-spin" />
            <p className="text-xs uppercase tracking-wider">Loading enquiries from MySQL...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="py-20 text-center space-y-2 text-brand-muted">
            <MailCheck className="w-10 h-10 mx-auto opacity-30" />
            <p className="text-sm font-medium text-white">No enquiries found</p>
            <p className="text-xs">No client messages match your current filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-brand-muted uppercase font-mono tracking-wider border-b border-brand-border">
                <tr>
                  <th className="px-6 py-3.5">ID</th>
                  <th className="px-6 py-3.5">Client</th>
                  <th className="px-6 py-3.5">Service</th>
                  <th className="px-6 py-3.5">Contact</th>
                  <th className="px-6 py-3.5">Budget</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-brand-offwhite">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono text-brand-muted">#{enq.id}</td>

                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{enq.full_name}</div>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5">
                        {enq.city && (
                          <span className="text-[10px] text-brand-magenta flex items-center space-x-0.5">
                            <MapPin className="w-2.5 h-2.5" />
                            <span>{enq.city}</span>
                          </span>
                        )}
                        {enq.company_name && (
                          <span className="text-[10px] text-brand-muted flex items-center space-x-0.5">
                            <Building className="w-2.5 h-2.5" />
                            <span>{enq.company_name}</span>
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-brand-purple/15 text-brand-magenta font-semibold text-[11px]">
                        {enq.service}
                      </span>
                    </td>

                    <td className="px-6 py-4 space-y-0.5">
                      <div className="text-white font-mono">{enq.phone}</div>
                      <div className="text-brand-muted truncate max-w-[180px]">{enq.email}</div>
                    </td>

                    <td className="px-6 py-4 text-brand-muted">{enq.budget || '—'}</td>

                    {/* Status Dropdown */}
                    <td className="px-6 py-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        disabled={updatingId === enq.id}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border bg-brand-black cursor-pointer focus:outline-none ${getStatusBadge(
                          enq.status
                        )}`}
                      >
                        {allStatuses.map((st) => (
                          <option key={st} value={st} className="bg-brand-dark-gray text-white">
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-6 py-4 text-brand-muted">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedEnquiry(enq)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-brand-offwhite hover:text-white transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(enq.id, enq.full_name)}
                          disabled={deletingId === enq.id}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Delete Enquiry"
                        >
                          {deletingId === enq.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Enquiry Detail Modal / Drawer */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl bg-brand-dark-gray border border-brand-border rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-brand-border">
              <div>
                <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider">
                  ENQUIRY #{selectedEnquiry.id}
                </span>
                <h3 className="text-xl font-bold font-heading text-white mt-1">
                  {selectedEnquiry.full_name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-lg text-brand-muted hover:text-white bg-white/5 hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Details */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-brand-black/50 border border-brand-border space-y-1">
                  <span className="text-brand-muted uppercase text-[10px]">Email</span>
                  <div className="font-semibold text-white break-all">
                    <a href={`mailto:${selectedEnquiry.email}`} className="hover:text-brand-magenta">
                      {selectedEnquiry.email}
                    </a>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-brand-black/50 border border-brand-border space-y-1">
                  <span className="text-brand-muted uppercase text-[10px]">Phone / WhatsApp</span>
                  <div className="font-semibold text-white">
                    <a href={`tel:${selectedEnquiry.phone}`} className="hover:text-brand-magenta">
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-brand-black/50 border border-brand-border space-y-1">
                  <span className="text-brand-muted uppercase text-[10px]">Company</span>
                  <div className="font-semibold text-white">
                    {selectedEnquiry.company_name || 'N/A'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-brand-black/50 border border-brand-border space-y-1">
                  <span className="text-brand-muted uppercase text-[10px]">Service Requested</span>
                  <div className="font-semibold text-brand-magenta">
                    {selectedEnquiry.service}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-brand-black/50 border border-brand-border space-y-1">
                  <span className="text-brand-muted uppercase text-[10px]">City / Location</span>
                  <div className="font-semibold text-white">{selectedEnquiry.city || 'N/A'}</div>
                </div>

                <div className="p-3 rounded-xl bg-brand-black/50 border border-brand-border space-y-1">
                  <span className="text-brand-muted uppercase text-[10px]">Budget Range</span>
                  <div className="font-semibold text-brand-magenta">{selectedEnquiry.budget || 'Not specified'}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-brand-black/70 border border-brand-border space-y-2">
                <span className="text-brand-muted uppercase text-[10px] font-bold">Project Details:</span>
                <p className="text-brand-offwhite leading-relaxed whitespace-pre-wrap text-sm">
                  {selectedEnquiry.project_details}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-brand-muted text-[11px]">
                  Submitted on: {new Date(selectedEnquiry.created_at).toLocaleString('en-IN')}
                </span>

                {/* Direct WhatsApp Response */}
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${selectedEnquiry.full_name}, thank you for contacting EverPeak Solutions regarding ${selectedEnquiry.service}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d-matte-whatsapp px-4 py-2.5 rounded-xl text-white font-semibold text-xs flex items-center space-x-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Reply on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
