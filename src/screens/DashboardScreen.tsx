import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/GradientBackground';
import { useTheme } from '../theme/ThemeProvider';
import { NimbusCard } from '../components/NimbusCard';

export default function DashboardScreen() {
  const { theme } = useTheme();
  return (
    <GradientBackground variant="morning">
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <View style={{ padding: theme.spacing(5) }}>
          <Text style={{ color: theme.colors.text, fontSize: theme.typography.sizes.h1 }}>Nimbus</Text>
          <Text style={{ color: theme.colors.textMuted, marginTop: theme.spacing(1) }}>Your mind’s daily forecast.</Text>
          <View style={{ height: theme.spacing(4) }} />
          <NimbusCard title="Today’s Forecast" subtitle="Partly sunny with clear streak potential.">
            <Text style={{ color: theme.colors.text }}>Keep your streak alive ✨</Text>
          </NimbusCard>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}
