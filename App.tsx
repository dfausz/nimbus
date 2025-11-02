// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NimbusThemeProvider } from './src/theme/ThemeProvider';
import RootTabs from './src/navigation/RootTabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StatusBarBridge from './src/components/StatusBarBridge';
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from './src/db/migrations/migrations';
import { db } from './src/db/client'

export default function App() {
  useMigrations(db, migrations);

  return (
    <SafeAreaProvider>
      <NimbusThemeProvider>
        <StatusBarBridge />
        <RootTabs />
      </NimbusThemeProvider>
    </SafeAreaProvider>
  );
}
