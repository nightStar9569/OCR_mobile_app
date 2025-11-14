// src/features/auth/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type User = {
  uid: string;
  email?: string | null;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const LOCAL_USER_KEY = 'mock_app_user_v1';

/**
 * MockAuthProvider
 * - lightweight local-storage-backed auth for development
 * - returns the same API shape used by the app (user, loading, signIn, signOut)
 *
 * Replace with real Firebase logic in production.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Simulate a tiny startup "auth check"
    setLoading(true);
    const t = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(t);
  }, []);

  const signIn = async (email: string) => {
    setLoading(true);
    // simulate server delay
    await new Promise((r) => setTimeout(r, 200));
    const mockUser: User = { uid: 'local-' + (email || 'user'), email };
    setUser(mockUser);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockUser));
    setLoading(false);
    return mockUser;
  };

  const signOut = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 150));
    setUser(null);
    localStorage.removeItem(LOCAL_USER_KEY);
    setLoading(false);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      signIn,
      signOut,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};