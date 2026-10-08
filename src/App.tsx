import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PortfolioApp from './PortfolioApp';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PostsAdmin from './pages/PostsAdmin';
import ProjectsAdmin from './pages/ProjectsAdmin';
import CoursesAdmin from './pages/CoursesAdmin';
import SkillsAdmin from './pages/SkillsAdmin';
import SettingsAdmin from './pages/SettingsAdmin';
import Error404 from './pages/Error404';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevents sudden updates while demonstrating metrics
      retry: false,
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white">Carregando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/dsb/login" replace />;
  }
  
  return <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <HelmetProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Rotas principais do Portfólio mapeadas para o PortfolioApp */}
                <Route path="/" element={<PortfolioApp />} />
                <Route path="/experience" element={<PortfolioApp />} />
                <Route path="/projects" element={<PortfolioApp />} />
                <Route path="/tech" element={<PortfolioApp />} />
                <Route path="/education" element={<PortfolioApp />} />
                <Route path="/certifications" element={<PortfolioApp />} />
                <Route path="/courses" element={<PortfolioApp />} />
                <Route path="/blog" element={<PortfolioApp />} />
                <Route path="/blog/:postId" element={<PortfolioApp />} />
                
                <Route path="/dsb/login" element={<Login />} />
                
                <Route path="/dsb" element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="posts" element={<PostsAdmin />} />
                  <Route path="projects" element={<ProjectsAdmin />} />
                  <Route path="courses" element={<CoursesAdmin />} />
                  <Route path="skills" element={<SkillsAdmin />} />
                  <Route path="settings" element={<SettingsAdmin />} />
                </Route>
                
                <Route path="*" element={<Error404 />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
