import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Ensure correct path
import { AuthContext } from "./_layout"; // Import context from _layout.js

const { width, height } = Dimensions.get("window");

export default function LogoutPage() {
  const router = useRouter();
  const { setIsLoggedIn, setUser } = useContext(AuthContext); // Get auth context
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // ✅ Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("✅ User is logged in:", currentUser.email, currentUser.uid);
        setIsLoggedIn(true);
        setUser(currentUser);
        setIsAuthenticated(true);
        setUserEmail(currentUser.email);
      } else {
        console.log("❌ No user is currently logged in.");
        setIsLoggedIn(false);
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // ✅ Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("✅ User logged out successfully.");
      setIsLoggedIn(false);
      setUser(null);
      setIsAuthenticated(false);
      Alert.alert("Success", "You have been logged out.");
      router.push("/login"); // Redirect to Login Page
    } catch (error) {
      console.error("❌ Logout error:", error.message);
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
    <LinearGradient colors={["rgba(233, 26, 195, 0.60)", "rgba(131, 15, 110, 0.80)"]} style={styles.container}>
      <Text style={styles.headerText}>Logout</Text>
      <Text style={styles.subtitleText}>
        {isAuthenticated ? `Logged in as: ${userEmail}` : "You are not logged in"}
      </Text>

      {/* Logout Button */}
      {isAuthenticated ? (
        <TouchableOpacity onPress={handleLogout} style={styles.submitButton}>
          <Text style={styles.submitText}>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => router.push("/login")} style={styles.submitButton}>
          <Text style={styles.submitText}>Go to Login</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headerText: {
    fontSize: Math.min(width * 0.1, 250),
    fontWeight: "800",
    color: "#FFFF00",
    fontFamily: "Orbitron-Bold",
    textAlign: "center",
    lineHeight: Math.min(width * 0.07, 130),
    marginBottom: height * 0.02,
  },
  subtitleText: {
    fontSize: Math.min(width * 0.08, 80),
    fontWeight: "800",
    color: "#FFFF00",
    fontFamily: "Orbitron-Bold",
    textAlign: "center",
    marginBottom: height * 0.05,
  },
  submitButton: {
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.15,
    borderRadius: 100,
    backgroundColor: "#00FFFF",
    marginBottom: height * 0.05,
  },
  submitText: {
    fontSize: Math.min(width * 0.06, 80),
    fontWeight: "700",
    color: "#000",
    fontFamily: "Orbitron-Bold",
    textAlign: "center",
  },
});
