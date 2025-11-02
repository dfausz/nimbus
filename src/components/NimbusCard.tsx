import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

type NimbusCardProps = {
  title?: string;
  subtitle?: string;
  header?: React.ReactNode;
  children?: React.ReactNode;
};

export const NimbusCard: React.FC<NimbusCardProps> = ({ title, subtitle, header, children }) => {
  const { theme } = useTheme();

  const hasDefaultHeader = Boolean(title || subtitle);
  const headerNode = header ?? (hasDefaultHeader ? (
    <>
      {title ? (
        <Text style={{ color: theme.colors.text, fontFamily: theme.typography.headingsFamily, fontSize: theme.typography.sizes.h2 }}>
          {title}
        </Text>
      ) : null}
      {subtitle ? (
        <Text style={{ color: theme.colors.textMuted, marginTop: theme.spacing(1), fontSize: theme.typography.sizes.sm }}>
          {subtitle}
        </Text>
      ) : null}
    </>
  ) : null);

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card }, theme.shadow.card]}>
      {headerNode ? (
        <View style={{ marginBottom: header ? 0 : theme.spacing(3) }}>{headerNode}</View>
      ) : null}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { borderRadius: 14, padding: 16, marginBottom: 16 },
});
