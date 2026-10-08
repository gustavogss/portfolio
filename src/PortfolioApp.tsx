/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  Github, 
  Linkedin, 
  ChevronRight, 
  ChevronLeft,
  LayoutDashboard,
  Layers,
  Code2,
  Newspaper,
  History,
  GraduationCap,
  Award,
  Loader2,
  LogIn,
  BookOpen
} from 'lucide-react';
import type { User as FirebaseUser } from 'firebase/auth';
import { BLOG_POSTS } from './constants';
import { usePortfolio } from './contexts/PortfolioContext';
import { usePortfolioJSONLD } from './hooks/usePortfolioJSONLD';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import logo from './assets/logo.png';

// Lazy load sections for better performance and smaller initial bundle
const HomeSection = lazy(() => import('./components/sections/HomeSection').then(m => ({ default: m.HomeSection })));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection').then(m => ({ default: m.ProjectsSection })));
const TechSection = lazy(() => import('./components/sections/TechSection').then(m => ({ default: m.TechSection })));
const ExperienceSection = lazy(() => import('./components/sections/ExperienceSection').then(m => ({ default: m.ExperienceSection })));
const EducationSection = lazy(() => import('./components/sections/EducationSection').then(m => ({ default: m.EducationSection })));
const CertificationsSection = lazy(() => import('./components/sections/CertificationsSection').then(m => ({ default: m.CertificationsSection })));
const CoursesSection = lazy(() => import('./components/sections/CoursesSection').then(m => ({ default: m.CoursesSection })));
const BlogSection = lazy(() => import('./components/sections/BlogSection').then(m => ({ default: m.BlogSection })));
const BlogPostSection = lazy(() => import('./components/BlogPostSection').then(m => ({ default: m.BlogPostSection })));

const GUSTAVO_GITHUB = "https://github.com/gustavogss";
const GUSTAVO_LINKEDIN = "https://www.linkedin.com/in/gustavosouza-jp/";
const GUSTAVO_LOGO = logo;

type Section = 'home' | 'experience' | 'projects' | 'tech' | 'education' | 'certifications' | 'courses' | 'blog';

import { PortfolioProvider } from './contexts/PortfolioContext';

export default function PortfolioAppWrapper() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}

