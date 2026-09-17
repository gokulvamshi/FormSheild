'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '@/lib/firebase';
import { useUserStore } from '@/store/useUserStore';

export interface DbUser {
  id: string;
  firebaseUid?: string | null;
  email?: string | null;
  phone?: string | null;
  name: string | null;
  avatar?: string | null;
  digilockerConnected: boolean;
  mockMode: boolean;
}

interface AuthContextType {
  user: DbUser | null;
  dbUser: DbUser | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  isConfigured: boolean;
  loginWithGoogle: () => Promise<DbUser>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);

  const { setUser, clearUser } = useUserStore();

  const refreshProfile = useCallback(async () => {
    try {
      const res = await fetch('/api/user/profile');
      if (res.ok) {
        const data = await res.json();
        setDbUser(data);
        setUser(data);
      }
    } catch (e) {
      console.error('Failed to refresh user profile:', e);
    }
  }, [setUser]);

  useEffect(() => {
    if (!auth) {
      // If Firebase is not configured or running server-side
      refreshProfile().finally(() => setLoading(false));
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        // Sync Firebase User with Prisma database
        try {
          const syncRes = await fetch('/api/auth/sync-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uid: fbUser.uid,
              email: fbUser.email,
              name: fbUser.displayName,
              avatar: fbUser.photoURL,
              phone: fbUser.phoneNumber,
            }),
          });
          if (syncRes.ok) {
            const data = await syncRes.json();
            setDbUser(data.user);
            setUser(data.user);
          }
        } catch (err) {
          console.error('Error syncing auth state with database:', err);
        }
      } else {
        // Check if there is an existing cookie session
        await refreshProfile();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [refreshProfile, setUser]);

  const loginWithGoogle = useCallback(async (): Promise<DbUser> => {
    if (!auth || !googleProvider) {
      throw new Error(
        'Firebase Google Auth is not configured. Please check your NEXT_PUBLIC_FIREBASE_* variables in .env'
      );
    }

    // Trigger Google Sign-In Popup
    const result = await signInWithPopup(auth, googleProvider);
    const fbUser = result.user;

    // Sync with database
    const syncRes = await fetch('/api/auth/sync-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: fbUser.uid,
        email: fbUser.email,
        name: fbUser.displayName,
        avatar: fbUser.photoURL,
        phone: fbUser.phoneNumber,
      }),
    });

    const data = await syncRes.json();
    if (!syncRes.ok) {
      throw new Error(data.error || 'Failed to sync Google user with database.');
    }

    setFirebaseUser(fbUser);
    setDbUser(data.user);
    setUser(data.user);
    return data.user;
  }, [setUser]);

  const signOut = useCallback(async () => {
    try {
      if (auth) {
        await firebaseSignOut(auth);
      }
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Error during sign out:', e);
    } finally {
      setFirebaseUser(null);
      setDbUser(null);
      clearUser();
    }
  }, [clearUser]);

  return (
    <AuthContext.Provider
      value={{
        user: dbUser,
        dbUser,
        firebaseUser,
        loading,
        isConfigured: isFirebaseConfigured,
        loginWithGoogle,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
