import { TextStyle } from 'react-native';

const fontFamily = 'Outfit';

export const typography = {
  largeTitle: {
    fontFamily,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -1,
  } as TextStyle,

  screenHeader: {
    fontFamily,
    fontSize: 26,
    fontWeight: '600',
    letterSpacing: -0.5,
  } as TextStyle,

  sectionEmphasis: {
    fontFamily,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.3,
  } as TextStyle,

  sectionHeader: {
    fontFamily,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.2,
  } as TextStyle,

  body: {
    fontFamily,
    fontSize: 15,
    fontWeight: '500',
  } as TextStyle,

  callout: {
    fontFamily,
    fontSize: 14,
    fontWeight: '500',
  } as TextStyle,

  subhead: {
    fontFamily,
    fontSize: 13,
    fontWeight: '500',
  } as TextStyle,

  footnote: {
    fontFamily,
    fontSize: 12,
    fontWeight: '400',
  } as TextStyle,

  caption: {
    fontFamily,
    fontSize: 11,
    fontWeight: '600',
  } as TextStyle,

  tabLabel: {
    fontFamily,
    fontSize: 10,
    fontWeight: '500',
  } as TextStyle,
};
