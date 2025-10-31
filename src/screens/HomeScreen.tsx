import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { GradientBackground } from '../components/GradientBackground';
import { NimbusCard } from '../components/NimbusCard';
import { ThemedButton } from '../components/ThemedButton';

export default function HomeScreen() {
  const { theme, toggle } = useTheme();

  return (
    <GradientBackground variant="morning">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: theme.spacing(5) }}>
          <Text style={{ color: theme.colors.text, fontSize: theme.typography.sizes.h1, fontFamily: theme.typography.headingsFamily }}>
            Nimbus
          </Text>
          <Text style={{ color: theme.colors.textMuted, marginTop: theme.spacing(1) }}>
            Your mind’s daily forecast.
          </Text>

          <View style={{ height: theme.spacing(4) }} />

          <NimbusCard title="Today’s Forecast" subtitle="You’re partly sunny with clear streak potential.">
            <ThemedButton title="Toggle Theme" onPress={toggle} />
          </NimbusCard>

          <NimbusCard title="Routines" subtitle="Morning • Midday • Evening">
            <Text style={{ color: theme.colors.text }}>• Hydrate • Take meds • 10-min tidy</Text>
          </NimbusCard>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}
