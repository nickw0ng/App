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
};

export default function DashboardScreen() {
  const [user] = useState(testUser);
  const [showWelcome, setShowWelcome] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const streakCount = useRef(new Animated.Value(0)).current;
  const exercisesCount = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Welcome screen animation
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
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
});
