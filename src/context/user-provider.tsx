'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface UserContextType {
  userName: string | null;
  partnerName: string | null;
  userIsKnown: boolean;
  saveUser: (userName: string, partnerName: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string | null>(null);
  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUserName = localStorage.getItem('userName');
      const storedPartnerName = localStorage.getItem('partnerName');
      if (storedUserName && storedPartnerName) {
        setUserName(storedUserName);
        setPartnerName(storedPartnerName);
      }
    } catch (error) {
      console.error("Failed to access localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = (newUserName: string, newPartnerName: string) => {
    try {
        localStorage.setItem('userName', newUserName);
        localStorage.setItem('partnerName', newPartnerName);
        setUserName(newUserName);
        setPartnerName(newPartnerName);
    } catch (error) {
        console.error("Failed to save to localStorage", error);
    }
  };

  const userIsKnown = !isLoading && !!userName && !!partnerName;

  if (isLoading) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-8">
                <Skeleton className="h-16 w-16 mx-auto rounded-full" />
                <Skeleton className="h-8 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-full mx-auto" />
                <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </div>
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
    );
  }

  return (
    <UserContext.Provider value={{ userName, partnerName, userIsKnown, saveUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
