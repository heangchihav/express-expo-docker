import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from 'expo-router';
import { ThemeContext } from '../contexts/ThemeContext';

type Language = 'en' | 'fr'; // Ensure this matches your Language type

const languages = [
  { code: 'en', name: 'English', avatar: 'https://res.cloudinary.com/da8ox9rlr/image/upload/flags/1x1/sh_myho2n.jpg' },
  { code: 'fr', name: 'French', avatar: 'https://res.cloudinary.com/da8ox9rlr/image/upload/flags/1x1/yt_fnqbkh.jpg' },
  // Add more languages as needed
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    router.push(`/${newLanguage}`);
    setDropdownVisible(false);
  };

  const currentLanguage = languages.find(lang => lang.code === language);
  const { theme } = useContext(ThemeContext); // Get the current theme from context

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <Image
          source={{ uri: currentLanguage?.avatar }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {dropdownVisible && (
        <Modal transparent visible={dropdownVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.dropdownMenu}>
              <FlatList
                data={languages}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.languageItem}
                    onPress={() => handleLanguageChange(item.code as Language)}
                  >
                    <Image source={{ uri: item.avatar }} style={styles.languageAvatar} />
                    <Text style={styles.languageName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dropdownButton: {
    borderRadius: 50,
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background effect
  },
  dropdownMenu: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 2, // For shadow effect on Android
    width: "70%",
    maxWidth: 400
  },
  languageItem: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    gap: 10
  },
  languageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50
  },
  languageName: {
    fontSize: 16,
  },
});
