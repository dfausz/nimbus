import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NimbusCard } from './NimbusCard';
import { useTheme } from '../theme/ThemeProvider';

type RoutineTask = { id: string | number; text: string; completed?: boolean };
type RoutineCardProps = {
  id: string | number;
  title: string;
  tasks: RoutineTask[];
  onSave?: (next: { title: string; tasks: string[] }) => void;
  onToggleComplete?: (taskId: string | number, next: boolean) => void;
  showHeaderActions?: boolean; // controls visibility of edit UI (pencil/check/+)
  initialEditing?: boolean;    // if true, start in editing state when mounted
  ensureUniqueTitle?: (proposed: string, id: string | number) => string; // parent-provided title uniquifier
};

type DraftItem = { id: string; text: string };

export const RoutineCard: React.FC<RoutineCardProps> = ({ id, title, tasks, onSave, onToggleComplete, showHeaderActions = true, initialEditing = false, ensureUniqueTitle }) => {
  const { theme } = useTheme();
  const [editing, setEditing] = React.useState(initialEditing);
  const [draftTitle, setDraftTitle] = React.useState(title);
  const [draftItems, setDraftItems] = React.useState<DraftItem[]>(() => tasks.map((t, i) => ({ id: `${Date.now()}-${i}`, text: t.text })));

  // keep internal drafts in sync if props change while not editing
  React.useEffect(() => {
    if (!editing) {
      setDraftTitle(title);
      setDraftItems(tasks.map((t, i) => ({ id: `${title}-${i}`, text: t.text })));
  }
  }, [title, tasks.map(t=>t.text).join('|')]);

  const beginEdit = () => {
    setDraftTitle(title);
    setDraftItems(tasks.map((t, i) => ({ id: `${title}-${i}-${Date.now()}`, text: t.text })));
    setEditing(true);
  };

  const addTask = () => {
    setDraftItems((prev) => [...prev, { id: `${Date.now()}-${prev.length}`, text: '' }]);
  };

  const updateTask = (id: string, text: string) => {
    setDraftItems((prev) => prev.map(it => (it.id === id ? { ...it, text } : it)));
  };

  const removeTask = (id: string) => {
    setDraftItems((prev) => prev.filter(it => it.id !== id));
  };

  const save = () => {
    const cleaned = draftItems.map(d => d.text.trim()).filter(Boolean);
    const base = draftTitle.trim() || 'New Routine';
    const unique = ensureUniqueTitle ? ensureUniqueTitle(base, id) : base;
    onSave?.({ title: unique, tasks: cleaned });
    setEditing(false);
  };

  const toggleComplete = (taskId: string | number, current?: boolean) => {
    onToggleComplete?.(taskId, !current);
  };

  const HeaderRight = () => (
    <View style={{ flexDirection: 'row', gap: theme.spacing(2) }}>
      {!showHeaderActions ? null : editing ? (
        <>
          <Pressable accessibilityLabel="Save routine" onPress={save} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
            <Ionicons name="checkmark" size={22} color={theme.colors.text} />
          </Pressable>
          <Pressable accessibilityLabel="Add task" onPress={addTask} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
            <Ionicons name="add" size={22} color={theme.colors.text} />
          </Pressable>
        </>
      ) : (
        <Pressable accessibilityLabel="Edit routine" onPress={beginEdit} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
          <Ionicons name="pencil" size={20} color={theme.colors.text} />
        </Pressable>
      )}
    </View>
  );

  // Auto-save and exit editing if parent hides header actions (leaving screen edit mode)
  React.useEffect(() => {
    if (!showHeaderActions && editing) {
      save();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHeaderActions]);

  const headerSection = (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing(2) }}>
      {editing ? (
        <TextInput
          value={draftTitle}
          onChangeText={setDraftTitle}
          placeholder="Routine name"
          style={{
            flex: 1,
            color: theme.colors.text,
            fontFamily: theme.typography.headingsFamily,
            fontSize: theme.typography.sizes.h2,
            paddingVertical: 4,
          }}
        />
      ) : (
        <Text style={{ flex: 1, color: theme.colors.text, fontFamily: theme.typography.headingsFamily, fontSize: theme.typography.sizes.h2 }}>
          {title}
        </Text>
      )}
      <HeaderRight />
    </View>
  );

  return (
    <NimbusCard header={headerSection}>
      {editing ? (
        <View style={{ gap: theme.spacing(2) }}>
          {draftItems.map((it) => (
            <View key={it.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                value={it.text}
                onChangeText={(t) => updateTask(it.id, t)}
                placeholder="New task"
                style={{
                  flex: 1,
                  color: theme.colors.text,
                  fontSize: theme.typography.sizes.md,
                  paddingVertical: 6,
                  borderBottomWidth: 1,
                  borderColor: theme.name === 'dark' ? '#2A2F36' : '#E0E0E0',
                }}
              />
              <Pressable accessibilityLabel="Remove task" onPress={() => removeTask(it.id)} style={({ pressed }) => ({ padding: 6, opacity: pressed ? 0.7 : 1 })}>
                <Ionicons name="remove" size={18} color={theme.colors.textMuted} />
              </Pressable>
            </View>
          ))}
          {draftItems.length === 0 ? (
            <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.sizes.sm }}>No tasks yet. Tap + to add one.</Text>
          ) : null}
        </View>
      ) : (
        <View style={{ gap: theme.spacing(2) }}>
          {tasks.map((t, idx) => {
            const key = String(t.id);
            const done = !!t.completed;
            const readOnlyList = showHeaderActions && !editing; // screen edit mode, card not editing
            if (readOnlyList) {
              return (
                <View key={key} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: theme.colors.text }}>{t.text}</Text>
                </View>
              );
            }
            return (
              <Pressable key={key} onPress={() => toggleComplete(t.id, done)} accessibilityRole="checkbox" accessibilityState={{ checked: done }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={done ? 'checkbox' : 'square-outline'} size={20} color={done ? theme.colors.primary : theme.colors.textMuted} />
                <Text style={{ marginLeft: theme.spacing(2), color: theme.colors.text, textDecorationLine: done ? 'line-through' : 'none' }}>{t.text}</Text>
              </Pressable>
            );
          })}
          {tasks.length === 0 ? (
            <Text style={{ color: theme.colors.textMuted, fontSize: theme.typography.sizes.sm }}>No tasks yet. Tap the pencil to add tasks.</Text>
          ) : null}
        </View>
      )}
    </NimbusCard>
  );
};
