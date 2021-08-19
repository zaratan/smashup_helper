/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect, ReactNode } from 'react';

type ContextType = {
  darkMode: boolean;
  setDarkMode: (newDark: boolean) => void;
};

const defaultContext: ContextType = {
  darkMode: false,
  setDarkMode: () => {
    throw new Error('OVERRIDE ME');
  },
};
const ThemeContext = createContext(defaultContext);
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const lsDarkMode = JSON.parse(
      localStorage.getItem('ThemeContext:darkMode')
    );
    if (lsDarkMode !== undefined && lsDarkMode !== null) {
      setDarkMode(lsDarkMode);
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const setNewDark = (newDark: boolean) => {
    localStorage.setItem('ThemeContext:darkMode', String(newDark));
    setDarkMode(newDark);
  };

  const context: ContextType = {
    darkMode,
    setDarkMode: setNewDark,
  };
  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
