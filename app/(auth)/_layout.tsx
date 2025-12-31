import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        
        headerShown: false,
        
        contentStyle: { backgroundColor: '#fff' }, 
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Welcome' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="otp" options={{ presentation: 'modal' }} />
    </Stack>
  );
}