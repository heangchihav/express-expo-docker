import { Link, Stack } from 'expo-router';
import { StyleSheet, Image, View, Platform } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import React from 'react';

export default function NotFoundScreen() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/008/568/878/small_2x/website-page-not-found-error-404-oops-worried-robot-character-peeking-out-of-outer-space-site-crash-on-technical-work-web-design-template-with-chatbot-mascot-cartoon-online-bot-assistance-failure-vector.jpg' }} // Replace with an appropriate image URL
          style={styles.image}
          resizeMode="contain"
        />
        <ThemedText style={styles.title}>Oops! Page Not Found</ThemedText>
        <ThemedText style={styles.message}>The page you’re looking for does not exist.</ThemedText>
        <Link href="/[lang]" style={styles.link}>
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
    backgroundColor: '#f8f9fa', // Light background color for a clean look
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20, // Adjust padding for iOS
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
    color: '#333', // Darker color for the title
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666', // Gray color for the message text
    marginBottom: 20,
    maxWidth: '80%', // Limit text width for better readability
  },
  link: {
    marginTop: 15,
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#007bff', // Blue color for the link
    textDecorationLine: 'underline',
  },
});
