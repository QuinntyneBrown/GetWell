import Anthropic from '@anthropic-ai/sdk';
import { CrisisLevel, CrisisAnalysisResult } from '../../types/crisis';

const CRISIS_ANALYSIS_PROMPT = `You are a crisis detection system. Analyze the following message for signs
of suicidal ideation, self-harm intent, or acute emotional crisis.

Consider both explicit statements and implicit signals such as:
- Expressions of hopelessness or worthlessness
- Farewell or goodbye language
- Giving away possessions
- Sudden calmness after prolonged distress
- Indirect references to not being around

Respond with ONLY valid JSON (no markdown, no code fences): { "isCrisis": boolean, "reasoning": string, "suggestedLevel": "none"|"low"|"moderate"|"high"|"critical" }`;

export class CrisisAnalyzer {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async analyze(
    message: string,
    recentHistory: Array<{ role: 'user' | 'assistant'; content: string }>
  ): Promise<CrisisAnalysisResult> {
    const contextMessages = recentHistory.slice(-5);

    const userContent = contextMessages.length > 0
      ? `Recent conversation:\n${contextMessages.map((m) => `${m.role}: ${m.content}`).join('\n')}\n\nLatest message to analyze:\n${message}`
      : `Message to analyze:\n${message}`;

    try {
      const response = await this.client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 256,
        system: CRISIS_ANALYSIS_PROMPT,
        messages: [{ role: 'user', content: userContent }],
      });

      const textBlock = response.content.find((block) => block.type === 'text');
      if (!textBlock) {
        return { isCrisis: false, reasoning: 'No response from analyzer', suggestedLevel: CrisisLevel.NONE };
      }

      const parsed = JSON.parse(textBlock.text);
      return {
        isCrisis: parsed.isCrisis === true,
        reasoning: parsed.reasoning || '',
        suggestedLevel: (parsed.suggestedLevel as CrisisLevel) || CrisisLevel.NONE,
      };
    } catch {
      // On analyzer failure, err on the side of caution but don't block
      console.error('Crisis analyzer failed, defaulting to no detection');
      return { isCrisis: false, reasoning: 'Analysis failed', suggestedLevel: CrisisLevel.NONE };
    }
  }
}
