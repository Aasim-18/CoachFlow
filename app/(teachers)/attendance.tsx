import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, FlatList, 
  TouchableOpacity, Alert, ActivityIndicator 
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

// Mock Data (Replace with API fetch)
const STUDENTS = [
  { id: '1', name: 'Arjun Sharma', roll: 'MT201' },
  { id: '2', name: 'Sneha Patil', roll: 'MT202' },
  { id: '3', name: 'Ishaan Verma', roll: 'MT203' },
  { id: '4', name: 'Zoya Khan', roll: 'MT204' },
  { id: '5', name: 'Rahul Deshmukh', roll: 'MT205' },
];

export default function TeacherAttendance() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // State stores status: { '1': 'PRESENT', '2': 'ABSENT' }
  const [attendance, setAttendance] = useState<Record<string, 'PRESENT' | 'ABSENT'>>({});

  // Calculations for the Top Dashboard
  const total = STUDENTS.length;
  const presentCount = Object.values(attendance).filter(s => s === 'PRESENT').length;
  const absentCount = Object.values(attendance).filter(s => s === 'ABSENT').length;

  const markStatus = (id: string, status: 'PRESENT' | 'ABSENT') => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const markAll = (status: 'PRESENT' | 'ABSENT') => {
    const newBatch = {};
    STUDENTS.forEach(s => newBatch[s.id] = status);
    setAttendance(newBatch);
  };

  const handleSubmit = async () => {
    // 1. Validation: Ensure all students are marked
    if (presentCount + absentCount !== total) {
      Alert.alert("Incomplete", "Please mark attendance for all students before submitting.");
      return;
    }

    setLoading(true);

    // 2. Format Payload
    const payload = {
      date: new Date().toISOString(),
      courseId: "MT-101", // Example Course ID
      records: STUDENTS.map(student => ({
        studentId: student.id,
        name: student.name,
        status: attendance[student.id]
      }))
    };

    try {
      console.log("Sending to Backend:", payload);

      // 3. API Call
      // Replace URL with your actual endpoint
      const response = await axios.post('https://vlx-server.onrender.com/api/v1/attendance/mark', payload);

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "Attendance submitted & Parents notified.", [
          { text: "Done", onPress: () => router.back() }
        ]);
      }
    } catch (error) {
      console.error("Attendance Error:", error);
      Alert.alert("Error", "Failed to sync attendance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStudent = ({ item }) => {
    const status = attendance[item.id];

    return (
      <View style={styles.studentRow}>
        <View style={styles.info}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.rollText}>{item.roll}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionGroup}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => markStatus(item.id, 'PRESENT')}
            style={[
              styles.actionBtn, 
              styles.presentBtn,
              status === 'PRESENT' && styles.presentActive
            ]}
          >
            <Text style={[
              styles.btnLabel, 
              status === 'PRESENT' ? styles.textWhite : styles.textGreen
            ]}>P</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => markStatus(item.id, 'ABSENT')}
            style={[
              styles.actionBtn, 
              styles.absentBtn,
              status === 'ABSENT' && styles.absentActive
            ]}
          >
            <Text style={[
              styles.btnLabel, 
              status === 'ABSENT' ? styles.textWhite : styles.textRed
            ]}>A</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Attendance', headerShadowVisible: false }} />

      {/* === Summary Dashboard === */}
      <View style={styles.dashboard}>
        <View style={styles.dashHeader}>
          <View>
            <Text style={styles.dashTitle}>Materials Science</Text>
            <Text style={styles.dashDate}>{new Date().toDateString()}</Text>
          </View>
          <View style={styles.totalBadge}>
            <Text style={styles.totalText}>Total: {total}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: '#DCFCE7' }]}>
            <Text style={[styles.statLabel, { color: '#166534' }]}>Present</Text>
            <Text style={[styles.statCount, { color: '#166534' }]}>{presentCount}</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#FEE2E2' }]}>
            <Text style={[styles.statLabel, { color: '#991B1B' }]}>Absent</Text>
            <Text style={[styles.statCount, { color: '#991B1B' }]}>{absentCount}</Text>
          </View>
        </View>

        {/* Bulk Actions */}
        <View style={styles.bulkRow}>
          <TouchableOpacity onPress={() => markAll('PRESENT')}>
            <Text style={styles.bulkLink}>Mark All Present</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => markAll('ABSENT')}>
            <Text style={[styles.bulkLink, { color: '#EF4444' }]}>Mark All Absent</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* === Student List === */}
      <FlatList
        data={STUDENTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={renderStudent}
      />

      {/* === Footer === */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.submitText}>Submit & Notify Parents</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  
  // Dashboard Styles
  dashboard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 10,
    marginBottom: 4,
  },
  dashHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  dashTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  dashDate: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  totalBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  totalText: { fontSize: 12, fontWeight: '700', color: '#475569' },
  
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statBox: { flex: 1, padding: 12, borderRadius: 12, alignItems: 'center' },
  statLabel: { fontSize: 12, fontWeight: '600', marginBottom: 2, textTransform: 'uppercase' },
  statCount: { fontSize: 24, fontWeight: '800' },
  
  bulkRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  bulkLink: { fontSize: 13, fontWeight: '600', color: '#3B82F6' },

  // List Styles
  listContent: { padding: 20, paddingBottom: 100 },
  studentRow: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  info: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { 
    width: 42, height: 42, borderRadius: 21, 
    backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center' 
  },
  avatarText: { color: '#4F46E5', fontWeight: '800', fontSize: 16 },
  nameText: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  rollText: { fontSize: 12, color: '#64748B' },

  // Button Styles
  actionGroup: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    width: 40, height: 40, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5,
  },
  btnLabel: { fontWeight: '800', fontSize: 14 },
  
  // Present Styles
  presentBtn: { borderColor: '#BBF7D0', backgroundColor: '#F0FDF4' },
  presentActive: { backgroundColor: '#22C55E', borderColor: '#22C55E' },
  textGreen: { color: '#166534' },
  
  // Absent Styles
  absentBtn: { borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
  absentActive: { backgroundColor: '#EF4444', borderColor: '#EF4444' },
  textRed: { color: '#991B1B' },
  
  textWhite: { color: '#FFFFFF' },

  // Footer
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#FFFFFF', padding: 20,
    borderTopWidth: 1, borderTopColor: '#E2E8F0',
  },
  submitButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
});