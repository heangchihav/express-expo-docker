import React, { useCallback, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Language, useLanguage, VALID_LANGUAGES } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

interface LanguageOption {
  code: Language;
  name: string;
  avatar: string;
  label: string;
}

const languages: LanguageOption[] = [
  { 
    code: 'en', 
    name: 'English',
    label: 'Switch to English',
    avatar: 'https://res.cloudinary.com/da8ox9rlr/image/upload/flags/1x1/sh_myho2n.jpg' 
  },
  { 
    code: 'fr', 
    name: 'French',
    label: 'Passer au français',
    avatar: 'https://res.cloudinary.com/da8ox9rlr/image/upload/flags/1x1/yt_fnqbkh.jpg' 
  },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const isDarkMode = theme === 'dark';

  const handleLanguageChange = useCallback(async (newLanguage: Language) => {
    if (VALID_LANGUAGES.includes(newLanguage)) {
      setLanguage(newLanguage);
      router.push(`/${newLanguage}`);
      setDropdownVisible(false);
    }
  }, [setLanguage, router]);

  const currentLanguage = languages.find(lang => lang.code === language);

  const closeModal = useCallback(() => {
    setDropdownVisible(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setDropdownVisible(prev => !prev);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={toggleDropdown}
        accessibilityRole="button"
        accessibilityLabel={`Current language: ${currentLanguage?.name}. Click to change language`}
      >
        <Image
          source={{ uri: currentLanguage?.avatar }}
          style={styles.avatar}
          accessibilityRole="image"
          accessibilityLabel={`${currentLanguage?.name} flag`}
        />
      </TouchableOpacity>

      <Modal
        transparent
        visible={dropdownVisible}
        onRequestClose={closeModal}
        animationType="fade"
      >
        <Pressable style={styles.modalContainer} onPress={closeModal}>
          <View 
            style={[
              styles.dropdownMenu,
              isDarkMode && styles.dropdownMenuDark
            ]}
          >
            <FlatList
              data={languages}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.languageItem,
                    language === item.code && styles.selectedLanguageItem,
                    isDarkMode && styles.languageItemDark
                  ]}
                  onPress={() => handleLanguageChange(item.code)}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  accessibilityState={{ selected: language === item.code }}
                >
                  <Image 
                    source={{ uri: item.avatar }} 
                    style={styles.languageAvatar}
                    accessibilityRole="image"
                    accessibilityLabel={`${item.name} flag`}
                  />
                  <Text style={[
                    styles.languageName,
                    isDarkMode && styles.languageNameDark,
                    language === item.code && styles.selectedLanguageName
                  ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dropdownButton: {
    borderRadius: 50,
    padding: 2,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '70%',
    maxWidth: 400,
  },
  dropdownMenuDark: {
    backgroundColor: '#1A1A1A',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginVertical: 2,
  },
  languageItemDark: {
    backgroundColor: '#2A2A2A',
  },
  selectedLanguageItem: {
    backgroundColor: '#E3F2FD',
  },
  languageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  languageName: {
    fontSize: 16,
    color: '#000000',
  },
  languageNameDark: {
    color: '#FFFFFF',
  },
  selectedLanguageName: {
    fontWeight: 'bold',
    color: '#1976D2',
  },
});
