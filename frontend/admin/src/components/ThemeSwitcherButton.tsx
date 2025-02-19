import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);
  const systemColorScheme = useColorScheme(); // Detect system theme

  const [isSwitchOn, setIsSwitchOn] = useState(theme === 'dark');

  // Save selected theme to AsyncStorage
  const saveThemeToStorage = async (theme: 'light' | 'dark' | 'system') => {
    try {
      await AsyncStorage.setItem('selectedTheme', theme);
    } catch (error) {
      console.error('Failed to save theme to storage', error);
    }
  };

  // Load selected theme from AsyncStorage on component mount
  useEffect(() => {
    const loadThemeFromStorage = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('selectedTheme');
        if (savedTheme) {
          setTheme(savedTheme as 'light' | 'dark' | 'system');
          setIsSwitchOn(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme from storage', error);
      }
    };

    loadThemeFromStorage();
  }, []);

  const handleSwitchChange = (value: boolean) => {
    const newTheme = value ? 'dark' : 'light';
    setTheme(newTheme);
    saveThemeToStorage(newTheme);
    setIsSwitchOn(value);
  };

  const appliedTheme = theme === 'system' ? systemColorScheme : theme;

  return (
    <View style={styles.container}>
      <View style={[
        styles.switchContainer,
         
      ]}>
        <Text style={[
          styles.themeText,
          { color: appliedTheme === 'dark' ? '#ffaa00' : '#ff0080' }
        ]}>
          {isSwitchOn ? 'Dark' : 'Light'}
        </Text>
        <Switch
          value={isSwitchOn}
          onValueChange={handleSwitchChange}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isSwitchOn ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeText: {
    fontSize: 16,
    marginRight: 10,
  },
});
