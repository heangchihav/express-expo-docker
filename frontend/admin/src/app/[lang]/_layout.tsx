import React, { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider, useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen, usePathname } from 'expo-router';
import { createStackNavigator } from '@react-navigation/stack';

import Navbar from '@/components/Navbar';
import { useTheme, VALID_THEMES } from '@/contexts/ThemeContext';
import { Language, useLanguage, VALID_LANGUAGES } from '@/contexts/LanguageContext';
import ContactPage from '@/screens/menus/contact';
import PromotionPage from '@/screens/menus/promotion';
import SmallScreenNav from '@/components/SmallScreenNav';
import ModalComponent from '@/components/Modal';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import TabsNavigator from '@/navigation/TabsNavigator';
import HomePage from '@/screens/menus';
import { StackNavigator } from '@/navigation/StackNavigator';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const LanguageLayout = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const isLargeScreen = useIsLargeScreen();
  const [loaded] = useFonts({
    SpaceMono: require('../../../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const pathname = usePathname();
  const { setLanguage } = useLanguage();
  const [newsModalVisible, setNewsModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const handleLanguageChange = async () => {
      const urlLanguage = pathname.split('/')[1] as Language;
      if (VALID_LANGUAGES.includes(urlLanguage)) {
        setLanguage(urlLanguage);
        await AsyncStorage.setItem('language', urlLanguage);
      } else {
        navigation.goBack();
      }
    };

    const initialize = async () => {
      try {
        const hasVisited = await AsyncStorage.getItem('hasVisited');
        if (!hasVisited) {
          setNewsModalVisible(true);
          await AsyncStorage.setItem('hasVisited', 'true');
        }

        // Load theme from storage
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme && VALID_THEMES.includes(storedTheme as any)) {
          setTheme(storedTheme as any);
        }
      } catch (error) {
        console.error('Error initializing:', error);
      }
    };

    handleLanguageChange();
    initialize();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, pathname, setLanguage, navigation, setTheme]);

  if (!loaded) {
    return null;
  }

  // Common stack navigator options
  const stackScreenOptions = {
    headerShown: false,
  };

  return (
    <NavigationThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {isLargeScreen ? (
          <View style={{ flex: 1 }}>
            <View style={{ zIndex: 1 }}>
              <Navbar />
            </View>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={stackScreenOptions}
            >
              <Stack.Screen name="Home" component={HomePage} />
              <Stack.Screen name="Contact" component={ContactPage} />
              <Stack.Screen name="Promotion" component={PromotionPage} />
            </Stack.Navigator>
          </View>
        ) : (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ zIndex: 1 }}>
              <SmallScreenNav />
            </View>
            <View style={{ flex: 1 }}>
              <Stack.Navigator screenOptions={stackScreenOptions}>
                <Stack.Screen name="Tabs" component={TabsNavigator} />
                <Stack.Screen name="StackNavigator" component={StackNavigator} />
              </Stack.Navigator>
            </View>
          </SafeAreaView>
        )}
        <ModalComponent
          visible={newsModalVisible}
          onClose={() => setNewsModalVisible(false)}
        />
      </GestureHandlerRootView>
    </NavigationThemeProvider>
  );
};

export default LanguageLayout;
