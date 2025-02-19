import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Image, View, Platform } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import React from 'react';

export default function NotFoundScreen() {
  // Get the current language from the URL params
  const { lang = 'en' } = useLocalSearchParams<{ lang: string }>();

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/008/568/878/small_2x/website-page-not-found-error-404-oops-worried-robot-character-peeking-out-of-outer-space-site-crash-on-technical-work-web-design-template-with-chatbot-mascot-cartoon-online-bot-assistance-failure-vector.jpg' }}
          style={styles.image}
          resizeMode="contain"
        />
        <ThemedText style={styles.title}>Oops! Page Not Found</ThemedText>
        <ThemedText style={styles.message}>The page you’re looking for does not exist.</ThemedText>
        <Link href={{ pathname: "/[lang]", params: { lang }}} style={styles.link}>
          <ThemedText style={styles.linkText}>Go to home screen</ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa', 
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20, 
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666', 
    marginBottom: 20,
    maxWidth: '80%', 
  },
  link: {
    marginTop: 15,
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#007bff', 
    textDecorationLine: 'underline',
  },
});
