import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp, collection, getDocs, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDummyKeyForClientAppSafeInit',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'portfolio-gustavo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'portfolio-gustavo',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'portfolio-gustavo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1234567890:web:abcdef',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID
};

export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_API_KEY !== 'AIzaSyDummyKeyForClientAppSafeInit'
);

const app = initializeApp(firebaseConfig);
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);

// Error handler as requested in instructions
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// AI Generation Limit Logic
const MAX_GENERATIONS = 5;

export async function checkGenerationLimit(userId: string): Promise<{ allowed: boolean, remaining: number }> {
    const docRef = doc(db, 'usage', userId);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const count = data.generationsCount || 0;
            return {
                allowed: count < MAX_GENERATIONS,
                remaining: Math.max(0, MAX_GENERATIONS - count)
            };
        } else {
            return { allowed: true, remaining: MAX_GENERATIONS };
        }
    } catch (error) {
        handleFirestoreError(error, OperationType.GET, `usage/${userId}`);
        return { allowed: false, remaining: 0 };
    }
}

export async function incrementGenerationCount(userId: string) {
    const docRef = doc(db, 'usage', userId);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await updateDoc(docRef, {
                generationsCount: (docSnap.data().generationsCount || 0) + 1,
                lastGenerationAt: serverTimestamp()
            });
        } else {
            await setDoc(docRef, {
                userId,
                generationsCount: 1,
                lastGenerationAt: serverTimestamp()
            });
        }
    } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `usage/${userId}`);
    }
}

export { serverTimestamp };
