import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { colors } from '../theme';
import { AppMode } from '../types';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  rightIcon?: string;
  mode?: AppMode;
  accentColor?: string;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  onBack,
  rightIcon,
}) => {
  return (
    <View style={styles.container} testID="screen-header">
      <TouchableOpacity
        onPress={onBack}
        style={styles.backButton}
        testID="header-back-button"
      >
        <ChevronLeft size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.titleArea}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>

      <View style={styles.spacer} />

      {rightIcon && (
        <View style={styles.rightIcon} testID="header-right-icon" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  titleArea: {
    flexShrink: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Outfit',
  },
  subtitle: {
    fontSize: 12,
    color: colors.textTertiary,
    fontFamily: 'Outfit',
  },
  spacer: {
    flex: 1,
  },
  rightIcon: {
    width: 20,
    height: 20,
  },
});
