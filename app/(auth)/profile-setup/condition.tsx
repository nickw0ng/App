import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import Slider from '@react-native-community/slider';

type ActivityFrequency = 'rarely' | 'sometimes' | 'regularly' | 'daily';
type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
type FocusOption = 'diagnosis' | 'recovery' | 'prevention';

export default function ConditionAssessmentScreen() {
  const { focus, name } = useLocalSearchParams<{ focus: FocusOption; name: string }>();
  
  // States for Diagnosis & Recovery
  const [painLevel, setPainLevel] = useState(0);
  const [duration, setDuration] = useState<string | null>(null);
  const [hasPreviousInjuries, setHasPreviousInjuries] = useState<boolean | null>(null);
  
  // States for Prevention
  const [activityFrequency, setActivityFrequency] = useState<ActivityFrequency | null>(null);
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel | null>(null);
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
          duration: 500,
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

  const isDiagnosisOrRecovery = focus === 'diagnosis' || focus === 'recovery';

  const getPainColor = (level: number) => {
    if (level <= 3) return "#4CAF50";  // Green
    if (level <= 6) return "#FFC107";  // Yellow
    if (level <= 8) return "#FF9800";  // Orange
    return "#F44336";  // Red
  };

  const durationOptions = [
    "Less than a week",
    "1-2 weeks",
    "2-4 weeks",
    "More than a month"
  ];

  const handleContinue = () => {
    if (isDiagnosisOrRecovery) {
      if (painLevel > 0 && duration && hasPreviousInjuries !== null) {
        setShowError(false);
        router.push({
          pathname: '/profile-setup/goals',
          params: { focus, name }
        });
      } else {
        setShowError(true);
      }
    } else {
      if (hasPreviousInjuries !== null && activityFrequency && fitnessLevel) {
        setShowError(false);
        router.push({
          pathname: '/profile-setup/goals',
          params: { focus, name }
        });
      } else {
        setShowError(true);
      }
    }
  };

  // Early return if focus is not set
  if (!focus) {
    return (
      <LinearGradient
        colors={['#1B4D3E', '#4CAF50', '#8BC34A']}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Error</Text>
          <Text style={styles.subtitle}>Please select a focus first</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#1B4D3E', '#4CAF50', '#8BC34A']}
      style={styles.gradient}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Condition Assessment</Text>
          <Text style={styles.subtitle}>
            {isDiagnosisOrRecovery 
              ? "Tell us about your condition" 
              : "Tell us about your activity"
            }
          </Text>
        </View>

        {isDiagnosisOrRecovery ? (
          // Diagnosis & Recovery Questions
          <View style={styles.section}>
            {/* Pain Level Slider */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>Pain Level (1-10)</Text>
              <Text style={[styles.painValue, { color: getPainColor(painLevel) }]}>
                {painLevel}
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                step={1}
                value={painLevel}
                onValueChange={setPainLevel}
                minimumTrackTintColor={getPainColor(painLevel)}
                maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                thumbTintColor="white"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>No Pain</Text>
                <Text style={styles.sliderLabel}>Severe</Text>
              </View>
            </View>

            {/* Duration Selection */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>Duration of Issue</Text>
              <View style={styles.optionsContainer}>
                {durationOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      duration === option && styles.selectedOption
                    ]}
                    onPress={() => setDuration(option)}
                  >
                    <Text style={[
                      styles.optionText,
                      duration === option && styles.selectedOptionText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Previous Injuries */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>Previous Injuries?</Text>
              <View style={styles.yesNoContainer}>
                <TouchableOpacity
                  style={[
                    styles.yesNoButton,
                    hasPreviousInjuries === true && styles.selectedOption
                  ]}
                  onPress={() => setHasPreviousInjuries(true)}
                >
                  <Text style={[
                    styles.yesNoText,
                    hasPreviousInjuries === true && styles.selectedOptionText
                  ]}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.yesNoButton,
                    hasPreviousInjuries === false && styles.selectedOption
                  ]}
                  onPress={() => setHasPreviousInjuries(false)}
                >
                  <Text style={[
                    styles.yesNoText,
                    hasPreviousInjuries === false && styles.selectedOptionText
                  ]}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          // Prevention Questions
          <View style={styles.section}>
            {/* Previous Injuries */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>Previous Injuries?</Text>
              <View style={styles.yesNoContainer}>
                <TouchableOpacity
                  style={[
                    styles.yesNoButton,
                    hasPreviousInjuries === true && styles.selectedOption
                  ]}
                  onPress={() => setHasPreviousInjuries(true)}
                >
                  <Text style={[
                    styles.yesNoText,
                    hasPreviousInjuries === true && styles.selectedOptionText
                  ]}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.yesNoButton,
                    hasPreviousInjuries === false && styles.selectedOption
                  ]}
                  onPress={() => setHasPreviousInjuries(false)}
                >
                  <Text style={[
                    styles.yesNoText,
                    hasPreviousInjuries === false && styles.selectedOptionText
                  ]}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Activity Frequency */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>Activity Frequency</Text>
              <View style={styles.optionsContainer}>
                {['rarely', 'sometimes', 'regularly', 'daily'].map((frequency) => (
                  <TouchableOpacity
                    key={frequency}
                    style={[
                      styles.optionButton,
                      activityFrequency === frequency && styles.selectedOption
                    ]}
                    onPress={() => setActivityFrequency(frequency as ActivityFrequency)}
                  >
                    <Text style={[
                      styles.optionText,
                      activityFrequency === frequency && styles.selectedOptionText
                    ]}>
                      {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Fitness Level */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>Current Fitness Level</Text>
              <View style={styles.optionsContainer}>
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.optionButton,
                      fitnessLevel === level && styles.selectedOption
                    ]}
                    onPress={() => setFitnessLevel(level as FitnessLevel)}
                  >
                    <Text style={[
                      styles.optionText,
                      fitnessLevel === level && styles.selectedOptionText
                    ]}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomContainer}>
        {showError && (
          <Animated.View style={[
            styles.errorContainer,
            { opacity: fadeAnim }
          ]}>
            <Text style={styles.errorText}>Please fill in all fields before continuing</Text>
          </Animated.View>
        )}
        <TouchableOpacity 
          style={[
            styles.continueButton,
            (isDiagnosisOrRecovery && painLevel > 0 && duration && hasPreviousInjuries !== null) ||
            (!isDiagnosisOrRecovery && hasPreviousInjuries !== null && activityFrequency && fitnessLevel)
              ? styles.continueButtonActive 
              : (!isDiagnosisOrRecovery && (!hasPreviousInjuries || !activityFrequency || !fitnessLevel)) ||
                (isDiagnosisOrRecovery && (!duration || !hasPreviousInjuries || painLevel === 0)) 
                ? styles.continueButtonInactive 
                : null
          ]}
          onPress={handleContinue}
        >
          <Text style={[
            styles.continueButtonText,
            (isDiagnosisOrRecovery && painLevel > 0 && duration && hasPreviousInjuries !== null) ||
            (!isDiagnosisOrRecovery && hasPreviousInjuries !== null && activityFrequency && fitnessLevel)
              ? styles.continueButtonTextActive
              : null
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
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
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
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
    textAlign: 'center',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  section: {
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 15,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  painValue: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  sliderLabel: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    flex: 1,
    minWidth: '45%',
  },
  selectedOption: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  optionText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#1B4D3E',
  },
  yesNoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  yesNoButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  yesNoText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonActive: {
    backgroundColor: 'white',
    transform: [{ scale: 1.02 }],
  },
  continueButtonInactive: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButtonTextActive: {
    color: '#1B4D3E',
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
}); 