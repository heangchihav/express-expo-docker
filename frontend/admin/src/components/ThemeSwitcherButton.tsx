import React, { useCallback, useEffect } from 'react';
import { View, Pressable, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, useTheme, VALID_THEMES } from '../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  // Animation value for smooth icon transition
  const animatedValue = React.useRef(new Animated.Value(isDark ? 1 : 0)).current;

  // Animate icon when theme changes
  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: isDark ? 1 : 0,
      useNativeDriver: true,
      tension: 20,
      friction: 7,
    }).start();
  }, [isDark, animatedValue]);

  const handleThemeToggle = useCallback(async () => {
    const newTheme: Theme = isDark ? 'light' : 'dark';
    if (VALID_THEMES.includes(newTheme)) {
      setTheme(newTheme);
    }
  }, [isDark, setTheme]);

  // Interpolate animation values for rotation and scale
  const rotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.85, 1],
  });

  useEffect(() => {
    const loadThemeFromStorage = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme as Theme);
        }
      } catch (error) {
        console.error('Failed to load theme from storage', error);
      }
    };

    loadThemeFromStorage();
  }, [setTheme]);

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          { backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5' }
        ]}
        onPress={handleThemeToggle}
        accessibilityRole="button"
        accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        accessibilityState={{ selected: isDark }}
      >
        <Animated.View style={[
          styles.iconContainer,
          {
            transform: [
              { rotate },
              { scale }
            ]
          }
        ]}>
          {isDark ? (
            <Ionicons
              name="moon"
              size={24}
              color="#FFD700"
              accessibilityLabel="Dark theme icon"
            />
          ) : (
            <Ionicons
              name="sunny"
              size={24}
              color="#FFA500"
              accessibilityLabel="Light theme icon"
            />
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
