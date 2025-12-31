import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

export default function Index() {
  // We use a small loading state to simulate a real app checking for a session
  const [isLoading, setIsLoading] = useState(true);
  
  // Demo Logic: Toggle this to 'teacher', 'admin', or 'student'
  const userRole = 'teacher'; 

  useEffect(() => {
    // Simulate a 500ms check (looks good during a live demo)
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
        <ActivityIndicator size="large" color="#1E3A8A" />
      </View>
    );
  }

  // Route Guard Logic
  if (userRole === 'teacher') {
    // Redirects to your new teacher folder
    return <Redirect href="/(teachers)/attendence" />;
  }

  if (userRole === 'admin') {
     // Assuming you'll build an admin folder later
    return <Redirect href="/(admin)/dashboard" />;
  }

  // Default: Student view (Tabs)
  return <Redirect href="/(tabs)/dashboard" />;
}