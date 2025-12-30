import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function FeeStatus() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Fee Status', headerShown: true }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* === Summary Card === */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Course Fee</Text>
          <Text style={styles.totalAmount}>₹45,000</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <View>
              <Text style={styles.subLabel}>Paid</Text>
              <Text style={styles.paidAmount}>₹30,000</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.subLabel}>Pending</Text>
              <Text style={styles.pendingAmount}>₹15,000</Text>
            </View>
          </View>
        </View>

        {/* === Installment History === */}
        <Text style={styles.sectionTitle}>Payment History</Text>
        
        <View style={styles.historyList}>
          {/* Paid Installment */}
          <View style={styles.historyItem}>
            <View style={styles.statusIconPaid}>
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.installmentTitle}>2nd Installment</Text>
              <Text style={styles.dateText}>Paid on 15 Dec 2025</Text>
            </View>
            <Text style={styles.itemAmount}>₹15,000</Text>
          </View>

          {/* Pending Installment */}
          <View style={styles.historyItem}>
            <View style={styles.statusIconPending}>
              <Ionicons name="time" size={24} color="#F59E0B" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.installmentTitle}>3rd Installment</Text>
              <Text style={[styles.dateText, { color: '#EF4444' }]}>Due by 15 Jan 2026</Text>
            </View>
            <Text style={styles.itemAmount}>₹15,000</Text>
          </View>
        </View>

        {/* === Action Button === */}
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Download Receipt</Text>
          <Ionicons name="download-outline" size={20} color="#FFF" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 24 },
  summaryCard: { 
    backgroundColor: '#1E3A8A', // Our Blue-900 Brand
    padding: 24, 
    borderRadius: 24, 
    elevation: 8,
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 32
  },
  summaryLabel: { color: '#CBD5E1', fontSize: 14, fontWeight: '600' },
  totalAmount: { color: '#FFF', fontSize: 36, fontWeight: '900', marginTop: 4 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  subLabel: { color: '#94A3B8', fontSize: 12, marginBottom: 4 },
  paidAmount: { color: '#10B981', fontSize: 20, fontWeight: 'bold' },
  pendingAmount: { color: '#F87171', fontSize: 20, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1E3A8A', marginBottom: 16 },
  historyList: { gap: 12 },
  historyItem: { 
    backgroundColor: '#FFF', 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9'
  },
  statusIconPaid: { backgroundColor: '#D1FAE5', padding: 8, borderRadius: 12 },
  statusIconPending: { backgroundColor: '#FEF3C7', padding: 8, borderRadius: 12 },
  installmentTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  dateText: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  itemAmount: { fontSize: 16, fontWeight: '800', color: '#1E3A8A' },
  payButton: { 
    backgroundColor: '#1E3A8A', 
    flexDirection: 'row', 
    padding: 20, 
    borderRadius: 16, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 40,
    gap: 10
  },
  payButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});