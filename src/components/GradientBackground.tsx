import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';

export const GradientBackground: React.FC<{ variant?: 'morning'|'afternoon'|'evening'; style?: any; children?: React.ReactNode }> = ({
  variant = 'morning', style, children
}) => {
  const { theme } = useTheme();
  const map = {
    morning: theme.colors.gradientMorning,
    afternoon: theme.colors.gradientAfternoon,
    evening: theme.colors.gradientEvening,
  };
  return (
    <LinearGradient colors={map[variant]} style={[{ flex: 1 }, style]}>
      {children}
    </LinearGradient>
  );
};
