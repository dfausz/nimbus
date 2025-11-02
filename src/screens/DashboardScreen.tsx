import React, { useMemo, useState, useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/GradientBackground';
import { useTheme } from '../theme/ThemeProvider';
import PageHeader from '../components/PageHeader';
import { NimbusCard } from '../components/NimbusCard';
import { MoodCard, MoodKey } from '../components/MoodCard';
import { getMoodForDate, setMoodForDate, deleteMoodForDate } from '../data/moodsRepo';
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

  // format date to local YYYY-MM-DD used by DB (avoid UTC shifts from toISOString)
  const fmtYmd = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
  };

  // load mood when date changes
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const row = await getMoodForDate(fmtYmd(currentDate));
        if (!mounted) return;
        setMood((row as any)?.mood as MoodKey | undefined ?? undefined);
      } catch (err) {
        console.warn('Failed to load mood for date', err);
        if (mounted) setMood(undefined);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [currentDate]);

  return (
    <GradientBackground variant="morning">
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <View style={{ padding: theme.spacing(5) }}>
          <PageHeader title="Nimbus" subtitle="Your mind’s daily forecast." />

          {/* New: Date navigator with chevrons */}
          <DateNavigator date={currentDate} onChange={setCurrentDate} />

          <MoodCard
            value={mood}
            onChange={async (m) => {
              // update UI immediately
              setMood(m);
              try {
                const dateKey = fmtYmd(currentDate);
                if (m) {
                  await setMoodForDate(dateKey, m);
                } else {
                  await deleteMoodForDate(dateKey);
                }
              } catch (err) {
                console.warn('Failed to save mood', err);
              }
            }}
          />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}
