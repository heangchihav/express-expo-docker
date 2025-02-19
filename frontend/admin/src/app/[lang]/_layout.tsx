import React, { useContext, useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider, useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import Navbar from '@/src/components/Navbar';
import { ThemeContext } from '@/src/contexts/ThemeContext';
import { Language, useLanguage } from '../../contexts/LanguageContext';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactPage from '../../screens/menus/contact';
import PromotionPage from '../../screens/menus/promotion';
import SmallScreenNav from '@/src/components/SmallScreenNav';
import ModalComponent from '@/src/components/Modal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen, usePathname } from 'expo-router';
import { useIsLargeScreen } from '@/src/hooks/useIsLargeScreen';
import TabsNavigator from '@/src/navigation/TabsNavigator';
import HomePage from '@/src/screens/menus';
import { StackNavigator } from '@/src/navigation/StackNavigator';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

const LanguageLayout = () => {
  const { theme } = useContext(ThemeContext);
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
      const urlLanguage = (pathname.split('/')[1] as Language);
      const validLanguages: Language[] = ['en', 'fr'];
      if (validLanguages.includes(urlLanguage)) {
        setLanguage(urlLanguage);
        await AsyncStorage.setItem('language', urlLanguage);
      } else {
        navigation.goBack();
      }
    };

    async function initialize() {
      const hasVisited = await AsyncStorage.getItem('hasVisited');
      if (!hasVisited) {
        setNewsModalVisible(true);
        await AsyncStorage.setItem('hasVisited', 'true');
      }
    }

    handleLanguageChange();
    initialize();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, pathname, setLanguage]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        {isLargeScreen ? (
          <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ zIndex: 1 }}>
              <Navbar />
            </View>
            <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomePage} />
              <Stack.Screen name="Contact" component={ContactPage} />
              <Stack.Screen name="Promotion" component={PromotionPage} />
            </Stack.Navigator>
          </GestureHandlerRootView>
        ) : (
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={{ zIndex: 1 }}>
                <SmallScreenNav />
              </View>
              <View style={{ flex: 1 }}>
                <Stack.Navigator screenOptions={{headerShown:false}}>
                  <Stack.Screen name="Tabs" component={TabsNavigator} />
                  <Stack.Screen name="StackNavigator" component={StackNavigator} />
                </Stack.Navigator>
              </View>
            </SafeAreaView>
          </GestureHandlerRootView>
        )}
      </View>
      <ModalComponent
        visible={newsModalVisible}
        onClose={() => setNewsModalVisible(false)}
      />
    </NavigationThemeProvider>
  );
}

export default LanguageLayout;
