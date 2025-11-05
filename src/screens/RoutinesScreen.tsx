import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../components/GradientBackground';
import { useTheme } from '../theme/ThemeProvider';
import { RoutineCard } from '../components/RoutineCard';
import { listRoutines, createRoutine, saveRoutine, toggleTask } from '../data/repositories/routinesRepo';
import { Ionicons } from '@expo/vector-icons';
import { Menu } from 'react-native-paper';
import { useDateStore } from '../store/dateStore';

function fmt(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export default function RoutinesScreen() {
  const { theme } = useTheme();
  const selectedDate = useDateStore((s) => s.selectedDate);
  type RoutineVM = { id: number; title: string; tasks: Array<{ id: number; text: string; completed: boolean }> };
  const [routines, setRoutines] = React.useState<RoutineVM[]>([]);
  const [editMode, setEditMode] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);

  const ensureUniqueTitle = React.useCallback((proposed: string, currentId: string | number) => {
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

  const load = React.useCallback(async () => {
    const rows = await listRoutines();
    setRoutines(rows);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const updateRoutine = async (id: number, next: { title: string; tasks: string[] }) => {
    await saveRoutine(id, next.title, next.tasks);
    await load();
  };

  const addRoutine = () => {
    // Optimistic add so the UI reflects immediately
    const tempId = -Date.now();
    setRoutines(prev => [
      ...prev,
      { id: tempId, title: 'New Routine', tasks: [{ id: -Date.now(), text: '', completed: false }] },
    ]);
    setEditMode(true);
    (async () => {
      try {
        const id = await createRoutine('New Routine', true);
        await load();
      } catch (e) {
        console.log(e);
        // Revert optimistic item if create failed
        setRoutines(prev => prev.filter(r => r.id !== tempId));
      }
    })();
  };

  return (
    <GradientBackground variant="afternoon">
      <SafeAreaView edges={['top', 'left', 'right', 'bottom']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: theme.spacing(5), paddingBottom: theme.spacing(8) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: theme.colors.text, fontSize: theme.typography.sizes.h1 }}>Routines</Text>
            {editMode ? (
              <Pressable
                onPress={() => setEditMode(false)}
                accessibilityRole="button"
                accessibilityLabel={'Finish editing routines'}
                style={({ pressed }) => ({ paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, backgroundColor: pressed ? theme.colors.focus : 'transparent' })}
              >
                <Ionicons name="checkmark" size={22} color={theme.colors.text} />
              </Pressable>
            ) : (
              <Menu
                anchor={
                  <Pressable
                    onPress={() => setMenuVisible(true)}
                    accessibilityRole="button"
                    accessibilityLabel={'Open routines menu'}
                    style={({ pressed }) => ({ paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, backgroundColor: pressed ? theme.colors.focus : 'transparent' })}
                  >
                    <Ionicons name="ellipsis-vertical" size={20} color={theme.colors.text} />
                  </Pressable>
                }
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
              >
                <Menu.Item title="Edit" onPress={() => { setMenuVisible(false); setEditMode(true); }} />
              </Menu>
            )}
          </View>
          <Text style={{ color: theme.colors.textMuted, marginTop: theme.spacing(1) }}>{fmt(selectedDate)}</Text>
          <View style={{ height: theme.spacing(4) }} />

          {routines.map((r, idx) => (
            <View key={r.id}>
              <RoutineCard
                id={r.id}
                title={r.title}
                tasks={r.tasks}
                onSave={(next) => updateRoutine(r.id, next)}
                onToggleComplete={async (taskId, next) => {
                  await toggleTask(taskId as number, next);
                  setRoutines(prev => prev.map(rr => rr.id === r.id ? { ...rr, tasks: rr.tasks.map(t => t.id === taskId ? { ...t, completed: next } : t) } : rr));
                }}
                showHeaderActions={editMode}
                initialEditing={editMode && r.title.startsWith('New Routine') && r.tasks.length === 1 && r.tasks[0].text === ''}
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
