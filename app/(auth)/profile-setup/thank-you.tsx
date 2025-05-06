import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

export default function ThankYouScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();

  const handleDashboard = () => {
    router.replace('/(tabs)');
  };

  return (
    <LinearGradient
      colors={['#1B4D3E', '#4CAF50', '#8BC34A']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Thank You, {name}!</Text>
            <Text style={styles.subtitle}>
              Your profile has been successfully set up
            </Text>
          </View>

          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              We're excited to help you on your journey to better health and performance.
            </Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.dashboardButton}
            onPress={handleDashboard}
          >
            <Text style={styles.dashboardButtonText}>Go to Your Dashboard</Text>
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
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  messageContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  message: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    lineHeight: 26,
    opacity: 0.9,
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  dashboardButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
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
  dashboardButtonText: {
    color: '#1B4D3E',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 