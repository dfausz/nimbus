import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/GradientBackground';
import { useTheme } from '../theme/ThemeProvider';
import { RoutineCard } from '../components/RoutineCard';

export default function RoutinesScreen() {
  const { theme } = useTheme();
  type Routine = { id: string; title: string; tasks: string[] };
  const [routines, setRoutines] = React.useState<Routine[]>([
    { id: 'morning', title: 'Morning', tasks: ['Hydrate', 'Meds', '10-min tidy'] },
  ]);
  const [editMode, setEditMode] = React.useState(false);

  const ensureUniqueTitle = React.useCallback((proposed: string, currentId: string) => {
    const base = proposed || 'New Routine';
    const existing = routines.filter(r => r.id !== currentId).map(r => r.title);
    if (!existing.includes(base)) return base;
    let i = 1;
    let candidate = `${base} (${i})`;
    while (existing.includes(candidate)) {
      i += 1;
      candidate = `${base} (${i})`;
    }
    return candidate;
  }, [routines]);

  const updateRoutine = (id: string, next: { title: string; tasks: string[] }) => {
    setRoutines(prev => prev.map(r => (r.id === id ? { ...r, ...next } : r)));
  };

  const addRoutine = () => {
    const id = `r-${Date.now()}`;
    setRoutines(prev => [...prev, { id, title: 'New Routine', tasks: [''] }]);
  };

  return (
    <GradientBackground variant="afternoon">
      <SafeAreaView edges={['top', 'left', 'right', 'bottom']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: theme.spacing(5), paddingBottom: theme.spacing(8) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: theme.colors.text, fontSize: theme.typography.sizes.h1 }}>Routines</Text>
            <Pressable
              onPress={() => setEditMode(m => !m)}
              accessibilityRole="button"
              accessibilityLabel={editMode ? 'Done editing routines' : 'Edit routines'}
              style={({ pressed }) => ({ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: pressed ? theme.colors.focus : theme.colors.card })}
            >
              <Text style={{ color: theme.colors.text }}>{editMode ? 'Done' : 'Edit'}</Text>
            </Pressable>
          </View>
          <Text style={{ color: theme.colors.textMuted, marginTop: theme.spacing(1) }}>Morning • Midday • Evening</Text>
          <View style={{ height: theme.spacing(4) }} />

          {routines.map((r, idx) => (
            <View key={r.id} style={{ marginBottom: theme.spacing(3) }}>
              <RoutineCard
                id={r.id}
                title={r.title}
                tasks={r.tasks}
                onSave={(next) => updateRoutine(r.id, next)}
                showHeaderActions={editMode}
                initialEditing={editMode && r.title === 'New Routine' && r.tasks.length === 1 && r.tasks[0] === ''}
                ensureUniqueTitle={ensureUniqueTitle}
              />
            </View>
          ))}

          {editMode ? (
            <Pressable
              onPress={addRoutine}
              accessibilityRole="button"
              accessibilityLabel="Add new routine"
              style={({ pressed }) => ({
                marginTop: theme.spacing(1),
                alignSelf: 'flex-start',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme.name === 'dark' ? '#2A2F36' : '#E0E0E0',
                backgroundColor: pressed ? theme.colors.card : 'transparent',
              })}
            >
              <Text style={{ color: theme.colors.text }}>+ Add Routine</Text>
            </Pressable>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}
