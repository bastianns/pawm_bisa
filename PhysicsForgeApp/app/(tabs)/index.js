import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomePage() {
  return (
    <LinearGradient
      colors={['rgba(233, 26, 195, 0.60)', 'rgba(131, 15, 110, 0.80)']}
      style={styles.container}
    >
      <Text style={styles.subtitle}>Enter Metaspace</Text>
      <Text style={styles.swipeText}>Swipe Through Portals</Text>
      <LinearGradient
        colors={['rgba(0, 255, 255, 0.5)', 'rgba(0, 255, 255, 0.3)']}
        style={styles.courseContainer}
      >
        <TouchableOpacity
          onPress={() => router.push('/PageCourse')}
          style={styles.buttonContainer}
        >
          <Text style={styles.courseText}>Start Your Journey</Text>
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
  subtitle: {
    fontSize: 100,
    fontFamily: 'Orbitron-Bold',
    color: '#FFFF00',
    textAlign: 'center',
    marginBottom: 20,
  },
  swipeText: {
    fontSize: 65,
    fontFamily: 'Orbitron-Bold',
    color: '#FFFF00',
    textAlign: 'center',
    marginBottom: 30,
  },
  courseContainer: {
    marginTop: 50,
    borderRadius: 100,
    overflow: 'hidden',
  },
  buttonContainer: {
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseText: {
    fontSize: 40,
    color: '#000',
    fontFamily: 'Orbitron',
  },
});