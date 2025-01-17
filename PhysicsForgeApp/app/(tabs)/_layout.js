import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontsError] = useFonts({
    'Orbitron-Regular': require('../../assets/fonts/Orbitron-Regular.ttf'),
    'Orbitron-Bold': require('../../assets/fonts/Orbitron-Bold.ttf'),
    'Orbitron-ExtraBold': require('../../assets/fonts/Orbitron-ExtraBold.ttf'),
    'Orbitron-Black': require('../../assets/fonts/Orbitron-Black.ttf'),
    'Orbitron-Medium': require('../../assets/fonts/Orbitron-Medium.ttf'),
    'Orbitron-SemiBold': require('../../assets/fonts/Orbitron-SemiBold.ttf')
  });

  useEffect(() => {
    if (fontsError) console.error("Font loading error:", fontsError);
  }, [fontsError]);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return <Text>Loading fonts...</Text>;

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#FFFF00',
        headerTitleStyle: {
          fontFamily: 'Orbitron-Bold',
          fontWeight: '800',
          fontSize: 24,
        },
        tabBarStyle: {
          backgroundColor: 'rgba(233, 26, 195, 0.6)',
          height: 60,
        },
        tabBarActiveTintColor: '#FFFF00',
        tabBarInactiveTintColor: '#000',
        tabBarLabelStyle: {
          fontFamily: 'Orbitron-Regular',
          fontSize: 12,
        },
        headerBackground: () => (
          <LinearGradient
            colors={['rgba(233, 26, 195, 0.60)', 'rgba(131, 15, 110, 0.80)']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Physics Forge",
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="page-course"
        options={{
          title: "Physics Forge",
          tabBarLabel: "Course",
        }}
      />
      <Tabs.Screen
        name="CourseMuatanDanGayaListrik"
        options={{
          title: "Launch: Muatan dan Gaya Listrik",
          tabBarLabel: "Muatan",
        }}
      />
      <Tabs.Screen
        name="ExercisePage"
        options={{
          title: "Your Challenge Awaits!",
          tabBarLabel: "Exercise",
        }}
      />
      <Tabs.Screen
        name="praktikum"
        options={{
          title: "Charge and Stick!",
          tabBarLabel: "Praktikum",
        }}
      />
      <Tabs.Screen
        name="AccountPage"
        options={{
          title: "Profile",
          tabBarLabel: "Account",
        }}
      />
    </Tabs>
  );
}
