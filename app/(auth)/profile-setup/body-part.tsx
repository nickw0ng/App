import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function BodyPartSelectionScreen() {
  const [selectedPart, setSelectedPart] = useState<'ankle' | null>(null);
  const [showError, setShowError] = useState(false);

  const handleContinue = () => {
    if (selectedPart) {
      router.push('/(auth)/profile-setup/condition');
    } else {
      setShowError(true);
    }
  };

  return (
    <LinearGradient
      colors={['#1B4D3E', '#4CAF50', '#8BC34A']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Body Part</Text>
          <Text style={styles.subtitle}>Choose the area you want to focus on</Text>
        </View>

        {/* Active Body Part Card */}
        <TouchableOpacity 
          style={[
            styles.bodyPartCard,
            selectedPart === 'ankle' && styles.selectedCard
          ]}
          onPress={() => setSelectedPart('ankle')}
        >
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="human-foot" size={32} color="white" />
            <Text style={styles.cardTitle}>Ankle</Text>
          </View>
          
          <View style={styles.cardContent}>
            <Text style={styles.cardDescription}>
              Focus on ankle mobility, strength, and stability. Perfect for recovery from sprains and preventing future injuries.
            </Text>
            
            <View style={styles.cardFeatures}>
              <View style={styles.featureItem}>
                <MaterialCommunityIcons name="run" size={20} color="white" />
                <Text style={styles.featureText}>Mobility Exercises</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialCommunityIcons name="dumbbell" size={20} color="white" />
                <Text style={styles.featureText}>Strength Training</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialCommunityIcons name="shield-check" size={20} color="white" />
                <Text style={styles.featureText}>Injury Prevention</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Coming Soon Card */}
        <View style={styles.comingSoonCard}>
          <MaterialCommunityIcons name="clock-outline" size={24} color="rgba(255, 255, 255, 0.6)" />
          <Text style={styles.comingSoonTitle}>More Body Parts Coming Soon</Text>
          <Text style={styles.comingSoonText}>
            We're working on adding more body parts to help with your recovery journey.
          </Text>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomContainer}>
          {showError && (
            <Text style={styles.errorText}>Please select a body part to continue</Text>
          )}
          <TouchableOpacity 
            style={[
              styles.continueButton,
              !selectedPart && styles.continueButtonInactive
            ]}
            onPress={handleContinue}
          >
            <Text style={[
              styles.continueButtonText,
              !selectedPart && styles.continueButtonTextInactive
            ]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
  },
  bodyPartCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectedCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'white',
    transform: [{ scale: 1.02 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 15,
  },
  cardContent: {
    gap: 15,
  },
  cardDescription: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    lineHeight: 22,
  },
  cardFeatures: {
    gap: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    color: 'white',
    fontSize: 16,
  },
  comingSoonCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
    marginVertical: 10,
  },
  comingSoonText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 'auto',
    gap: 10,
  },
  errorText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: '#FF4444',
    padding: 10,
    borderRadius: 8,
  },
  continueButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  continueButtonText: {
    color: '#1B4D3E',
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButtonTextInactive: {
    color: 'rgba(27, 77, 62, 0.5)',
  },
}); 