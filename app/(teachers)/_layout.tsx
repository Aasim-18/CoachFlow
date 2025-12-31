import { Stack } from 'expo-router';

export default function TeacherLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1E3A8A', // Your theme blue
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* The main screen for teachers */}
      <Stack.Screen 
        name="attendence" 
        options={{ title: 'Mark Attendance', headerShown: false }}
      />
      {/* Add more teacher-specific screens here later */}
    </Stack>
  );
}