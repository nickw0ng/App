import { StyleSheet, TouchableOpacity, View, Text, TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';

export default function PersonalInfoScreen() {
  const { focus } = useLocalSearchParams<{ focus: string }>();
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | null>(null);
  const [showError, setShowError] = useState(false);

  const handleContinue = () => {
    if (name.trim() && activityLevel) {
      router.push({
        pathname: '/(auth)/profile-setup/focus',
        params: { name }
      });
    } else {
      setShowError(true);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  return (
    <LinearGradient
      colors={['#1B4D3E', '#4CAF50', '#8BC34A']}
      style={styles.gradient}
    >
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Personal Information</Text>
            <Text style={styles.subtitle}>Tell us about yourself</Text>
          </View>

          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={name}
                onChangeText={setName}
                autoCorrect={false}
              />
            </View>

            {/* Date of Birth */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  {formatDate(dateOfBirth)}
                </Text>
                <MaterialCommunityIcons name="calendar" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={new Date()}
              />
            )}

            {/* Activity Level */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Activity Level</Text>
              <View style={styles.activityContainer}>
                <TouchableOpacity 
                  style={[
                    styles.activityOption,
                    activityLevel === 'sedentary' && styles.selectedActivity
                  ]}
                  onPress={() => setActivityLevel('sedentary')}
                >
                  <MaterialCommunityIcons name="sofa" size={24} color="white" />
                  <View style={styles.activityTextContainer}>
                    <Text style={styles.activityText}>Sedentary</Text>
                    <Text style={styles.activityDescription}>Little to no physical activity, desk job</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[
                    styles.activityOption,
                    activityLevel === 'lightly_active' && styles.selectedActivity
                  ]}
                  onPress={() => setActivityLevel('lightly_active')}
                >
                  <MaterialCommunityIcons name="walk" size={24} color="white" />
                  <View style={styles.activityTextContainer}>
                    <Text style={styles.activityText}>Lightly Active</Text>
                    <Text style={styles.activityDescription}>Daily light activity, exercises 1-2 times/week</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[
                    styles.activityOption,
                    activityLevel === 'moderately_active' && styles.selectedActivity
                  ]}
                  onPress={() => setActivityLevel('moderately_active')}
                >
                  <MaterialCommunityIcons name="run" size={24} color="white" />
                  <View style={styles.activityTextContainer}>
                    <Text style={styles.activityText}>Moderately Active</Text>
                    <Text style={styles.activityDescription}>Regular activity 3-5 days/week</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[
                    styles.activityOption,
                    activityLevel === 'very_active' && styles.selectedActivity
                  ]}
                  onPress={() => setActivityLevel('very_active')}
                >
                  <MaterialCommunityIcons name="trophy" size={24} color="white" />
                  <View style={styles.activityTextContainer}>
                    <Text style={styles.activityText}>Very Active</Text>
                    <Text style={styles.activityDescription}>Intense exercise 6-7 days/week</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[
                    styles.activityOption,
                    activityLevel === 'extremely_active' && styles.selectedActivity
                  ]}
                  onPress={() => setActivityLevel('extremely_active')}
                >
                  <MaterialCommunityIcons name="medal" size={24} color="white" />
                  <View style={styles.activityTextContainer}>
                    <Text style={styles.activityText}>Extremely Active</Text>
                    <Text style={styles.activityDescription}>Professional athlete, daily training</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        {showError && (
          <Text style={styles.errorText}>Please fill in all required fields</Text>
        )}
        <TouchableOpacity 
          style={[
            styles.continueButton,
            (!name.trim() || !activityLevel) && styles.continueButtonInactive
          ]}
          onPress={handleContinue}
        >
          <Text style={[
            styles.continueButtonText,
            (!name.trim() || !activityLevel) && styles.continueButtonTextInactive
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
  },
  contentContainer: {
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
  form: {
    gap: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 15,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  dateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  dateButtonText: {
    color: 'white',
    fontSize: 16,
  },
  activityContainer: {
    gap: 10,
  },
  activityOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectedActivity: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'white',
  },
  activityTextContainer: {
    flex: 1,
  },
  activityText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  activityDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: 'transparent',
  },
  errorText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: '#FF4444',
    padding: 10,
    borderRadius: 8,
    overflow: 'hidden',
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