import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function PageHeader({
  title,
  subtitle,
}: { title: string; subtitle?: string }) {
  const { theme } = useTheme();

  return (
    <View style={{ marginBottom: theme.spacing(4) }}>
      <Text
        style={{
          color: theme.colors.text,
          fontFamily: theme.typography.headingsFamily,
          fontSize: 34,
          letterSpacing: 0.5,
          textShadowColor: 'rgba(0,0,0,0.10)',
          textShadowOffset: { width: 0, height: 2 },
          textShadowRadius: 6,
        }}
      >
        {title}
      </Text>
      {!!subtitle && (
        <Text
          style={{
            color: theme.colors.textMuted,
            marginTop: theme.spacing(1),
            fontSize: theme.typography.sizes.md,
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}
