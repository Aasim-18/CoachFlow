import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function ResultsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Performance', headerShown: true }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* === Performance Header === */}
        <View style={styles.scoreBanner}>
          <Text style={styles.bannerLabel}>Average Score</Text>
          <Text style={styles.bannerValue}>84%</Text>
          <Text style={styles.rankText}>Ranked #5 in Batch</Text>
        </View>

        {/* === Recent Tests === */}
        <Text style={styles.sectionTitle}>Recent Test Scores</Text>
        
        {[
          { subject: 'Physics', topic: 'Thermodynamics', score: '42/50', percent: '84%', rank: '08' },
          { subject: 'Mathematics', topic: 'Integration', score: '48/50', percent: '96%', rank: '02' },
          { subject: 'Chemistry', topic: 'Organic Compounds', score: '38/50', percent: '76%', rank: '15' },
        ].map((test, index) => (
          <TouchableOpacity key={index} style={styles.resultCard}>
            <View style={styles.resultMain}>
              <View style={styles.subjectIcon}>
                <Ionicons name="document-text" size={24} color="#1E3A8A" />
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={styles.subjectName}>{test.subject}</Text>
                <Text style={styles.topicName}>{test.topic}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.scoreText}>{test.score}</Text>
                <Text style={styles.percentText}>{test.percent}</Text>
              </View>
            </View>
            <View style={styles.resultFooter}>
              <Text style={styles.rankLabel}>Batch Rank: <Text style={styles.rankValue}>{test.rank}</Text></Text>
              <Text style={styles.viewDetails}>View Solutions →</Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 24 },
  scoreBanner: { backgroundColor: '#1E3A8A', padding: 32, borderRadius: 28, alignItems: 'center', marginBottom: 32, elevation: 4 },
  bannerLabel: { color: '#CBD5E1', fontSize: 14, fontWeight: '600', letterSpacing: 1 },
  bannerValue: { color: '#FFF', fontSize: 48, fontWeight: '900', marginVertical: 4 },
  rankText: { color: '#FCD34D', fontSize: 14, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1E3A8A', marginBottom: 16 },
  resultCard: { backgroundColor: '#FFF', borderRadius: 24, marginBottom: 16, overflow: 'hidden', elevation: 2, borderWhidth: 1, borderColor: '#F1F5F9' },
  resultMain: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  subjectIcon: { backgroundColor: '#EFF6FF', padding: 12, borderRadius: 16 },
  subjectName: { fontSize: 18, fontWeight: '800', color: '#1F2937' },
  topicName: { fontSize: 12, color: '#64748B', marginTop: 2 },
  scoreText: { fontSize: 18, fontWeight: '900', color: '#1E3A8A' },
  percentText: { fontSize: 12, color: '#10B981', fontWeight: 'bold', marginTop: 2 },
  resultFooter: { backgroundColor: '#F8FAFC', paddingHorizontal: 20, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  rankLabel: { fontSize: 12, color: '#64748B' },
  rankValue: { fontWeight: 'bold', color: '#1F2937' },
  viewDetails: { fontSize: 12, fontWeight: 'bold', color: '#3B82F6' },
});