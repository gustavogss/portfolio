import { useMemo } from 'react';

interface SettingData {
  name: string;
  title: string;
  description: string;
  github: string;
  linkedin: string;
  email: string;
}

interface ProjectData {
  id: string;
  name: string;
  description: string;
  techs: string[];
  imageUrl: string;
  link?: string;
}

interface BlogPostData {
  id: string;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
  category: string;
}

interface JSONLDArgs {
  activeSection: string;
  activePostId: string | null;
  projects: ProjectData[];
  blogPosts: BlogPostData[];
  settings: SettingData;
}

export function usePortfolioJSONLD({
  activeSection,
  activePostId,
  projects,
  blogPosts,
  settings,
}: JSONLDArgs) {
  return useMemo(() => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gustavosouza.dev.br';
    const profileUrl = baseUrl;
    const logoUrl = `${baseUrl}/assets/logo.png`; // Fallback logo

    // 1. Base Person Schema
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${profileUrl}#person`,
      'name': settings?.name || 'Gustavo Souza',
      'jobTitle': settings?.title || 'Software Engineer & DevSecOps',
      'description': settings?.description || 'Desenvolvedor Full Stack, Mobile e especialista em DevSecOps.',
      'url': profileUrl,
      'email': settings?.email || 'contato@gustavosouza.dev.br',
      'sameAs': [
        settings?.github || 'https://github.com/gustavogss',
        settings?.linkedin || 'https://www.linkedin.com/in/gustavosouza-jp/',
      ].filter(Boolean),
      'knowsAbout': [
        'Software Engineering',
        'Mobile Development',
        'DevSecOps',
        'Application Security (AppSec)',
        'React',
        'React Native',
        'Flutter',
        'Artificial Intelligence',
        'Cloud Security',
        'OWASP'
      ]
    };

    // 2. Specific Blog Post Schema (BlogPosting)
    if (activeSection === 'blog' && activePostId) {
      const activePost = blogPosts.find(p => p.id === activePostId);
      if (activePost) {
        // Attempt to parse date string or default to current date
        let datePublished = new Date().toISOString().split('T')[0];
        try {
          // If date is like "11 de Julho de 2026", we can parse or use default
          const monthMap: Record<string, string> = {
            janeiro: '01', fevereiro: '02', março: '03', abril: '04', maio: '05', junho: '06',
            julho: '07', agosto: '08', setembro: '09', outubro: '10', novembro: '11', dezembro: '12'
          };
          const cleanDate = activePost.date.toLowerCase();
          const match = cleanDate.match(/(\d+)\s+de\s+([a-zç]+)\s+de\s+(\d+)/);
          if (match) {
            const day = match[1].padStart(2, '0');
            const month = monthMap[match[2]] || '01';
            const year = match[3];
            datePublished = `${year}-${month}-${day}`;
          }
        } catch {
          // Fallback to current year if parsing fails
        }

        return {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `${baseUrl}/?post=${activePost.id}`,
          },
          'headline': activePost.title,
          'description': activePost.summary,
          'image': activePost.imageUrl || logoUrl,
          'datePublished': datePublished,
          'dateModified': datePublished,
          'author': {
            '@type': 'Person',
            'name': settings?.name || 'Gustavo Souza',
            'url': profileUrl,
          },
          'publisher': {
            '@type': 'Organization',
            'name': settings?.name || 'Gustavo Souza',
            'logo': {
              '@type': 'ImageObject',
              'url': logoUrl,
            },
          },
        };
      }
    }

    // 3. Blog Section Schema (Blog / ItemList)
    if (activeSection === 'blog' && !activePostId) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${baseUrl}/?tab=blog#blog`,
        'name': `Blog de ${settings?.name || 'Gustavo Souza'}`,
        'description': 'Artigos sobre Vibecoding, AppSec, Agentes de IA e inovações no desenvolvimento de software.',
        'url': `${baseUrl}/?tab=blog`,
        'publisher': {
          '@type': 'Person',
          'name': settings?.name || 'Gustavo Souza',
        },
        'blogPost': blogPosts.map((post, index) => ({
          '@type': 'BlogPosting',
          'position': index + 1,
          'headline': post.title,
          'description': post.summary,
          'image': post.imageUrl || logoUrl,
          'url': `${baseUrl}/?post=${post.id}`,
        })),
      };
    }

    // 4. Projects Section Schema (ItemList of CreativeWorks)
    if (activeSection === 'projects') {
      return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': `${baseUrl}/?tab=projects#projects-list`,
        'name': `Projetos de ${settings?.name || 'Gustavo Souza'}`,
        'description': `Portfólio de projetos desenvolvidos por ${settings?.name || 'Gustavo Souza'}.`,
        'url': `${baseUrl}/?tab=projects`,
        'numberOfItems': projects.length,
        'itemListElement': projects.map((project, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'item': {
            '@type': 'SoftwareSourceCode',
            'name': project.name,
            'description': project.description,
            'image': project.imageUrl || logoUrl,
            'codeRepository': project.link || 'https://github.com/gustavogss',
            'programmingLanguage': project.techs,
            'creator': {
              '@type': 'Person',
              'name': settings?.name || 'Gustavo Souza',
            },
          },
        })),
      };
    }

    // Default Profile Page schema
    return {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      'mainEntity': personSchema,
    };
  }, [activeSection, activePostId, projects, blogPosts, settings]);
}
