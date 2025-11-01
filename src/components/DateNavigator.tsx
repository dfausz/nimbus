import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

function fmt(date: Date) {
  // e.g., "Sat, Nov 1, 2025"
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export default function DateNavigator({
  date,
  onChange,
}: {
  date: Date;                // current visible day (00:00)
  onChange: (d: Date) => void;
}) {
  const { theme } = useTheme();
  const today = startOfDay(new Date());
  const atToday = isSameDay(date, today);

  const goPrev = () => onChange(addDays(date, -1));
  const goNext = () => {
    if (!atToday) onChange(addDays(date, +1));
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(3),
      }}
    >
      <Pressable
        onPress={goPrev}
        accessibilityRole="button"
        accessibilityLabel="Previous day"
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        <Ionicons name="chevron-back" size={26} color={theme.colors.text} />
      </Pressable>

      <Text
        style={{
          color: theme.colors.text,
          fontSize: theme.typography.sizes.lg,
          fontFamily: theme.typography.headingsFamily,
          textAlign: 'center',
          minWidth: 220,
        }}
      >
        {fmt(date)}{atToday ? ' • Today' : ''}
      </Text>

      <Pressable
        onPress={goNext}
        disabled={atToday}
        accessibilityRole="button"
        accessibilityLabel="Next day"
        style={({ pressed }) => ({
          opacity: atToday ? 0.3 : pressed ? 0.7 : 1,
        })}
      >
        <Ionicons name="chevron-forward" size={26} color={theme.colors.text} />
      </Pressable>
    </View>
  );
}
