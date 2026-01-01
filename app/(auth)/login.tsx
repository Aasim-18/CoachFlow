import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import axios from 'axios';
// ✅ 1. IMPORT ASYNC STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [EnrollmentNumber, setEnrollmentNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleLogin = async () => {
    // 1. Validation
    if (!email || !EnrollmentNumber || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields to proceed.');
      return;
    }

    setIsLoading(true);

    try {
      // --- STEP 1: VERIFY CREDENTIALS ---
      console.log("1. Logging in...");
      const loginResponse = await axios.post('https://vlx-server.onrender.com/api/v1/users/login', {
        EnrollmentNumber,
        password,
        email,
      });

      if (loginResponse.status === 200) {
        
        // 1. 🔍 DEBUG LOG: See exactly what the server sent
        console.log("Server Response:", JSON.stringify(loginResponse.data, null, 2));

        // 2. 🛡️ SAFE EXTRACTION:
        // Based on your previous logs, the user is inside 'message.user'
        const responseData = loginResponse.data?.message?.user; 
        const userObj = responseData || loginResponse.data?.user;

        if (!userObj || !userObj.selectedRole) {
           console.error("❌ CRITICAL: Could not find 'selectedRole' or User Object.");
           Alert.alert("Login Error", "Server returned invalid user data.");
           setIsLoading(false);
           return;
        }

        // ✅ 3. SAVE DATA TO ASYNC STORAGE HERE (The Fix)
        try {
          await AsyncStorage.setItem('user', JSON.stringify(userObj));
          console.log("✅ User Data Saved Successfully:", userObj.fullName);
        } catch (storageError) {
          console.error("Failed to save user to storage:", storageError);
        }

        const userRole = userObj.selectedRole;
        console.log("✅ Role Detected:", userRole)

        // --- STEP 2: GENERATE OTP ---
        console.log("2. Credentials Valid. Requesting OTP for:", email);
        
        const otpResponse = await axios.post('https://vlx-server.onrender.com/api/v1/users/generateotp', {
          email: email
        });

        if (otpResponse.status === 200) {
          Alert.alert("Success", "OTP sent to your registered email.", [
            {
              text: "Enter OTP",
              onPress: () => {
                // ✅ PASS ROLE TO OTP PAGE
                router.push({
                  pathname: '/otp',
                  params: { 
                    email: email, 
                    selectedRole: userRole 
                  } 
                });
              }
            }
          ]);
        }
      }

    } catch (error: any) {
      console.error("Login Error:", error);
      
      let errorMessage = "Something went wrong.";
      if (error.response) {
        errorMessage = error.response.data.message || "Invalid Credentials";
      } else if (error.request) {
        errorMessage = "Network Error. Please check your internet.";
      }
      
      Alert.alert("Login Failed", errorMessage);
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
        style={styles.flexOne}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.header}>
            <Text style={styles.logoText}>Welcome Back</Text>
            <Text style={styles.tagline}>LOG IN TO YOUR COACHFLOW ACCOUNT</Text>
          </View>
          
          <View style={styles.form}>
            <TextInput 
              placeholder="Email" 
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              onChangeText={setEmail}
              value={email} 
              autoCapitalize="none"
              keyboardType="email-address"
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

            <TouchableOpacity 
              activeOpacity={0.8} 
              style={[styles.buttonShadow, { opacity: isLoading ? 0.7 : 1 }]}
              onPress={handleLogin}
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
                  <Text style={styles.buttonText}>Get Login OTP</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>New to CoachFlow? </Text>
              <TouchableOpacity onPress={() => router.push('/')}>
                <Text style={styles.footerLink}>Sign Up</Text>
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
  flexOne: {
    flex: 1,
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
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#1E3A8A', 
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 8,
    letterSpacing: 3,
    fontWeight: '700',
    textAlign: 'center',
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
  buttonShadow: {
    marginTop: 24,
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