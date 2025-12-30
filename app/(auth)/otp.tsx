import React, { useState, useRef } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
   KeyboardAvoidingView, Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';

export default function OTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  // Handle digit input and auto-focus next field
  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Side Accents */}
      <View style={styles.leftAccent} />
      <View style={styles.rightAccent} />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.flexOne}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logoText}>Verification</Text>
            <Text style={styles.tagline}>ENTER THE 4-DIGIT CODE SENT TO YOUR PHONE</Text>
          </View>

          {/* OTP Inputs */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
              />
            ))}
          </View>

          {/* Action Button */}
          <TouchableOpacity 
            activeOpacity={0.8} 
            style={styles.buttonShadow}
            onPress={() => router.push('/(tabs)/dashboard')} // Moves to the main app
          >
            <LinearGradient
              colors={['#FCD34D', '#F97316']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Verify OTP</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Resend Section */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Didn't receive code? </Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // slate-50
  },
  flexOne: {
    flex: 1,
  },
  leftAccent: {
    position: 'absolute', left: 0, top: 0, bottom: 0, width: 6,
    backgroundColor: 'rgba(30, 58, 138, 0.1)', // blue-900 tint
  },
  rightAccent: {
    position: 'absolute', right: 0, top: 0, bottom: 0, width: 6,
    backgroundColor: 'rgba(30, 58, 138, 0.1)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1E3A8A', // blue-900
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 8,
    letterSpacing: 2,
    fontWeight: '700',
    textAlign: 'center',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpInput: {
    backgroundColor: '#FFFFFF',
    width: 60,
    height: 70,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
    // Shadows
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  buttonShadow: {
    marginTop: 16,
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