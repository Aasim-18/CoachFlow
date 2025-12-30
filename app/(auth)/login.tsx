import React from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
   KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Side Accents - Standard Solvify Branding */}
      <View style={styles.leftAccent} />
      <View style={styles.rightAccent} />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.flexOne}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.logoText}>Welcome Back</Text>
            <Text style={styles.tagline}>LOG IN TO YOUR COACHFLOW ACCOUNT</Text>
          </View>

          {/* Form Section */}
          <View style={styles.form}>
            <TextInput 
              placeholder="Mobile Number" 
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              style={styles.input} 
            />

            {/* Password / Secondary Input could go here if needed */}

            {/* Action Button */}
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={styles.buttonShadow}
              onPress={() => router.push('/otp')} // Reusing the OTP flow for login
            >
              <LinearGradient
                colors={['#FCD34D', '#F97316']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Get Login OTP</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Footer Links */}
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
    backgroundColor: '#F8FAFC', // slate-50 base
  },
  flexOne: {
    flex: 1,
  },
  leftAccent: {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: 6,
    backgroundColor: 'rgba(30, 58, 138, 0.1)', // Subtle blue-900 tint
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
    color: '#1E3A8A', // Brand Blue-900
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
    // Platform-specific shadows
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
    shadowColor: '#F97316', // Orange-500 shadow
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