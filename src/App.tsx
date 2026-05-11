/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  ChevronLeft,
  LayoutDashboard,
  User,
  Layers,
  Code2,
  Newspaper,
  History,
  Terminal,
  GraduationCap,
  Award,
  Download,
  Loader2,
  Cpu,
  LogIn,
  LogOut
} from 'lucide-react';
import { generateResumeContent } from './services/geminiService';
import { generateResumePDF } from './lib/pdfGenerator';
import { auth, googleProvider, checkGenerationLimit, incrementGenerationCount } from './lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { 
  PROJECTS, 
  TECH_CATEGORIES, 
  BLOG_POSTS, 
  EXPERIENCES,
  EDUCATION,
  CERTIFICATIONS
} from './constants';
import { BlogPostSection } from './components/BlogPostSection';

import logo from './assets/logo.png';

const GUSTAVO_GITHUB = "https://github.com/gustavogss";
const GUSTAVO_LINKEDIN = "https://www.linkedin.com/in/gustavosouza-jp/";
const GUSTAVO_PHOTO = "https://github.com/gustavogss.png";
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

  return (
    <div className="flex min-h-screen bg-[#030712] pb-16 md:pb-0" id="dashboard-root">
      {/* Mobile Navigation (Bottom Bar) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#212121] backdrop-blur-xl border-t border-white/5 z-50 flex items-center justify-around px-2">
        {navItems.map(item => (
          <NavItemMobile 
            key={item.id}
            icon={item.icon} 
            active={activeSection === item.id} 
            onClick={() => setActiveSection(item.id as Section)} 
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
                onClick={() => setActiveSection(item.id as Section)} 
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
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
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

function HomeSection({ user, onLogin }: { user: FirebaseUser | null, onLogin: () => void }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [remainingGenerations, setRemainingGenerations] = useState(5);

  useEffect(() => {
    if (user) {
      checkGenerationLimit(user.uid).then(res => {
        setUsageCount(5 - res.remaining);
        setRemainingGenerations(res.remaining);
      });
    } else {
      setUsageCount(0);
      setRemainingGenerations(5);
    }
  }, [user]);

  const handleGenerateResume = async () => {
    if (!user) {
      onLogin();
      return;
    }

    // Comentado temporariamente para testes a pedido do usuário
    /*
    const { allowed, remaining } = await checkGenerationLimit(user.uid);
    if (!allowed) {
      alert("Você atingiu o limite de 5 gerações. Para evitar abusos e custos excessivos, a geração foi limitada.");
      return;
    }
    */

    setIsGenerating(true);
    try {
      const data = {
        role: "Engenheiro de Software | Mobile | AppSec",
        experiences: EXPERIENCES,
        projects: PROJECTS,
        education: EDUCATION,
        techCategories: TECH_CATEGORIES
      };
      
      const aiContent = await generateResumeContent(data);
      
      // Increment count in Firebase
      await incrementGenerationCount(user!.uid).catch(console.error);
      
      // Update local state
      const { remaining } = await checkGenerationLimit(user!.uid);
      setUsageCount(5 - remaining);
      setRemainingGenerations(remaining);
      
      const userProfile = {
        name: "Gustavo Souza",
        role: "Engenheiro de Software | Mobile | AppSec",
        email: "contato@gustavosouza.dev.br",
        github: GUSTAVO_GITHUB,
        linkedin: GUSTAVO_LINKEDIN,
        education: EDUCATION,
        certifications: CERTIFICATIONS,
        techCategories: TECH_CATEGORIES
      };

      await generateResumePDF(userProfile, aiContent);
    } catch (error: any) {
      console.error("Erro ao gerar currículo:", error);
      if (error.message === 'LIMIT_EXCEEDED') {
        alert("Você atingiu o limite de gerações de teste. Aguarde a liberação ou entre em contato.");
      } else {
        alert("Houve um erro ao gerar o currículo com IA: " + (error.message || "Erro desconhecido"));
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-12" id="home-section">
      {/* Hero / Profile */}
      <section className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 glass-morphism p-8 rounded-3xl text-center md:text-left" id="profile-card">
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-brand-primary to-brand-secondary rounded-full blur-md opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <img 
            src={GUSTAVO_PHOTO} 
            alt="Gustavo Souza" 
            className="relative w-40 h-40 rounded-full object-cover border-4 border-slate-900 shadow-2xl" 
            id="profile-image"
          />
        </div>
        <div className="text-center md:text-left space-y-4">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Gustavo Souza</h1>
            <p className="text-xl text-brand-primary font-medium">Engenheiro de Software | Mobile | AppSec</p>
          </div>
          <p className="text-slate-400 max-w-xl leading-relaxed">
            Desenvolvo soluções web e mobile com foco em resultados, segurança, ia integrada e automação.
          </p>
          <div className="flex justify-center md:justify-start pt-2 flex-col gap-2 items-center md:items-start">
            <button 
              id="generate-cv"
              onClick={handleGenerateResume}
              disabled={isGenerating || (user && remainingGenerations <= 0)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-brand-primary to-brand-secondary text-white font-bold hover:scale-105 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 w-fit"
            >
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              <span>{isGenerating ? 'IA Gerando...' : 'Gerar Currículo (IA)'}</span>
            </button>
            {user && (
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-1">
                Restante: {remainingGenerations} / 5 gerações
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Grid Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="summary-cards">
        <SummaryCard 
          id="summary-projects"
          icon={Layers} 
          count="+100" 
          title="Projetos e Aplicações" 
          description="Aplicações full-stack, SaaS, e aplicativos para Android e IOS." 
        />
        <SummaryCard 
          id="summary-tech"
          icon={Cpu} 
          count="+20" 
          title="Tecnologias" 
          description="Domínio técnico em metodologias ágeis, desenvolvimento moderno, automação e inteligência artificial." 
        />
        <SummaryCard 
          id="summary-blog"
          icon={Newspaper} 
          count="+5" 
          title="Artigos Publicados" 
          description="Compartilhando experiências práticas, desafios reais e soluções técnicas focadas em desenvolvimento Web, Mobile e Segurança." 
        />
      </div>
    </div>
  );
}

function SummaryCard({ id, icon: Icon, count, title, description }: { id: string, icon: any, count: string, title: string, description: string }) {
  return (
    <div className="glass-morphism p-8 rounded-3xl group hover:border-brand-primary/30 transition-all flex flex-col items-center text-center space-y-4" id={id}>
      <div className="p-4 bg-brand-primary/10 rounded-2xl group-hover:bg-brand-primary/20 transition-colors">
        <Icon className="text-brand-primary w-8 h-8" />
      </div>
      <div className="space-y-1">
        <span className="text-3xl font-bold text-white block">{count}</span>
        <h3 className="text-lg font-bold text-slate-300">{title}</h3>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function SocialLink({ href, icon: Icon, label, id }: { href: string, icon: any, label: string, id: string }) {
  return (
    <a 
      id={id}
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-brand-primary/20 hover:text-brand-primary transition-all text-sm font-medium border border-slate-700 hover:border-brand-primary/30"
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </a>
  );
}

function ProjectsSection() {
  return (
    <div className="space-y-8" id="projects-section">
        <div className="flex items-end justify-center md:justify-between text-center md:text-left">
        <div>
          <h2 className="text-3xl font-bold text-white">Meus Projetos</h2>
          <p className="text-slate-400 mt-1">Uma seleção de trabalhos que combinam design e tecnologia.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.05 }}
            transition={{ 
              initial: { delay: idx * 0.1 },
              whileHover: { duration: 0.3, ease: "easeOut" }
            }}
            id={`project-card-${project.id}`}
            className="group glass-morphism rounded-3xl overflow-hidden hover:border-brand-primary/30 transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left shadow-lg hover:shadow-2xl hover:shadow-brand-primary/20"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent"></div>
            </div>
            <div className="p-6 space-y-4 flex flex-col items-center md:items-start w-full">
              <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">{project.name}</h3>
              <p className="text-slate-400 text-sm line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {project.techs.slice(0, 3).map(tech => (
                  <span key={tech} className="px-3 py-1 bg-slate-800 text-slate-300 text-[10px] uppercase tracking-wider font-bold rounded-full border border-slate-700">
                    {tech}
                  </span>
                ))}
                {project.techs.length > 3 && (
                  <span className="text-[10px] text-slate-500 flex items-center">+{project.techs.length - 3} mais</span>
                )}
              </div>
              <a 
                href={project.link} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-primary font-medium text-sm hover:gap-3 transition-all"
              >
                Ver Detalhes <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TechSection() {
  return (
    <div className="space-y-8" id="tech-section">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-white">Stack Tecnológica</h2>
        <p className="text-slate-400 mt-1">Ferramentas e linguagens que utilizo no meu dia a dia.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TECH_CATEGORIES.map((category, idx) => (
    <motion.div 
      key={category.title}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ delay: idx * 0.1 }}
      id={`tech-category-${idx}`}
      className="glass-morphism p-6 rounded-3xl flex flex-col items-center md:items-start text-center md:text-left hover:border-brand-primary/30 transition-all shadow-md hover:shadow-xl hover:shadow-brand-primary/10"
    >
            <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
              <div className="p-3 bg-brand-primary/10 rounded-2xl">
                <category.icon className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="font-bold text-white text-lg">{category.title}</h3>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 w-full">
              {category.items.map(item => (
                <span key={item} className="px-4 py-2 bg-slate-800/50 text-slate-300 text-sm rounded-xl border border-slate-800 hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all text-center flex-grow">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BlogSection({ onReadPost }: { onReadPost: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const categoriesRaw = Array.from(new Set(BLOG_POSTS.map(post => post.category)));
  categoriesRaw.sort((a, b) => {
    const aHasPublished = BLOG_POSTS.some(p => p.category === a && p.date !== 'Em breve');
    const bHasPublished = BLOG_POSTS.some(p => p.category === b && p.date !== 'Em breve');
    if (aHasPublished && !bHasPublished) return -1;
    if (!aHasPublished && bHasPublished) return 1;
    return 0;
  });
  const categories = ['Todos', ...categoriesRaw];
  const [activeCategory, setActiveCategory] = useState('Todos');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const filteredPosts = activeCategory === 'Todos' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  return (
    <div className="space-y-8" id="blog-section">
      <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between text-center md:text-left gap-4 md:gap-0">
        <div>
          <h2 className="text-3xl font-bold text-white">Blog & Insights</h2>
          <p className="text-slate-400 mt-1">Pensamentos sobre tecnologia, segurança e futuro.</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6" id="blog-categories">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
              activeCategory === category 
                ? 'bg-brand-primary text-white border-brand-primary' 
                : 'bg-slate-800/50 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        id="blog-grid"
      >
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} onReadPost={onReadPost} />
        ))}
      </div>
    </div>
  );
}

const BlogCard: React.FC<{ post: any; onReadPost: (id: string) => void }> = ({ post, onReadPost }) => {
  return (
    <motion.div 
      id={`blog-card-${post.id}`}
      className="flex justify-center h-full"
      whileHover={{ y: -10, scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="glass-morphism rounded-3xl overflow-hidden h-full flex flex-col group w-full max-w-[380px] md:max-w-none hover:border-brand-primary/30 transition-all shadow-lg hover:shadow-2xl hover:shadow-brand-primary/20">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-slate-300 text-[10px] font-bold uppercase rounded-lg">
              {post.date}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-brand-primary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase rounded-lg">
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col items-center md:items-start text-center md:text-left flex-grow w-full">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
            {post.summary}
          </p>
          <button 
            onClick={() => onReadPost(post.id)}
            className="flex items-center gap-2 text-white font-bold text-sm bg-slate-800 hover:bg-brand-primary transition-colors w-full justify-center py-3 rounded-xl border border-slate-700"
          >
            Ler mais
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceSection() {
  return (
    <div className="space-y-8" id="experience-section">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-white">Experiência Profissional</h2>
        <p className="text-slate-400 mt-1">Minha trajetória no mercado de tecnologia.</p>
      </div>
      <div className="relative space-y-8 before:hidden md:before:block before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-800 before:to-transparent flex flex-col items-center md:items-start md:block">
        {EXPERIENCES.map((exp, idx) => (
          <div key={`${exp.company}-${idx}`} className="relative flex flex-col md:flex-row items-center justify-center md:justify-normal md:odd:flex-row-reverse group w-full" id={`exp-item-${idx}`}>
            {/* Dot */}
            <div className="flex items-center justify-center w-10 h-10 mb-4 md:mb-0 rounded-full border border-slate-800 bg-slate-950 text-brand-primary relative md:absolute left-auto md:left-1/2 md:-ml-5 shadow-sm group-hover:border-brand-primary/50 transition-colors z-10">
              <History className="w-5 h-5" />
            </div>
            {/* Card */}
            <div className="w-full md:w-[calc(50%-2.5rem)] glass-morphism p-6 rounded-3xl ml-0 text-center md:text-left flex flex-col items-center md:items-start">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 w-full">
                <h3 className="font-bold text-white text-lg">{exp.role}</h3>
                <time className="text-sm font-bold text-brand-primary mt-1 md:mt-0">{exp.period}</time>
              </div>
              <div className="text-brand-secondary font-medium mb-3">{exp.company}</div>
              <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationSection() {
  return (
    <div className="space-y-8" id="education-section">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-white">Formação Acadêmica</h2>
        <p className="text-slate-400 mt-1">Minha base educacional e especializações.</p>
      </div>
      
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 md:before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-linear-to-b before:from-brand-primary/20 before:via-brand-secondary/40 before:to-transparent">
        {EDUCATION.map((edu, idx) => (
          <motion.div 
            key={`${edu.institution}-${idx}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-12 md:pl-16 group"
          >
            {/* Dot */}
            <div className="absolute left-0 top-1 w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-800 bg-slate-950 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/10 group-hover:border-brand-primary/50 transition-all z-10">
              <GraduationCap className="w-5 h-5 md:w-6 h-6" />
            </div>

            <div className="glass-morphism p-6 rounded-3xl group-hover:border-brand-primary/20 transition-all flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">{edu.degree}</h3>
                <p className="text-brand-secondary font-medium">{edu.institution}</p>
                <p className="text-slate-400 text-sm leading-relaxed mt-4">{edu.description}</p>
              </div>
              <div className="flex flex-col items-center md:items-end justify-start">
                <span className="px-4 py-1.5 bg-slate-800 text-brand-primary text-xs font-bold rounded-full border border-slate-700 whitespace-nowrap">
                  {edu.period}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CertificationsSection() {
  return (
    <div className="space-y-8" id="certifications-section">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-white">Certificações</h2>
        <p className="text-slate-400 mt-1">Cursos e selos de proficiência técnica.</p>
      </div>
      
      {/* Timeline Style */}
      <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 md:before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-linear-to-b before:from-brand-primary/20 before:via-brand-secondary/40 before:to-transparent">
        {CERTIFICATIONS.map((cert, idx) => (
          <motion.div 
            key={cert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-12 md:pl-16 group"
          >
            {/* Dot */}
            <div className="absolute left-0 top-1.5 w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-800 bg-slate-950 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/10 group-hover:border-brand-primary/50 transition-all z-10">
              <Award className="w-5 h-5 md:w-6 h-6" />
            </div>
            
            <div className="glass-morphism p-6 rounded-3xl group-hover:border-brand-primary/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
                <h3 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors">{cert.name}</h3>
                <p className="text-slate-400 text-sm">{cert.issuer}</p>
              </div>
              <div className="flex flex-col items-center md:items-end justify-center">
                <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-full border border-slate-700 whitespace-nowrap">
                  {cert.date}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


