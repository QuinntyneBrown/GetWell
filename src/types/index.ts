import { AppMode } from '../theme/colors';

export type { AppMode } from '../theme/colors';

export type RootStackParamList = {
  Welcome: undefined;
  Chat: { mode: AppMode };
  CrisisResources: undefined;
  Donation: undefined;
  Settings: undefined;
};

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  scripture?: ScriptureReference;
  prayerPrompt?: string;
  isCrisis?: boolean;
}

export interface ScriptureReference {
  text: string;
  reference: string;
}

export interface CrisisResource {
  id: string;
  name: string;
  description: string;
  actionType: 'call' | 'text';
  actionLabel: string;
  phoneNumber: string;
  icon: string;
}

export interface DonationAmount {
  value: number | null;
  label: string;
}
