import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, FlatList, 
  TouchableOpacity, Alert, ActivityIndicator, RefreshControl 
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import axios from 'axios';

// Define the shape of a Student object for TypeScript
interface Student {
  id: string;
  name: string;
  roll: string;
}

export default function TeacherAttendance() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // For Submit button
  const [refreshing, setRefreshing] = useState(false); // For Pull-to-Refresh
  
  // 1. STATE: Store the Real Students here
  const [students, setStudents] = useState<Student[]>([]);
  
  // State: { 'studentId': 'PRESENT' | 'ABSENT' }
  const [attendance, setAttendance] = useState<Record<string, 'PRESENT' | 'ABSENT'>>({});

  // 2. FETCH FUNCTION: Get data from your Backend
  const fetchStudents = async () => {
    try {
      setRefreshing(true);
      console.log("🔄 Fetching students...");


      const response = await axios.get('https://vlx-server.onrender.com/api/v1/students/getStudents');

      if (response.data.success) {
        // Map MongoDB fields to App fields
        const formattedData: Student[] = response.data.data.map((item: any) => ({
          id: item._id,                       // MongoDB ID
          name: item.fullName,                // Your DB field
          roll: item.EnrollmentNumber || 'N/A' // Your DB field
        }));

        setStudents(formattedData);
        console.log(`✅ Loaded ${formattedData.length} students`);
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      Alert.alert("Error", "Could not load students. Pull down to try again.");
    } finally {
      setRefreshing(false);
    }
  };

  // 3. Load data when screen opens
  useEffect(() => {
    fetchStudents();
  }, []);

  // === DASHBOARD CALCULATIONS (Dynamic) ===
  const total = students.length;
  const presentCount = Object.values(attendance).filter(s => s === 'PRESENT').length;
  const absentCount = Object.values(attendance).filter(s => s === 'ABSENT').length;

  // Helper: Mark Single Student
  const markStatus = (id: string, status: 'PRESENT' | 'ABSENT') => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  // Helper: Mark All
  const markAll = (status: 'PRESENT' | 'ABSENT') => {
    const newBatch: any = {};
    students.forEach(s => newBatch[s.id] = status);
    setAttendance(newBatch);
  };

  // === SUBMIT LOGIC ===
  const handleSubmit = async () => {
    if (presentCount + absentCount !== total && total > 0) {
      Alert.alert("Incomplete", "Please mark attendance for all students.");
      return;
    }

    setLoading(true);

    const payload = {
      date: new Date().toISOString(),
      courseId: "MT-101 Materials Science",
      records: students.map(student => ({
        studentId: student.id,
        name: student.name,
        status: attendance[student.id]
      }))
    };

    try {
      
      const response = await axios.post('https://vlx-server.onrender.com/api/v1/attendence/mark', payload);

      if (response.status === 200 || response.status === 201) {
        Alert.alert("✅ Success", "Attendance submitted & Emails sent!", [
          { text: "OK",  }
        ]);
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Submission Failed";
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  const renderStudent = ({ item }: { item: Student }) => {
    const status = attendance[item.id];
    const isPresent = status === 'PRESENT';
    const isAbsent = status === 'ABSENT';

    return (
      <View style={styles.studentRow}>
        <View style={styles.info}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
          </View>
          <View>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.rollText}>{item.roll}</Text>
          </View>
        </View>

        <View style={styles.actionGroup}>
          <TouchableOpacity
            onPress={() => markStatus(item.id, 'PRESENT')}
            style={[styles.actionBtn, styles.presentBtn, isPresent && styles.presentActive]}
          >
            <Text style={[styles.btnLabel, isPresent ? styles.textWhite : styles.textGreen]}>P</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => markStatus(item.id, 'ABSENT')}
            style={[styles.actionBtn, styles.absentBtn, isAbsent && styles.absentActive]}
          >
            <Text style={[styles.btnLabel, isAbsent ? styles.textWhite : styles.textRed]}>A</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Mark Attendance', headerShadowVisible: false }} />

      {/* === Top Dashboard (Updates Automatically) === */}
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

        <View style={styles.bulkRow}>
          <TouchableOpacity onPress={() => markAll('PRESENT')}>
            <Text style={styles.bulkLink}>Mark All Present</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => markAll('ABSENT')}>
            <Text style={[styles.bulkLink, { color: '#EF4444' }]}>Mark All Absent</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* === Student List from DB === */}
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={renderStudent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchStudents} />
        }
        ListEmptyComponent={
          !refreshing ? (
            <Text style={{ textAlign: 'center', marginTop: 50, color: '#94A3B8' }}>
              No students found.
            </Text>
          ) : null
        }
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.submitText}>Submit & Send Emails</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Reuse your existing styles...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  dashboard: {
    backgroundColor: '#FFFFFF', padding: 20,
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
    shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, shadowRadius: 10, elevation: 4, zIndex: 10,
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
  listContent: { padding: 20, paddingBottom: 100 },
  studentRow: {
    backgroundColor: '#FFFFFF', padding: 16, borderRadius: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9',
  },
  info: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#4F46E5', fontWeight: '800', fontSize: 16 },
  nameText: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  rollText: { fontSize: 12, color: '#64748B' },
  actionGroup: { flexDirection: 'row', gap: 8 },
  actionBtn: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5 },
  btnLabel: { fontWeight: '800', fontSize: 14 },
  presentBtn: { borderColor: '#BBF7D0', backgroundColor: '#F0FDF4' },
  presentActive: { backgroundColor: '#22C55E', borderColor: '#22C55E' },
  textGreen: { color: '#166534' },
  absentBtn: { borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
  absentActive: { backgroundColor: '#EF4444', borderColor: '#EF4444' },
  textRed: { color: '#991B1B' },
  textWhite: { color: '#FFFFFF' },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#FFFFFF', padding: 20, borderTopWidth: 1, borderTopColor: '#E2E8F0',
  },
  submitButton: {
    backgroundColor: '#1E3A8A', paddingVertical: 16, borderRadius: 16,
    alignItems: 'center', shadowColor: '#1E3A8A', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  submitText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
});