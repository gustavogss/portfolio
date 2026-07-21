import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  BookOpen, 
  Code2, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../assets/logo.png';

const navItems = [
  { path: '/dsb', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/dsb/posts', icon: FileText, label: 'Posts' },
  { path: '/dsb/projects', icon: Layers, label: 'Projetos' },
  { path: '/dsb/courses', icon: BookOpen, label: 'Cursos' },
  { path: '/dsb/skills', icon: Code2, label: 'Habilidades' },
  { path: '/dsb/settings', icon: Settings, label: 'Configurações' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen bg-[#030712] overflow-hidden text-slate-200 font-sans">
      
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col bg-[#111827] border-r border-white/5 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} h-full z-20`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3 overflow-hidden group">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg shrink-0 group-hover:ring-2 group-hover:ring-brand-primary transition-all" />
            {isSidebarOpen && <span className="font-bold text-white whitespace-nowrap group-hover:text-brand-primary transition-colors">GS Portfolio CMS</span>}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group relative ${
                  active ? 'bg-brand-primary text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {isSidebarOpen && <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-white/5 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 bg-brand-primary flex items-center justify-center">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold text-xs uppercase">{user?.email?.charAt(0) || 'A'}</span>
              )}
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.displayName || 'Admin'}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
            )}
          </div>

          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            {isSidebarOpen && <span className="text-sm font-medium">Recolher</span>}
          </button>
          
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors group"
            title={!isSidebarOpen ? 'Sair' : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="text-sm font-medium whitespace-nowrap">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-[#111827] border-b border-white/5 flex items-center justify-between px-4 md:px-6 z-10 shrink-0">
          <div className="flex items-center gap-3 md:hidden">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg shrink-0" />
            <span className="font-bold text-white text-sm">GS CMS</span>
          </div>
          
          <div className="hidden md:block">
            {/* Breadcrumb or title could go here */}
            <span className="text-slate-400 font-medium capitalize">
              {location.pathname.split('/').pop() || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button 
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-primary rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-8 bg-[#030712]">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#111827] border-t border-white/5 flex items-center justify-around pb-safe z-20">
          {navItems.slice(0, 5).map(item => {
            const active = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex flex-col items-center justify-center w-full py-3 gap-1 ${
                  active ? 'text-brand-primary' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
          <Link 
            to="/dsb/settings"
            className={`flex flex-col items-center justify-center w-full py-3 gap-1 ${
              location.pathname === '/dsb/settings' ? 'text-brand-primary' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] font-medium">Ajustes</span>
          </Link>
        </nav>
      </div>

      {/* Notifications Sidebar */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-30"
              onClick={() => setIsNotificationsOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#111827] border-l border-white/5 shadow-2xl z-40 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <h3 className="font-bold text-white text-lg">Notificações</h3>
                <button 
                  onClick={() => setIsNotificationsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center text-slate-500 text-sm">
                Nenhuma notificação no momento.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
