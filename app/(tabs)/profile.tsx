import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, Modal, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useEffect, useRef, useState } from 'react';

// Temporary user data - this will come from your backend later
const userData = {
  name: 'John Doe',
  dateOfBirth: '1990-05-15',
  email: 'john.doe@example.com',
  activityLevel: 'Moderately Active',
  focus: 'Injury Prevention',
  goals: ['Return to Sport', 'Performance Improvement'],
  userId: '123-456-789'
};

export default function ProfileScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showCopiedModal, setShowCopiedModal] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEditPersonalInfo = () => {
    // TODO: Implement edit personal information functionality
    console.log('Edit personal information');
  };

  const handleEditAppSettings = () => {
    // TODO: Implement edit app settings functionality
    console.log('Edit app settings');
  };

  const handleCopyUserId = async () => {
    try {
      await Clipboard.setStringAsync(userData.userId);
      setShowCopiedModal(true);
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowCopiedModal(false);
      });
    } catch (error) {
      // Handle error silently
    }
  };

  return (
    <LinearGradient
      colors={['#1B4D3E', '#4CAF50', '#8BC34A']}
      style={styles.gradient}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileIcon}>
            <MaterialCommunityIcons name="account-circle" size={80} color="white" />
          </View>
          <Text style={styles.name}>{userData.name}</Text>
          <View style={styles.userIdHeaderContainer}>
            <MaterialCommunityIcons name="identifier" size={16} color="white" />
            <Text style={styles.userIdHeaderText}>{userData.userId}</Text>
            <TouchableOpacity 
              style={styles.copyButton}
              onPress={handleCopyUserId}
            >
              <MaterialCommunityIcons name="content-copy" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="email" size={24} color="white" />
              <Text style={styles.infoText}>{userData.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="cake" size={24} color="white" />
              <Text style={styles.infoText}>{formatDate(userData.dateOfBirth)}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="run" size={24} color="white" />
              <Text style={styles.infoText}>{userData.activityLevel}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={handleEditPersonalInfo}
          >
            <MaterialCommunityIcons name="pencil" size={20} color="white" />
            <Text style={styles.editButtonText}>Edit Information</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Recovery</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="target" size={24} color="white" />
              <Text style={styles.infoText}>{userData.focus}</Text>
            </View>
            <View style={styles.goalsContainer}>
              <MaterialCommunityIcons name="flag" size={24} color="white" />
              <View style={styles.goalsList}>
                {userData.goals.map((goal, index) => (
                  <Text key={index} style={styles.goalText}>• {goal}</Text>
                ))}
              </View>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={handleEditAppSettings}
          >
            <MaterialCommunityIcons name="pencil" size={20} color="white" />
            <Text style={styles.editButtonText}>Edit Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showCopiedModal}
        transparent
        animationType="none"
        onRequestClose={() => setShowCopiedModal(false)}
      >
        <View style={styles.modalContainer}>
          <Animated.View 
            style={[
              styles.modalContent,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.modalIconContainer}>
              <MaterialCommunityIcons name="check-circle" size={40} color="#4CAF50" />
            </View>
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalText}>User ID Copied</Text>
              <Text style={styles.modalSubtext}>Share your code with a friend!</Text>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    marginLeft: 5,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 15,
  },
  goalsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  goalsList: {
    marginLeft: 15,
    flex: 1,
  },
  goalText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
  userIdHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 5,
  },
  userIdHeaderText: {
    fontSize: 15,
    color: 'white',
    marginLeft: 6,
    marginRight: 8,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  copyButton: {
    padding: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTextContainer: {
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1B4D3E',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtext: {
    fontSize: 14,
    color: '#1B4D3E',
    textAlign: 'center',
    opacity: 0.8,
  },
}); 