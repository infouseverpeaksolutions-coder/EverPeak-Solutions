import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, MailCheck, ExternalLink, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  const { logout, admin } = useAuth();

  const links = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Portfolio', path: '/admin/portfolio', icon: FolderKanban },
    { name: 'Enquiries', path: '/admin/enquiries', icon: MailCheck },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-brand-dark-gray border-r border-brand-border flex flex-col justify-between transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="p-6 border-b border-brand-border flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <img src="/logo.png" alt="EverPeak Admin" className="h-8 w-auto object-contain" />
            </Link>
          </div>

          <div className="px-6 py-4 border-b border-brand-border/40 bg-brand-black/30">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-brand-magenta" />
              <span className="text-xs font-semibold text-white truncate">
                {admin?.name || 'Administrator'}
              </span>
            </div>
            <p className="text-[11px] text-brand-muted truncate mt-0.5">{admin?.email}</p>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'bg-gradient-everpeak text-white shadow-glow-sm'
                        : 'text-brand-muted hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-brand-border space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-brand-offwhite text-xs font-medium transition-colors"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-brand-magenta" />
              <span>View Live Website</span>
            </span>
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center space-x-2 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
