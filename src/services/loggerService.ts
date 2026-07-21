import { collection, addDoc, getDocs, doc, updateDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ErrorInfo } from 'react';

export interface ErrorLog {
  id: string;
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  userAgent: string;
  userId?: string | null;
  userEmail?: string | null;
  timestamp: any;
  timestampFormatted?: string;
  resolved: boolean;
}

export async function logCriticalError(error: Error, errorInfo?: ErrorInfo) {
  try {
    const errorData = {
      message: error.message || 'Erro desconhecido',
      stack: error.stack || '',
      componentStack: errorInfo?.componentStack || '',
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      userId: auth.currentUser?.uid || null,
      userEmail: auth.currentUser?.email || null,
      timestamp: serverTimestamp(),
      resolved: false,
    };

    // Print to console for development visibility
    console.error('[LoggerService] Gravando erro crítico no Firestore:', errorData);

    const docRef = await addDoc(collection(db, 'error_logs'), errorData);
    return docRef.id;
  } catch (err) {
    console.error('[LoggerService] Falha ao enviar log de erro para o Firestore:', err);
    return null;
  }
}

// React Query hooks for Error Log administration
export function useErrorLogsQuery() {
  return useQuery<ErrorLog[]>({
    queryKey: ['error_logs'],
    queryFn: async () => {
      try {
        const q = query(collection(db, 'error_logs'), orderBy('timestamp', 'desc'));
        const snap = await getDocs(q);
        return snap.docs.map(doc => {
          const data = doc.data();
          // Convert Firestore timestamp to Date or string safely
          const ts = data.timestamp;
          let formattedDate = 'N/A';
          if (ts) {
            formattedDate = ts.toDate ? ts.toDate().toLocaleString('pt-BR') : new Date(ts).toLocaleString('pt-BR');
          }
          return {
            id: doc.id,
            ...data,
            timestampFormatted: formattedDate,
          } as any;
        });
      } catch (err) {
        console.error('Falha ao buscar logs de erro:', err);
        return [];
      }
    },
    refetchInterval: 10000, // Poll every 10 seconds to keep admin updated
    staleTime: 5000,
  });
}

export function useResolveErrorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const docRef = doc(db, 'error_logs', id);
      await updateDoc(docRef, { resolved: true });
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['error_logs'] });
    }
  });
}
