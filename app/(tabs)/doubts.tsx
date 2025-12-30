import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function DoubtDesk() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Doubt Desk', headerShown: true }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* === Action Header === */}
        <TouchableOpacity style={styles.postButton}>
          <Ionicons name="camera" size={24} color="#FFF" />
          <Text style={styles.postButtonText}>Ask a New Doubt</Text>
        </TouchableOpacity>

        {/* === Filter Tabs === */}
        <View style={styles.filterRow}>
          <TouchableOpacity style={[styles.filterTab, styles.activeTab]}>
            <Text style={styles.activeTabText}>All Doubts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>My Doubts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterTab}>
            <Text style={styles.filterTabText}>Resolved</Text>
          </TouchableOpacity>
        </View>

        {/* === Doubt Feed === */}
        <View style={styles.feed}>
          
          {/* Resolved Doubt Example */}
          <View style={styles.doubtCard}>
            <View style={styles.cardHeader}>
              <View style={styles.userInfo}>
                <View style={styles.avatarPlaceholder}><Text style={styles.avatarText}>A</Text></View>
                <Text style={styles.userName}>Aryan • 10 mins ago</Text>
              </View>
              <View style={styles.resolvedBadge}>
                <Text style={styles.resolvedText}>Resolved</Text>
              </View>
            </View>
            
            <Text style={styles.doubtTitle}>Stuck on Rolle's Theorem application in Question 7.</Text>
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={40} color="#CBD5E1" />
              <Text style={styles.imageLabel}>Attached Image: Question_7.jpg</Text>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.footerStat}>
                <Ionicons name="chatbubble-outline" size={18} color="#6B7280" />
                <Text style={styles.statText}>3 Answers</Text>
              </View>
              <TouchableOpacity style={styles.viewLink}>
                <Text style={styles.viewLinkText}>View Solution</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Pending Doubt Example */}
          <View style={styles.doubtCard}>
            <View style={styles.cardHeader}>
              <View style={styles.userInfo}>
                <View style={[styles.avatarPlaceholder, { backgroundColor: '#F97316' }]}><Text style={styles.avatarText}>S</Text></View>
                <Text style={styles.userName}>Sneha • 1 hour ago</Text>
              </View>
              <View style={styles.pendingBadge}>
                <Text style={styles.pendingText}>Pending</Text>
              </View>
            </View>
            
            <Text style={styles.doubtTitle}>Can someone explain the Fermi level shift in N-type semiconductors?</Text>
            
            <View style={styles.cardFooter}>
              <View style={styles.footerStat}>
                <Ionicons name="chatbubble-outline" size={18} color="#6B7280" />
                <Text style={styles.statText}>0 Answers</Text>
              </View>
              <TouchableOpacity style={styles.viewLink}>
                <Text style={styles.viewLinkText}>Help Solve</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 20 },
  postButton: { 
    backgroundColor: '#1E3A8A', 
    flexDirection: 'row', 
    padding: 18, 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  postButtonText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  filterTab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E2E8F0' },
  activeTab: { backgroundColor: '#1E3A8A', borderColor: '#1E3A8A' },
  filterTabText: { color: '#64748B', fontWeight: '600', fontSize: 13 },
  activeTabText: { color: '#FFF', fontWeight: '600', fontSize: 13 },
  feed: { gap: 20 },
  doubtCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, elevation: 2, shadowOpacity: 0.05, borderWhidth: 1, borderColor: '#F1F5F9' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatarPlaceholder: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#1E3A8A', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  userName: { color: '#64748B', fontSize: 12, fontWeight: '600' },
  resolvedBadge: { backgroundColor: '#D1FAE5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  resolvedText: { color: '#065F46', fontSize: 10, fontWeight: 'bold' },
  pendingBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  pendingText: { color: '#92400E', fontSize: 10, fontWeight: 'bold' },
  doubtTitle: { fontSize: 16, fontWeight: '700', color: '#1E3A8A', lineHeight: 22 },
  imagePlaceholder: { backgroundColor: '#F8FAFC', borderRadius: 16, marginTop: 12, padding: 20, alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1' },
  imageLabel: { color: '#94A3B8', fontSize: 11, marginTop: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  footerStat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statText: { color: '#64748B', fontSize: 13, fontWeight: '500' },
  viewLinkText: { color: '#1E3A8A', fontWeight: '800', fontSize: 14 },
});