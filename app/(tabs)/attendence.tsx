import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function AttendanceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'My Attendance', headerShown: true }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* === Attendance Summary Card === */}
        <View style={styles.summaryCard}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>24/26</Text>
            <Text style={styles.statLabel}>Days Present</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#EF4444' }]}>02</Text>
            <Text style={styles.statLabel}>Days Absent</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#3B82F6' }]}>92%</Text>
            <Text style={styles.statLabel}>Total Avg.</Text>
          </View>
        </View>

        {/* === Month Selector === */}
        <View style={styles.monthSelector}>
          <Ionicons name="chevron-back" size={20} color="#1E3A8A" />
          <Text style={styles.monthText}>December 2025</Text>
          <Ionicons name="chevron-forward" size={20} color="#1E3A8A" />
        </View>

        {/* === Attendance List === */}
        <View style={styles.historyList}>
          {[
            { date: '29 Dec', day: 'Monday', status: 'Present', color: '#10B981' },
            { date: '28 Dec', day: 'Sunday', status: 'Holiday', color: '#94A3B8' },
            { date: '27 Dec', day: 'Saturday', status: 'Absent', color: '#EF4444' },
            { date: '26 Dec', day: 'Friday', status: 'Present', color: '#10B981' },
          ].map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <View>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.dayText}>{item.day}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: item.color + '15' }]}>
                <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 24 },
  summaryCard: { backgroundColor: '#FFF', flexDirection: 'row', padding: 24, borderRadius: 24, elevation: 2, shadowOpacity: 0.05, marginBottom: 32 },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '900', color: '#1E3A8A' },
  statLabel: { fontSize: 10, color: '#64748B', marginTop: 4, fontWeight: '700', textTransform: 'uppercase' },
  divider: { width: 1, backgroundColor: '#F1F5F9', marginHorizontal: 10 },
  monthSelector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, backgroundColor: '#EFF6FF', padding: 12, borderRadius: 12 },
  monthText: { fontSize: 16, fontWeight: '800', color: '#1E3A8A' },
  historyList: { gap: 12 },
  historyItem: { backgroundColor: '#FFF', padding: 16, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1 },
  dateText: { fontSize: 16, fontWeight: '800', color: '#1E3A8A' },
  dayText: { fontSize: 12, color: '#64748B' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  statusText: { fontSize: 12, fontWeight: 'bold' },
});