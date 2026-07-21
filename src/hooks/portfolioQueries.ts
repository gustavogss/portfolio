import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { useTelemetryStore } from '../services/telemetryService';
import { 
  PROJECTS, 
  BLOG_POSTS, 
  COURSES, 
  TECH_CATEGORIES, 
  EXPERIENCES, 
  EDUCATION, 
  CERTIFICATIONS 
} from '../constants';

// Helper to fetch and measure latency
async function fetchWithTiming<T>(entity: string, fetchFn: () => Promise<T>): Promise<T> {
  const start = performance.now();
  try {
    const data = await fetchFn();
    const duration = performance.now() - start;
    useTelemetryStore.getState().recordRead(entity, duration, 'NETWORK');
    return data;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, entity);
    throw error;
  }
}

// Helper to remove undefined values before saving to Firestore
const sanitizeData = (obj: any) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
};

// Wrapper hook to detect and record React Query Cache Hits
function useCacheMonitor(queryKey: string[], queryResult: any) {
  const { isSuccess, isFetching, data } = queryResult;
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isSuccess && !isFetching && data) {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        // Served instantly from Cache
        useTelemetryStore.getState().recordRead(queryKey[0], 220, 'HIT'); // 220ms saved on avg
      }
    } else if (isFetching) {
      // If fetching starts, reset first render tracker so next cached serve is counted
      isFirstRender.current = true;
    }
  }, [isSuccess, isFetching, data, queryKey]);
}

// 1. Projects Hooks
export function useProjectsQuery() {
  const queryResult = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchWithTiming('projects', async () => {
      const snap = await getDocs(collection(db, 'projects'));
      const dbItems = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      const deletedIds = dbItems.filter(item => item._deleted).map(item => item.id);
      const activeDbItems = dbItems.filter(item => !item._deleted);
      const fallbackItems = PROJECTS.filter(p => !deletedIds.includes(p.id) && !activeDbItems.some(dbItem => dbItem.id === p.id));
      return [...activeDbItems, ...fallbackItems];
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useCacheMonitor(['projects'], queryResult);
  return queryResult;
}

export function useSaveProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (project: { id?: string; name: string; description: string; techs: string[]; imageUrl: string; link?: string }) => {
      const start = performance.now();
      try {
        const cleanData = sanitizeData(project);
        if (project.id) {
          const docRef = doc(db, 'projects', project.id);
          await setDoc(docRef, cleanData, { merge: true });
        } else {
          const collRef = collection(db, 'projects');
          const docRef = await addDoc(collRef, cleanData);
          project.id = docRef.id;
          await setDoc(docRef, { id: docRef.id }, { merge: true });
        }
        const duration = performance.now() - start;
        useTelemetryStore.getState().recordWrite('projects', duration);
        return project;
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'projects');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const start = performance.now();
      try {
        const isFallback = PROJECTS.some(p => p.id === id);
        if (isFallback) {
          await setDoc(doc(db, 'projects', id), { _deleted: true });
        } else {
          await deleteDoc(doc(db, 'projects', id));
        }
        const duration = performance.now() - start;
        useTelemetryStore.getState().recordWrite('projects', duration);
        return id;
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });
}

// 2. Posts Hooks
export function usePostsQuery() {
  const queryResult = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchWithTiming('posts', async () => {
      const snap = await getDocs(collection(db, 'posts'));
      const dbItems = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      const deletedIds = dbItems.filter(item => item._deleted).map(item => item.id);
      const activeDbItems = dbItems.filter(item => !item._deleted);
      const fallbackItems = BLOG_POSTS.filter(p => !deletedIds.includes(p.id) && !activeDbItems.some(dbItem => dbItem.id === p.id));
      return [...activeDbItems, ...fallbackItems];
    }),
    staleTime: 5 * 60 * 1000,
  });

  useCacheMonitor(['posts'], queryResult);
  return queryResult;
}

export function useSavePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (post: { id?: string; title: string; summary: string; content?: string; date: string; imageUrl: string; category: string }) => {
      const start = performance.now();
      try {
        const cleanData = sanitizeData(post);
        if (post.id) {
          const docRef = doc(db, 'posts', post.id);
          await setDoc(docRef, cleanData, { merge: true });
        } else {
          const collRef = collection(db, 'posts');
          const docRef = await addDoc(collRef, cleanData);
          post.id = docRef.id;
          await setDoc(docRef, { id: docRef.id }, { merge: true });
        }
        const duration = performance.now() - start;
        useTelemetryStore.getState().recordWrite('posts', duration);
        return post;
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'posts');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
}

export function useDeletePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const start = performance.now();
      try {
        const isFallback = BLOG_POSTS.some(p => p.id === id);
        if (isFallback) {
          await setDoc(doc(db, 'posts', id), { _deleted: true });
        } else {
          await deleteDoc(doc(db, 'posts', id));
        }
        const duration = performance.now() - start;
        useTelemetryStore.getState().recordWrite('posts', duration);
        return id;
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `posts/${id}`);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
}

// 3. Courses Hooks
export function useCoursesQuery() {
  const queryResult = useQuery({
    queryKey: ['courses'],
    queryFn: () => fetchWithTiming('courses', async () => {
      const snap = await getDocs(collection(db, 'courses'));
      const dbItems = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      const deletedIds = dbItems.filter(item => item._deleted).map(item => item.id);
      const activeDbItems = dbItems.filter(item => !item._deleted);
      const fallbackItems = COURSES.filter(p => !deletedIds.includes(p.id) && !activeDbItems.some(dbItem => dbItem.id === p.id));
      return [...activeDbItems, ...fallbackItems];
    }),
    staleTime: 5 * 60 * 1000,
  });

  useCacheMonitor(['courses'], queryResult);
  return queryResult;
}

