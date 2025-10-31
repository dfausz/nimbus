import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/GradientBackground';
import { useTheme } from '../theme/ThemeProvider';
import { NimbusCard } from '../components/NimbusCard';

export default function RoutinesScreen() {
  const { theme } = useTheme();
  return (
    <GradientBackground variant="afternoon">
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <View style={{ padding: theme.spacing(5) }}>
          <Text style={{ color: theme.colors.text, fontSize: theme.typography.sizes.h1 }}>Routines</Text>
          <Text style={{ color: theme.colors.textMuted, marginTop: theme.spacing(1) }}>Morning • Midday • Evening</Text>
          <View style={{ height: theme.spacing(4) }} />
          <NimbusCard title="Morning" subtitle="Hydrate • Meds • 10-min tidy">
            <Text style={{ color: theme.colors.text }}>Tap to edit routine steps</Text>
          </NimbusCard>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}
