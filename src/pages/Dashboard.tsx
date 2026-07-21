import React from 'react';
import { 
  useProjectsQuery, 
  usePostsQuery, 
  useCoursesQuery, 
  useSkillsQuery 
} from '../hooks/portfolioQueries';
import { Layers, FileText, BookOpen, Code2 } from 'lucide-react';
import PerformanceMonitor from '../components/admin/PerformanceMonitor';
import MaintenanceSection from '../components/admin/MaintenanceSection';

export default function Dashboard() {
  const projectsQ = useProjectsQuery();
  const postsQ = usePostsQuery();
  const coursesQ = useCoursesQuery();
  const skillsQ = useSkillsQuery();

  const metrics = {
    projects: projectsQ.data?.length || 0,
    posts: postsQ.data?.length || 0,
    courses: coursesQ.data?.length || 0,
    skills: skillsQ.data?.length || 0
  };

  const cards = [
    { title: 'Projetos', count: metrics.projects, icon: Layers, color: 'text-blue-500', bg: 'bg-blue-500/10', loading: projectsQ.isLoading },
    { title: 'Posts', count: metrics.posts, icon: FileText, color: 'text-green-500', bg: 'bg-green-500/10', loading: postsQ.isLoading },
    { title: 'Cursos', count: metrics.courses, icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-500/10', loading: coursesQ.isLoading },
    { title: 'Habilidades', count: metrics.skills, icon: Code2, color: 'text-orange-500', bg: 'bg-orange-500/10', loading: skillsQ.isLoading },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-xs text-slate-400 mt-1">Gerenciamento central de conteúdo do Portfólio de Gustavo Souza</p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(card => (
          <div key={card.title} className="bg-[#111827] border border-white/5 p-6 rounded-2xl flex items-center gap-4">
            <div className={`p-4 rounded-xl ${card.bg} ${card.color}`}>
              <card.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">{card.title}</p>
              {card.loading ? (
                <div className="w-8 h-6 bg-white/5 animate-pulse rounded mt-1"></div>
              ) : (
                <h3 className="text-3xl font-bold text-white mt-1">{card.count}</h3>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Manutenção da Aplicação */}
      <div className="mt-6">
        <MaintenanceSection />
      </div>

      {/* Performance Monitoring Section */}
      <div className="mt-6">
        <PerformanceMonitor />
      </div>
      
      {/* Latest Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        
        {/* Latest Projects */}
        <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Últimos Projetos</h3>
            <span className="text-xs text-brand-primary font-bold">Ativos</span>
          </div>
          <div className="space-y-3">
            {projectsQ.isLoading ? (
              <p className="text-slate-500 text-sm">Carregando...</p>
            ) : projectsQ.data && projectsQ.data.length > 0 ? (
              projectsQ.data.slice(0, 3).map((proj: any) => (
                <div key={proj.id} className="p-3 bg-[#1f2937]/30 border border-white/5 rounded-xl flex items-center justify-between">
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{proj.name}</h4>
                    <p className="text-xs text-slate-400 truncate max-w-xs">{proj.description}</p>
                  </div>
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-bold uppercase shrink-0">
                    {proj.techs?.[0] || 'Tech'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm">Nenhum projeto encontrado.</p>
            )}
          </div>
        </div>

        {/* Latest Blog Posts */}
        <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Últimos Posts</h3>
            <span className="text-xs text-brand-primary font-bold">Publicados</span>
          </div>
          <div className="space-y-3">
            {postsQ.isLoading ? (
              <p className="text-slate-500 text-sm">Carregando...</p>
            ) : postsQ.data && postsQ.data.length > 0 ? (
              postsQ.data.slice(0, 3).map((post: any) => (
                <div key={post.id} className="p-3 bg-[#1f2937]/30 border border-white/5 rounded-xl flex items-center justify-between">
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{post.title}</h4>
                    <p className="text-xs text-slate-400 truncate max-w-xs">{post.summary}</p>
                  </div>
                  <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-bold uppercase shrink-0">
                    {post.category || 'Blog'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm">Nenhum post encontrado.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
