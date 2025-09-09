# Google Firebase Login Implementation

This document explains how FireAuthFlow implements Google login using Firebase Authentication. It covers project configuration, authentication utilities, React hooks, and UI integration so you can adapt the pattern in your own applications.

## 1. Prerequisites

- A Firebase project with the **Google** sign‑in provider enabled
- Environment variables for your Firebase config (`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`)
- React 18 and TypeScript environment (Vite is used in this template)

## 2. Firebase Configuration

All Firebase logic lives in [`client/src/lib/firebase.ts`](client/src/lib/firebase.ts). The file initialises the Firebase app and exports helpers for Google authentication:

```ts
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
export const googleProvider = new GoogleAuthProvider();
```

### Sign‑in Helpers

The module exposes a popup‑first sign‑in function with automatic fallback to redirect when popups are blocked:

```ts
export const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error: any) {
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
      return signInWithRedirect(auth, googleProvider);
    }
    throw error;
  }
};

export const handleRedirectResult = async () => {
  const result = await getRedirectResult(auth);
  return result;
};

export const logout = () => signOut(auth);
export const onAuthStateChange = (cb: (user: User | null) => void) => onAuthStateChanged(auth, cb);
```

## 3. Authentication Context

[`client/src/hooks/use-auth.tsx`](client/src/hooks/use-auth.tsx) wraps Firebase's `onAuthStateChanged` in a React context so the entire app can react to login changes:

```tsx
const AuthContext = createContext({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};
```

## 4. Login Page

The login UI triggers Google sign‑in using the helper described above. See [`client/src/pages/login.tsx`](client/src/pages/login.tsx):

```tsx
const handleGoogleLogin = async () => {
  setIsLoading(true);
  try {
    await signInWithGoogle();
  } catch (error: any) {
    // handle error toast
  } finally {
    setIsLoading(false);
  }
};

<Button onClick={handleGoogleLogin} disabled={isLoading}>Continue with Google</Button>
```

Upon successful login the user is redirected to a protected dashboard, and `useAuth` provides the authenticated `user` object to any component.

## 5. Handling Redirect Results

When popups are blocked, the flow falls back to redirect. The `handleRedirectResult` helper is invoked once on app load (except on localhost) to complete the redirect authentication:

```ts
useEffect(() => {
  const checkRedirectResult = async () => {
    if (!window.location.hostname.includes('localhost') && !window.location.hostname.includes('.replit.dev')) {
      await handleRedirectResult();
    }
  };
  checkRedirectResult();
  const unsubscribe = onAuthStateChange((user) => {
    setUser(user);
    setLoading(false);
  });
  return unsubscribe;
}, []);
```

## 6. Summary

1. **Configure Firebase** with environment variables and enable the Google provider.
2. **Initialize** Firebase and export reusable auth helpers.
3. **Provide auth state** via a React context (`useAuth`).
4. **Trigger sign‑in** from the UI using `signInWithGoogle` with popup/redirect fallback.
5. **Handle redirect results** on startup to finish login when popups are blocked.

With this structure you can easily integrate Google authentication into any React/Vite project.

