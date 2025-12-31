import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  KeyboardAvoidingView, Platform, ScrollView, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';

export default function SignupScreen() {
  const [selectedRole, setSelectedRole] = useState('Student');
  const [fullName, setFullName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [Mobile, setMobile] = useState('');
  
  const router = useRouter();
  const roles = ['Student', 'admin', 'Teacher'];


  const handleContinue = () => {
    if (!fullName || !Mobile) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    if (selectedRole === 'Teacher') {
      
      router.push('/(teachers)/attendence'); 
    } else {
      
      router.push('/(auth)/login');
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
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.header}>
            <Text style={styles.logoText}>CoachFlow</Text>
            <Text style={styles.tagline}>TECH-ENABLED INSTITUTE</Text>
          </View>

          <View style={styles.form}>
            {/* TextInput wraps View props but handles its own styles */}
            <TextInput 
              placeholder="Full Name" 
              placeholderTextColor="#9CA3AF"
              style={styles.input} 
              onChangeText={setFullName}
              value={fullName}
            />
            <TextInput 
              placeholder="Roll Number" 
              placeholderTextColor="#9CA3AF"
              style={styles.input} 
              onChangeText={setRollNumber}
              value={rollNumber}
            />
            <TextInput 
              placeholder=" Mobile Number" 
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              style={styles.input} 
              onChangeText={setMobile}
              value={Mobile}
            />

            {/* Role Selector Box (View Only Styles) */}
            <View style={styles.roleBox}>
              <Text style={styles.roleLabel}>Role</Text>
              <View style={styles.roleOptions}>
                {roles.map((role, idx) => (
                  <View key={role} style={styles.roleItem}>
                    <TouchableOpacity onPress={() => setSelectedRole(role)}>
                      {/* Text Only Styles */}
                      <Text style={[
                        styles.roleText, 
                        selectedRole === role && styles.roleTextActive
                      ]}>
                        {role}
                      </Text>
                    </TouchableOpacity>
                    {idx < 2 && <Text style={styles.separator}>|</Text>}
                  </View>
                ))}
              </View>
            </View>

            <TouchableOpacity 
              activeOpacity={0.8} 
              style={styles.buttonShadow}
              onPress={handleContinue} // ✅ UPDATED: Calls the new logic function
            >
              <LinearGradient
                colors={['#FCD34D', '#F97316']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Verify & Continue</Text>
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
    // Android Shadow
    elevation: 2,
    // iOS Shadow
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
    // View styles only
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
    flex: 1, // Correctly allowed in Text and View
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

