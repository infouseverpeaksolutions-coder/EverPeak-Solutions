import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

const AdminProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center space-y-4 text-brand-muted">
        <Loader2 className="w-8 h-8 text-brand-magenta animate-spin" />
        <p className="text-xs uppercase tracking-wider">Verifying admin session...</p>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
