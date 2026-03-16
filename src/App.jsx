import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import MainLayout from './navbar/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import { supabase } from './services/supabaseClient';
import AuthCallback from './pages/public/AuthCallback';
import RegisterManual from './pages/RegisterManual';
import RegisterGoogle from './pages/public/RegisterGoogle'; 


// ── Pages publiques ───────────────────────────────────────
const Home          = lazy(() => import('./pages/public/Home'));
const Search        = lazy(() => import('./pages/public/Search'));
const SearchArtisan = lazy(() => import('./pages/public/SearchArtisan'));
const ArtisanProfile = lazy(() => import('./pages/public/ArtisanProfile'));
const ReputationPublic = lazy(() => import('./components/artisan/ReputationArtisanPublic'));
const ValidationDemo = lazy(() => import('./pages/public/ValidationDemo'));

// ProfilArtisanPublic removed as route duplicate
const Login         = lazy(() => import('./pages/LoginPage'));
const Register      = lazy(() => import('./pages/RegisterManual'));
const ChatPage      = lazy(() => import('./pages/ChatPage'));
const ForgotPassword = lazy(() => import('./pages/public/ForgotPassword'));

// ── Dashboards ────────────────────────────────────────────
const ClientDashboard  = lazy(() => import('./pages/particulier/DashboardClient'));
const ArtisanDashboard = lazy(() => import('./pages/artisan/Dashboard'));
const AdminDashboard   = lazy(() => import('./pages/admin/Dashboard'));

// ── Todos Page (Test Supabase) ─────────────────────────────
function TodosPage() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from('todos').select()

      if (todos && todos.length > 0) {
        setTodos(todos)
      }
    }

    getTodos()
  }, [])

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Liste des Todos</h2>
      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded">
            {JSON.stringify(todo)}
          </li>
        ))}
      </ul>
      {todos.length === 0 && (
        <p className="text-gray-500">Aucun todo trouvé</p>
      )}
    </div>
  )
}

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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/chat/:roomId" element={<ChatPage />} />
            <Route path="/todos" element={<TodosPage />} />
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
            {/* callback Google */}
            <Route path="/inscription-google" element={<RegisterGoogle />} />
            <Route path="/auth/callback" element={<AuthCallback />} />



            {/* ── Fallback ────────────────────────────── */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;