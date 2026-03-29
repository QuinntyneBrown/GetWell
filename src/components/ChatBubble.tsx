import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';
import { colors, modeColors } from '../theme';
import { ChatMessage, AppMode } from '../types';
import { ScriptureBlock } from './ScriptureBlock';
import { PrayerPrompt } from './PrayerPrompt';

interface ChatBubbleProps {
  message: ChatMessage;
  mode: AppMode;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, mode }) => {
  const isUser = message.role === 'user';
  const { accent, lightAccent } = modeColors[mode];

  return (
    <View
      style={[styles.row, isUser ? styles.rowUser : styles.rowAssistant]}
      testID={`chat-bubble-${message.id}`}
    >
      {!isUser && (
        <View style={[styles.avatar, { backgroundColor: lightAccent }]}>
          <Heart size={18} color={accent} />
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isUser
            ? { backgroundColor: accent }
            : { backgroundColor: colors.white },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: isUser ? colors.white : colors.textPrimary },
          ]}
        >
          {message.content}
        </Text>

        {message.scripture && (
          <ScriptureBlock
            text={message.scripture.text}
            reference={message.scripture.reference}
          />
        )}

        {message.prayerPrompt && <PrayerPrompt text={message.prayerPrompt} />}

        <Text
          style={[
            styles.timestamp,
            { color: isUser ? lightAccent : colors.textTertiary },
          ]}
        >
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  rowAssistant: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    maxWidth: 280,
    gap: 8,
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Outfit',
  },
  timestamp: {
    fontSize: 11,
    fontFamily: 'Outfit',
    marginTop: 4,
  },
});
