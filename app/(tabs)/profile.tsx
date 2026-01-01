import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, ScrollView, 
  TouchableOpacity, Switch, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const router = useRouter();
  
  // State for User Data
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch User from Storage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log("✅ Profile Loaded:", parsedUser.fullName);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Handle Logout (Clear Data)
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Wipe data
      router.replace('/(auth)/login'); // Redirect to Login
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1E3A8A" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'My Profile', headerShown: true }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* === Profile Header Card === */}
        <View style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            {/* Dynamic Initials */}
            <Text style={styles.avatarTextLarge}>
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
            </Text>
            <TouchableOpacity style={styles.editBadge}>
              <Ionicons name="camera" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          {/* Dynamic Name */}
          <Text style={styles.userName}>{user?.fullName || "Student Name"}</Text>
          
          {/* Dynamic Enrollment Number */}
          <Text style={styles.userId}>ID: {user?.EnrollmentNumber || "N/A"}</Text>
          
          <View style={styles.batchBadge}>
            <Text style={styles.batchText}>Batch: IIT-JEE Morning</Text>
          </View>
        </View>

        {/* === Account Settings Section === */}
        <Text style={styles.sectionTitle}>Account Information</Text>
        <View style={styles.listContainer}>
          
          {/* 1. Mobile Number */}
          <View style={styles.listItem}>
            <Ionicons name="call-outline" size={22} color="#1E3A8A" />
            <View style={styles.listItemContent}>
              <Text style={styles.listLabel}>Mobile Number</Text>
              <Text style={styles.listValue}>
                {user?.phone ? `+91 ${user.phone}` : "Not Provided"}
              </Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          {/* 2. Email Address */}
          <View style={styles.listItem}>
            <Ionicons name="mail-outline" size={22} color="#1E3A8A" />
            <View style={styles.listItemContent}>
              <Text style={styles.listLabel}>Email Address</Text>
              <Text style={styles.listValue}>
                {user?.email || "No Email"}
              </Text>
            </View>
          </View>
        </View>

        {/* === Preferences Section === */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.listContainer}>
          <View style={styles.listItem}>
            <Ionicons name="notifications-outline" size={22} color="#1E3A8A" />
            <Text style={styles.listItemText}>Push Notifications</Text>
            <Switch value={true} trackColor={{ false: '#CBD5E1', true: '#1E3A8A' }} />
          </View>
          <View style={styles.divider} />
          <View style={styles.listItem}>
            <Ionicons name="lock-closed-outline" size={22} color="#1E3A8A" />
            <Text style={styles.listItemText}>Parental Consent Managed</Text>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
          </View>
        </View>

        {/* === Support & Legal === */}
        <Text style={styles.sectionTitle}>Support & Legal</Text>
        <View style={styles.listContainer}>
          <TouchableOpacity style={styles.listItem}>
            <Ionicons name="document-text-outline" size={22} color="#64748B" />
            <Text style={[styles.listItemText, { color: '#64748B' }]}>Privacy Policy (DPDP 2025)</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.listItem}>
            <Ionicons name="help-buoy-outline" size={22} color="#64748B" />
            <Text style={[styles.listItemText, { color: '#64748B' }]}>Contact Help Desk</Text>
          </TouchableOpacity>
        </View>

        {/* === Logout Button === */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout} 
        >
          <Text style={styles.logoutText}>Logout from CoachFlow</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>CoachFlow Version 1.0.2 (Beta)</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 24 },
  profileCard: { backgroundColor: '#FFF', padding: 32, borderRadius: 32, alignItems: 'center', elevation: 2, shadowOpacity: 0.05, marginBottom: 32 },
  avatarLarge: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#1E3A8A', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  avatarTextLarge: { color: '#FFF', fontSize: 40, fontWeight: 'bold' },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#F97316', padding: 8, borderRadius: 20, borderWidth: 3, borderColor: '#FFF' },
  userName: { fontSize: 24, fontWeight: '900', color: '#1E3A8A' },
  userId: { fontSize: 14, color: '#64748B', marginTop: 4 },
  batchBadge: { backgroundColor: '#EFF6FF', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 12, marginTop: 12 },
  batchText: { color: '#1E3A8A', fontSize: 12, fontWeight: 'bold' },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#94A3B8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12, marginLeft: 4 },
  listContainer: { backgroundColor: '#FFF', borderRadius: 24, padding: 8, marginBottom: 24, elevation: 1 },
  listItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  listItemContent: { flex: 1, marginLeft: 16 },
  listItemText: { flex: 1, marginLeft: 16, fontSize: 16, fontWeight: '600', color: '#1E3A8A' },
  listLabel: { fontSize: 12, color: '#94A3B8', fontWeight: '500' },
  listValue: { fontSize: 16, color: '#1E3A8A', fontWeight: '700', marginTop: 2 },
  divider: { hieght: 1, backgroundColor: '#F1F5F9', marginHorizontal: 16 },
  logoutButton: { marginTop: 16, padding: 20, borderRadius: 20, backgroundColor: '#FEF2F2', alignItems: 'center' },
  logoutText: { color: '#EF4444', fontWeight: 'bold', fontSize: 16 },
  versionText: { textAlign: 'center', color: '#CBD5E1', fontSize: 12, marginTop: 24, marginBottom: 40 }
});