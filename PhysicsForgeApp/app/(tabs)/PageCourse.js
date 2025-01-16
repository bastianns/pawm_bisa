import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function PageCourse() {
  return (
    <LinearGradient
      colors={['rgba(233, 26, 195, 0.60)', 'rgba(131, 15, 110, 0.80)']}
      style={styles.container}
    >
      <Text style={styles.title}>Physics Forge</Text>
      <Text style={styles.subtitle}>Enter Metaspace</Text>
      <Text style={styles.swipeText}>Swipe Through Portals</Text>

      <LinearGradient
        colors={['rgba(0, 255, 255, 0.5)', 'rgba(0, 255, 255, 0.3)']}
        style={styles.courseContainer}
      >
        <TouchableOpacity
          onPress={() => router.push('/CourseMuatanDanGayaListrik')}
          style={styles.buttonContainer}
        >
          <Text style={styles.courseText}>Muatan dan Gaya Listrik</Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 100,
    fontWeight: '700',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  swipeText: {
    fontSize: 65,
    fontWeight: '700',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  courseContainer: {
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
    fontFamily: 'Orbitron-Regular',
  },
});