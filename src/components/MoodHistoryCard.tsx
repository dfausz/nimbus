import React from 'react';
import { View, Text } from 'react-native';
import { NimbusCard } from './NimbusCard';
import { useTheme } from '../theme/ThemeProvider';
import { getMoodRange } from '../data/repositories/moodsRepo';
import type { MoodKey } from '../data/repositories/moodsRepo';

function fmtYmd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  x.setHours(0, 0, 0, 0);
  return x;
}

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function rangeOfDates(endDate: Date, days: number) {
  const end = startOfDay(endDate);
  const start = addDays(end, -days + 1);
  const out: Date[] = [];
  for (let d = new Date(start); d <= end; d = addDays(d, 1)) {
    out.push(new Date(d));
  }
  return out;
}

function moodColor(theme: ReturnType<typeof useTheme>['theme'], mood: MoodKey): string {
  switch (mood) {
    case 'sunny':
      return theme.colors.accent; // warm/gold
    case 'partly':
      return theme.colors.secondary; // lavender
    case 'cloudy':
      return theme.colors.textMuted; // gray
    case 'rain':
      return theme.colors.primary; // blue
    case 'storm':
      return theme.name === 'dark' ? '#0B0F14' : '#2A2F36'; // deep storm gray
    case 'snow':
      return theme.name === 'dark' ? '#E6EAF0' : '#FFFFFF'; // light/white
    default:
      return theme.colors.textMuted;
  }
}

export function MoodHistoryCard({ endDate }: { endDate?: Date }) {
  const { theme } = useTheme();
  const [dots, setDots] = React.useState<Array<{ date: string; mood?: MoodKey }>>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const end = endDate ? startOfDay(endDate) : startOfDay(new Date());
        const days = rangeOfDates(end, 30);
        const from = fmtYmd(days[0]);
        const to = fmtYmd(days[days.length - 1]);
        const rows = await getMoodRange(from, to);
        const map = new Map<string, MoodKey>();
        rows.forEach(r => map.set(r.date, r.mood));
        const series = days.map(d => {
          const k = fmtYmd(d);
          return { date: k, mood: map.get(k) };
        });
        if (!mounted) return;
        setDots(series);
      } catch (e) {
        if (mounted) setDots([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [endDate?.getTime?.()]);

  return (
    <NimbusCard title="Last 30 Days" subtitle="Daily forecasts at a glance.">
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing(1.5),
          alignItems: 'center',
        }}
      >
        {dots.map((d) => {
          const c = d.mood ? moodColor(theme, d.mood) : 'transparent';
          const needsBorder = !d.mood || d.mood === 'snow';
          return (
            <View
              key={d.date}
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: c,
                borderWidth: needsBorder ? 1 : 0,
                borderColor: needsBorder
                  ? theme.name === 'dark' ? '#2A2F36' : '#E0E0E0'
                  : 'transparent',
              }}
              accessibilityLabel={`${d.date}${d.mood ? `: ${d.mood}` : ''}`}
            />
          );
        })}
        {(!loading && dots.length === 0) ? (
          <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.sizes.sm }}>
            No data yet.
          </Text>
        ) : null}
      </View>
    </NimbusCard>
  );
}

