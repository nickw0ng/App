import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';

type GoalOption = 'return-to-sport' | 'pain-management' | 'injury-prevention' | 'performance' | 'general-health';

export default function GoalsSelectionScreen() {
  const { focus, name } = useLocalSearchParams<{ focus: string; name: string }>();
  const [selectedGoals, setSelectedGoals] = useState<GoalOption[]>([]);
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

  const goalOptions = [
    {
      id: 'return-to-sport',
      title: 'Return to Sport',
      icon: 'run',
      description: 'Get back to your sport safely and effectively'
    },
    {
      id: 'pain-management',
      title: 'Pain Management',
      icon: 'emoticon-sad',
      description: 'Reduce and manage pain levels'
    },
    {
      id: 'injury-prevention',
      title: 'Injury Prevention',
      icon: 'shield-check',
      description: 'Prevent future injuries'
    },
    {
      id: 'performance',
      title: 'Performance Improvement',
      icon: 'trending-up',
      description: 'Enhance your athletic performance'
    },
    {
      id: 'general-health',
      title: 'General Health',
      icon: 'heart-pulse',
      description: 'Improve overall health and wellness'
    }
  ];

  const handleGoalSelect = (goal: GoalOption) => {
    setSelectedGoals(prev => {
      if (prev.includes(goal)) {
        return prev.filter(g => g !== goal);
      } else {
        return [...prev, goal];
      }
    });
  };

  const handleContinue = () => {
    if (selectedGoals.length > 0) {
      setShowError(false);
      router.push({
        pathname: '/profile-setup/thank-you',
        params: { name }
      });
    } else {
      setShowError(true);
    }
  };

  return (
    <LinearGradient
      colors={['#1B4D3E', '#4CAF50', '#8BC34A']}
      style={styles.gradient}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Your Goals</Text>
          <Text style={styles.subtitle}>
            Choose one or more goals that align with your focus
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {goalOptions.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.optionCard,
                selectedGoals.includes(goal.id as GoalOption) && styles.selectedCard
              ]}
              onPress={() => handleGoalSelect(goal.id as GoalOption)}
            >
              <MaterialCommunityIcons 
                name={goal.icon} 
                size={40} 
                color={selectedGoals.includes(goal.id as GoalOption) ? '#1B4D3E' : 'white'} 
              />
              <Text style={[
                styles.optionTitle,
                selectedGoals.includes(goal.id as GoalOption) && styles.selectedText
              ]}>
                {goal.title}
              </Text>
              <Text style={[
                styles.optionDescription,
                selectedGoals.includes(goal.id as GoalOption) && styles.selectedText
              ]}>
                {goal.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        {showError && (
          <Animated.View style={[
            styles.errorContainer,
            { opacity: fadeAnim }
          ]}>
            <Text style={styles.errorText}>Please select at least one goal to continue</Text>
          </Animated.View>
        )}
        <TouchableOpacity 
          style={[
            styles.continueButton,
            selectedGoals.length === 0 && styles.continueButtonInactive
          ]}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    backgroundColor: 'white',
    borderColor: 'white',
    transform: [{ scale: 1.02 }],
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  selectedText: {
    color: '#1B4D3E',
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
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  continueButtonInactive: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: '#1B4D3E',
    fontSize: 16,
    fontWeight: 'bold',
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