function PortfolioApp() {
  const { blogPosts, projects, settings } = usePortfolio();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // Determinar activeSection com base no pathname atual
  const getSectionFromPath = (pathname: string): Section => {
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    
    if (firstSegment === 'blog') {
      return 'blog';
    }
    
    if (['experience', 'projects', 'tech', 'education', 'certifications', 'courses'].includes(firstSegment)) {
      return firstSegment as Section;
    }
    
    return 'home';
  };

  const activeSection = getSectionFromPath(location.pathname);
  
  // Determinar activePostId se estivermos em /blog/:postId
  const activePostId = params.postId || null;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  const jsonLdData = usePortfolioJSONLD({
    activeSection,
    activePostId,
    projects,
    blogPosts,
    settings,
  });

  // Tratar links antigos utilizando query string (?tab= ou ?post=) para redirecionamento automático amigável
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    const postParam = searchParams.get('post');

    if (postParam) {
      navigate(`/blog/${postParam}`, { replace: true });
    } else if (tabParam) {
      if (['home', 'experience', 'projects', 'tech', 'education', 'certifications', 'courses', 'blog'].includes(tabParam)) {
        const targetPath = tabParam === 'home' ? '/' : `/${tabParam}`;
        navigate(targetPath, { replace: true });
      }
    }
  }, [location.search, navigate]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    import('./lib/authService').then(({ subscribeToAuth }) => {
      unsubscribe = subscribeToAuth((u) => {
        setUser(u);
      });
    }).catch(err => {
      console.error("Erro ao carregar o serviço de autenticação:", err);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    try {
      const { loginWithGoogle } = await import('./lib/authService');
      await loginWithGoogle();
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { logoutUser } = await import('./lib/authService');
      await logoutUser();
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  const activePost = activePostId ? blogPosts.find((p: any) => p.id === activePostId) : null;

  const titles: Record<Section, string> = {
    home: 'Gustavo Souza | Software Engineer & DevSecOps',
    experience: 'Experiência Profissional | Gustavo Souza',
    projects: 'Portfólio de Projetos | Gustavo Souza',
    tech: 'Habilidades Técnicas | Gustavo Souza',
    education: 'Formação Acadêmica | Gustavo Souza',
    certifications: 'Certificações Profissionais | Gustavo Souza',
    courses: 'Cursos Concluídos e Especializações | Gustavo Souza',
    blog: 'Blog de Tecnologia e Insights | Gustavo Souza'
  };

  const descriptions: Record<Section, string> = {
    home: 'Gustavo Souza, Desenvolvedor Full Stack, Mobile e especialista em DevSecOps. Foco em IA e Segurança.',
    experience: 'Histórico profissional de Gustavo Souza em desenvolvimento web, mobile, devsecops, automação e ia integrada.',
    projects: 'Galeria de projetos desenvolvidos por Gustavo Souza, incluindo Agentes de IA, Mobile e Fullstack.',
    tech: 'Stack tecnológica e competências de Gustavo Souza em React, Flutter, Python e Segurança.',
    education: 'Trajetória educacional e formação acadêmica de Gustavo Souza.',
    certifications: 'Principais certificações de Gustavo Souza em Google Cloud, Segurança e Desenvolvimento.',
    courses: 'Cursos concluídos e especializações profissionais de Gustavo Souza em tecnologia, segurança e inteligência artificial.',
    blog: 'Artigos sobre Vibecoding, AppSec, Agentes de IA e inovações no mundo do desenvolvimento.'
  };

  const currentTitle = activePost 
    ? `${activePost.title} | Blog de Gustavo Souza`
    : (titles[activeSection] || 'Gustavo Souza');

  const currentDescription = activePost 
    ? activePost.summary 
    : (descriptions[activeSection] || 'Portfólio de Gustavo Souza');

  const currentImage = activePost?.imageUrl || GUSTAVO_LOGO;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const navItems = [
    { id: 'home', icon: LayoutDashboard, label: 'Sobre' },
    { id: 'experience', icon: History, label: 'Experiência' },
    { id: 'projects', icon: Layers, label: 'Projetos' },
    { id: 'tech', icon: Code2, label: 'Habilidades' },
    { id: 'education', icon: GraduationCap, label: 'Formação' },
    { id: 'certifications', icon: Award, label: 'Certificações' },
    { id: 'courses', icon: BookOpen, label: 'Cursos' },
    { id: 'blog', icon: Newspaper, label: 'Blog' },
  ];

  const LoadingIndicator = () => (
    <div className="flex items-center justify-center p-20">
      <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#030712] pb-16 md:pb-0" id="dashboard-root">
      <Helmet>
        <title>{currentTitle}</title>
        <meta name="description" content={currentDescription} />
        
        {/* Canonical Link */}
        <link rel="canonical" href={`https://gustavosouza.dev.br${location.pathname}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={currentTitle} />
        <meta property="og:description" content={currentDescription} />
        <meta property="og:image" content={currentImage} />
        <meta property="og:url" content={currentUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentTitle} />
        <meta name="twitter:description" content={currentDescription} />
        <meta name="twitter:image" content={currentImage} />

        {/* JSON-LD Structured Data for Projects and Blog posts */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLdData)}
        </script>
      </Helmet>
      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#212121] backdrop-blur-xl border-t border-white/5 z-50 flex items-center justify-around px-2">
        {navItems.map(item => (
          <NavItemMobile 
            key={item.id}
            icon={item.icon} 
            active={activeSection === item.id} 
            onClick={() => {
              const path = item.id === 'home' ? '/' : `/${item.id}`;
              navigate(path);
            }} 
          />
        ))}
      </nav>

      {/* Sidebar Navigation */}
      <nav id="sidebar" className={`hidden md:flex fixed left-0 top-0 h-full border-r border-white/5 bg-[#212121] backdrop-blur-xl transition-all duration-300 z-50 ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
        <div className="flex flex-col h-full p-4">
          <div 
            className="flex items-center gap-3 mb-10 px-2 cursor-pointer group" 
            id="nav-header"
            onClick={() => {
              navigate('/');
            }}
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center group-hover:ring-2 group-hover:ring-brand-primary transition-all">
              <img src={GUSTAVO_LOGO} alt="Gustavo Souza Software Engineer Logo" className="w-full h-full object-cover" />
            </div>
            {isSidebarOpen && (
              <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-brand-primary transition-colors">Gustavo Souza</span>
            )}
          </div>

          <div className="flex flex-col gap-2 flex-grow" id="nav-links">
            {navItems.map(item => (
              <NavItem 
                key={item.id}
                id={`nav-${item.id}`}
                icon={item.icon} 
                label={item.label} 
                active={activeSection === item.id} 
                isOpen={isSidebarOpen} 
                onClick={() => {
                  const path = item.id === 'home' ? '/' : `/${item.id}`;
                  navigate(path);
                }} 
              />
            ))}
          </div>

          {/* Sidebar Footer */}
          {isSidebarOpen && (
            <div className="mt-auto mb-6 px-2 space-y-4 border-t border-white/5 pt-6" id="sidebar-footer">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Contato</span>
                <a href="mailto:contato@gustavosouza.dev.br" className="text-sm text-slate-300 hover:text-brand-primary transition-colors truncate">
                  contato@gustavosouza.dev.br
                </a>
              </div>
              <div className="flex gap-3">
                <motion.a 
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={GUSTAVO_GITHUB} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-black/20 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={GUSTAVO_LINKEDIN} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-black/20 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          )}

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${isSidebarOpen ? '' : 'mt-auto'} p-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-3 w-full group`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            id="toggle-sidebar"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ChevronRight className="w-5 h-5 mx-auto group-hover:translate-x-1 transition-transform" />
            )}
            {isSidebarOpen && <span className="text-sm font-medium">Recolher</span>}
          </motion.button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'} p-6 lg:p-10`} id="main-content">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection + (activePostId || '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<LoadingIndicator />}>
                {activeSection === 'home' && <HomeSection user={user} onLogin={handleLogin} />}
                {activeSection === 'projects' && <ProjectsSection />}
                {activeSection === 'tech' && <TechSection />}
                {activeSection === 'experience' && <ExperienceSection />}
                {activeSection === 'education' && <EducationSection />}
                {activeSection === 'certifications' && <CertificationsSection />}
                {activeSection === 'courses' && <CoursesSection />}
                {activeSection === 'blog' && (
                  activePostId 
                    ? <BlogPostSection postId={activePostId} onBack={() => navigate('/blog')} />
                    : <BlogSection onReadPost={(id) => navigate(`/blog/${id}`)} />
                )}
              </Suspense>
            </motion.div>
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}

const NavItem: React.FC<{ icon: any, label: string, active: boolean, isOpen: boolean, onClick: () => void, id: string }> = ({ icon: Icon, label, active, isOpen, onClick, id }) => {
  return (
    <motion.button 
      id={id}
      onClick={onClick}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group w-full ${
        active 
          ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20' 
          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
      }`}
    >
      <Icon className={`w-5 h-5 transition-transform duration-200 ${active ? 'text-brand-primary scale-110' : 'group-hover:text-slate-200 group-hover:scale-110'}`} />
      {isOpen && <span className="font-medium text-sm">{label}</span>}
    </motion.button>
  );
}

const NavItemMobile: React.FC<{ icon: any, active: boolean, onClick: () => void }> = ({ icon: Icon, active, onClick }) => {
  return (
    <motion.button 
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`flex items-center justify-center p-3 rounded-xl transition-all duration-200 ${
        active 
          ? 'text-brand-primary' 
          : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      <Icon className={`w-6 h-6 transition-transform duration-200 ${active ? 'text-brand-primary scale-110' : ''}`} />
    </motion.button>
  );
}


