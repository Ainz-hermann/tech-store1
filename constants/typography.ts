import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const typography = StyleSheet.create({
  h1: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 32,
    lineHeight: 38,
    color: colors.gray[800],
  },
  h2: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    lineHeight: 29,
    color: colors.gray[800],
  },
  h3: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    lineHeight: 24,
    color: colors.gray[800],
  },
  h4: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    lineHeight: 22,
    color: colors.gray[800],
  },
  h5: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 19,
    color: colors.gray[800],
  },
  h6: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 17,
    color: colors.gray[800],
  },
  body1: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.gray[700],
  },
  body2: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: colors.gray[700],
  },
  caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: colors.gray[500],
  },
  button: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 17,
    color: colors.white,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 16,
    color: colors.gray[700],
  },
  price: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    lineHeight: 22,
    color: colors.primary[600],
  },
  discount: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 17,
    color: colors.error[600],
    textDecorationLine: 'line-through',
  },
});