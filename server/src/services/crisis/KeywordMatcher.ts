import { CrisisLevel, KeywordMatchResult } from '../../types/crisis';

interface KeywordTier {
  level: CrisisLevel;
  phrases: string[];
}

const KEYWORD_TIERS: KeywordTier[] = [
  {
    level: CrisisLevel.CRITICAL,
    phrases: [
      'kill myself',
      'end my life',
      'suicide plan',
      'want to die',
      'going to kill myself',
      'planning to end it',
      'suicide note',
      'going to end it all',
      'take my own life',
      'commit suicide',
    ],
  },
  {
    level: CrisisLevel.HIGH,
    phrases: [
      'self-harm',
      'self harm',
      'cutting myself',
      'overdose',
      'no reason to live',
      'hurt myself',
      'harming myself',
      'don\'t want to be alive',
      'wish i was dead',
      'wish i were dead',
      'rather be dead',
      'better off dead',
    ],
  },
  {
    level: CrisisLevel.MODERATE,
    phrases: [
      'hopeless',
      'can\'t go on',
      'cant go on',
      'nobody cares',
      'better off without me',
      'no point in living',
      'nothing to live for',
      'give up on life',
      'no way out',
      'trapped',
      'burden to everyone',
      'world would be better without me',
    ],
  },
  {
    level: CrisisLevel.LOW,
    phrases: [
      'really struggling',
      'don\'t know what to do',
      'dont know what to do',
      'falling apart',
      'can\'t take it anymore',
      'cant take it anymore',
      'at my breaking point',
      'rock bottom',
      'losing hope',
      'overwhelmed',
    ],
  },
];

export class KeywordMatcher {
  match(message: string): KeywordMatchResult {
    const lowerMessage = message.toLowerCase();
    const matchedKeywords: string[] = [];
    let highestLevel = CrisisLevel.NONE;

    for (const tier of KEYWORD_TIERS) {
      for (const phrase of tier.phrases) {
        if (lowerMessage.includes(phrase)) {
          matchedKeywords.push(phrase);
          if (highestLevel === CrisisLevel.NONE || getLevelPriority(tier.level) > getLevelPriority(highestLevel)) {
            highestLevel = tier.level;
          }
        }
      }
    }

    return {
      matched: matchedKeywords.length > 0,
      keywords: matchedKeywords,
      level: highestLevel,
    };
  }
}

function getLevelPriority(level: CrisisLevel): number {
  switch (level) {
    case CrisisLevel.CRITICAL: return 4;
    case CrisisLevel.HIGH: return 3;
    case CrisisLevel.MODERATE: return 2;
    case CrisisLevel.LOW: return 1;
    case CrisisLevel.NONE: return 0;
  }
}
