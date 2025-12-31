import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Switch } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TeacherAttendance() {
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  
  // Mock data for the demo
  const students = [
    { id: '1', name: 'Arjun Sharma', roll: 'MT201' },
    { id: '2', name: 'Sneha Patil', roll: 'MT202' },
    { id: '3', name: 'Ishaan Verma', roll: 'MT203' },
    { id: '4', name: 'Zoya Khan', roll: 'MT204' },
  ];

  const toggleStudent = (id: string) => {
    setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const markAllPresent = () => {
    const allPresent = {};
    students.forEach(s => allPresent[s.id] = true);
    setAttendance(allPresent);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Class Roll Call', headerShown: true }} />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.classTitle}>Materials Engineering</Text>
          <Text style={styles.classSub}>Batch A • Dec 31, 2025</Text>
        </View>
        <TouchableOpacity onPress={markAllPresent}>
          <Text style={styles.bulkAction}>Mark All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.studentCard} 
            onPress={() => toggleStudent(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.info}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.rollText}>{item.roll}</Text>
              </View>
            </View>
            
            <View style={[
              styles.statusIndicator, 
              { backgroundColor: attendance[item.id] ? '#10B981' : '#F1F5F9' }
            ]}>
              <Ionicons 
                name={attendance[item.id] ? "checkmark" : "remove"} 
                size={16} 
                color={attendance[item.id] ? "#FFF" : "#64748B"} 
              />
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Submit Attendance</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', padding: 24, backgroundColor: '#FFF' },
  classTitle: { fontSize: 20, fontWeight: '800', color: '#1E3A8A' },
  classSub: { fontSize: 13, color: '#64748B', marginTop: 4 },
  bulkAction: { color: '#3B82F6', fontWeight: '700' },
  listContent: { padding: 20 },
  studentCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, elevation: 1 },
  info: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#1E3A8A', fontWeight: 'bold' },
  nameText: { fontSize: 16, fontWeight: '700', color: '#1E3A8A' },
  rollText: { fontSize: 12, color: '#64748B' },
  statusIndicator: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  footer: { padding: 24, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  submitButton: { backgroundColor: '#1E3A8A', padding: 18, borderRadius: 16, alignItems: 'center' },
  submitText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
});