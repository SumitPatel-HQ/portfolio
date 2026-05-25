"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface IntroContextType {
  isIntroComplete: boolean;
  setIntroComplete: (complete: boolean) => void;
}

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export const IntroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  const setIntroComplete = useCallback((complete: boolean) => {
    setIsIntroComplete(complete);
  }, []);

  return (
    <IntroContext.Provider value={{ isIntroComplete, setIntroComplete }}>
      {children}
    </IntroContext.Provider>
  );
};

export const useIntro = () => {
  const context = useContext(IntroContext);
  if (context === undefined) {
    throw new Error('useIntro must be used within an IntroProvider');
  }
  return context;
};
