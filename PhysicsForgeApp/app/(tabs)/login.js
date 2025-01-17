import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Placeholder for login logic
    if (username && password) {
      alert('Login successful');
      router.push('/page-course'); // Navigasi ke page-course setelah login berhasil
    } else {
      alert('Please fill in both username and password!');
    }
  };

  return (
    <LinearGradient
      colors={['rgba(233, 26, 195, 0.60)', 'rgba(131, 15, 110, 0.80)']}
      style={styles.container}
    >
      <Text style={styles.headerText}>Login</Text>
      <Text style={styles.subtitleText}>Unlock the Experience!</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#FFFF00"
          value={username}
          onChangeText={setUsername}
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
      <TouchableOpacity onPress={handleLogin} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      {/* Navigation to Register Page */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.registerLink}>Create Account</Text>
        </TouchableOpacity>
      </View>
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
  headerText: {
    fontSize: Math.min(width * 0.1, 250),
    fontWeight: '800',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    lineHeight: Math.min(width * 0.07, 130),
    marginBottom: height * 0.02,
  },
  subtitleText: {
    fontSize: Math.min(width * 0.08, 80),
    fontWeight: '800',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    marginBottom: height * 0.05,
  },
  inputContainer: {
    width: Math.min(width * 0.8, 1281),
    height: Math.min(height * 0.1, 197),
    paddingHorizontal: Math.min(width * 0.05, 55),
    paddingVertical: Math.min(height * 0.01, 46),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'rgba(0, 255, 255, 0.50)',
    marginBottom: height * 0.03,
  },
  inputText: {
    width: '100%',
    fontSize: Math.min(width * 0.05, 80),
    fontWeight: '800',
    color: '#FFFF00',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
  },
  divider: {
    width: Math.min(width * 0.25, 400),
    height: Math.min(height * 0.01, 10),
    backgroundColor: '#000000',
    marginVertical: height * 0.03,
  },
  submitButton: {
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.15,
    borderRadius: 100,
    backgroundColor: '#00FFFF',
    marginBottom: height * 0.05,
  },
  submitText: {
    fontSize: Math.min(width * 0.06, 80),
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  registerText: {
    fontSize: Math.min(width * 0.04, 80),
    fontWeight: '400',
    color: '#4CD964',
    fontFamily: 'Orbitron-Regular',
    textAlign: 'center',
  },
  registerLink: {
    fontSize: Math.min(width * 0.04, 80),
    fontWeight: '700',
    color: '#4CD964',
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
