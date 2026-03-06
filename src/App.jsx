import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// ── Pages publiques ───────────────────────────────────────
const Home          = lazy(() => import('./pages/public/Home'));
const Search        = lazy(() => import('./pages/public/Search'));
const SearchArtisan = lazy(() => import('./pages/public/SearchArtisan'));
const ArtisanProfile = lazy(() => import('./pages/public/ArtisanProfile'));
const ReputationPublic = lazy(() => import('./components/artisan/ReputationArtisanPublic'));
const ValidationDemo = lazy(() => import('./pages/public/ValidationDemo'));
// ProfilArtisanPublic removed as route duplicate
const Login         = lazy(() => import('./pages/public/Login'));
const Register      = lazy(() => import('./pages/public/Register'));
const ForgotPassword = lazy(() => import('./pages/public/ForgotPassword'));

// ── Dashboards ────────────────────────────────────────────
const ClientDashboard  = lazy(() => import('./pages/particulier/DashboardClient'));
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
            <Route path="/validation-demo" element={<MainLayout><ValidationDemo /></MainLayout>} />
            
            {/* NOTE: `/profil-artisan/:id` route removed - duplicate of /artisan/:id */}
            <Route path="/reputation-artisan-public" element={<MainLayout><ReputationPublic /></MainLayout>} />
            <Route path="/connexion"  element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />

            {/* ── Routes Particulier (anciennement 'client') ───────────────────────── */}
            {/* Redirect old '/dashboard/client/*' to the new '/dashboard/particulier/*' */}
            <Route path="/dashboard/client/*" element={<Navigate to="/dashboard/particulier" replace />} />

            {/* Routes de recherche - accès public */}
            <Route path="/recherche" element={<MainLayout><Search /></MainLayout>} />
            <Route path="/recherche-artisan" element={<MainLayout><SearchArtisan /></MainLayout>} />
            <Route path="/artisan/:id" element={
              <ProtectedRoute allowedRoles={['particulier']}>
                <MainLayout><ArtisanProfile /></MainLayout>
              </ProtectedRoute>
            } />
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
            <Route path="/dashboard/admin/*" element={
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