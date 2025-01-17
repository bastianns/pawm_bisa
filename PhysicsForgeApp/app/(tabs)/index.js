import React from 'react';
import { Tabs } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import 'react-native-gesture-handler';


export default function Layout() {
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
        name="HomePage"
        options={{
          title: "Physics Forge",
          tabBarLabel: "Home",
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
