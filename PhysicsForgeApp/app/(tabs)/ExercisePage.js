import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ExercisePage() {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showNextTask, setShowNextTask] = useState(false);

  const handleSubmit = () => {
    if (answer.trim() === '5') {
      setFeedback('Spot On! You\'re Amazing!');
      setShowNextTask(true);
    } else {
      setFeedback('Don\'t worry! You\'ll get it next time!');
      setShowNextTask(false);
    }
  };

  return (
    <LinearGradient
      colors={['rgba(233, 26, 195, 0.60)', 'rgba(131, 15, 110, 0.80)']}
      style={styles.container}
    >
      <Text style={styles.title}>Physics Forge</Text>
      <Text style={styles.subtitle}>Your Challenge Awaits!</Text>
      <Text style={styles.task}>Task #1</Text>
      
      <LinearGradient
        colors={['rgba(0, 255, 255, 0.50)', 'rgba(0, 255, 255, 0.30)']}
        style={styles.questionContainer}
      >
        <Text style={styles.question}>2 + 3 ?</Text>
      </LinearGradient>

      <TextInput
        style={styles.input}
        placeholder="Enter your answer"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        keyboardType="numeric"
        value={answer}
        onChangeText={setAnswer}
      />

      <LinearGradient
        colors={['rgba(0, 255, 255, 0.50)', 'rgba(0, 255, 255, 0.30)']}
        style={styles.buttonGradient}
      >
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Submit Your Solution</Text>
        </TouchableOpacity>
      </LinearGradient>

      {feedback && (
        <Text style={[
          styles.feedback,
          feedback.includes('Spot On') ? styles.success : styles.error
        ]}>
          {feedback}
        </Text>
      )}

      {showNextTask && (
        <LinearGradient
          colors={['rgba(0, 255, 255, 0.50)', 'rgba(0, 255, 255, 0.30)']}
          style={styles.nextTaskGradient}
        >
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Next Task</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 3410.4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 80,
    fontWeight: '800',
    color: '#000000',
    fontFamily: 'Orbitron-ExtraBold',
    textAlign: 'center',
    lineHeight: 75.6,
  },
  subtitle: {
    fontSize: 100,
    fontWeight: '800',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    lineHeight: 130,
    marginVertical: 20,
  },
  task: {
    fontSize: 80,
    fontWeight: '800',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    lineHeight: 130,
    marginVertical: 20,
  },
  questionContainer: {
    width: 1265,
    height: 305,
    padding: 88,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  question: {
    fontSize: 100,
    fontWeight: '800',
    color: '#000000',
    fontFamily: 'Orbitron-Bold',
    lineHeight: 130,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 60,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
    fontSize: 24,
    fontFamily: 'Orbitron-Regular',
    textAlign: 'center',
  },
  buttonGradient: {
    borderRadius: 100,
    marginVertical: 20,
  },
  buttonContainer: {
    padding: 61,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 80,
    fontWeight: '800',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    lineHeight: 130,
    textAlign: 'center',
  },
  feedback: {
    fontSize: 40,
    fontWeight: '800',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  success: {
    color: '#4CD964',
  },
  error: {
    color: '#30EBAA',
  },
  nextTaskGradient: {
    borderRadius: 100,
    marginTop: 20,
  },
});