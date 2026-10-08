import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ExternalLink, X, Calendar, Award, Clock, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Course, COURSES } from '../../constants';
import { MarkdownRenderer } from '../MarkdownRenderer';

export function CoursesSection() {
  const { courses } = usePortfolio();
  const list = courses || [];

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const categoriesRaw = Array.from(new Set(list.map((course: any) => course.category)));
  categoriesRaw.sort();
  const categories: string[] = ['Todos', ...(categoriesRaw as string[])];
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredCourses = activeCategory === 'Todos' 
    ? list 
    : list.filter((course: any) => course.category === activeCategory);

  const currentUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://gustavosouza.dev.br';

  return (
    <div className="space-y-8" id="courses-section">
      <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between text-center md:text-left gap-4 md:gap-0">
        <div>
          <h2 className="text-3xl font-bold text-white">Cursos Concluídos</h2>
          <p className="text-slate-400 mt-1">Especializações, imersões e certificações que moldam meu conhecimento.</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6" id="course-categories">
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
      
      {/* Course Cards Grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        id="courses-grid"
      >
        {filteredCourses.map((course: any) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onOpen={() => setSelectedCourse(course)} 
          />
        ))}
      </div>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <CourseModal 
            course={selectedCourse} 
            onClose={() => setSelectedCourse(null)} 
            currentUrl={currentUrl}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const CourseCard: React.FC<{ course: Course; onOpen: () => void }> = ({ course, onOpen }) => {
  return (
    <motion.div 
      id={`course-card-${course.id}`}
      className="flex justify-center h-full cursor-pointer"
      whileHover={{ y: -10, scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onOpen}
    >
      <div className="glass-morphism rounded-3xl overflow-hidden h-full flex flex-col group w-full max-w-[380px] md:max-w-none hover:border-brand-primary/30 transition-all shadow-lg hover:shadow-2xl hover:shadow-brand-primary/20">
        {/* Course Card Header Image */}
        <div className="h-48 overflow-hidden relative">
          <img 
            src={course.imageUrl} 
            alt={course.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-slate-300 text-[10px] font-bold uppercase rounded-lg flex items-center gap-1">
              <Calendar className="w-3 h-3 text-brand-primary" />
              {course.date}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-brand-primary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase rounded-lg">
              {course.category}
            </span>
          </div>
        </div>

        {/* Course Card Info */}
        <div className="p-6 flex flex-col items-center md:items-start text-center md:text-left flex-grow w-full">
          <span className="text-brand-secondary text-xs font-bold uppercase tracking-wider mb-1">
            {course.issuer}
          </span>
          <h3 className="text-xl font-bold text-white mb-1 line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors">
            {course.title}
          </h3>
          {course.duration && (
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-3 block">
              {course.duration}
            </span>
          )}
          <div className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
            <MarkdownRenderer content={course.description} inline />
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="flex items-center gap-2 text-white font-bold text-sm bg-slate-800 hover:bg-brand-primary transition-colors w-full justify-center py-3 rounded-xl border border-slate-700"
          >
            <BookOpen className="w-4 h-4" />
            Saiba Mais
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const CourseModal: React.FC<{ course: Course; onClose: () => void; currentUrl: string }> = ({ course, onClose, currentUrl }) => {
  const [showSyllabus, setShowSyllabus] = useState(false);

  // Fallbacks for syllabus and workload from default COURSES if missing in Firestore course model
  const detailedCourse = React.useMemo(() => {
    const local = COURSES.find(c => c.id === course.id || c.title.toLowerCase() === course.title.toLowerCase());
    return {
      ...course,
      syllabus: course.syllabus || local?.syllabus || [
        'Introdução ao tema e conceitos fundamentais',
        'Configuração do ambiente e boas práticas',
        'Desenvolvimento hands-on e arquitetura',
        'Segurança, testes e qualidade de código',
        'Deploy, integrações e entrega contínua'
      ],
      duration: course.duration || local?.duration || '40 horas'
    };
  }, [course]);

  // Sharing setups similar to blog sharing links
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`Concluí o curso "${course.title}" da ${course.issuer}! Veja os detalhes aqui: ${currentUrl}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" id={`course-modal-${course.id}`}>
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative bg-[#111827] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl overflow-hidden z-10 flex flex-col"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-slate-900/80 hover:bg-brand-primary text-white hover:text-white rounded-full transition-all border border-white/10"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Featured Image Header */}
        <div className="relative h-64 md:h-72 w-full flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-black/30 z-10" />
          <img 
            src={course.imageUrl} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-3 py-1 bg-brand-primary text-white text-[10px] font-bold uppercase rounded-lg">
                {course.category}
              </span>
              <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-slate-300 text-[10px] font-bold uppercase rounded-lg flex items-center gap-1 border border-white/5">
                <Calendar className="w-3 h-3 text-brand-primary" />
                {course.date}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
              {course.title}
            </h2>
            {course.duration && (
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1 block">
                {course.duration}
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6 flex-grow overflow-y-auto">
          {/* Issuer / Credentials Header */}
          <div className="flex items-center gap-3 p-4 bg-slate-900/40 rounded-2xl border border-white/5">
            <div className="p-2.5 bg-brand-primary/10 rounded-xl text-brand-primary">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Instituição de Ensino</span>
              <strong className="text-white text-base font-semibold">{course.issuer}</strong>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Sobre a Formação</h4>
            <div className="text-slate-300 leading-relaxed text-sm md:text-base">
              <MarkdownRenderer content={course.description} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            {course.link && (
              <a 
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center gap-2 px-6 py-4 bg-linear-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-brand-primary/20 text-center justify-center text-sm"
              >
                <span>Ver Curso</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Social Media Sharing */}
          <div className="pt-6 border-t border-white/10 text-center">
            <h5 className="text-white font-bold text-sm mb-4">Compartilhar Conclusão 👇</h5>
            <div className="flex flex-wrap justify-center gap-3">
              <a 
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-xl transition-all font-bold text-xs"
              >
                WhatsApp
              </a>
              <a 
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white rounded-xl transition-all font-bold text-xs"
              >
                LinkedIn
              </a>
              <a 
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white rounded-xl transition-all font-bold text-xs"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Syllabus Overlay Modal */}
      <AnimatePresence>
        {showSyllabus && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Dark blur backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSyllabus(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Inner modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-[#0F172A] border border-brand-primary/20 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden z-10 flex flex-col p-6 md:p-8"
            >
              {/* Close submodal button */}
              <button 
                onClick={() => setShowSyllabus(false)}
                className="absolute top-4 right-4 z-30 p-2 bg-slate-900/80 hover:bg-brand-primary text-white hover:text-white rounded-full transition-all border border-white/10"
                aria-label="Fechar ementa"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Header */}
              <div className="mb-6">
                <span className="text-brand-primary text-[10px] font-bold uppercase tracking-widest block mb-1">
                  EMENTA & CARGA HORÁRIA
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight">
                  {detailedCourse.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Instituição: <strong className="text-slate-200">{detailedCourse.issuer}</strong>
                </p>
              </div>

              {/* Workload Section */}
              <div className="flex items-center gap-3 p-4 bg-brand-primary/5 rounded-2xl border border-brand-primary/10 mb-6">
                <div className="p-2.5 bg-brand-primary/10 rounded-xl text-brand-primary">
                  <Clock className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Carga Horária</span>
                  <strong className="text-white text-base font-bold">{detailedCourse.duration}</strong>
                </div>
              </div>

              {/* Syllabus Sections */}
              <div className="space-y-3 flex-grow mb-8">
                <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-brand-primary" />
                  Conteúdo Programático
                </h4>
                <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                  {detailedCourse.syllabus.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start text-sm">
                      <div className="mt-0.5 text-brand-primary flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-slate-300 leading-normal">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Link/Certificate Button */}
              {detailedCourse.link && (
                <a 
                  href={detailedCourse.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 bg-linear-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-brand-primary/20 text-center justify-center text-sm w-full"
                >
                  <span>Acessar Certificado / Curso</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
