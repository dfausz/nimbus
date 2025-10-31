import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../screens/DashboardScreen';
import RoutinesScreen from '../screens/RoutinesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTheme } from '../theme/ThemeProvider';
import { navDark, navLight } from './navTheme';

const Tab = createBottomTabNavigator();

export default function RootTabs() {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme.name === 'dark' ? navDark : navLight}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textMuted,
          tabBarStyle: {
            backgroundColor: theme.colors.card,
            borderTopColor: theme.name === 'dark' ? '#2A2F36' : '#E8E8E8',
          },
          tabBarIcon: ({ color, size, focused }) => {
            let icon: keyof typeof Ionicons.glyphMap = 'ellipse-outline';
            if (route.name === 'Dashboard') icon = focused ? 'sunny' : 'sunny-outline';
            if (route.name === 'Routines')   icon = focused ? 'repeat' : 'repeat-outline';
            if (route.name === 'Settings')   icon = focused ? 'settings' : 'settings-outline';
            return <Ionicons name={icon} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Routines" component={RoutinesScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
