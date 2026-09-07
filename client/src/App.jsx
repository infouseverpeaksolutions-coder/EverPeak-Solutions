import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './components/admin/AdminLayout';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import PortfolioDetail from './pages/PortfolioDetail';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminProjectForm from './pages/admin/AdminProjectForm';
import AdminEnquiries from './pages/admin/AdminEnquiries';

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="portfolio" element={<AdminProjects />} />
          <Route path="portfolio/new" element={<AdminProjectForm />} />
          <Route path="portfolio/edit/:id" element={<AdminProjectForm />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
        </Route>
      </Route>

      {/* Fallback 404 Route */}
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-brand-black flex items-center justify-center p-6 text-center">
            <div className="max-w-md space-y-4">
              <h1 className="text-6xl font-extrabold font-heading text-gradient-purple">404</h1>
              <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
              <p className="text-sm text-brand-muted">
                The page you are looking for does not exist or has been moved.
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 rounded-xl bg-gradient-everpeak text-white text-xs font-semibold uppercase tracking-wider"
              >
                Back to Home
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
