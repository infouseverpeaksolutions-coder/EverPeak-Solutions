import React from 'react';
import { Menu, Bell, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminNavbar = ({ setMobileOpen }) => {
  const { admin } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-brand-dark-gray/90 backdrop-blur-md border-b border-brand-border px-4 sm:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg bg-white/5 border border-brand-border text-brand-muted hover:text-white lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-xs font-mono text-brand-muted hidden sm:inline">
          EVERPEAK_PORTAL // v2.6.0
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2.5 px-3 py-1.5 rounded-lg bg-brand-black/50 border border-brand-border">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-white">{admin?.name || 'Admin'}</span>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
