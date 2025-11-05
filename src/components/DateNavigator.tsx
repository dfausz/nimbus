import React from 'react';
import { View, Text, Pressable, Animated, Easing } from 'react-native';
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
  // Animated ""Go to Today"" button area
  const targetHeight = theme.spacing(12);
  const heightAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(-100)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!atToday) {
      Animated.parallel([
        Animated.timing(heightAnim, { toValue: targetHeight, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
        Animated.timing(slideAnim, { toValue: 0, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 180, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 120, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: -100, duration: 260, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
        Animated.timing(heightAnim, { toValue: 0, duration: 200, easing: Easing.inOut(Easing.cubic), useNativeDriver: false }),
      ]).start();
    }
  }, [atToday, heightAnim, slideAnim, fadeAnim, targetHeight]);

  return (
    <View
      style={{

        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: atToday ? theme.spacing(3) : theme.spacing(1),
      }}
    >
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: theme.colors.card,
        paddingVertical: theme.spacing(5),
        paddingHorizontal: theme.spacing(3),
        borderRadius: 8
      }}>
      
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
      <Animated.View style={{ height: heightAnim, overflow: 'hidden' }}>
        <Animated.View style={{ transform: [{ translateY: slideAnim }], opacity: fadeAnim }}>
          <Pressable
            onPress={() => onChange(today)}
            accessibilityRole="button"
            accessibilityLabel="Go back to today"
            style={({ pressed }) => ({
              alignSelf: 'center',
              marginTop: theme.spacing(1),
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 999,
              backgroundColor: pressed ? theme.colors.focus : theme.colors.card,
              borderWidth: 1,
              borderColor: theme.name === 'dark' ? '#2A2F36' : '#E0E0E0',
            })}
          >
            <Text style={{ color: theme.colors.text }}>Today</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </View>
  );
}



