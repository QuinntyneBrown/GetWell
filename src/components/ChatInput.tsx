import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Send } from 'lucide-react-native';
import { colors } from '../theme';

interface ChatInputProps {
  placeholder: string;
  onSend: (text: string) => void;
  accentColor: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  placeholder,
  onSend,
  accentColor,
}) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    const trimmed = text.trim();
    if (trimmed.length === 0) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <View style={styles.container} testID="chat-input">
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        value={text}
        onChangeText={setText}
        multiline={false}
        returnKeyType="send"
        onSubmitEditing={handleSend}
      />
      <TouchableOpacity
        style={[styles.sendButton, { backgroundColor: accentColor }]}
        onPress={handleSend}
        testID="send-button"
      >
        <Send size={18} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 100,
    backgroundColor: colors.mutedSurface,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Outfit',
    color: colors.textPrimary,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
