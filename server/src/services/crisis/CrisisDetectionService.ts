import { CrisisLevel, CrisisDetectionResult } from '../../types/crisis';
import { KeywordMatcher } from './KeywordMatcher';
import { CrisisAnalyzer } from './CrisisAnalyzer';

// Confidence weights
const CONFIDENCE = {
  KEYWORD_CRITICAL: 1.0,
  KEYWORD_HIGH: 1.0,
  KEYWORD_MODERATE: 0.8,
  KEYWORD_LOW: 0.4,
  CLAUDE_BASE: 0.7,
  THRESHOLD: 0.5,
};

function getLevelPriority(level: CrisisLevel): number {
  switch (level) {
    case CrisisLevel.CRITICAL: return 4;
    case CrisisLevel.HIGH: return 3;
    case CrisisLevel.MODERATE: return 2;
    case CrisisLevel.LOW: return 1;
    case CrisisLevel.NONE: return 0;
  }
}

function higherLevel(a: CrisisLevel, b: CrisisLevel): CrisisLevel {
  return getLevelPriority(a) >= getLevelPriority(b) ? a : b;
}

export class CrisisDetectionService {
  private keywordMatcher: KeywordMatcher;
  private crisisAnalyzer: CrisisAnalyzer;

  constructor(apiKey: string) {
    this.keywordMatcher = new KeywordMatcher();
    this.crisisAnalyzer = new CrisisAnalyzer(apiKey);
  }

  async detect(
    message: string,
    conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
  ): Promise<CrisisDetectionResult> {
    // Step 1: Fast keyword matching
    const keywordResult = this.keywordMatcher.match(message);

    // Fast path: MODERATE or above triggers immediately
    if (keywordResult.matched && getLevelPriority(keywordResult.level) >= getLevelPriority(CrisisLevel.MODERATE)) {
      const confidence = keywordResult.level === CrisisLevel.CRITICAL || keywordResult.level === CrisisLevel.HIGH
        ? CONFIDENCE.KEYWORD_CRITICAL
        : CONFIDENCE.KEYWORD_MODERATE;

      return {
        crisisDetected: true,
        crisisLevel: keywordResult.level,
        confidence,
        matchedKeywords: keywordResult.keywords,
        timestamp: new Date().toISOString(),
      };
    }

    // Step 2: For LOW or NONE keyword results, run Claude analysis
    let keywordConfidence = keywordResult.matched ? CONFIDENCE.KEYWORD_LOW : 0;

    try {
      const claudeResult = await this.crisisAnalyzer.analyze(message, conversationHistory);

      if (claudeResult.isCrisis) {
        const combinedConfidence = Math.max(keywordConfidence, CONFIDENCE.CLAUDE_BASE);
        const combinedLevel = higherLevel(keywordResult.level, claudeResult.suggestedLevel);

        if (combinedConfidence >= CONFIDENCE.THRESHOLD) {
          return {
            crisisDetected: true,
            crisisLevel: combinedLevel,
            confidence: combinedConfidence,
            matchedKeywords: keywordResult.keywords,
            claudeAnalysis: claudeResult,
            timestamp: new Date().toISOString(),
          };
        }
      }
    } catch {
      // If Claude analysis fails, fall through to keyword-only result
      console.error('Claude crisis analysis failed');
    }

    // Step 3: Low keyword match only — still flag if confidence meets threshold
    if (keywordResult.matched && keywordConfidence >= CONFIDENCE.THRESHOLD) {
      return {
        crisisDetected: true,
        crisisLevel: keywordResult.level,
        confidence: keywordConfidence,
        matchedKeywords: keywordResult.keywords,
        timestamp: new Date().toISOString(),
      };
    }

    // No crisis detected
    return {
      crisisDetected: false,
      crisisLevel: CrisisLevel.NONE,
      confidence: 0,
      matchedKeywords: [],
      timestamp: new Date().toISOString(),
    };
  }
}
