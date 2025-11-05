import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, NimbusTheme } from './theme';

type ThemeCtx = { theme: NimbusTheme; toggle: () => void; setMode: (m: 'light'|'dark') => void };
const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

export const NimbusThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const system = useColorScheme();
  const [mode, setMode] = useState<'light'|'dark'>(system === 'dark' ? 'dark' : 'light');
  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);
  const STORAGE_KEY = 'nimbus.themeMode';

  // Lazy load AsyncStorage if available so the app still runs if the module
  // hasn't been installed yet during development.
  let AsyncStorage: any;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    AsyncStorage = require('@react-native-async-storage/async-storage').default;
  } catch (e) {
    AsyncStorage = undefined;
  }

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (!AsyncStorage) return;
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') {
          if (alive) setMode(saved);
        }
      } catch {}
    })();
    return () => { alive = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = async (next: 'light'|'dark') => {
    try {
      if (AsyncStorage) await AsyncStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  const toggle = () => {
    setMode((m) => {
      const next = m === 'dark' ? 'light' : 'dark';
      void persist(next);
      return next;
    });
  };

  const setModeAndPersist = (m: 'light'|'dark') => {
    setMode(m);
    void persist(m);
  };

  return <ThemeContext.Provider value={{ theme, toggle, setMode: setModeAndPersist }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within NimbusThemeProvider');
  return ctx;
};
