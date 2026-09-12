import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-black text-brand-offwhite flex relative">
      {/* Floating Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area: Offset by 17.5rem (w-64 + 1.5rem total margin) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[17.5rem] transition-all duration-300">
        <AdminNavbar setMobileOpen={setMobileOpen} />
        <main className="p-4 sm:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
