import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'fr';

// Constants for better maintainability
export const VALID_LANGUAGES: Language[] = ['en', 'fr'];
export const DEFAULT_LANGUAGE: Language = 'en';
const STORAGE_KEY = 'language';

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    // Load language from AsyncStorage when the component mounts
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedLanguage && VALID_LANGUAGES.includes(storedLanguage as Language)) {
          setLanguage(storedLanguage as Language);
        }
      } catch (error) {
        console.error('Failed to load language from storage:', error);
      }
    };

    loadLanguage();
  }, []);

  useEffect(() => {
    // Save language to AsyncStorage whenever it changes
    const saveLanguage = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, language);
      } catch (error) {
        console.error('Failed to save language to storage:', error);
      }
    };

    saveLanguage();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
