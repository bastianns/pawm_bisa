import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

// Import halaman-halaman
import Splash from "./(tabs)/SplashScreen";
import LoginPage from "./(tabs)/login";
import RegisterPage from "./(tabs)/register";
import HomePage from "./(tabs)/index";
import AccountPage from "./(tabs)/AccountPage";
import PageCourse from "./(tabs)/page-course";
import PraktikumPage from "./(tabs)/praktikum";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

// Tab Navigator untuk pengguna yang sudah login
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FFFF00",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Account" component={AccountPage} />
    </Tab.Navigator>
  );
}

// Stack Navigator utama
export default function AppNavigator() {
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const hideSplashScreen = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulasi loading
      SplashScreen.hideAsync();
    };

    hideSplashScreen();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        {/* Splash Screen */}
        <Stack.Screen name="Splash" component={Splash} />

        {/* Jika belum login */}
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
          </>
        ) : (
          // Jika sudah login
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="PageCourse" component={PageCourse} />
            <Stack.Screen name="Praktikum" component={PraktikumPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
