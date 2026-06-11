import React, { Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import MainLayout from "@/layouts/MainLayout";
import { useNavigation } from "@/hooks/useNavigation";

<<<<<<< HEAD
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  LogIn
} from 'lucide-react';
import { auth, googleProvider } from './lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

import logo from './assets/logo.png';

// Lazy load sections for better performance and smaller initial bundle
const HomeSection = lazy(() => import('./components/sections/HomeSection').then(m => ({ default: m.HomeSection })));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection').then(m => ({ default: m.ProjectsSection })));
const TechSection = lazy(() => import('./components/sections/TechSection').then(m => ({ default: m.TechSection })));
const ExperienceSection = lazy(() => import('./components/sections/ExperienceSection').then(m => ({ default: m.ExperienceSection })));
const EducationSection = lazy(() => import('./components/sections/EducationSection').then(m => ({ default: m.EducationSection })));
const CertificationsSection = lazy(() => import('./components/sections/CertificationsSection').then(m => ({ default: m.CertificationsSection })));
const BlogSection = lazy(() => import('./components/sections/BlogSection').then(m => ({ default: m.BlogSection })));
const BlogPostSection = lazy(() => import('./components/BlogPostSection').then(m => ({ default: m.BlogPostSection })));

const GUSTAVO_GITHUB = "https://github.com/gustavogss";
const GUSTAVO_LINKEDIN = "https://www.linkedin.com/in/gustavosouza-jp/";
const GUSTAVO_LOGO = logo;

type Section = 'home' | 'experience' | 'projects' | 'tech' | 'education' | 'certifications' | 'blog';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  useEffect(() => {
    const titles: Record<Section, string> = {
      home: 'Gustavo Souza | Software Engineer & DevSecOps',
      experience: 'Experiência Profissional | Gustavo Souza',
      projects: 'Portfólio de Projetos | Gustavo Souza',
      tech: 'Habilidades Técnicas | Gustavo Souza',
      education: 'Formação Acadêmica | Gustavo Souza',
      certifications: 'Certificações Profissionais | Gustavo Souza',
      blog: 'Blog de Tecnologia e Insights | Gustavo Souza'
    };

    const descriptions: Record<Section, string> = {
      home: 'Gustavo Souza, Desenvolvedor Full Stack, Mobile e especialista em DevSecOps. Foco em IA e Segurança.',
      experience: 'Histórico profissional de Gustavo Souza em desenvolvimento web, mobile, devsecops, automação e ia integrada.',
      projects: 'Galeria de projetos desenvolvidos por Gustavo Souza, incluindo Agentes de IA, Mobile e Fullstack.',
      tech: 'Stack tecnológica e competências de Gustavo Souza em React, Flutter, Python e Segurança.',
      education: 'Trajetória educacional e formação acadêmica de Gustavo Souza.',
      certifications: 'Principais certificações de Gustavo Souza em Google Cloud, Segurança e Desenvolvimento.',
      blog: 'Artigos sobre Vibecoding, AppSec, Agentes de IA e inovações no mundo do desenvolvimento.'
    };

    if (!activePostId) {
      document.title = titles[activeSection] || 'Gustavo Souza';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', descriptions[activeSection]);
      }
    }
  }, [activeSection, activePostId]);

  const navItems = [
    { id: 'home', icon: LayoutDashboard, label: 'Sobre' },
    { id: 'experience', icon: History, label: 'Experiência' },
    { id: 'projects', icon: Layers, label: 'Projetos' },
    { id: 'tech', icon: Code2, label: 'Habilidades' },
    { id: 'education', icon: GraduationCap, label: 'Formação' },
    { id: 'certifications', icon: Award, label: 'Certificações' },
    { id: 'blog', icon: Newspaper, label: 'Blog' },
  ];
=======
const HomeSection = React.lazy(() => import("@/sections/Home"));
const ProjectsSection = React.lazy(() => import("@/sections/Projects"));
const TechSection = React.lazy(() => import("@/sections/Tech"));
const ExperienceSection = React.lazy(() => import("@/sections/Experience"));
const EducationSection = React.lazy(() => import("@/sections/Education"));
const CertificationsSection = React.lazy(() => import("@/sections/Certifications"));
const BlogSection = React.lazy(() => import("@/sections/Blog"));

export default function App() {
  const { activeSection, setActiveSection, activePostId, setActivePostId } = useNavigation();
>>>>>>> 84d975c (feat: arquiteture)

  const LoadingIndicator = () => (
    <div className="flex items-center justify-center p-20">
      <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
    </div>
  );

  return (
<<<<<<< HEAD
    <div className="flex min-h-screen bg-[#030712] pb-16 md:pb-0" id="dashboard-root">
      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#212121] backdrop-blur-xl border-t border-white/5 z-50 flex items-center justify-around px-2">
        {navItems.map(item => (
          <NavItemMobile 
            key={item.id}
            icon={item.icon} 
            active={activeSection === item.id} 
            onClick={() => {
              setActiveSection(item.id as Section);
              setActivePostId(null);
            }} 
          />
        ))}
      </nav>

      {/* Sidebar Navigation */}
      <nav id="sidebar" className={`hidden md:flex fixed left-0 top-0 h-full border-r border-white/5 bg-[#212121] backdrop-blur-xl transition-all duration-300 z-50 ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 mb-10 px-2" id="nav-header">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
              <img src={GUSTAVO_LOGO} alt="Gustavo Souza Software Engineer Logo" className="w-full h-full object-cover" />
            </div>
            {isSidebarOpen && (
              <span className="font-display font-bold text-xl tracking-tight text-white">Gustavo Souza</span>
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
                  setActiveSection(item.id as Section);
                  setActivePostId(null);
                }} 
              />
            ))}
          </div>

          {/* Sidebar Footer */}
          {isSidebarOpen && (
            <div className="mt-auto mb-6 px-2 space-y-4 border-t border-white/5 pt-6" id="sidebar-footer">
              {user ? (
                <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/10 group mb-4">
                  <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-8 h-8 rounded-full" />
                  <div className="flex-grow min-w-0">
                    <p className="text-xs font-bold text-white truncate">{user.displayName}</p>
                    <button onClick={handleLogout} className="text-[10px] text-brand-primary font-bold hover:underline">Sair</button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={handleLogin}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-xl border border-brand-primary/20 hover:bg-brand-primary/20 transition-all w-full mb-4"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Entrar com Google</span>
                </button>
              )}
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
                {activeSection === 'blog' && (
                  activePostId 
                    ? <BlogPostSection postId={activePostId} onBack={() => setActivePostId(null)} />
                    : <BlogSection onReadPost={(id) => setActivePostId(id)} />
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


=======
    <MainLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Suspense fallback={
            <div className="flex justify-center items-center p-20 min-h-[50vh]">
              <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            {activeSection === "home" && <HomeSection />}
            {activeSection === "projects" && <ProjectsSection />}
            {activeSection === "tech" && <TechSection />}
            {activeSection === "experience" && <ExperienceSection />}
            {activeSection === "education" && <EducationSection />}
            {activeSection === "certifications" && <CertificationsSection />}
            {activeSection === "blog" && (
              <BlogSection 
                activePostId={activePostId} 
                setActivePostId={setActivePostId} 
              />
            )}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
}
>>>>>>> 84d975c (feat: arquiteture)
