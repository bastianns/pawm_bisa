import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function AccountPage() {
  return (
    <LinearGradient
      colors={['rgba(233, 26, 195, 0.60)', 'rgba(131, 15, 110, 0.80)']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Physics Forge</Text>
        <Text style={styles.subtitle}>Profile</Text>
      </View>

      {/* User Info */}
      <View style={styles.userInfoContainer}>
        <View style={styles.userBox}>
          <Text style={styles.userName}>User Name</Text>
        </View>
      </View>

      {/* Course and Progress */}
      <View style={styles.courseContainer}>
        <View style={styles.courseBox}>
          <Text style={styles.courseName}>Course Name</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressIndicator50} />
          </View>
          <Text style={styles.score}>Score: 50%</Text>
        </View>
        <View style={styles.courseBox}>
          <Text style={styles.courseName}>Course Name</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressIndicator100} />
          </View>
          <Text style={styles.score}>Score: 100%</Text>
        </View>
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
  header: {
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  title: {
    fontSize: Math.min(width * 0.08, 80),
    fontWeight: '800',
    color: '#000',
    fontFamily: 'Orbitron-ExtraBold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Math.min(width * 0.07, 100),
    fontWeight: '800',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    lineHeight: Math.min(width * 0.09, 130),
    marginTop: height * 0.02,
  },
  userInfoContainer: {
    width: Math.min(width * 0.85, 1287),
    padding: height * 0.03,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 255, 255, 0.50)',
    marginBottom: height * 0.05,
  },
  userBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: Math.min(width * 0.06, 80),
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
  },
  courseContainer: {
    width: Math.min(width * 0.85, 1287),
    padding: width * 0.05,
    flexDirection: 'column',
    gap: height * 0.03,
  },
  courseBox: {
    padding: width * 0.04,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 255, 255, 0.50)',
    marginBottom: height * 0.02,
  },
  courseName: {
    fontSize: Math.min(width * 0.05, 60),
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Orbitron-Bold',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  progressBar: {
    height: Math.min(height * 0.02, 50),
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: height * 0.02,
  },
  progressIndicator50: {
    width: '50%',
    height: '100%',
    backgroundColor: '#FFFF00',
  },
  progressIndicator100: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFF00',
  },
  score: {
    fontSize: Math.min(width * 0.05, 80),
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
  },
});
