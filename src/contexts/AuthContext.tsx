import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface User {
  uid: string;
  email: string | null;
  photoURL?: string | null;
  displayName?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => false,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for session
    const storedSession = localStorage.getItem('petinho_session');
    if (storedSession === 'authenticated') {
      setUser({
        uid: 'petinho-admin',
        email: 'petinho@admin.com',
        photoURL: null,
      });
    }
    setLoading(false);
  }, []);

  const login = (u: string, p: string) => {
    if (u === 'petinho' && p === '*G3u0g0a00#2026') {
      localStorage.setItem('petinho_session', 'authenticated');
      setUser({
        uid: 'petinho-admin',
        email: 'petinho@admin.com',
        photoURL: null,
      });
      return true;
    }
    return false;
  };

  const logout = async () => {
    localStorage.removeItem('petinho_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
