import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const MVP_FEATURES = [
  { id: 'fee', title: 'Fee Status', icon: 'card', color: '#10B981', route: '/(tabs)/fees' },
  { id: 'attn', title: 'Attendance', icon: 'calendar', color: '#3B82F6', route: '/(tabs)/attendance' },
  { id: 'test', title: 'Test Results', icon: 'bar-chart', color: '#F59E0B', route: '/(tabs)/results' },
  { id: 'doubt', title: 'Doubt Desk', icon: 'chatbubbles', color: '#8B5CF6', route: '/(tabs)/doubts' },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Ensure status bar is dark for light background */}
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* === Premium Header === */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Good Evening,</Text>
            <Text style={styles.userName}>Aryan</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#1E3A8A" />
              {/* Notification Dot */}
              <View style={styles.notifDot} />
            </TouchableOpacity>
            {/* Avatar Placeholder */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
          </View>
        </View>

        {/* === Quick Stats Row (The "Hook") === */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Avg. Attendance</Text>
            <Text style={[styles.statValue, { color: '#3B82F6' }]}>92%</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Next Test In</Text>
            <Text style={[styles.statValue, { color: '#F59E0B' }]}>4 Days</Text>
          </View>
        </View>


        {/* === Attendance Alert === */}
        <TouchableOpacity style={styles.alertCard} activeOpacity={0.9}>
          <View style={styles.alertIconBox}>
            <Ionicons name="alert" size={24} color="#FFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>Attendance Alert</Text>
            <Text style={styles.alertText}>Marked ABSENT yesterday. Alert sent to parent.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FECACA" />
        </TouchableOpacity>


        {/* === Feature Grid === */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.grid}>
          {MVP_FEATURES.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.gridItem}
              onPress={() => item.route ? router.push(item.route) : null}
              activeOpacity={0.8}
            >
              {/* Used a lighter shade for the icon background */}
              <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon as any} size={28} color={item.color} />
              </View>
              <Text style={styles.gridLabel}>{item.title}</Text>
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
    backgroundColor: '#F8FAFC', // Premium Slate-50 background
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greeting: {
    fontSize: 16,
    color: '#64748B', // Slate-500
    fontWeight: '500',
  },
  userName: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1E3A8A', // Brand Blue
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 12,
    // Subtle shadow for depth
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1,
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
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    // Premium shadow block
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
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    height: '80%',
    alignSelf: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
  },
  alertCard: {
    backgroundColor: '#DC2626', // Slightly deeper red for premium feel
    marginBottom: 32,
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    elevation: 4,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  alertIconBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 12,
  },
  alertTitle: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 16,
  },
  alertText: {
    color: '#FECACA', // Red-200
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E3A8A',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridItem: {
    width: '47%', // Ensures 2 columns with gap
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignItems: 'center',
    // Soft shadows for floating effect
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconBox: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  gridLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155', // Slate-700
  },
});