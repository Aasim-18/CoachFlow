import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AdminLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false, // We use a custom header in the screen
          contentStyle: { backgroundColor: '#F3F4F6' },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ title: 'Admin Dashboard' }} 
        />
      </Stack>
    </>
  );
}