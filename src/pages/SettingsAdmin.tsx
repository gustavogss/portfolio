import React, { useState, useEffect } from 'react';
import { useSettingsQuery, useSaveSettingsMutation } from '../hooks/portfolioQueries';
import { User, Shield, Briefcase, Github, Linkedin, Mail, Loader2, Save, Camera, Upload } from 'lucide-react';

const DEFAULT_PHOTO = "https://github.com/gustavogss.png";

export default function SettingsAdmin() {
  const { data: settings, isLoading } = useSettingsQuery();
  const saveMutation = useSaveSettingsMutation();
  const [formState, setFormState] = useState({
    name: '',
    title: '',
    description: '',
    github: '',
    linkedin: '',
    email: '',
    photoUrl: ''
  });

  useEffect(() => {
    if (settings) {
      setFormState({
        name: settings.name || '',
        title: settings.title || '',
        description: settings.description || '',
        github: settings.github || '',
        linkedin: settings.linkedin || '',
        email: settings.email || '',
        photoUrl: settings.photoUrl || ''
      });
    }
  }, [settings]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState(prev => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    saveMutation.mutate(formState, {
      onSuccess: () => {
        alert('Configurações salvas com sucesso!');
      },
      onError: (err: any) => {
        alert('Erro ao salvar configurações: ' + (err.message || 'Desconhecido'));
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Configurações do Perfil</h1>
          <p className="text-xs text-slate-400 mt-1">Veja ou configure as informações básicas que aparecem nas seções do seu Portfólio</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saveMutation.isPending}
          className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white text-sm font-bold rounded-xl hover:bg-brand-primary/90 transition-all disabled:opacity-50"
        >
          {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Salvar Configurações</span>
        </button>
      </div>

      {isLoading ? (
        <div className="bg-[#111827] border border-white/5 p-12 rounded-2xl flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
          <p className="text-slate-400 text-sm">Carregando dados de perfil...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main profile card */}
          <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl space-y-4 lg:col-span-1 flex flex-col items-center text-center justify-center">
            <div className="relative group/avatar">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-primary to-emerald-500 p-1 relative overflow-hidden">
                <div className="w-full h-full rounded-full bg-[#030712] flex items-center justify-center overflow-hidden">
                  <img 
                    src={formState.photoUrl || DEFAULT_PHOTO} 
                    alt="Foto do perfil" 
                    className="w-full h-full object-cover rounded-full" 
                  />
                </div>
              </div>
              
              {/* Image upload overlay */}
              <label 
                className="absolute inset-0 w-24 h-24 rounded-full bg-black/60 opacity-0 group-hover/avatar:opacity-100 flex flex-col items-center justify-center gap-1 cursor-pointer transition-opacity text-white text-[10px] font-bold"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    if (file.size > 2 * 1024 * 1024) {
                      alert('A imagem deve ter no máximo 2MB');
                      return;
                    }
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormState(prev => ({ ...prev, photoUrl: reader.result as string }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              >
                <Camera className="w-5 h-5 text-white animate-pulse" />
                <span>Alterar Foto</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden" 
                />
              </label>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{formState.name}</h2>
              <p className="text-xs text-brand-primary font-mono font-bold mt-1 uppercase tracking-wider">{formState.title}</p>
            </div>
            <div className="w-full border-t border-white/5 pt-4 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <span>Status de Segurança</span>
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <Shield className="w-3.5 h-3.5" />
                  Módulo Ativo
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Versão de Depuração</span>
                <span className="font-mono text-[10px]">v2.6.0-stable</span>
              </div>
            </div>
          </div>

          {/* Form fields representation (Editable settings) */}
          <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl lg:col-span-2 space-y-6">
            <h3 className="text-base font-bold text-white border-b border-white/5 pb-3">Informações de Contato e Bio</h3>

            <div className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Nome</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#030712] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Cargo / Título</label>
                  <input
                    type="text"
                    value={formState.title}
                    onChange={e => setFormState({ ...formState, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#030712] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-brand-primary" />
                  Foto do Perfil (URL ou Upload)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formState.photoUrl}
                    onChange={e => setFormState({ ...formState, photoUrl: e.target.value })}
                    placeholder="Cole a URL de uma imagem ou faça o upload"
                    className="flex-1 px-4 py-2.5 bg-[#030712] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                  />
                  <label className="flex items-center justify-center px-4 py-2 bg-[#030712]/50 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors select-none">
                    <Upload className="w-4 h-4 mr-1.5 text-slate-400" />
                    <span>Upload</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Bio Profissional</label>
                <textarea
                  rows={3}
                  value={formState.description}
                  onChange={e => setFormState({ ...formState, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-slate-400" />
                    GitHub Link
                  </label>
                  <input
                    type="text"
                    value={formState.github}
                    onChange={e => setFormState({ ...formState, github: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#030712] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                    LinkedIn Link
                  </label>
                  <input
                    type="text"
                    value={formState.linkedin}
                    onChange={e => setFormState({ ...formState, linkedin: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#030712] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                  />
                </div>

              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  E-mail de Contato
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={e => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#030712] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
}
