import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AlertTriangle, Phone } from 'lucide-react-native';
import { colors, shadow } from '../theme';

interface CrisisBannerProps {
  onCallPress: () => void;
  onTextPress: () => void;
  onViewResources: () => void;
}

export const CrisisBanner: React.FC<CrisisBannerProps> = ({
  onCallPress,
  onTextPress,
  onViewResources,
}) => {
  return (
    <View style={styles.container} testID="crisis-banner">
      <View style={styles.header}>
        <AlertTriangle size={20} color={colors.warmRed} />
        <Text style={styles.headerText}>You're not alone</Text>
      </View>

      <Text style={styles.description}>
        If you're in crisis or need immediate support, please reach out to one of these resources.
      </Text>

      <TouchableOpacity
        style={styles.callButton}
        onPress={onCallPress}
        testID="crisis-call-button"
      >
        <Phone size={16} color={colors.white} />
        <Text style={styles.callButtonText}>Call 988 Lifeline</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.textButton}
        onPress={onTextPress}
        testID="crisis-text-button"
      >
        <Text style={styles.textButtonText}>Text HOME to 741741</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onViewResources} testID="crisis-view-resources">
        <Text style={styles.linkText}>View all crisis resources</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    gap: 10,
    borderWidth: 2,
    borderColor: colors.warmRed,
    ...shadow.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.warmRed,
    fontFamily: 'Outfit',
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    fontFamily: 'Outfit',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 100,
    backgroundColor: colors.warmRed,
    gap: 8,
  },
  callButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'Outfit',
  },
  textButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 100,
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.warmRed,
  },
  textButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.warmRed,
    fontFamily: 'Outfit',
  },
  linkText: {
    fontSize: 13,
    color: colors.primaryGreen,
    fontFamily: 'Outfit',
    textAlign: 'center',
  },
});
