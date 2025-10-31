// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NimbusThemeProvider } from './src/theme/ThemeProvider';
import RootTabs from './src/navigation/RootTabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StatusBarBridge from './src/components/StatusBarBridge';

export default function App() {
  return (
    <SafeAreaProvider>
      <NimbusThemeProvider>
        <StatusBarBridge />
        <RootTabs />
      </NimbusThemeProvider>
    </SafeAreaProvider>
  );
}
