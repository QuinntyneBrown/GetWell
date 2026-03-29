import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

interface ScriptureBlockProps {
  text: string;
  reference: string;
}

export const ScriptureBlock: React.FC<ScriptureBlockProps> = ({
  text,
  reference,
}) => {
  return (
    <View style={styles.container} testID="scripture-block">
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.reference}>{reference}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightCoral,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.warmCoral,
  },
  text: {
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.warmCoral,
    fontFamily: 'Outfit',
  },
  reference: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.warmCoral,
    fontFamily: 'Outfit',
    marginTop: 4,
  },
});
