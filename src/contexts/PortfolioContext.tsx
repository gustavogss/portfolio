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
      description: 'Engenheiro de Software com sólida atuação no desenvolvimento Full Stack e Mobile, especializado em arquiteturas robustas e seguras sob a ótica de DevSecOps e AppSec.',
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
