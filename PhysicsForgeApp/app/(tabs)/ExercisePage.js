import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebaseConfig";
import { AuthContext } from "./_layout";

const { width, height } = Dimensions.get("window");

export default function ExercisePage() {
  const { user, setUser } = useContext(AuthContext);
  const [currentTask, setCurrentTask] = useState(1);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showNextTask, setShowNextTask] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [score, setScore] = useState(0);

  const tasks = [
    { question: "2 + 3 ?", correctAnswer: "5" },
    { question: "10 - 4 ?", correctAnswer: "6" },
    { question: "7 x 3 ?", correctAnswer: "21" },
  ];

  const totalQuestions = tasks.length; // Total number of exercises

  // ✅ Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("✅ User is logged in:", currentUser.email, currentUser.uid);
        setUser(currentUser);
      } else {
        console.log("❌ No user is currently logged in.");
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleSubmit = () => {
    const task = tasks[currentTask - 1];
    if (feedback === "Spot On! You're Amazing!" && showNextTask) return;

    if (answer.trim() === task.correctAnswer) {
      setFeedback("Spot On! You're Amazing!");
      setScore((prev) => prev + 1);
    } else {
      setFeedback("Don't worry! You'll get it next time!");
    }

    setShowNextTask(true);
    setIsSubmitDisabled(true);
  };

  const handleNextTask = async () => {
    if (currentTask < totalQuestions) {
      setCurrentTask(currentTask + 1);
      setAnswer("");
      setFeedback("");
      setShowNextTask(false);
      setIsSubmitDisabled(false);
    } else {
      await saveFinalScore(); // Save final score when last task is completed
    }
  };

  const saveFinalScore = async () => {
    if (!user) {
      console.log("❌ User is null, skipping Firestore update.");
      Alert.alert("Error", "You must be logged in to save your score.");
      return;
    }

    // Calculate score percentage
    const scorePercentage = ((score / totalQuestions) * 100).toFixed(2);

    console.log(`Saving score for user: ${user.uid} - ${scorePercentage}%`);

    try {
      const userRef = doc(db, "user_data", user.uid);
      await setDoc(userRef, { quiz1score: scorePercentage }, { merge: true });

      console.log("✅ Score successfully saved to Firestore!");
      Alert.alert("Success", `Final score saved: ${scorePercentage}%`);
    } catch (error) {
      console.error("❌ Error saving score:", error);
      Alert.alert("Error", "Failed to save score.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LinearGradient colors={["rgba(233, 26, 195, 0.60)", "rgba(131, 15, 110, 0.80)"]} style={styles.container}>
        <Text style={styles.title}>Physics Forge</Text>
        <Text style={styles.subtitle}>Your Challenge Awaits!</Text>
        <Text style={styles.task}>Task #{currentTask}</Text>

        <LinearGradient colors={["rgba(0, 255, 255, 0.50)", "rgba(0, 255, 255, 0.30)"]} style={styles.questionContainer}>
          <Text style={styles.question}>{tasks[currentTask - 1].question}</Text>
        </LinearGradient>

        <TextInput
          style={styles.input}
          placeholder="Enter your answer"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          keyboardType="numeric"
          value={answer}
          onChangeText={setAnswer}
          editable={!isSubmitDisabled}
        />

        <LinearGradient
          colors={["rgba(0, 255, 255, 0.50)", "rgba(0, 255, 255, 0.30)"]}
          style={[styles.buttonGradient, isSubmitDisabled && styles.disabledButton]}
        >
          <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer} disabled={isSubmitDisabled}>
            <Text style={styles.buttonText}>Submit Your Solution</Text>
          </TouchableOpacity>
        </LinearGradient>

        {feedback && (
          <Text style={[styles.feedback, feedback.includes("Spot On") ? styles.success : styles.error]}>
            {feedback}
          </Text>
        )}

        {showNextTask && (
          <LinearGradient colors={["rgba(0, 255, 255, 0.50)", "rgba(0, 255, 255, 0.30)"]} style={styles.nextTaskGradient}>
            <TouchableOpacity onPress={handleNextTask} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>
                {currentTask === totalQuestions ? "Finish & Save Score" : "Next Task"}
              </Text>
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
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  title: {
    fontSize: Math.min(width * 0.08, 80),
    fontWeight: "800",
    color: "#000",
    fontFamily: "Orbitron-ExtraBold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: Math.min(width * 0.07, 100),
    fontWeight: "800",
    color: "#FFFF00",
    fontFamily: "Orbitron-Bold",
    textAlign: "center",
    lineHeight: Math.min(width * 0.09, 130),
    marginVertical: height * 0.02,
  },
  task: {
    fontSize: Math.min(width * 0.06, 80),
    fontWeight: "800",
    color: "#FFFF00",
    fontFamily: "Orbitron-Bold",
    textAlign: "center",
    lineHeight: Math.min(width * 0.09, 130),
    marginVertical: height * 0.02,
  },
  questionContainer: {
    width: Math.min(width * 0.8, 1265),
    height: Math.min(height * 0.15, 305),
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.1,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: height * 0.02,
  },
  question: {
    fontSize: Math.min(width * 0.07, 100),
    fontWeight: "800",
    color: "#000",
    fontFamily: "Orbitron-Bold",
    textAlign: "center",
  },
  input: {
    width: "80%",
    height: height * 0.06,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    padding: 15,
    fontSize: Math.min(width * 0.04, 24),
    fontFamily: "Orbitron-Regular",
    textAlign: "center",
    marginVertical: height * 0.02,
  },
  buttonGradient: {
    borderRadius: 100,
    marginVertical: height * 0.02,
  },
  buttonContainer: {
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: Math.min(width * 0.06, 80),
    fontWeight: "800",
    color: "#FFFF00",
    fontFamily: "Orbitron-Bold",
    textAlign: "center",
  },
  feedback: {
    fontSize: Math.min(width * 0.04, 40),
    fontWeight: "800",
    fontFamily: "Orbitron-Bold",
    textAlign: "center",
    marginVertical: height * 0.02,
  },
  success: { color: "#4CD964" },
  error: { color: "#30EBAA" },
  nextTaskGradient: { borderRadius: 100, marginTop: height * 0.03 },
  disabledButton: { opacity: 0.6 },
});
