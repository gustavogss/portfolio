import React, { createContext, useContext } from 'react';
import { 
  useProjectsQuery, 
  usePostsQuery, 
  useCoursesQuery, 
  useSkillsQuery, 
  useSettingsQuery 
} from '../hooks/portfolioQueries';
import { PROJECTS, TECH_CATEGORIES, BLOG_POSTS, EXPERIENCES, EDUCATION, CERTIFICATIONS, COURSES } from '../constants';

const PortfolioContext = createContext<any>(null);

export const usePortfolio = () => useContext(PortfolioContext);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const projectsQ = useProjectsQuery();
  const postsQ = usePostsQuery();
  const coursesQ = useCoursesQuery();
  const skillsQ = useSkillsQuery();
  const settingsQ = useSettingsQuery();

  const loading = projectsQ.isLoading || postsQ.isLoading || coursesQ.isLoading || skillsQ.isLoading || settingsQ.isLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const mergedData = {
    projects: projectsQ.data || PROJECTS,
    techCategories: skillsQ.data || TECH_CATEGORIES,
    blogPosts: postsQ.data || BLOG_POSTS,
    experiences: EXPERIENCES,
    education: EDUCATION,
    certifications: CERTIFICATIONS,
    courses: coursesQ.data || COURSES,
    settings: settingsQ.data || {
      name: 'Gustavo Souza',
      title: 'Software Engineer | Full Stack | Mobile | DevSecOps | AppSec',
      description: 'Engenheiro de Software com sólida atuação no desenvolvimento Full Stack e Mobile, especializado em arquiteturas robustas e seguras sob a ótica de DevSecOps e AppSec. Experiente no ciclo de desenvolvimento de software seguro (Secure SDLC), com foco na identificação e correção de vulnerabilidades (OWASP Top 10) e automação de testes estáticos e dinâmicos (SAST/DAST). Amplo domínio na criação de APIs resilientes, arquitetura de software limpa (Clean Code) e integração contínua (CI/CD) conteinerizada. Especializado em Inteligência Artificial, orquestrando fluxos de automação cognitiva com LLMs, LangChain, RAG e N8N para potencializar a produtividade e otimizar processos de negócios.',
      github: 'https://github.com/gustavogss',
      linkedin: 'https://www.linkedin.com/in/gustavosouza-jp/',
      email: 'contato@gustavosouza.dev.br'
    }
  };

  return (
    <PortfolioContext.Provider value={mergedData}>
      {children}
    </PortfolioContext.Provider>
  );
}
