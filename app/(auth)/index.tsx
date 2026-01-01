import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import axios from 'axios';

export default function SignupScreen() {
  const router = useRouter();
  
  // Form State
  const [selectedRole, setSelectedRole] = useState('Student');
  const [fullName, setFullName] = useState('');
  const [EnrollmentNumber, setEnrollmentNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  // Loading State
  const [isLoading, setIsLoading] = useState(false);
  
  // UI Display Names (Capitalized)
  const roles = ['Student', 'Teacher', 'Admin'];

  const handleSignup = async () => {
    // 1. Validation
    if (!fullName || !phone || !EnrollmentNumber || !email || !password) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // 2. Start Loading
    setIsLoading(true);

    // 3. FIX: Convert Role to Lowercase for Backend (Teacher -> teacher)
    const roleToSend = selectedRole.toLowerCase();

    console.log("Sending Data:", { 
      fullName, EnrollmentNumber, password, phone, email, role: roleToSend 
    });

    try {
      const response = await axios.post('https://vlx-server.onrender.com/api/v1/users/register', {
        fullName,
        EnrollmentNumber,
        password,
        phone,
        email,
        selectedRole: roleToSend, // <--- SEND LOWERCASE ROLE HERE
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert("Success", "Account created successfully!", [
          {
            text: "OK", 
            onPress: () => {
              router.push('/(auth)/login');
              
            }
          }
        ]);
      }

    } catch (error: any) {
      console.error('Signup Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during signup.';
      Alert.alert('Signup Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.leftAccent} />
      <View style={styles.rightAccent} />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.header}>
            <Text style={styles.logoText}>CoachFlow</Text>
            <Text style={styles.tagline}>TECH-ENABLED INSTITUTE</Text>
          </View>

          <View style={styles.form}>
            <TextInput 
              placeholder="Full Name" 
              placeholderTextColor="#9CA3AF"
              style={styles.input} 
              onChangeText={setFullName}
              value={fullName}
            />
            <TextInput 
              placeholder="Mobile Number" 
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              style={styles.input} 
              onChangeText={setPhone}
              value={phone}
            />
            <TextInput
              placeholder='Email'
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
            />
            <TextInput 
              placeholder="Enrollment Number" 
              placeholderTextColor="#9CA3AF"
              style={styles.input} 
              onChangeText={setEnrollmentNumber}
              value={EnrollmentNumber}
            />
            <TextInput 
              placeholder="Password" 
              placeholderTextColor="#9CA3AF"
              style={styles.input} 
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />

            {/* Role Selector */}
            <View style={styles.roleBox}>
              <Text style={styles.roleLabel}>Role</Text>
              <View style={styles.roleOptions}>
                {roles.map((role, idx) => (
                  <View key={role} style={styles.roleItem}>
                    <TouchableOpacity onPress={() => setSelectedRole(role)}>
                      <Text style={[
                        styles.roleText, 
                        selectedRole === role && styles.roleTextActive
                      ]}>
                        {role}
                      </Text>
                    </TouchableOpacity>
                    {/* Add separator only between items */}
                    {idx < roles.length - 1 && <Text style={styles.separator}>|</Text>}
                  </View>
                ))}
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={[styles.buttonShadow, { opacity: isLoading ? 0.7 : 1 }]}
              onPress={handleSignup}
              disabled={isLoading}
            >
              <LinearGradient
                colors={['#FCD34D', '#F97316']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Verify & Continue</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => router.push('/(auth)/login')}
              >
                <Text style={styles.footerLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  leftAccent: {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: 6,
    backgroundColor: 'rgba(30, 58, 138, 0.1)',
  },
  rightAccent: {
    position: 'absolute', right: 0, top: 0, bottom: 0, width: 6,
    backgroundColor: 'rgba(30, 58, 138, 0.1)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#1E3A8A',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
    letterSpacing: 4,
    fontWeight: '700',
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    fontSize: 16,
    color: '#1F2937',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  roleBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  roleLabel: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  roleOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleText: {
    fontSize: 16,
    color: '#D1D5DB',
    fontWeight: '600',
  },
  roleTextActive: {
    color: '#1E3A8A',
    fontWeight: '800',
  },
  separator: {
    marginHorizontal: 10,
    color: '#E5E7EB',
    fontSize: 18,
  },
  buttonShadow: {
    marginTop: 32,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradientButton: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    color: '#6B7280',
    fontSize: 16,
  },
  footerLink: {
    color: '#1E3A8A',
    fontWeight: '700',
    fontSize: 16,
  },
});
