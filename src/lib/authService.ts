import { auth, googleProvider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export function subscribeToAuth(onUserChanged: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, onUserChanged);
}

export async function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function logoutUser() {
  return signOut(auth);
}
