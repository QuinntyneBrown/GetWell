export const colors = {
  // Backgrounds
  pageBg: '#F5F4F1',
  cardSurface: '#FFFFFF',
  elevatedSurface: '#FAFAF8',
  mutedSurface: '#EDECEA',

  // Text
  textPrimary: '#1A1918',
  textSecondary: '#6D6C6A',
  textTertiary: '#9C9B99',
  tabInactive: '#A8A7A5',

  // Borders
  borderSubtle: '#E5E4E1',
  borderStrong: '#D1D0CD',

  // Accents — Get Well (green)
  primaryGreen: '#3D8A5A',
  lightGreen: '#C8F0D8',
  darkGreen: '#4D9B6A',

  // Accents — Get Well Faith (coral)
  warmCoral: '#D89575',
  lightCoral: '#FEF0E8',

  // Status
  warmRed: '#D08068',
  warning: '#D4A64A',

  // Utility
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;

export type AppMode = 'getwell' | 'faith';

export const modeColors: Record<AppMode, { accent: string; lightAccent: string; darkAccent: string }> = {
  getwell: {
    accent: colors.primaryGreen,
    lightAccent: colors.lightGreen,
    darkAccent: colors.darkGreen,
  },
  faith: {
    accent: colors.warmCoral,
    lightAccent: colors.lightCoral,
    darkAccent: colors.warmCoral,
  },
};
