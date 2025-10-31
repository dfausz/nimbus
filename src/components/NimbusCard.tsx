import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export const NimbusCard: React.FC<{ title: string; subtitle?: string; children?: React.ReactNode }> = ({ title, subtitle, children }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card }, theme.shadow.card]}>
      <Text style={{ color: theme.colors.text, fontFamily: theme.typography.headingsFamily, fontSize: theme.typography.sizes.h2 }}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={{ color: theme.colors.textMuted, marginTop: theme.spacing(1), fontSize: theme.typography.sizes.sm }}>
          {subtitle}
        </Text>
      ) : null}
      <View style={{ marginTop: theme.spacing(3) }}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { borderRadius: 14, padding: 16, marginBottom: 16 },
});
