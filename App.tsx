// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NimbusThemeProvider } from './src/theme/ThemeProvider';
import { View, Text } from 'react-native';
import RootTabs from './src/navigation/RootTabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import StatusBarBridge from './src/components/StatusBarBridge';
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from './src/db/migrations/migrations';
import { db } from './src/db/client'

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <SafeAreaProvider>
        <PaperProvider>
          <NimbusThemeProvider>
            <StatusBarBridge />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
              <Text style={{ fontSize: 16 }}>Database setup failed.</Text>
            </View>
          </NimbusThemeProvider>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }

  if (!success) {
    return (
      <SafeAreaProvider>
        <PaperProvider>
          <NimbusThemeProvider>
            <StatusBarBridge />
            <View style={{ flex: 1 }} />
          </NimbusThemeProvider>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NimbusThemeProvider>
          <StatusBarBridge />
          <RootTabs />
        </NimbusThemeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
