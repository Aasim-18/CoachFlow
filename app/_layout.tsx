import { Stack, Tabs } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  useEffect(() => {
  
    SplashScreen.hideAsync();
  }, []);

  const demoUser = {
    role: "teacher",
    name: "Aasim"

  }

  return (
    <Stack
      screenOptions={{
        
        headerStyle: {
          backgroundColor: '#F8FAFC', 
        },
        headerShadowVisible: false, 
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#1E3A8A', 
        },
        
        animation: 'slide_from_right',
      }}
    >
       
       <Tabs.Screen name="(auth)" options={{ headerShown: false }} />
       <Tabs.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(teachers)" options={{ headerShown: false }} />
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
    </Stack>
  );
}