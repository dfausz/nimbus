import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/GradientBackground';
import { useTheme } from '../theme/ThemeProvider';
import { NimbusCard } from '../components/NimbusCard';
import PageHeader from '../components/PageHeader';
import { MoodCard, MoodKey } from '../components/MoodCard';

export default function DashboardScreen() {
  const { theme } = useTheme();
  const [mood, setMood] = useState<MoodKey | undefined>(undefined);

  return (
    <GradientBackground variant="morning">
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <View style={{ padding: theme.spacing(5) }}>
          <PageHeader title="Nimbus" subtitle="Your mind’s daily forecast." />

          <NimbusCard
            title="Today’s Forecast"
            subtitle={mood ? `You picked: ${mood}` : 'Partly sunny with clear streak potential.'}
          >
            <Text style={{ color: theme.colors.text }}>
              {mood
                ? 'Nice choice—logging it now helps the dashboard learn your pattern.'
                : 'Pick a mood below to personalize your day.'}
            </Text>
          </NimbusCard>

          <MoodCard value={mood} onChange={setMood} />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}
