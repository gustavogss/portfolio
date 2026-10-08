import React, { useState } from 'react';
import { useSkillsQuery, useSaveSkillMutation, useDeleteSkillMutation } from '../hooks/portfolioQueries';
import { Code2, ShieldAlert, Smartphone, Database, Loader2, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SkillsAdmin() {
  const { data: categories = [], isLoading } = useSkillsQuery();
  const saveMutation = useSaveSkillMutation();
  const deleteMutation = useDeleteSkillMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const initialFormState = { id: '', name: '', skills: '' };
  const [formState, setFormState] = useState(initialFormState);

  // Pick suitable category icon
  const getCategoryIcon = (name: string) => {
    if (!name) return Code2;
    const lowercase = name.toLowerCase();
    if (lowercase.includes('sec') || lowercase.includes('segurança')) return ShieldAlert;
    if (lowercase.includes('mobile') || lowercase.includes('frontend')) return Smartphone;
    if (lowercase.includes('ia') || lowercase.includes('dados')) return Database;
    return Code2;
  };

  const handleEdit = (cat: any) => {
    setFormState({
      id: cat.id || '',
      name: cat.name || '',
      skills: cat.skills ? cat.skills.join(', ') : ''
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = formState.skills.split(',').map(s => s.trim()).filter(Boolean);
    const dataToSave: any = {
      name: formState.name,
      skills: skillsArray
    };
    if (formState.id) {
      dataToSave.id = formState.id;
    }

    saveMutation.mutate(dataToSave, {
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
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Habilidades</h1>
          <p className="text-xs text-slate-400 mt-1">Gerencie suas categorias de habilidades e tecnologias</p>
        </div>
        <button
          onClick={() => {
            setFormState(initialFormState);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white text-sm font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Categoria</span>
        </button>
      </div>

      {isLoading ? (
        <div className="bg-[#111827] border border-white/5 p-12 rounded-2xl flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
          <p className="text-slate-400 text-sm">Carregando mapa de habilidades...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl text-center text-slate-400 text-sm">
          Nenhuma habilidade cadastrada.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat: any) => {
            const IconComponent = getCategoryIcon(cat.name);
            return (
              <div key={cat.id} className="bg-[#111827] border border-white/5 p-6 rounded-2xl space-y-4 hover:border-brand-primary/20 transition-all relative group">
                
                {/* Actions */}
                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEdit(cat)}
                    className="p-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setDeleteConfirmId(cat.id)}
                    className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3 pr-16">
                  <div className="p-2.5 bg-brand-primary/10 text-brand-primary rounded-xl shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base truncate">{cat.name}</h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {cat.skills?.map((skill: string, skillIdx: number) => (
                    <span 
                      key={skillIdx} 
                      className="px-3 py-1.5 bg-[#1f2937]/50 border border-white/5 hover:border-brand-primary/10 text-slate-300 text-xs rounded-xl font-mono hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsFormOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-[5%] left-0 right-0 mx-auto w-full max-w-lg bg-[#111827] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#030712]/50 shrink-0">
                <h2 className="text-lg font-bold text-white">
                  {formState.id ? 'Editar Categoria' : 'Nova Categoria'}
                </h2>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <form id="skill-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Nome da Categoria</label>
                    <input
                      required
                      type="text"
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Ex: Front-end, Back-end"
                      className="w-full px-4 py-2.5 bg-[#030712] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Tecnologias (separadas por vírgula)</label>
                    <textarea
                      required
                      rows={4}
                      value={formState.skills}
                      onChange={e => setFormState({ ...formState, skills: e.target.value })}
                      placeholder="React, TypeScript, TailwindCSS..."
                      className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary transition-colors resize-none"
                    />
                  </div>
                </form>
              </div>

              <div className="p-4 border-t border-white/10 bg-[#030712]/50 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  form="skill-form"
                  disabled={saveMutation.isPending}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white text-sm font-bold rounded-xl hover:bg-brand-primary/90 transition-all disabled:opacity-50"
                >
                  {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Salvar</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setDeleteConfirmId(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-[#111827] border border-white/10 rounded-2xl shadow-2xl z-50 p-6 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4 text-red-500">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Excluir Categoria?</h3>
              <p className="text-sm text-slate-400 mb-6">Tem certeza que deseja excluir esta categoria? Esta ação não poderá ser desfeita.</p>
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  disabled={deleteMutation.isPending}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors text-sm flex justify-center items-center gap-2 disabled:opacity-50"
                >
                  {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Excluir'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
