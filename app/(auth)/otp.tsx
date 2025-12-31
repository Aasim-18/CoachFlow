import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  KeyboardAvoidingView, Platform, Alert, ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

export default function OTPScreen() {
  const router = useRouter();
  
  // 1. Get Email passed from Login Screen
  const { email } = useLocalSearchParams(); 

  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30); // 30s countdown
  
  // Refs to manage focus between inputs
  const inputs = useRef([]);

  // Timer Logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle Input Change (Forward Focus)
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace (Backward Focus)
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // 2. Verify OTP API Call
  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp.length !== 4) {
      Alert.alert("Invalid OTP", "Please enter the full 4-digit code.");
      return;
    }

    setIsLoading(true);

    try {
      console.log(`Verifying OTP: ${enteredOtp} for ${email}`);
      
      const response = await axios.post('https://vlx-server.onrender.com/api/v1/users/verify', {
        email: email,
        otp: enteredOtp
      });

      if (response.status === 200) {
        Alert.alert("Verified!", "Welcome back.", [
          { text: "Continue", onPress: () => router.replace('/(tabs)/dashboard') }
        ]);
      }
    } catch (error: any) {
      console.error("Verification Error:", error);
      const msg = error.response?.data?.message || "Invalid OTP. Please try again.";
      Alert.alert("Verification Failed", msg);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Resend OTP Logic
  const handleResend = async () => {
    if (timer > 0) return;

    try {
      await axios.post('https://vlx-server.onrender.com/api/v1/users/generate-otp', { email });
      setTimer(30); // Reset timer
      Alert.alert("Sent", "A new code has been sent to your email.");
    } catch (error) {
      Alert.alert("Error", "Failed to resend OTP.");
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
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logoText}>Verification</Text>
            <Text style={styles.subText}>
              Enter the code sent to {email ? email : "your email"}
            </Text>
          </View>

          {/* OTP Inputs */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={[
                  styles.otpInput, 
                  digit ? styles.otpInputFilled : null // Highlight if filled
                ]}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                autoFocus={index === 0} // Focus first input on load
              />
            ))}
          </View>

          {/* Verify Button */}
          <TouchableOpacity 
            activeOpacity={0.8} 
            style={[styles.buttonShadow, { opacity: isLoading ? 0.7 : 1 }]}
            onPress={handleVerify}
            disabled={isLoading}
          >
            <LinearGradient
              colors={['#FCD34D', '#F97316']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Verify OTP</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Resend Section */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Didn't receive code? </Text>
            <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
              <Text style={[styles.footerLink, timer > 0 && styles.disabledLink]}>
                {timer > 0 ? `Resend in ${timer}s` : "Resend Now"}
              </Text>
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
    color: '#1E3A8A',
    letterSpacing: -1,
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#64748B',
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
    borderColor: '#E2E8F0',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  otpInputFilled: {
    borderColor: '#F97316', // Orange border when filled
    backgroundColor: '#FFF7ED', // Light orange bg
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
  disabledLink: {
    color: '#94A3B8', // Grey out text if timer running
  }
});