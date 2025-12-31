import React from 'react';
import { Stack, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#1E3A8A', // Brand Blue
      tabBarInactiveTintColor: '#9CA3AF',
      headerShown: false,
      tabBarStyle: {
        height: Platform.OS === 'ios' ? 88 : 68, // Taller tabs look premium
        paddingBottom: Platform.OS === 'ios' ? 28 : 12,
        paddingTop: 12,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0, // Remove default ugly line
        // Add a subtle premium shadow
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      }
    }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vault"
        options={{
          title: 'Vault',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "folder-open" : "folder-open-outline"} size={24} color={color} />
          ),
        }}
      />
      {/* New Profile Tab for balance */}
      

      <Tabs.Screen name="fees" options={{
        title: 'Fees',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? "cash" : "cash-outline"} size={24} color={color} />
        ),
      }} />
      <Tabs.Screen name="doubts" options={{
        title: 'Doubts',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? "help-circle" : "help-circle-outline"} size={24} color={color} />
        ),
      }} />
      <Tabs.Screen name="results" options={{
        title: 'Results',
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? "trophy" : "trophy-outline"} size={24} color={color} />
        ),
      }} />
      <Tabs.Screen name="attendence" options={{
        title: 'Attendance',
         
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? "calendar" : "calendar-outline"} size={24} color={color} />
        ),
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        href: null,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
        ),
      }} />
    </Tabs>
  );
}