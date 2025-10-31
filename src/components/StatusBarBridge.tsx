// src/components/StatusBarBridge.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../theme/ThemeProvider';

export default function StatusBarBridge() {
  const { theme } = useTheme();
  // In dark app theme, you want light status-bar content; in light theme, dark content.
  const contentStyle = theme.name === 'dark' ? 'light' : 'dark';
  return (
    <StatusBar
      style={contentStyle}              // 'light' or 'dark' icon/text
      translucent                      // draw behind for edge-to-edge gradients
      backgroundColor="transparent"    // keep your gradient visible on Android
    />
  );
}
