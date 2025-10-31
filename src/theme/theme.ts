export type ColorTokens = {
    bg: string; card: string; text: string; textMuted: string;
    primary: string; secondary: string; accent: string; positive: string; focus: string;
    gradientMorning: [string, string];
    gradientAfternoon: [string, string];
    gradientEvening: [string, string];
  };
  
  export type NimbusTheme = {
    name: 'light' | 'dark';
    colors: ColorTokens;
    spacing: (n: number) => number;
    radius: { sm: number; md: number; lg: number; xl: number };
    shadow: { card: any };
    typography: {
      fontFamily: string;
      headingsFamily: string;
      sizes: { xs: number; sm: number; md: number; lg: number; xl: number; h1: number; h2: number };
    };
  };
  
  const palette = {
    skyBlue:   '#89CFF0',
    lavender:  '#C3B1E1',
    paleGold:  '#F9E79F',
    cloudWhite:'#FAFAFA',
    stormGray: '#444B59',
    drizzle:   '#6C7A89',
    mint:      '#A3E4D7',
    lilac:     '#D7BDE2',
  };
  
  const spacing = (n: number) => n * 4;
  
  export const lightTheme: NimbusTheme = {
    name: 'light',
    colors: {
      bg: palette.cloudWhite,
      card: '#FFFFFF',
      text: palette.stormGray,
      textMuted: palette.drizzle,
      primary: palette.skyBlue,
      secondary: palette.lavender,
      accent: palette.paleGold,
      positive: palette.mint,
      focus: palette.lilac,
      gradientMorning: [palette.skyBlue, palette.lavender],
      gradientAfternoon: [palette.paleGold, palette.mint],
      gradientEvening: [palette.lavender, palette.stormGray],
    },
    spacing,
    radius: { sm: 6, md: 10, lg: 14, xl: 20 },
    shadow: {
      card: { elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
    },
    typography: {
      fontFamily: 'System',
      headingsFamily: 'System',
      sizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, h1: 28, h2: 22 },
    },
  };
  
  export const darkTheme: NimbusTheme = {
    ...lightTheme,
    name: 'dark',
    colors: {
      ...lightTheme.colors,
      bg: '#0F141A',
      card: '#17202A',
      text: '#E6EAF0',
      textMuted: '#A7B1BD',
      primary: '#5EB7E5',
      secondary: '#B7A4DE',
      accent: '#E8D77A',
      positive: '#85D9C8',
      focus: '#C9A8DD',
      gradientMorning: ['#1B2A38', '#3B2E4F'],
      gradientAfternoon: ['#3A3A1F', '#1F3A33'],
      gradientEvening: ['#2E2442', '#0F141A'],
    },
  };
  