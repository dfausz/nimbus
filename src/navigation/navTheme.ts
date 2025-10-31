import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { lightTheme, darkTheme } from '../theme/theme';

export const navLight: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: lightTheme.colors.bg,
    card: lightTheme.colors.card,
    text: lightTheme.colors.text,
    primary: lightTheme.colors.primary,
    border: '#E8E8E8',
    notification: lightTheme.colors.accent,
  },
};

export const navDark: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: darkTheme.colors.bg,
    card: darkTheme.colors.card,
    text: darkTheme.colors.text,
    primary: darkTheme.colors.primary,
    border: '#2A2F36',
    notification: darkTheme.colors.accent,
  },
};
