import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";

const { width, height } = Dimensions.get("window");

export default function Splash() {
  useEffect(() => {
    const hideSplash = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading
      SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

  return (
    <LinearGradient
      colors={["rgba(233, 26, 195, 0.60)", "rgba(131, 15, 110, 0.80)"]}
      style={styles.container}
    >
      <Text style={styles.title}>Physics Forge</Text>
      <Text style={styles.subtitle}>Empowering Learning</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: Math.min(width * 0.1, 80),
    fontWeight: "800",
    color: "#FFFF00",
    fontFamily: "Orbitron-Bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: Math.min(width * 0.05, 40),
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Orbitron-Regular",
    textAlign: "center",
    marginTop: height * 0.02,
  },
});
