import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/GradientBackground';
import { useTheme } from '../theme/ThemeProvider';
import PageHeader from '../components/PageHeader';
import { NimbusCard } from '../components/NimbusCard';
import { MoodCard, MoodKey } from '../components/MoodCard';
import DateNavigator from '../components/DateNavigator';

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0,0,0,0);
  return x;
}
function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  x.setHours(0,0,0,0);
  return x;
}

export default function DashboardScreen() {
  const { theme } = useTheme();

  // Keep a “base today” so if user leaves app open past midnight we still move correctly.
  const baseToday = useMemo(() => startOfDay(new Date()), []);
  const [currentDate, setCurrentDate] = useState<Date>(baseToday);
  const [mood, setMood] = useState<MoodKey | undefined>(undefined);

  return (
    <GradientBackground variant="morning">
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <View style={{ padding: theme.spacing(5) }}>
          <PageHeader title="Nimbus" subtitle="Your mind’s daily forecast." />

          {/* New: Date navigator with chevrons */}
          <DateNavigator date={currentDate} onChange={setCurrentDate} />

          <NimbusCard
            title="Today’s Forecast"
            subtitle={
              mood
                ? `You picked: ${mood}`
                : 'Partly sunny with clear streak potential.'
            }
          >
            {/* You can later use currentDate to load/save mood per day */}
          </NimbusCard>

          <MoodCard value={mood} onChange={setMood} />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}
