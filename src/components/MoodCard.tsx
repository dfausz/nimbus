import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import { NimbusCard } from './NimbusCard';

export type MoodKey = 'sunny' | 'partly' | 'cloudy' | 'rain' | 'storm' | 'snow';

const MOODS: Array<{ key: MoodKey; label: string; icon: keyof typeof Ionicons.glyphMap }> = [
  { key: 'sunny',   label: 'Sunny',          icon: 'sunny' },
  { key: 'partly',  label: 'Partly Cloudy',  icon: 'partly-sunny' }, // or 'cloud-outline' if not available
  { key: 'cloudy',  label: 'Cloudy',         icon: 'cloud' },
  { key: 'rain',    label: 'Rain',           icon: 'rainy' },
  { key: 'storm',   label: 'Storming',       icon: 'thunderstorm' },
  { key: 'snow',    label: 'Snow',           icon: 'snow' },
];

export function MoodCard({
  value,
  onChange,
}: {
  value?: MoodKey;
  onChange?: (mood?: MoodKey) => void;
}) {
  const { theme } = useTheme();
  const [local, setLocal] = useState<MoodKey | undefined>(value);

  // keep local in sync when parent changes selected mood (e.g., date change)
  React.useEffect(() => {
    setLocal(value);
  }, [value]);

  const select = (mood: MoodKey) => {
    // toggle: if user taps the already-selected mood, unselect it
    const next = local === mood ? undefined : mood;
    setLocal(next);
    onChange?.(next);
  };

  return (
    <NimbusCard title="How are you feeling today?" subtitle="Pick the closest forecast.">
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: theme.spacing(1),
        }}
      >
        {MOODS.map(m => {
          const selected = local === m.key;
          return (
            <Pressable
              key={m.key}
              onPress={() => select(m.key)}
              style={({ pressed }) => ({
                  width: '15%',
                  aspectRatio: 0.95,
                  borderRadius: theme.radius.lg,
                  // keep these explicit
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',

                  // visual styles
                  backgroundColor: selected ? theme.colors.primary : theme.colors.card,

                  // keep border width constant to avoid tiny layout shifts
                  borderWidth: 1,
                  borderColor: selected ? 'transparent' : (theme.name === 'dark' ? '#2A2F36' : '#E8E8E8'),

                  // gentle press feedback
                  opacity: pressed ? 0.85 : 1,
              })}
              accessibilityRole="button"
              accessibilityLabel={m.label}
              >
              {/* inner centering box fixes vertical alignment in aspectRatio + flexWrap layouts */}
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: theme.spacing(1) }}>
                  <Ionicons
                    name={m.icon}
                    size={20}
                    color={selected ? '#FFFFFF' : theme.colors.text}
                    // (icon is already centered by parent)
                  />
              </View>
            </Pressable>
          );
        })}
      </View>
    </NimbusCard>
  );
}
