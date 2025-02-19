// src/contexts/ThemeContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'system' | 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'system',
  setTheme: () => { },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('system');

  // Determine system theme and set it
  useEffect(() => {
    async function loadTheme() {
      const storedTheme = await AsyncStorage.getItem('theme');
      const systemTheme = Appearance.getColorScheme();
      if (storedTheme) {
        setTheme(storedTheme as Theme);
      } else if (systemTheme) {
        setTheme(systemTheme as Theme);
      }
    }
    loadTheme();
  }, []);

  // Apply the theme when changed
  useEffect(() => {
    if (theme !== 'system') {
      AsyncStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
