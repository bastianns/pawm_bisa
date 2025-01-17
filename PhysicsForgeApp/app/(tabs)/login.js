import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Ensure correct path
import { AuthContext } from "./_layout"; // Import context from _layout.js

const { width, height } = Dimensions.get("window");

export default function LoginPage() {
  const router = useRouter();
  const { setIsLoggedIn, setUser } = useContext(AuthContext); // Get auth context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("✅ User is already logged in:", currentUser.email, currentUser.uid);
        setIsLoggedIn(true);
        setUser(currentUser);
      } else {
        console.log("❌ No user is currently logged in.");
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ User signed in:", userCredential.user.email, userCredential.user.uid);

      setIsLoggedIn(true);
      setUser(userCredential.user);

      Alert.alert("Success", "Logged in successfully!");
      router.push("/page-course"); // Navigate to course page after login
    } catch (error) {
      console.error("❌ Login error:", error.message);
      Alert.alert("Login Failed", error.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
    <LinearGradient colors={["rgba(233, 26, 195, 0.60)", "rgba(131, 15, 110, 0.80)"]} style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <Text style={styles.subtitleText}>Unlock the Experience!</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#FFFF00"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#FFFF00"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Login Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.submitButton} disabled={loading}>
        <Text style={styles.submitText}>{loading ? "Logging in..." : "Submit"}</Text>
      </TouchableOpacity>

      {/* Navigation to Register Page */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.registerLink}>Create Account</Text>
        </TouchableOpacity>
      </View>
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
  inputContainer: {
    width: Math.min(width * 0.8, 1281),
    height: Math.min(height * 0.1, 197),
    paddingHorizontal: Math.min(width * 0.05, 55),
    paddingVertical: Math.min(height * 0.01, 46),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "rgba(0, 255, 255, 0.50)",
    marginBottom: height * 0.03,
  },
  inputText: {
    width: "100%",
    fontSize: Math.min(width * 0.05, 80),
    fontWeight: "800",
    color: "#FFFF00",
    fontFamily: "Orbitron-Bold",
    textAlign: "center",
  },
  divider: {
    width: Math.min(width * 0.25, 400),
    height: Math.min(height * 0.01, 10),
    backgroundColor: "#000000",
    marginVertical: height * 0.03,
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
  registerContainer: {
    alignItems: "center",
    marginTop: height * 0.02,
  },
  registerText: {
    fontSize: Math.min(width * 0.04, 80),
    fontWeight: "400",
    color: "#4CD964",
    fontFamily: "Orbitron-Regular",
    textAlign: "center",
  },
  registerLink: {
    fontSize: Math.min(width * 0.04, 80),
    fontWeight: "700",
    color: "#4CD964",
    fontFamily: "Orbitron-Bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
