import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CourseMuatanDanGayaListrik() {
  return (
    <LinearGradient
      colors={['rgba(233, 26, 195, 0.60)', 'rgba(131, 15, 110, 0.80)']}
      style={styles.container}
    >
      <Text style={styles.title}>Physics Forge</Text>
      <Text style={styles.subtitle}>LAUNCH: Muatan dan Gaya Listrik</Text>

      <LinearGradient
        colors={['rgba(0, 255, 255, 0.5)', 'rgba(0, 255, 255, 0.3)']}
        style={styles.buttonGradient}
      >
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => router.push('/ExercisePage')}
        >
          <MaterialCommunityIcons name="brain" size={60} color="#FDDC5C" />
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
          <MaterialCommunityIcons name="trophy" size={60} color="#FDDC5C" />
          <Text style={styles.buttonText}>Test Your Skills</Text>
        </TouchableOpacity>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 80,
    fontWeight: '800',
    color: '#000',
    fontFamily: 'Orbitron-ExtraBold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 100,
    fontWeight: '800',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonGradient: {
    marginTop: 30,
    borderRadius: 100,
    overflow: 'hidden',
  },
  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 20,
  },
  buttonText: {
    fontSize: 40,
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
  },
});