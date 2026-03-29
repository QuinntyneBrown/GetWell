export interface SendMessageRequest {
  sessionId: string;
  mode: 'getwell' | 'getwell-faith';
  message: string;
}

export interface SendMessageResponse {
  messageId: string;
  text: string;
  timestamp: number;
  isCrisis: boolean;
  scripture?: ScriptureReference;
  prayerPrompt?: PrayerPrompt;
  crisisDetection?: {
    crisisDetected: boolean;
    crisisLevel: CrisisLevel;
    confidence: number;
  };
}

export interface ScriptureReference {
  text: string;
  reference: string;
  version?: string;
}

export interface PrayerPrompt {
  promptText: string;
}

export interface ConversationEntry {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  lastActivity: number;
  ttl: number;
}

export { CrisisLevel } from './crisis';
