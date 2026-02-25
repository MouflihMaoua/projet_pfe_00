import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import './i18n/config';

// ── Pages publiques ───────────────────────────────────────
const Home          = lazy(() => import('./pages/public/Home'));
const Search        = lazy(() => import('./pages/public/Search'));
const ArtisanProfile = lazy(() => import('./pages/public/ArtisanProfile'));
const Login         = lazy(() => import('./pages/public/Login'));
const Register      = lazy(() => import('./pages/public/Register'));

// ── Dashboards ────────────────────────────────────────────
const ClientDashboard  = lazy(() => import('./pages/client/Dashboard'));
const ArtisanDashboard = lazy(() => import('./pages/artisan/Dashboard'));
const AdminDashboard   = lazy(() => import('./pages/admin/Dashboard'));

// ── Loading screen ────────────────────────────────────────
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen bg-brand-offwhite">
    <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>

            {/* ── Routes Publiques ────────────────────── */}
            <Route path="/"           element={<MainLayout><Home /></MainLayout>} />
            <Route path="/recherche"  element={<MainLayout><Search /></MainLayout>} />
            <Route path="/artisan/:id" element={<MainLayout><ArtisanProfile /></MainLayout>} />
            <Route path="/connexion"  element={<Login />} />
            <Route path="/inscription" element={<Register />} />

            {/* ── Routes Particulier (anciennement 'client') ───────────────────────── */}
            {/* Redirect old '/dashboard/client/*' to the new '/dashboard/particulier/*' */}
            <Route path="/dashboard/client/*" element={<Navigate to="/dashboard/particulier" replace />} />

            {/* Client dashboard with all routes as children */}
            <Route path="/dashboard/particulier/*" element={<ClientDashboard />} />

            {/* Redirect old standalone /profil to dashboard profil */}
            <Route path="/profil" element={<Navigate to="/dashboard/particulier/profil" replace />} />

            {/* ── Routes Artisan ──────────────────────── */}
            <Route path="/dashboard/artisan/*" element={
              <ProtectedRoute allowedRoles={['artisan']}>
                <ArtisanDashboard />
              </ProtectedRoute>
            } />

            {/* ── Routes Admin ────────────────────────── */}
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            {/* ── Fallback ────────────────────────────── */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;