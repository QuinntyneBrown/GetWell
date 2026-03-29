import { ScriptureReference, PrayerPrompt } from '../types/chat';

export interface ParsedFaithResponse {
  content: string;
  scripture?: ScriptureReference;
  prayerPrompt?: PrayerPrompt;
}

export class FaithResponseParser {
  static parse(rawContent: string): ParsedFaithResponse {
    let content = rawContent;
    let scripture: ScriptureReference | undefined;
    let prayerPrompt: PrayerPrompt | undefined;

    // Extract [SCRIPTURE]...[/SCRIPTURE] block
    const scriptureMatch = content.match(
      /\[SCRIPTURE\]([\s\S]*?)\[\/SCRIPTURE\]/
    );
    if (scriptureMatch) {
      const scriptureBlock = scriptureMatch[1];

      // Extract [REF]...[/REF] for the reference
      const refMatch = scriptureBlock.match(/\[REF\](.*?)\[\/REF\]/);
      const reference = refMatch ? refMatch[1].trim() : '';

      // Scripture text is everything outside the [REF] tags
      const text = scriptureBlock
        .replace(/\[REF\].*?\[\/REF\]/, '')
        .trim();

      scripture = { text, reference, version: 'NIV' };

      // Remove the full scripture block from content
      content = content.replace(/\[SCRIPTURE\][\s\S]*?\[\/SCRIPTURE\]/, '').trim();
    }

    // Extract [PRAYER]...[/PRAYER] block
    const prayerMatch = content.match(
      /\[PRAYER\]([\s\S]*?)\[\/PRAYER\]/
    );
    if (prayerMatch) {
      prayerPrompt = { promptText: prayerMatch[1].trim() };

      // Remove the prayer block from content
      content = content.replace(/\[PRAYER\][\s\S]*?\[\/PRAYER\]/, '').trim();
    }

    return { content, scripture, prayerPrompt };
  }
}
