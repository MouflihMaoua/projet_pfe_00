import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import './i18n/config';

// Lazy loading des pages
const Home = lazy(() => import('./pages/public/Home'));
const Search = lazy(() => import('./pages/public/Search'));
const ArtisanProfile = lazy(() => import('./pages/public/ArtisanProfile'));
const Login = lazy(() => import('./pages/public/Login'));
const Register = lazy(() => import('./pages/public/Register'));

// Dashboards
const ClientDashboard = lazy(() => import('./pages/particulier/DashboardClient'));
const ArtisanDashboard = lazy(() => import('./pages/artisan/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen bg-brand-offwhite">
    <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Routes Publiques */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/recherche" element={<MainLayout><Search /></MainLayout>} />
            <Route path="/artisan/:id" element={<MainLayout><ArtisanProfile /></MainLayout>} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />

            {/* Routes Client */}
            <Route path="/dashboard/client/*" element={
              <ProtectedRoute allowedRoles={['client']}>
                <ClientDashboard />
              </ProtectedRoute>
            } />

            {/* Routes Artisan */}
            <Route path="/dashboard/artisan/*" element={
              <ProtectedRoute allowedRoles={['artisan']}>
                <ArtisanDashboard />
              </ProtectedRoute>
            } />

            {/* Routes Admin */}
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
