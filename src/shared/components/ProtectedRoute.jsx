import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../core/store/useAuthStore';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Vérifier le rôle si requis
  if (requiredRole && user.user_type !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
