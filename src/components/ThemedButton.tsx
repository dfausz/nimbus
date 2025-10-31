import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export const ThemedButton: React.FC<{ title: string; onPress?: () => void }> = ({ title, onPress }) => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: theme.colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: theme.radius.lg,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>{title}</Text>
    </Pressable>
  );
};
