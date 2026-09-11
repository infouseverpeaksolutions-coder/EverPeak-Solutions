import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts & Utility Components
import MainLayout from './layouts/MainLayout';
import AdminLayout from './components/admin/AdminLayout';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import PageTransition from './components/common/PageTransition';
import ScrollToTop from './components/common/ScrollToTop';

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
    <>
      <ScrollToTop />
      <Routes>
          {/* Public Pages */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
            <Route path="/portfolio/:slug" element={<PageTransition><PortfolioDetail /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          </Route>

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />

          {/* Protected Admin Routes */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />
              <Route path="portfolio" element={<PageTransition><AdminProjects /></PageTransition>} />
              <Route path="portfolio/new" element={<PageTransition><AdminProjectForm /></PageTransition>} />
              <Route path="portfolio/edit/:id" element={<PageTransition><AdminProjectForm /></PageTransition>} />
              <Route path="enquiries" element={<PageTransition><AdminEnquiries /></PageTransition>} />
            </Route>
          </Route>

          {/* Fallback 404 Route */}
          <Route
            path="*"
            element={
              <PageTransition>
                <div className="min-h-screen bg-brand-black flex items-center justify-center p-6 text-center">
                  <div className="max-w-md space-y-4">
                    <h1 className="text-6xl font-semibold font-heading text-gradient-purple">404</h1>
                    <h2 className="text-2xl font-medium font-heading text-white">Page Not Found</h2>
                    <p className="text-sm text-brand-muted">
                      The page you are looking for does not exist or has been moved.
                    </p>
                    <a
                      href="/"
                      className="btn-3d-matte-primary inline-block px-6 py-3 rounded-xl text-white text-xs font-semibold uppercase tracking-wider"
                    >
                      Back to Home
                    </a>
                  </div>
                </div>
              </PageTransition>
            }
          />
        </Routes>
    </>
  );
}

export default App;
