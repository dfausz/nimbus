import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, NimbusTheme } from './theme';

type ThemeCtx = { theme: NimbusTheme; toggle: () => void; setMode: (m: 'light'|'dark') => void };
const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

export const NimbusThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const system = useColorScheme();
  const [mode, setMode] = useState<'light'|'dark'>(system === 'dark' ? 'dark' : 'light');
  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);
  const toggle = () => setMode(m => (m === 'dark' ? 'light' : 'dark'));
  return <ThemeContext.Provider value={{ theme, toggle, setMode }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within NimbusThemeProvider');
  return ctx;
};
