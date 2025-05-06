import { StyleSheet, TouchableOpacity, View, ScrollView, Platform, Animated } from 'react-native';
import { Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect, useRef } from 'react';

// Dummy test user data
const testUser = {
  name: 'Test User',
  recoveryStreak: 5,
  exercisesLeft: 3,
  todaysGoals: [
    { id: 1, name: 'Exercise 1', completed: false },
    { id: 2, name: 'Exercise 2', completed: false },
    { id: 3, name: 'Exercise 3', completed: false }
  ]
};

export default function DashboardScreen() {
  const [user] = useState(testUser);
  const [showWelcome, setShowWelcome] = useState(true);
  const [goals, setGoals] = useState(user.todaysGoals);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const streakCount = useRef(new Animated.Value(0)).current;
  const exercisesCount = useRef(new Animated.Value(0)).current;
  const goalAnimations = useRef(goals.map(() => new Animated.Value(0))).current;

  const toggleGoal = (goalId: number) => {
    const goalIndex = goals.findIndex(g => g.id === goalId);
    const isCompleted = !goals[goalIndex].completed;
    
    // Animate the checkbox
    Animated.sequence([
      Animated.timing(goalAnimations[goalIndex], {
        toValue: isCompleted ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();

    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  useEffect(() => {
    // Welcome screen animation
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowWelcome(false);
      // Start other animations after welcome screen
      startDashboardAnimations();
    });
  }, []);

  const startDashboardAnimations = () => {
    // Pulse animation for icons
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Number counting animations
    Animated.timing(streakCount, {
      toValue: user.recoveryStreak,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    Animated.timing(exercisesCount, {
      toValue: user.exercisesLeft,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <LinearGradient
      colors={['#1B4D3E', '#4CAF50', '#8BC34A']}
      style={styles.gradient}
    >
      {showWelcome && (
        <Animated.View style={[styles.welcomeOverlay, { opacity: fadeAnim }]}>
          <Text style={styles.welcomeOverlayText}>Welcome Back</Text>
          <Text style={styles.welcomeOverlayName}>{user.name}</Text>
        </Animated.View>
      )}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>{user.name}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <MaterialCommunityIcons name="account-circle" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />

        <View style={styles.countersContainer}>
          <View style={styles.counterBox}>
            <Animated.View 
              style={[
                styles.iconContainer,
                { transform: [{ scale: pulseAnim }] }
              ]}
            >
              <MaterialCommunityIcons name="fire" size={30} color="white" />
            </Animated.View>
            <Animated.Text style={styles.counterNumber}>
              {streakCount.interpolate({
                inputRange: [0, user.recoveryStreak],
                outputRange: ['0', user.recoveryStreak.toString()]
              })}
            </Animated.Text>
            <Text style={styles.counterLabel}>Recovery Streak</Text>
          </View>
          <View style={styles.counterBox}>
            <Animated.View 
              style={[
                styles.iconContainer,
                { transform: [{ scale: pulseAnim }] }
              ]}
            >
              <MaterialCommunityIcons name="dumbbell" size={30} color="white" />
            </Animated.View>
            <Animated.Text style={styles.counterNumber}>
              {exercisesCount.interpolate({
                inputRange: [0, user.exercisesLeft],
                outputRange: ['0', user.exercisesLeft.toString()]
              })}
            </Animated.Text>
            <Text style={styles.counterLabel}>Exercises Left</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.checkInButton}
          onPress={() => {
            console.log('Daily check-in pressed');
          }}
        >
          <MaterialCommunityIcons name="calendar-check" size={24} color="white" />
          <Text style={styles.checkInButtonText}>Daily Check-in</Text>
        </TouchableOpacity>

        {/* Today's Goals Section */}
        <View style={styles.goalsSection}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="clipboard-list" size={24} color="white" />
            <Text style={styles.sectionTitle}>Today's Goals</Text>
          </View>
          
          <View style={styles.checklist}>
            {goals.map((goal, index) => (
              <TouchableOpacity 
                key={goal.id}
                style={styles.checklistItem}
                onPress={() => toggleGoal(goal.id)}
              >
                <Animated.View style={[
                  styles.checkboxContainer,
                  {
                    transform: [{
                      scale: goalAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.2]
                      })
                    }]
                  }
                ]}>
                  <MaterialCommunityIcons 
                    name={goal.completed ? "checkbox-marked" : "checkbox-blank-outline"} 
                    size={24} 
                    color="white" 
                  />
                </Animated.View>
                <Animated.Text style={[
                  styles.checklistText,
                  goal.completed && styles.completedText,
                  {
                    opacity: goalAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0.7]
                    })
                  }
                ]}>
                  {goal.name}
                </Animated.Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
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
  welcomeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  welcomeOverlayText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  welcomeOverlayName: {
    fontSize: 24,
    color: 'white',
    opacity: 0.9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
  },
  headerContent: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    opacity: 0.9,
  },
  nameText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 20,
    width: '100%',
  },
  countersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  counterBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  counterNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  counterLabel: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginTop: 5,
    textAlign: 'center',
  },
  checkInButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 20,
    marginHorizontal: 0,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  goalsSection: {
    marginTop: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  checklist: {
    gap: 12,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  checklistText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
