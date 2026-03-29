import { ConversationEntry } from '../types/chat';

const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes
const MAX_MESSAGES_PER_SESSION = 50;
const EVICTION_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

export class ConversationStore {
  private store: Map<string, ConversationEntry> = new Map();
  private evictionTimer: NodeJS.Timeout | null = null;

  start(): void {
    this.evictionTimer = setInterval(() => this.evictExpired(), EVICTION_INTERVAL_MS);
  }

  stop(): void {
    if (this.evictionTimer) {
      clearInterval(this.evictionTimer);
      this.evictionTimer = null;
    }
  }

  getHistory(sessionId: string): ConversationEntry {
    const existing = this.store.get(sessionId);
    if (existing) {
      existing.lastActivity = Date.now();
      return existing;
    }

    const entry: ConversationEntry = {
      messages: [],
      lastActivity: Date.now(),
      ttl: SESSION_TTL_MS,
    };
    this.store.set(sessionId, entry);
    return entry;
  }

  addExchange(sessionId: string, userMessage: string, aiResponse: string): void {
    const entry = this.getHistory(sessionId);

    entry.messages.push(
      { role: 'user', content: userMessage },
      { role: 'assistant', content: aiResponse }
    );

    // Cap at max messages to limit token usage
    if (entry.messages.length > MAX_MESSAGES_PER_SESSION) {
      entry.messages = entry.messages.slice(-MAX_MESSAGES_PER_SESSION);
    }

    entry.lastActivity = Date.now();
  }

  evictExpired(): void {
    const now = Date.now();
    for (const [sessionId, entry] of this.store) {
      if (now - entry.lastActivity > entry.ttl) {
        this.store.delete(sessionId);
      }
    }
  }
}