export function useSaveCourseMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (course: { id?: string; title: string; description: string; category: string; issuer: string; date: string; imageUrl: string; link: string; syllabus?: string[]; duration?: string }) => {
      const start = performance.now();
      try {
        const cleanData = sanitizeData(course);
        if (course.id) {
          const docRef = doc(db, 'courses', course.id);
          await setDoc(docRef, cleanData, { merge: true });
        } else {
          const collRef = collection(db, 'courses');
          const docRef = await addDoc(collRef, cleanData);
          course.id = docRef.id;
          await setDoc(docRef, { id: docRef.id }, { merge: true });
        }
        const duration = performance.now() - start;
        useTelemetryStore.getState().recordWrite('courses', duration);
        return course;
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'courses');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });
}

export function useDeleteCourseMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const start = performance.now();
      try {
        const isFallback = COURSES.some(c => c.id === id);
        if (isFallback) {
          await setDoc(doc(db, 'courses', id), { _deleted: true });
        } else {
          await deleteDoc(doc(db, 'courses', id));
        }
        const duration = performance.now() - start;
        useTelemetryStore.getState().recordWrite('courses', duration);
        return id;
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `courses/${id}`);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });
}

// 4. Skills Hooks
export function useSkillsQuery() {
  const queryResult = useQuery({
    queryKey: ['skills'],
    queryFn: () => fetchWithTiming('skills', async () => {
      const snap = await getDocs(collection(db, 'skills'));
      const dbItems = snap.docs.map(doc => {
        const data = doc.data();
        const categoryName = data.name || data.title || '';
        const skillsList = data.skills || data.items || [];
        return {
          id: doc.id,
          ...data,
          name: categoryName,
          title: categoryName,
          skills: skillsList,
          items: skillsList,
        } as any;
      });
      const deletedIds = dbItems.filter(item => item._deleted).map(item => item.id);
      const activeDbItems = dbItems.filter(item => !item._deleted);
      
      const fallbackItems = TECH_CATEGORIES.map((cat, idx) => {
        const categoryName = cat.title || (cat as any).name || '';
        const skillsList = cat.items || (cat as any).skills || [];
        return {
          ...cat,
          id: `tc-${idx}`,
          name: categoryName,
          title: categoryName,
          skills: skillsList,
          items: skillsList,
        };
      }).filter(p => !deletedIds.includes(p.id) && !activeDbItems.some(dbItem => dbItem.id === p.id));
      
      return [...activeDbItems, ...fallbackItems];
    }),
    staleTime: 5 * 60 * 1000,
  });

  useCacheMonitor(['skills'], queryResult);
  return queryResult;
}

export function useSaveSkillMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (skillCategory: { id?: string; name: string; skills: string[] }) => {
      try {
        const cleanData = sanitizeData(skillCategory);
        if (skillCategory.id) {
          const docRef = doc(db, 'skills', skillCategory.id);
          await setDoc(docRef, cleanData, { merge: true });
        } else {
          const collRef = collection(db, 'skills');
          const docRef = await addDoc(collRef, cleanData);
          skillCategory.id = docRef.id;
          await setDoc(docRef, { id: docRef.id }, { merge: true });
        }
        return skillCategory;
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'skills');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    }
  });
}

export function useDeleteSkillMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const isFallback = id.startsWith('tc-');
        if (isFallback) {
          await setDoc(doc(db, 'skills', id), { _deleted: true });
        } else {
          await deleteDoc(doc(db, 'skills', id));
        }
        return id;
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `skills/${id}`);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    }
  });
}

// 5. Settings Hooks
export function useSettingsQuery() {
  const queryResult = useQuery({
    queryKey: ['settings'],
    queryFn: () => fetchWithTiming('settings', async () => {
      const snap = await getDocs(collection(db, 'settings'));
      const defaultSettings = {
        name: 'Gustavo Souza',
        title: 'Software Engineer | Full Stack | Mobile | DevSecOps | AppSec',
        description: 'Engenheiro de Software com experiência no desenvolvimento Full Stack e Mobile, além de atuar com práticas de DevSecOps e segurança de aplicações (AppSec). Desenvolvo APIs e interfaces modernas com foco em código limpo e automação de testes. Atualmente, realizo estudos práticos em Inteligência Artificial e orquestração de LLMs para automação de processos.',
        github: 'https://github.com/gustavogss',
        linkedin: 'https://www.linkedin.com/in/gustavosouza-jp/',
        email: 'contato@gustavosouza.dev.br',
        photoUrl: ''
      };
      if (snap.empty) return defaultSettings;
      return { ...defaultSettings, ...snap.docs[0].data(), id: snap.docs[0].id };
    }),
    staleTime: 5 * 60 * 1000,
  });

  useCacheMonitor(['settings'], queryResult);
  return queryResult;
}

export function useSaveSettingsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settings: any) => {
      try {
        const cleanData = sanitizeData(settings);
        const snap = await getDocs(collection(db, 'settings'));
        if (!snap.empty) {
          const docId = snap.docs[0].id;
          await setDoc(doc(db, 'settings', docId), cleanData, { merge: true });
        } else {
          await addDoc(collection(db, 'settings'), cleanData);
        }
        return settings;
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'settings');
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    }
  });
}
