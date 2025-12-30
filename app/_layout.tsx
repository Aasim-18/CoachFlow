import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  useEffect(() => {
    // Hide splash screen after the app is mounted
    // In a real app, you'd wait for fonts or auth checks here
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack
      screenOptions={{
        // Global header styles for the CoachFlow brand
        headerStyle: {
          backgroundColor: '#F8FAFC', // Our slate-50 base
        },
        headerShadowVisible: false, // Clean, flat look
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#1E3A8A', // Our Blue-900 brand color
        },
        // This ensures transitions feel "native" on both Android and iOS
        animation: 'slide_from_right',
      }}
    >
      {/* 1. Authentication Group: Hides headers for a full-screen experience */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />

      {/* 2. Main App Group (Tabs): Hides stack header because tabs have their own */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* 3. The Redirect Index (Our base route pointer) */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}