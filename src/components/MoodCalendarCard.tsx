import React from 'react';
import { View, Text } from 'react-native';
import { NimbusCard } from './NimbusCard';
import { useTheme } from '../theme/ThemeProvider';
import { getMoodRange, MoodKey } from '../data/moodsRepo';

function fmtYmd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  x.setHours(0, 0, 0, 0);
  return x;
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function rgbToHex(r: number, g: number, b: number) {
  const toHex = (v: number) => v.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixColors(a: string, b: string, t: number) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const r = Math.round(ca.r + (cb.r - ca.r) * t);
  const g = Math.round(ca.g + (cb.g - ca.g) * t);
  const bl = Math.round(ca.b + (cb.b - ca.b) * t);
  return rgbToHex(r, g, bl);
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const a = [r, g, b].map(v => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

const MOOD_SCORE: Record<MoodKey, number> = {
  sunny: 1.0,
  partly: 0.8,
  cloudy: 0.6,
  rain: 0.4,
  storm: 0.3,
  snow: 0.1,
};

export function MoodCalendarCard({ endDate, refreshKey }: { endDate?: Date; refreshKey?: any }) {
  const { theme } = useTheme();
  const [days, setDays] = React.useState<
    Array<{ date: Date; key: string; mood?: MoodKey }>
  >([]);

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      const ref = startOfDay(endDate ?? new Date());
      const startRange = addDays(ref, -13); // last 14 days including ref
      const endRange = ref;

      const from = fmtYmd(startRange);
      const to = fmtYmd(endRange);
      const rows = await getMoodRange(from, to);
      const map = new Map<string, MoodKey>();
      rows.forEach(r => map.set(r.date, r.mood));

      const out: Array<{ date: Date; key: string; mood?: MoodKey }> = [];
      for (let d = new Date(startRange); d <= endRange; d = addDays(d, 1)) {
        const key = fmtYmd(d);
        out.push({
          date: new Date(d),
          key,
          mood: map.get(key),
        });
      }
      if (mounted) setDays(out);
    }
    load();
    return () => {
      mounted = false;
    };
  }, [endDate?.getTime?.(), refreshKey]);

  const good = theme.colors.positive;
  const bad = theme.name === 'dark' ? '#C15B5B' : '#D26767';

  const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const ref = startOfDay(endDate ?? new Date());
  const startRange = addDays(ref, -13);
  const shift = startRange.getDay();

  return (
    <NimbusCard>
      <View style={{ marginBottom: theme.spacing(2), flexDirection: 'row', justifyContent: 'space-between' }}>
        {weekdayLabels.map((w, i) => (
          <Text key={`${w}-${i}`} style={{ flex: 1, textAlign: 'center', color: theme.colors.textMuted, fontSize: theme.typography.sizes.sm }}>
            {w}
          </Text>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {days.map((d) => {
          const score = d.mood ? MOOD_SCORE[d.mood] : undefined;
          const fill = score != null ? mixColors(bad, good, score) : 'transparent';
          const showBorder = score == null;
          const textColor = score != null && luminance(fill) < 0.5 ? '#FFFFFF' : theme.colors.text;
          const marginLeft = (d.key === days[0].key ? shift * (100/7) : 0.25) ;
          return (
            <View
              key={d.key}
              style={{
                width: `${(100 / 7) - 0.25}%`,
                aspectRatio: 1,
                padding: 4,
                marginLeft: `${marginLeft}%`
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderRadius: 8,
                  backgroundColor: fill,
                  borderWidth: showBorder ? 1 : 0,
                  borderColor: showBorder ? (theme.name === 'dark' ? '#2A2F36' : '#E0E0E0') : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 1,
                }}
                accessibilityLabel={`${d.key}${d.mood ? `: ${d.mood}` : ''}`}
              >
                <Text style={{ color: textColor, fontSize: theme.typography.sizes.sm }}>
                  {d.date.getDate()}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </NimbusCard>
  );
}

