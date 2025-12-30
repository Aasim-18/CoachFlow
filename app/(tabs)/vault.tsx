import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SUBJECTS = [
  { id: '1', name: 'Physics', files: '12 Files', color: '#3B82F6' },
  { id: '2', name: 'Chemistry', files: '08 Files', color: '#10B981' },
  { id: '3', name: 'Mathematics', files: '15 Files', color: '#F59E0B' },
];

export default function Vault() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Study Vault</Text>
        <Text style={styles.subtitle}>SECURE RESOURCE LIBRARY</Text>
      </View>

      <FlatList
        data={SUBJECTS}
        contentContainerStyle={{ padding: 24 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.vaultCard}>
            <View style={[styles.folderIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name="folder" size={32} color={item.color} />
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={styles.subjectName}>{item.name}</Text>
              <Text style={styles.fileCount}>{item.files}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 24, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#F1F5F9' },
  title: { fontSize: 28, fontWeight: '900', color: '#1E3A8A' },
  subtitle: { fontSize: 10, color: '#9CA3AF', letterSpacing: 2, fontWeight: 'bold' },
  vaultCard: { backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', padding: 18, borderRadius: 20, marginBottom: 16, elevation: 1 },
  folderIcon: { padding: 12, borderRadius: 16 },
  subjectName: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  fileCount: { fontSize: 12, color: '#6B7280' },
});