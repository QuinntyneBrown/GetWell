import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ClaudeService } from '../services/ClaudeService';
import { ConversationStore } from '../services/ConversationStore';
import { CrisisDetectionService } from '../services/crisis/CrisisDetectionService';
import { FaithResponseParser } from '../services/FaithResponseParser';
import { SendMessageRequest, SendMessageResponse } from '../types/chat';

const MAX_MESSAGE_LENGTH = 2000;

export class ChatController {
  private claudeService: ClaudeService;
  private conversationStore: ConversationStore;
  private crisisDetectionService: CrisisDetectionService;

  constructor(
    claudeService: ClaudeService,
    conversationStore: ConversationStore,
    crisisDetectionService: CrisisDetectionService
  ) {
    this.claudeService = claudeService;
    this.conversationStore = conversationStore;
    this.crisisDetectionService = crisisDetectionService;
  }

  async handleChat(req: Request, res: Response): Promise<void> {
    const { sessionId, mode, message } = req.body as SendMessageRequest;

    // Validate request
    if (!sessionId || typeof sessionId !== 'string') {
      res.status(400).json({ error: 'sessionId is required' });
      return;
    }

    if (!mode || (mode !== 'getwell' && mode !== 'getwell-faith')) {
      res.status(400).json({ error: 'mode must be "getwell" or "getwell-faith"' });
      return;
    }

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'message is required' });
      return;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      res.status(400).json({ error: `message must be ${MAX_MESSAGE_LENGTH} characters or fewer` });
      return;
    }

    try {
      // Get conversation history
      const entry = this.conversationStore.getHistory(sessionId);
      const history = [...entry.messages, { role: 'user' as const, content: message }];

      // Run crisis detection and AI response generation in parallel
      const [crisisResult, aiRawResponse] = await Promise.all([
        this.crisisDetectionService.detect(message, entry.messages),
        this.claudeService.generateResponse(history, mode),
      ]);

      // Store the exchange
      this.conversationStore.addExchange(sessionId, message, aiRawResponse);

      // Build response
      const response: SendMessageResponse = {
        messageId: uuidv4(),
        text: aiRawResponse,
        timestamp: Date.now(),
        isCrisis: crisisResult.crisisDetected,
      };

      // Add crisis detection metadata if detected
      if (crisisResult.crisisDetected) {
        response.crisisDetection = {
          crisisDetected: true,
          crisisLevel: crisisResult.crisisLevel,
          confidence: crisisResult.confidence,
        };
      }

      // Parse faith-specific content if in faith mode
      if (mode === 'getwell-faith') {
        const parsed = FaithResponseParser.parse(aiRawResponse);
        response.text = parsed.content;
        response.scripture = parsed.scripture;
        response.prayerPrompt = parsed.prayerPrompt;
      }

      // Log crisis event without PII
      if (crisisResult.crisisDetected) {
        console.log('Crisis detected', {
          level: crisisResult.crisisLevel,
          confidence: crisisResult.confidence,
          timestamp: crisisResult.timestamp,
        });
      }

      res.json(response);
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
