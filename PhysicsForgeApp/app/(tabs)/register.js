import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig"; // ✅ Ensure correct path
import { AuthContext } from "./_layout"; // Import context from _layout.js

const { width, height } = Dimensions.get("window");

export default function RegisterPage() {
  const router = useRouter();
  const { setIsLoggedIn, setUser } = useContext(AuthContext); // Get auth context

  const [username, setUsername] = useState(""); // ✅ Re-added username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered:", user.uid, user.email);

      // ✅ Save user data (including username) to Firestore
      const userRef = doc(collection(db, "user_data"), user.uid);
      await setDoc(userRef, { username: username });

      setIsLoggedIn(true);
      setUser(user);

      Alert.alert("Success", "Registration successful!");
      router.push("/login"); // Navigate to login page after sign-up
    } catch (error) {
      console.error("Registration error:", error.message);
      Alert.alert("Registration Failed", error.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
    <LinearGradient colors={["rgba(233, 26, 195, 0.60)", "rgba(131, 15, 110, 0.80)"]} style={styles.container}>
      <Text style={styles.headerText}>Register</Text>
      <Text style={styles.subtitleText}>Create your account</Text>

      {/* Username Input - Re-added */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#FFFF00"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

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

      {/* Register Button */}
      <TouchableOpacity onPress={handleRegister} style={styles.submitButton} disabled={loading}>
        <Text style={styles.submitText}>{loading ? "Registering..." : "Submit"}</Text>
      </TouchableOpacity>

      {/* Navigation to Login Page */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.loginLink}>Login here</Text>
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
  loginContainer: {
    alignItems: "center",
    marginTop: height * 0.02,
  },
  loginText: {
    fontSize: Math.min(width * 0.04, 80),
    fontWeight: "400",
    color: "#4CD964",
    fontFamily: "Orbitron-Regular",
    textAlign: "center",
  },
  loginLink: {
    fontSize: Math.min(width * 0.04, 80),
    fontWeight: "700",
    color: "#4CD964",
    fontFamily: "Orbitron-Bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
