'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useToast } from './use-toast';

type User = {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  role: 'admin' | 'faculty' | 'student';
};

type AuthContextType = {
  user: User | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  setUserRole: (role: User['role']) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  const mockFunction = async () => {
    toast({
      title: 'Feature Removed',
      description: 'Authentication has been removed from this application.',
      variant: 'destructive'
    });
    return Promise.resolve();
  }

  const value = { 
    user: null, 
    loginWithGoogle: mockFunction, 
    loginWithEmail: mockFunction, 
    signUpWithEmail: mockFunction, 
    logout: () => {}, 
    isLoading: false, 
    setUserRole: async (role: User['role']) => mockFunction()
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
