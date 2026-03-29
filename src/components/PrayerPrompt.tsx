import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';
import { colors } from '../theme';

interface PrayerPromptProps {
  text: string;
}

export const PrayerPrompt: React.FC<PrayerPromptProps> = ({ text }) => {
  return (
    <View style={styles.container} testID="prayer-prompt">
      <View style={styles.header}>
        <Heart size={16} color={colors.warmCoral} />
        <Text style={styles.headerText}>Prayer Prompt</Text>
      </View>
      <Text style={styles.body}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightCoral,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.warmCoral,
    fontFamily: 'Outfit',
  },
  body: {
    fontSize: 13,
    color: colors.textSecondary,
    fontFamily: 'Outfit',
  },
});
