import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RecoveryScreen() {
  return (
    <LinearGradient
      colors={['#1B4D3E', '#4CAF50', '#8BC34A']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Recovery</Text>
        <Text style={styles.subtitle}>Track your recovery progress</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
  },
}); 