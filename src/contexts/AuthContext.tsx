'use client';

import type { User } from '@/types';
import { mockUsers } from '@/lib/data';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  login: (userId: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for an existing session
    const storedUserId = localStorage.getItem('purrfectMatchUserId');
    if (storedUserId) {
      const foundUser = mockUsers.find(u => u.id === storedUserId);
      if (foundUser) {
        setUser(foundUser);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userId: string) => {
    const foundUser = mockUsers.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('purrfectMatchUserId', userId);
    } else {
      // For simplicity, if user not in mock, log in as first mock user
      setUser(mockUsers[0]); 
      localStorage.setItem('purrfectMatchUserId', mockUsers[0].id);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('purrfectMatchUserId');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
