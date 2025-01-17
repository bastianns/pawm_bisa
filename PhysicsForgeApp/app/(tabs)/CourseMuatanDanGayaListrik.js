import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function CourseMuatanDanGayaListrik() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['rgba(233, 26, 195, 0.60)', 'rgba(131, 15, 110, 0.80)']}
      style={styles.container}
    >
      {/* Header */}
      <Text style={styles.title}>Physics Forge</Text>
      <Text style={styles.launchText}>LAUNCH:</Text>
      <Text style={styles.subtitle}>Muatan dan Gaya Listrik</Text>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <LinearGradient
          colors={['rgba(0, 255, 255, 0.5)', 'rgba(0, 255, 255, 0.3)']}
          style={styles.buttonGradient}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => router.push('/ExercisePage')}
          >
            <MaterialCommunityIcons name="brain" size={width * 0.15} color="#FDDC5C" />
            <Text style={styles.buttonText}>Challenge Your Mind!</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['rgba(0, 255, 255, 0.5)', 'rgba(0, 255, 255, 0.3)']}
          style={styles.buttonGradient}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => router.push('/ExercisePage')}
          >
            <MaterialCommunityIcons name="trophy" size={width * 0.15} color="#FDDC5C" />
            <Text style={styles.buttonText}>Test Your Skills</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  title: {
    fontSize: Math.min(width * 0.08, 80),
    fontWeight: '800',
    color: '#000',
    fontFamily: 'Orbitron-ExtraBold',
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  launchText: {
    fontSize: Math.min(width * 0.08, 100),
    fontWeight: '800',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    marginBottom: height * 0.01,
  },
  subtitle: {
    fontSize: Math.min(width * 0.07, 100),
    fontWeight: '800',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    lineHeight: Math.min(width * 0.09, 130),
    marginBottom: height * 0.05,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.02,
  },
  buttonGradient: {
    width: '80%',
    borderRadius: 100,
    marginVertical: height * 0.02,
  },
  buttonContainer: {
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: Math.min(width * 0.05, 80),
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    marginLeft: width * 0.05,
  },
});
