import React, { useState } from 'react';
import { 
  useProjectsQuery, 
  useSaveProjectMutation, 
  useDeleteProjectMutation 
} from '../hooks/portfolioQueries';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Globe, 
  Tag, 
  Loader2, 
  X, 
  AlertTriangle,
  Minus
} from 'lucide-react';

interface ProjectFormState {
  id?: string;
  name: string;
  description: string;
  techsString: string;
  imageUrl: string;
  link: string;
}

const initialFormState: ProjectFormState = {
  name: '',
  description: '',
  techsString: '',
  imageUrl: '',
  link: ''
};

const DEFAULT_ASSETS = [
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

export default function ProjectsAdmin() {
  const { data: projects = [], isLoading } = useProjectsQuery();
  const saveMutation = useSaveProjectMutation();
  const deleteMutation = useDeleteProjectMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formState, setFormState] = useState<ProjectFormState>(initialFormState);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [availableImages, setAvailableImages] = useState<{ name: string; url: string }[]>(() => {
    const stored = localStorage.getItem('blog_available_images');
    if (stored) {
      try {
        return JSON.parse(stored);
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
      // Se não estiver nos assets gerenciados, apenas limpamos o campo
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
    setFormState(initialFormState);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (project: any) => {
    setFormState({
      id: project.id,
      name: project.name || '',
      description: project.description || '',
      techsString: (project.techs || []).join(', '),
      imageUrl: project.imageUrl || '',
      link: project.link || ''
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.description) return;

    const techs = formState.techsString
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    saveMutation.mutate({
      id: formState.id,
      name: formState.name,
      description: formState.description,
      techs,
      imageUrl: formState.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
      link: formState.link
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
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Gerenciar Projetos</h1>
          <p className="text-xs text-slate-400 mt-1">Crie, edite ou remova projetos cadastrados no seu portfólio</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary hover:bg-brand-primary/80 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-brand-primary/15"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Projeto</span>
        </button>
      </div>

      {/* Main List */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
            <p className="text-slate-400 text-sm">Carregando projetos...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-400 text-sm">Nenhum projeto cadastrado.</p>
            <button
              onClick={handleOpenCreate}
              className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 text-xs text-slate-200 border border-white/5 rounded-lg transition-all"
            >
              Criar o primeiro projeto
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {projects.map((project: any) => (
              <div key={project.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white/[0.01] transition-colors">
                
                {/* Info */}
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-16 h-16 rounded-xl bg-slate-800 border border-white/10 overflow-hidden shrink-0">
                    <img 
                      src={project.imageUrl || undefined} 
                      alt={project.name} 
                      className="w-full h-full object-cover"
                      onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80'; }}
                    />
                  </div>
                  <div className="space-y-1.5 min-w-0">
                    <h3 className="font-bold text-white text-base truncate">{project.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 max-w-xl">{project.description}</p>
                    
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techs?.map((tech: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#1f2937] text-slate-300 rounded text-[10px] font-mono border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t border-white/5 md:border-t-0 pt-3 md:pt-0 shrink-0">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition-all"
                      title="Ver Link do Projeto"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="p-2 bg-white/5 hover:bg-white/10 text-blue-400 hover:text-blue-300 rounded-lg transition-all"
                    title="Editar Projeto"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(project.id)}
                    className="p-2 bg-white/5 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg transition-all"
                    title="Excluir Projeto"
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
              {formState.id ? 'Editar Projeto' : 'Novo Projeto'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Nome do Projeto</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Ex: FinexyIA"
                  className="w-full px-4 py-2.5 bg-[#030712] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Descrição</label>
                <textarea
                  required
                  rows={4}
                  value={formState.description}
                  onChange={e => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Escreva detalhadamente a proposta técnica..."
                  className="w-full px-4 py-2.5 bg-[#030712] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Tecnologias (Separadas por vírgula)</label>
                <input
                  type="text"
                  value={formState.techsString}
                  onChange={e => setFormState({ ...formState, techsString: e.target.value })}
                  placeholder="Ex: React Native, Expo, TypeScript"
                  className="w-full px-4 py-2.5 bg-[#030712] border border-white/5 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Selecionar Imagem & URL da Imagem de Capa
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
                        onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80'; }}
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
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Link do Repositório / Deploy</label>
                <input
                  type="text"
                  value={formState.link}
                  onChange={e => setFormState({ ...formState, link: e.target.value })}
                  placeholder="Ex: https://github.com/..."
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
                  <span>{formState.id ? 'Salvar Alterações' : 'Criar Projeto'}</span>
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
              Tem certeza de que deseja excluir este projeto permanentemente do seu portfólio? Essa ação não pode ser desfeita.
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
