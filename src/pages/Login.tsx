import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dsb');
    }
  }, [user, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(username, password)) {
      navigate('/dsb');
    } else {
      setError('Credenciais inválidas.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] p-4">
      <div className="w-full max-w-md bg-[#111827] border border-white/5 p-8 rounded-3xl shadow-2xl flex flex-col items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-2xl mb-6 cursor-pointer hover:ring-2 hover:ring-brand-primary transition-all" />
        </Link>
        <h1 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h1>
        <p className="text-slate-400 text-sm mb-8 text-center">
          Faça login para acessar o painel administrativo do portfólio.
        </p>
        
        {error && (
          <div className="w-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-slate-300 mb-1 block">Usuário</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              placeholder="Digite o usuário"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300 mb-1 block">Senha</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="flex items-center gap-3 w-full justify-center mt-4 px-6 py-3.5 bg-brand-primary hover:bg-brand-primary/80 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-primary/20 border border-brand-primary"
          >
            <LogIn className="w-5 h-5" />
            <span>Entrar</span>
          </button>
        </form>
      </div>
    </div>
  );
}
