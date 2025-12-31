import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock Data for Notices
const NOTICES = [
  { 
    id: '1', 
    title: 'Mid-Term Exam Schedule', 
    desc: 'The datesheet for the upcoming exams has been released.', 
    time: '2 hrs ago', 
    type: 'ACADEMIC',
    urgent: true 
  },
  { 
    id: '2', 
    title: 'Picnic Fee Submission', 
    desc: 'Last date to submit the fee for the water park trip.', 
    time: 'Yesterday', 
    type: 'ADMIN',
    urgent: false 
  },
  { 
    id: '3', 
    title: 'Physics Guest Lecture', 
    desc: 'Dr. Verma will be visiting Campus B for a seminar.', 
    time: '2 Oct', 
    type: 'EVENT',
    urgent: false 
  },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Decorative Background Element for "Premium" feel */}
      <View style={styles.backgroundBlob} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* === Premium Header === */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Good Evening,</Text>
            <Text style={styles.userName}>Aryan</Text>
            {/* Added Context Info */}
            <View style={styles.userTagContainer}>
              <Text style={styles.userTag}>Class XII • Batch A</Text>
            </View>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#1E3A8A" />
              <View style={styles.notifDot} />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => router.push("/(tabs)/profile")}
            >
              <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            </TouchableOpacity>
            
          </View>
        </View>

        {/* === Quick Stats Row === */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="calendar-outline" size={14} color="#64748B" />
              <Text style={styles.statLabel}> Attendance</Text>
            </View>
            <Text style={[styles.statValue, { color: '#3B82F6' }]}>92%</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="time-outline" size={14} color="#64748B" />
              <Text style={styles.statLabel}> Next Test</Text>
            </View>
            <Text style={[styles.statValue, { color: '#F59E0B' }]}>4 Days</Text>
          </View>
        </View>

        {/* === Attendance Alert (Critical Info) === */}
        <TouchableOpacity style={styles.alertCard} activeOpacity={0.9}>
          <View style={styles.alertIconBox}>
            <Ionicons name="warning" size={24} color="#FFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>Attendance Warning</Text>
            <Text style={styles.alertText}>You were marked ABSENT yesterday.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FECACA" />
        </TouchableOpacity>

        {/* === NEW: Notices Section === */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Notice Board</Text>
          <TouchableOpacity onPress={() => router.push('/notices')}>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.noticeList}>
          {NOTICES.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.noticeCard} 
              activeOpacity={0.7}
              onPress={() => {}} // Handle navigation
            >
              {/* Left Stripe based on urgency */}
              <View style={[styles.noticeStripe, { backgroundColor: item.urgent ? '#EF4444' : '#3B82F6' }]} />
              
              <View style={styles.noticeContent}>
                <View style={styles.noticeTopRow}>
                  <View style={[styles.tagContainer, { backgroundColor: item.urgent ? '#FEF2F2' : '#EFF6FF' }]}>
                    <Text style={[styles.tagText, { color: item.urgent ? '#DC2626' : '#2563EB' }]}>
                      {item.type}
                    </Text>
                  </View>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>

                <Text style={styles.noticeTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.noticeDesc} numberOfLines={2}>{item.desc}</Text>
              </View>

              <View style={styles.arrowContainer}>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  // Subtle decoration behind header
  backgroundBlob: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#DBEAFE', // Very light blue
    opacity: 0.5,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  
  // Header Styles
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
  },
  greeting: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  userName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1E3A8A',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  userTagContainer: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  userTag: {
    fontSize: 12,
    color: '#3730A3',
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  iconButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
    elevation: 2,
  },
  avatarText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Stats Styles
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    height: '60%',
    alignSelf: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
  },

  // Alert Styles
  alertCard: {
    backgroundColor: '#DC2626',
    marginBottom: 32,
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    elevation: 4,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  alertIconBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 12,
  },
  alertTitle: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 16,
  },
  alertText: {
    color: '#FECACA',
    fontSize: 13,
    marginTop: 2,
    fontWeight: '500',
  },

  // Notices Section Styles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  seeAllText: {
    color: '#3B82F6',
    fontWeight: '600',
    fontSize: 14,
  },
  noticeList: {
    gap: 16,
  },
  noticeCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden', // to clip the stripe
    elevation: 2,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  noticeStripe: {
    width: 6,
    height: '100%',
  },
  noticeContent: {
    flex: 1,
    padding: 16,
    paddingLeft: 12,
  },
  noticeTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
  },
  timeText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  noticeDesc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  arrowContainer: {
    justifyContent: 'center',
    paddingRight: 16,
  },
});