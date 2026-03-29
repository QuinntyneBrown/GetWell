export enum CrisisLevel {
  NONE = 'none',
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface CrisisDetectionResult {
  crisisDetected: boolean;
  crisisLevel: CrisisLevel;
  confidence: number;
  matchedKeywords: string[];
  claudeAnalysis?: {
    isCrisis: boolean;
    reasoning: string;
    suggestedLevel: CrisisLevel;
  };
  timestamp: string;
}

export interface KeywordMatchResult {
  matched: boolean;
  keywords: string[];
  level: CrisisLevel;
}

export interface CrisisAnalysisResult {
  isCrisis: boolean;
  reasoning: string;
  suggestedLevel: CrisisLevel;
}
