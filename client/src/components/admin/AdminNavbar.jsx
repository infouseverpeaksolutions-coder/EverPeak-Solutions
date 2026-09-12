import React from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminNavbar = ({ setMobileOpen }) => {
  const { admin } = useAuth();

  return (
    <div className="sticky top-3 z-30 px-3 sm:px-6 pointer-events-none">
      <header className="pointer-events-auto h-16 rounded-[100px] glass-panel px-6 flex items-center justify-between shadow-xl border border-brand-border">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-full bg-white/5 border border-brand-border text-brand-muted hover:text-white lg:hidden outline-none"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="small-caps text-brand-muted hidden sm:inline tracking-[0.2em]">
            EVERPEAK_OPERATIONS // v2.6.0
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-brand-border">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="small-caps text-white font-medium">{admin?.name || 'Admin'}</span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AdminNavbar;
