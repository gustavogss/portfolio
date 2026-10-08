import React, { useState } from 'react';
import { 
  useCoursesQuery, 
  useSaveCourseMutation, 
  useDeleteCourseMutation 
} from '../hooks/portfolioQueries';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Loader2, 
  X, 
  AlertTriangle, 
  Clock, 
  Award, 
  Globe,
  Minus 
} from 'lucide-react';

interface CourseFormState {
  id?: string;
  title: string;
  description: string;
  category: string;
  issuer: string;
  date: string;
  imageUrl: string;
  link: string;
  duration: string;
}

const initialFormState: CourseFormState = {
  title: '',
  description: '',
  category: 'IA & Automação',
  issuer: '',
  date: '',
  imageUrl: '',
  link: '',
  duration: ''
};

const CATEGORIES = ['IA & Automação', 'Segurança & Pentest', 'DevSecOps', 'Mobile & Frontend', 'Outros'];

const DEFAULT_ASSETS = [
  { name: 'course-cybersecurity.jpg', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80' },
  { name: 'course-devops.jpg', url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=400&q=80' },
  { name: 'course-fullstack.jpg', url: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=400&q=80' },
  { name: 'course-ia.jpg', url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=400&q=80' },
  { name: 'course-pentest.jpg', url: 'https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&w=400&q=80' },
  { name: 'post-emulador-ios.jpg', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80' },
  { name: 'post-magento2.jpg', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80' },
  { name: 'post-seguranca-primeiro.jpg', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80' },
  { name: 'post-vibe-agents.jpg', url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=80' },
  { name: 'post-vibecoding-seguro.jpg', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80' },
  { name: 'project-delivery.jpg', url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80' },
  { name: 'project-finexyia.jpg', url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80' },
  { name: 'project-listadecompras.jpg', url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80' },
  { name: 'project-osint-toolkit.jpg', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80' },
  { name: 'project-task-manager.jpg', url: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=400&q=80' },
  { name: 'project-todolist-react.jpg', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80' },
  { name: 'project-sosjampa.jpg', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80' }
];

export default function CoursesAdmin() {
  const { data: courses = [], isLoading } = useCoursesQuery();
  const saveMutation = useSaveCourseMutation();
  const deleteMutation = useDeleteCourseMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formState, setFormState] = useState<CourseFormState>(initialFormState);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [availableImages, setAvailableImages] = useState<{ name: string; url: string }[]>(() => {
    const stored = localStorage.getItem('blog_available_images');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Filtramos para não duplicar itens que já estão nos defaults pelo nome/url
        const existingUrls = new Set(DEFAULT_ASSETS.map(a => a.url));
        const customOnes = parsed.filter((img: any) => !existingUrls.has(img.url));
        return [...customOnes, ...DEFAULT_ASSETS];
      } catch (e) {
        return DEFAULT_ASSETS;
      }
    }
    return DEFAULT_ASSETS;
  });

  const saveAvailableImages = (newImages: typeof DEFAULT_ASSETS) => {
    setAvailableImages(newImages);
    localStorage.setItem('blog_available_images', JSON.stringify(newImages));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size >= 1 * 1024 * 1024) {
        alert('A imagem selecionada excede o limite permitido de 1MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newImage = { name: file.name, url: base64String };
        const updatedList = [newImage, ...availableImages];
        saveAvailableImages(updatedList);
        setFormState(prev => ({ ...prev, imageUrl: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    const currentUrl = formState.imageUrl;
    if (!currentUrl) {
      alert('Nenhuma imagem selecionada para remover.');
      return;
    }
    const targetImg = availableImages.find(img => img.url === currentUrl);
    if (!targetImg) {
      // Se não estiver nos assets gerenciados (pode ser imagem antiga), apenas limpa o campo
      setFormState(prev => ({ ...prev, imageUrl: '' }));
      return;
    }
    
    if (confirm(`Tem certeza de que deseja remover a imagem "${targetImg.name}" dos assets selecionáveis?`)) {
      const updatedList = availableImages.filter(img => img.url !== currentUrl);
      saveAvailableImages(updatedList);
      setFormState(prev => ({ ...prev, imageUrl: '' }));
    }
  };

  const handleOpenCreate = () => {
    const currentYear = new Date().getFullYear().toString();
    setFormState({ ...initialFormState, date: currentYear });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (course: any) => {
    setFormState({
      id: course.id,
      title: course.title || '',
      description: course.description || '',
      category: course.category || 'IA & Automação',
      issuer: course.issuer || '',
      date: course.date || '',
      imageUrl: course.imageUrl || '',
      link: course.link || '',
      duration: course.duration || ''
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.description || !formState.issuer) return;

    saveMutation.mutate({
      id: formState.id,
      title: formState.title,
      description: formState.description,
      category: formState.category,
      issuer: formState.issuer,
      date: formState.date || new Date().getFullYear().toString(),
      imageUrl: formState.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80',
      link: formState.link || '#',
      duration: formState.duration,
      syllabus: [] // Standard default syllabus
    }, {
      onSuccess: () => {
        setIsFormOpen(false);
        setFormState(initialFormState);
      },
      onError: (err: any) => {
        alert('Erro ao salvar: ' + (err.message || 'Desconhecido'));
        setIsFormOpen(false);
      }
    });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setDeleteConfirmId(null);
      },
      onError: (err: any) => {
        alert('Erro ao excluir: ' + (err.message || 'Desconhecido'));
        setDeleteConfirmId(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Gerenciar Cursos e Especializações</h1>
          <p className="text-xs text-slate-400 mt-1">Insira novas certificações, bootcamps ou cursos de especialização técnica</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary hover:bg-brand-primary/80 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-brand-primary/15"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Curso</span>
        </button>
      </div>

      {/* Main List */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
            <p className="text-slate-400 text-sm">Carregando cursos...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-400 text-sm">Nenhum curso cadastrado.</p>
            <button
              onClick={handleOpenCreate}
              className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 text-xs text-slate-200 border border-white/5 rounded-lg transition-all"
            >
              Criar o primeiro curso
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {courses.map((course: any) => (
              <div key={course.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white/[0.01] transition-colors">
                
                {/* Info */}
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-14 h-14 rounded-xl bg-slate-800 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                    {course.imageUrl ? (
                      <img 
                        src={course.imageUrl || undefined} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                        onError={(e: any) => { e.target.src = ''; }}
                      />
                    ) : (
                      <Award className="w-6 h-6 text-brand-primary" />
                    )}
                  </div>
                  <div className="space-y-1.5 min-w-0">
                    <h3 className="font-bold text-white text-base truncate">{course.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">{course.description}</p>
                    
                    {/* Issuer, Duration, Date, Category */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 text-[11px] text-slate-400">
                      <span className="text-brand-primary font-bold uppercase tracking-wider">{course.category}</span>
                      <span className="text-slate-300 font-medium">Emitido por: <strong>{course.issuer}</strong></span>
                      {course.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {course.duration}
                        </span>
                      )}
                      <span>Ano: <strong>{course.date}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t border-white/5 md:border-t-0 pt-3 md:pt-0 shrink-0">
                  {course.link && course.link !== '#' && (
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition-all"
                      title="Ver Link do Curso"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => handleOpenEdit(course)}
                    className="p-2 bg-white/5 hover:bg-white/10 text-blue-400 hover:text-blue-300 rounded-lg transition-all"
                    title="Editar Curso"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(course.id)}
                    className="p-2 bg-white/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg transition-all"
                    title="Excluir Curso"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111827] border border-white/5 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative space-y-4">
            
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white">
              {formState.id ? 'Editar Curso' : 'Novo Curso'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Título do Curso</label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={e => setFormState({ ...formState, title: e.target.value })}
                  placeholder="Ex: IA para Dev e Automação"
                  className="w-full px-4 py-2.5 bg-[#030712] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Categoria</label>
                <select
                  value={formState.category}
                  onChange={e => setFormState({ ...formState, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#030712] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Instituição / Emissor</label>
                <input
                  type="text"
                  required
                  value={formState.issuer}
                  onChange={e => setFormState({ ...formState, issuer: e.target.value })}
                  placeholder="Ex: Rocketseat, Google Cloud, Trybe"
                  className="w-full px-4 py-2.5 bg-[#030712] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Descrição do Conteúdo</label>
                <textarea
                  required
                  rows={4}
                  value={formState.description}
                  onChange={e => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Escreva sobre os tópicos de especialização e tecnologias cobertas..."
                  className="w-full px-4 py-2.5 bg-[#030712] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Duração (Horas/Semanas)</label>
                  <input
                    type="text"
                    value={formState.duration}
                    onChange={e => setFormState({ ...formState, duration: e.target.value })}
                    placeholder="Ex: 60 horas"
                    className="w-full px-4 py-2.5 bg-[#030712] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Ano de Conclusão</label>
                  <input
                    type="text"
                    required
                    value={formState.date}
                    onChange={e => setFormState({ ...formState, date: e.target.value })}
                    placeholder="Ex: 2026"
                    className="w-full px-4 py-2.5 bg-[#030712] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Selecionar Imagem & URL do Selo / Imagem
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="w-full sm:w-1/3 shrink-0">
                    <select
                      value={availableImages.find(img => img.url === formState.imageUrl)?.url || ''}
                      onChange={(e) => {
                        const selectedUrl = e.target.value;
                        setFormState(prev => ({ ...prev, imageUrl: selectedUrl }));
                      }}
                      className="w-full px-3 py-2.5 bg-[#030712] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary cursor-pointer h-[42px]"
                    >
                      <option value="">-- Selecionar Asset --</option>
                      {availableImages.map((img, idx) => (
                        <option key={`${img.name}-${idx}`} value={img.url}>
                          {img.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={formState.imageUrl}
                      onChange={e => setFormState({ ...formState, imageUrl: e.target.value })}
                      placeholder="Ex: https://images.unsplash.com/..."
                      className="w-full px-4 py-2.5 bg-[#030712] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary h-[42px]"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <label 
                      className="p-2.5 bg-brand-primary/10 hover:bg-brand-primary border border-brand-primary/20 text-brand-primary hover:text-white rounded-xl transition-all cursor-pointer flex items-center justify-center group h-[42px] w-[42px]"
                      title="Adicionar imagem do computador (< 1MB)"
                    >
                      <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-2.5 bg-red-500/10 hover:bg-red-500 border border-red-500/20 text-red-400 hover:text-white rounded-xl transition-all cursor-pointer flex items-center justify-center group h-[42px] w-[42px]"
                      title="Remover imagem ou limpar campo"
                    >
                      <Minus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Real-time Cover Image Preview */}
                {formState.imageUrl && (
                  <div className="mt-3 p-2 bg-[#030712] border border-white/5 rounded-xl flex items-center gap-4 animate-fadeIn">
                    <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-slate-800">
                      <img 
                        src={formState.imageUrl} 
                        alt="Visualização" 
                        className="w-full h-full object-cover"
                        onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80'; }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-slate-300 truncate">
                        {availableImages.find(img => img.url === formState.imageUrl)?.name || 'Imagem customizada / externa'}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">{formState.imageUrl}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Link do Certificado / Site</label>
                <input
                  type="text"
                  value={formState.link}
                  onChange={e => setFormState({ ...formState, link: e.target.value })}
                  placeholder="Ex: https://rocketseat.com.br/..."
                  className="w-full px-4 py-2.5 bg-[#030712] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl text-sm transition-all border border-white/5"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary hover:bg-brand-primary/80 disabled:bg-brand-primary/40 text-white rounded-xl text-sm font-bold transition-all"
                >
                  {saveMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{formState.id ? 'Salvar Alterações' : 'Salvar Curso'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111827] border border-white/5 rounded-2xl max-w-sm w-full shadow-2xl p-6 space-y-4">
            
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-lg font-bold text-white">Confirmar Exclusão</h3>
            </div>

            <p className="text-sm text-slate-400">
              Tem certeza de que deseja excluir este curso/certificação do seu portfólio? Essa ação é permanente.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl text-sm transition-all border border-white/5"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={deleteMutation.isPending}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:bg-red-600/40 text-white rounded-xl text-sm font-bold transition-all"
              >
                {deleteMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Excluir</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
