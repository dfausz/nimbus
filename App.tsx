import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NimbusThemeProvider, useTheme } from './src/theme/ThemeProvider';
import { navDark, navLight } from './src/navigation/navTheme';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

function RootNav() {
  const { theme } = useTheme();
  return (
    <NavigationContainer theme={theme.name === 'dark' ? navDark : navLight}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <NimbusThemeProvider>
      <RootNav />
    </NimbusThemeProvider>
  );
}
