import React from 'react';
import { View, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/GradientBackground';
import { useTheme } from '../theme/ThemeProvider';
import { NimbusCard } from '../components/NimbusCard';

export default function SettingsScreen() {
  const { theme, toggle } = useTheme();
  return (
    <GradientBackground variant="evening">
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <View style={{ padding: theme.spacing(5) }}>
          <Text style={{ color: theme.colors.text, fontSize: theme.typography.sizes.h1 }}>Settings</Text>
          <Text style={{ color: theme.colors.textMuted, marginTop: theme.spacing(1) }}>Personalize Nimbus</Text>
          <View style={{ height: theme.spacing(4) }} />
          <NimbusCard title="Appearance" subtitle={`Current: ${theme.name}`}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Text style={{ color: theme.colors.text }}>Dark Mode</Text>
              <Switch value={theme.name === 'dark'} onValueChange={toggle} />
            </View>
          </NimbusCard>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}
