import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function ExercisePage() {
  const [currentTask, setCurrentTask] = useState(1);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showNextTask, setShowNextTask] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const tasks = [
    { question: '2 + 3 ?', correctAnswer: '5' },
    { question: '10 - 4 ?', correctAnswer: '6' },
    { question: '7 x 3 ?', correctAnswer: '21' },
  ];

  const handleSubmit = () => {
    const task = tasks[currentTask - 1];
    if (feedback === "Spot On! You're Amazing!" && showNextTask) return; // Prevent redundant updates
    if (answer.trim() === task.correctAnswer) {
        setFeedback("Spot On! You're Amazing!");
        setShowNextTask(true);
    } else {
        setFeedback("Don't worry! You'll get it next time!");
        setShowNextTask(false);
    }
    setIsSubmitDisabled(true); // Disable the submit button
};


  const handleNextTask = () => {
    if (currentTask < tasks.length) {
      setCurrentTask(currentTask + 1);
      setAnswer('');
      setFeedback('');
      setShowNextTask(false);
      setIsSubmitDisabled(false); // Re-enable the submit button for the next task
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LinearGradient
        colors={['rgba(233, 26, 195, 0.60)', 'rgba(131, 15, 110, 0.80)']}
        style={styles.container}
      >
        {/* Header */}
        <Text style={styles.title}>Physics Forge</Text>
        <Text style={styles.subtitle}>Your Challenge Awaits!</Text>
        <Text style={styles.task}>Task #{currentTask}</Text>

        {/* Question Container */}
        <LinearGradient
          colors={['rgba(0, 255, 255, 0.50)', 'rgba(0, 255, 255, 0.30)']}
          style={styles.questionContainer}
        >
          <Text style={styles.question}>{tasks[currentTask - 1].question}</Text>
        </LinearGradient>

        {/* Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter your answer"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          keyboardType="numeric"
          value={answer}
          onChangeText={setAnswer}
          editable={!isSubmitDisabled} // Disable input when submit is disabled
        />

        {/* Submit Button */}
        <LinearGradient
          colors={['rgba(0, 255, 255, 0.50)', 'rgba(0, 255, 255, 0.30)']}
          style={[styles.buttonGradient, isSubmitDisabled && styles.disabledButton]}
        >
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.buttonContainer}
            disabled={isSubmitDisabled} // Disable the submit button
          >
            <Text style={styles.buttonText}>Submit Your Solution</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Feedback */}
        {feedback && (
          <Text
            style={[
              styles.feedback,
              feedback.includes('Spot On') ? styles.success : styles.error,
            ]}
          >
            {feedback}
          </Text>
        )}

        {/* Next Task Button */}
        {showNextTask && currentTask < tasks.length && (
          <LinearGradient
            colors={['rgba(0, 255, 255, 0.50)', 'rgba(0, 255, 255, 0.30)']}
            style={styles.nextTaskGradient}
          >
            <TouchableOpacity onPress={handleNextTask} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Next Task</Text>
            </TouchableOpacity>
          </LinearGradient>
        )}
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
  },
  subtitle: {
    fontSize: Math.min(width * 0.07, 100),
    fontWeight: '800',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    lineHeight: Math.min(width * 0.09, 130),
    marginVertical: height * 0.02,
  },
  task: {
    fontSize: Math.min(width * 0.06, 80),
    fontWeight: '800',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    lineHeight: Math.min(width * 0.09, 130),
    marginVertical: height * 0.02,
  },
  questionContainer: {
    width: Math.min(width * 0.8, 1265),
    height: Math.min(height * 0.15, 305),
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  question: {
    fontSize: Math.min(width * 0.07, 100),
    fontWeight: '800',
    color: '#000',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: height * 0.06,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    padding: 15,
    fontSize: Math.min(width * 0.04, 24),
    fontFamily: 'Orbitron-Regular',
    textAlign: 'center',
    marginVertical: height * 0.02,
  },
  buttonGradient: {
    borderRadius: 100,
    marginVertical: height * 0.02,
  },
  buttonContainer: {
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: Math.min(width * 0.06, 80),
    fontWeight: '800',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
  },
  feedback: {
    fontSize: Math.min(width * 0.04, 40),
    fontWeight: '800',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    marginVertical: height * 0.02,
  },
  success: {
    color: '#4CD964',
  },
  error: {
    color: '#30EBAA',
  },
  nextTaskGradient: {
    borderRadius: 100,
    marginTop: height * 0.03,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
