import { StyleSheet, TouchableOpacity, View, Text, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';

type FocusOption = 'diagnosis' | 'recovery' | 'prevention';

export default function FocusSelectionScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [selectedFocus, setSelectedFocus] = useState<FocusOption | null>(null);
  const [showError, setShowError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (showError) {
      // Fade in
      fadeAnim.setValue(1);
      
      // Start fade out after 1.5 seconds (giving 0.5 seconds for fade-out animation)
      timeoutId = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500, // 500ms fade-out duration
          useNativeDriver: true,
        }).start(() => setShowError(false));
      }, 1500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showError]);

  const handleContinue = () => {
    if (selectedFocus) {
      router.push({
        pathname: '/(auth)/profile-setup/condition',
        params: { focus: selectedFocus, name }
      });
    } else {
      setShowError(true);
    }
  };

  const handleFocusSelect = (focus: FocusOption) => {
    setSelectedFocus(focus);
    setShowError(false);
  };

  return (
    <LinearGradient
      colors={['#1B4D3E', '#4CAF50', '#8BC34A']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Setting Up Your Profile</Text>
            <Text style={styles.subtitle}>What's your main focus?</Text>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={[
                styles.optionCard,
                selectedFocus === 'diagnosis' && styles.selectedCard
              ]}
              onPress={() => handleFocusSelect('diagnosis')}
            >
              <MaterialCommunityIcons name="stethoscope" size={40} color="white" />
              <Text style={styles.optionTitle}>Injury Diagnosis</Text>
              <Text style={styles.optionDescription}>
                Understand and identify potential injuries
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.optionCard,
                selectedFocus === 'recovery' && styles.selectedCard
              ]}
              onPress={() => handleFocusSelect('recovery')}
            >
              <MaterialCommunityIcons name="weight-lifter" size={40} color="white" />
              <Text style={styles.optionTitle}>Recovery</Text>
              <Text style={styles.optionDescription}>
                Get back to your best with guided recovery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.optionCard,
                selectedFocus === 'prevention' && styles.selectedCard
              ]}
              onPress={() => handleFocusSelect('prevention')}
            >
              <MaterialCommunityIcons name="shield-check" size={40} color="white" />
              <Text style={styles.optionTitle}>Injury Prevention</Text>
              <Text style={styles.optionDescription}>
                Stay healthy with preventative exercises
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          {showError && (
            <Animated.View style={[
              styles.errorContainer,
              { opacity: fadeAnim }
            ]}>
              <Text style={styles.errorText}>Choose a focus to continue</Text>
            </Animated.View>
          )}
          <TouchableOpacity 
            style={[
              styles.continueButton,
              !selectedFocus && styles.continueButtonInactive
            ]}
            onPress={handleContinue}
          >
            <Text style={[
              styles.continueButtonText,
              !selectedFocus && styles.continueButtonTextInactive
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
    justifyContent: 'space-between', // This helps separate content and bottom button
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
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
  optionsContainer: {
    gap: 20,
  },
  optionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectedCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'white',
    transform: [{ scale: 1.02 }],
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  optionDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 5,
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 30, // Extra padding at bottom
    backgroundColor: 'transparent',
  },
  errorContainer: {
    backgroundColor: '#FF4444',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // 50% opacity white
  },
  continueButtonText: {
    color: '#1B4D3E',
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButtonTextInactive: {
    color: 'rgba(27, 77, 62, 0.5)', // 50% opacity of the original color
  },
}); 