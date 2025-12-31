import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, Alert, ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';

export default function AdminDashboard() {
  const router = useRouter();

  // --- State for Notices ---
  const [noticeTitle, setNoticeTitle] = useState<string>('');
  const [noticeBody, setNoticeBody] = useState<string>('');
  
  // --- State for Study Material ---
  const [materialTitle, setMaterialTitle] = useState<string>('');
  // Type definition for the picked file
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  // --- Logic: Pick Document ---
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allows picking any file type
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // TypeScript now knows this is a DocumentPickerAsset
        setSelectedFile(result.assets[0]);
      }
    } catch (err) {
      console.log('Unknown Error: ', err);
      Alert.alert('Error', 'Failed to pick file');
    }
  };

  // --- Logic: Send Notice ---
  const handleSendNotice = () => {
    if (!noticeTitle.trim() || !noticeBody.trim()) {
      Alert.alert('Error', 'Please fill in both title and message.');
      return;
    }
    
    // Placeholder for API call
    console.log('Sending Notification:', { title: noticeTitle, body: noticeBody });
    
    Alert.alert('Success', 'Notice pushed to all students!');
    setNoticeTitle('');
    setNoticeBody('');
  };

  // --- Logic: Upload Material ---
  const handleUpload = () => {
    if (!materialTitle.trim() || !selectedFile) {
      Alert.alert('Error', 'Please enter a title and select a file.');
      return;
    }

    setUploading(true);

    // Simulate Network Request
    setTimeout(() => {
      console.log('Uploading File:', selectedFile.uri);
      
      setUploading(false);
      Alert.alert('Success', 'Study material uploaded successfully!');
      setMaterialTitle('');
      setSelectedFile(null);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
           <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* --- SECTION 1: PUSH NOTICES --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="notifications" size={24} color="#F97316" />
            <Text style={styles.cardTitle}>Push Notice</Text>
          </View>
          <Text style={styles.cardDesc}>Send urgent updates to all students.</Text>

          <TextInput 
            placeholder="Notice Title (e.g., Holiday Alert)" 
            placeholderTextColor="#9CA3AF"
            style={styles.input} 
            value={noticeTitle}
            onChangeText={setNoticeTitle}
          />
          
          <TextInput 
            placeholder="Message Body..." 
            placeholderTextColor="#9CA3AF"
            style={[styles.input, styles.textArea]} 
            multiline
            numberOfLines={4}
            value={noticeBody}
            onChangeText={setNoticeBody}
          />

          <TouchableOpacity 
            activeOpacity={0.8} 
            style={styles.buttonShadow}
            onPress={handleSendNotice}
          >
            <LinearGradient
              colors={['#FCD34D', '#F97316']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Send Notification</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* --- SECTION 2: STUDY MATERIALS --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="library" size={24} color="#F97316" />
            <Text style={styles.cardTitle}>Upload Materials</Text>
          </View>
          <Text style={styles.cardDesc}>Upload PDFs, Notes, or Assignments.</Text>

          <TextInput 
            placeholder="Material Title (e.g., Physics Ch.1)" 
            placeholderTextColor="#9CA3AF"
            style={styles.input} 
            value={materialTitle}
            onChangeText={setMaterialTitle}
          />

          {/* File Picker Area */}
          <TouchableOpacity onPress={pickDocument} style={styles.filePicker}>
            <Ionicons 
              name={selectedFile ? "document-text" : "cloud-upload-outline"} 
              size={32} 
              color={selectedFile ? "#F97316" : "#9CA3AF"} 
            />
            <Text style={styles.filePickerText}>
              {selectedFile ? selectedFile.name : "Tap to select a file (PDF/Doc)"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={0.8} 
            style={styles.buttonShadow}
            onPress={handleUpload}
            disabled={uploading}
          >
            <LinearGradient
              colors={['#FCD34D', '#F97316']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              {uploading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Upload Material</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backBtn: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 10,
  },
  cardDesc: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    marginLeft: 34,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  filePicker: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F9FAFB',
  },
  filePickerText: {
    marginTop: 8,
    color: '#6B7280',
    fontSize: 14,
  },
  buttonShadow: {
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 12,
  },
  gradientButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});