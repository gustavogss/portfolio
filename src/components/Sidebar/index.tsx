import React from "react";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Layers,
  Code2,
  History,
  GraduationCap,
  Award,
  Newspaper,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Sun,
  Moon
} from "lucide-react";
import { Section } from "@/types/navigation";
import { useTheme } from "@/hooks/useTheme";

import logo from "@/assets/logo.png";
const GUSTAVO_LOGO = logo;
const GUSTAVO_GITHUB = "https://github.com/gustavogss";
const GUSTAVO_LINKEDIN = "https://www.linkedin.com/in/gustavosouza-jp/";

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
  { id: "home", icon: LayoutDashboard, label: "Sobre" },
  { id: "experience", icon: History, label: "Experiência" },
  { id: "projects", icon: Layers, label: "Projetos" },
  { id: "tech", icon: Code2, label: "Habilidades" },
  { id: "education", icon: GraduationCap, label: "Formação" },
  { id: "certifications", icon: Award, label: "Certificações" },
  { id: "blog", icon: Newspaper, label: "Blog" },
];

export default function Sidebar({
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Mobile Navigation (Bottom Bar) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-bg-sidebar backdrop-blur-xl border-t border-border-color z-50 flex items-center justify-around px-2">
        {navItems.map((item) => (
          <NavItemMobile
            key={item.id}
            icon={item.icon}
            active={activeSection === item.id}
            onClick={() => setActiveSection(item.id as Section)}
          />
        ))}
      </nav>

      {/* Sidebar Navigation */}
      <nav
        id="sidebar"
        className={`hidden md:flex fixed left-0 top-0 h-full border-r border-border-color bg-bg-sidebar backdrop-blur-xl transition-all duration-300 z-50 ${isOpen ? "w-72" : "w-20"}`}
      >
        <div className="flex flex-col h-full p-4 w-full">
          <div className="flex items-center gap-3 mb-10 px-2" id="nav-header">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
              <img
                src={GUSTAVO_LOGO}
                alt="Gustavo Souza Software Engineer Logo"
                className="w-full h-full object-cover"
              />
            </div>
            {isOpen && (
              <span className="font-display font-bold text-xl tracking-tight text-white bg-transparent whitespace-nowrap">
                Gustavo Souza
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 flex-grow" id="nav-links">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                id={`nav-${item.id}`}
                icon={item.icon}
                label={item.label}
                active={activeSection === item.id}
                isOpen={isOpen}
                onClick={() => setActiveSection(item.id as Section)}
              />
            ))}
          </div>

          {/* Sidebar Footer */}
          {isOpen ? (
            <div
              className="mt-auto mb-6 px-2 space-y-4 border-t border-border-color pt-6"
              id="sidebar-footer"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">
                  Contato
                </span>
                <a
                  href="mailto:contato@gustavosouza.dev.br"
                  className="text-sm text-text-muted hover:text-brand-primary transition-colors truncate"
                >
                  contato@gustavosouza.dev.br
                </a>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="p-2 bg-white/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
                  title="Alternar tema"
                >
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={GUSTAVO_GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={GUSTAVO_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          ) : (
            /* Collapsed: show theme toggle icon in the nav area */
            <div className="mt-auto mb-2 flex flex-col items-center">
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-3 rounded-xl text-text-muted hover:bg-white/10 hover:text-text-main transition-all"
                title="Alternar tema"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </motion.button>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-3 w-full group overflow-hidden text-text-muted hover:text-text-main"
            onClick={() => setIsOpen(!isOpen)}
            id="toggle-sidebar"
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ChevronRight className="w-5 h-5 shrink-0 mx-auto group-hover:translate-x-1 transition-transform" />
            )}
            {isOpen && (
              <span className="text-sm font-medium whitespace-nowrap">Recolher</span>
            )}
          </motion.button>
        </div>
      </nav>

    </>
  );
}

const NavItem: React.FC<{
  icon: any;
  label: string;
  active: boolean;
  isOpen: boolean;
  onClick: () => void;
  id: string;
}> = ({ icon: Icon, label, active, isOpen, onClick, id }) => {
  return (
    <motion.button
      id={id}
      onClick={onClick}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group w-full overflow-hidden ${
        active
          ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
          : "text-text-muted hover:bg-bg-card hover:text-text-main"
      }`}
    >
      <Icon
        className={`w-5 h-5 shrink-0 transition-transform duration-200 ${active ? "text-brand-primary scale-110" : "group-hover:text-text-main group-hover:scale-110"}`}
      />
      {isOpen && <span className="font-medium text-sm whitespace-nowrap">{label}</span>}
    </motion.button>
  );
};

const NavItemMobile: React.FC<{
  icon: any;
  active: boolean;
  onClick: () => void;
}> = ({ icon: Icon, active, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`flex items-center justify-center p-3 rounded-xl transition-all duration-200 ${
        active ? "text-brand-primary" : "text-text-muted hover:text-text-main"
      }`}
    >
      <Icon
        className={`w-6 h-6 transition-transform duration-200 ${active ? "text-brand-primary scale-110" : ""}`}
      />
    </motion.button>
  );
};
