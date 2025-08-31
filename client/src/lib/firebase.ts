import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, getRedirectResult, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.firebasestorage.app`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Auth providers
export const googleProvider = new GoogleAuthProvider();

// Auth functions
export const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    console.error('Error with popup sign-in:', error);
    throw error;
  }
};

export const signInWithGoogleRedirect = () => {
  return signInWithRedirect(auth, googleProvider);
};

// Use popup for development with fallback to redirect if popup is blocked
export const signInWithGoogle = async () => {
  // Try popup first for better UX
  try {
    return await signInWithGooglePopup();
  } catch (error: any) {
    // If popup is blocked, fallback to redirect
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
      console.log('Popup blocked, falling back to redirect...');
      return signInWithGoogleRedirect();
    }
    // For other errors, rethrow
    throw error;
  }
};

// Handle redirect result when user comes back from Google (only needed for redirect flow)
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    return result;
  } catch (error) {
    console.error('Error handling redirect result:', error);
    throw error;
  }
};

export const logout = () => {
  return signOut(auth);
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
