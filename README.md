# Get Well

**Free. Anonymous. Always here.**

Get Well is a free, anonymous, 24/7 AI emotional support app structured as a 501(c)(3) nonprofit. No paywalls. No subscriptions. Ever.

## Mission

Be there for the person who has no one to call at 3am. The person who can't afford a therapist. The person who is falling apart quietly and doesn't know where to turn.

## Modes

- **Get Well** — Warm, empathetic, judgment-free general emotional support
- **Get Well Faith** — Christian-values-based support with prayer prompts and scripture references

## Features

- 24/7 AI-powered emotional support chat
- Completely anonymous — no accounts, no personal data stored
- Crisis detection with resource referral routing (988 Lifeline, Crisis Text Line, SAMHSA, Trevor Project)
- Donation processing to sustain the nonprofit mission
- Two distinct support modes to meet users where they are

## Tech Stack

- **Mobile:** React Native 0.79 with React Navigation
- **Backend:** Node.js / Express / TypeScript
- **AI:** Anthropic Claude API (conversational chat + crisis analysis)
- **Payments:** Stripe (donation processing for 501(c)(3) contributions)
- **Sessions:** Anonymous in-memory sessions — no accounts, no PII
- **Testing:** Jest + Detox (E2E)

## Project Structure

```
├── App.tsx                        # App entry point
├── src/
│   ├── components/                # ChatBubble, ChatInput, PrayerPrompt, ScriptureBlock, ScreenHeader
│   ├── navigation/AppNavigator.tsx
│   ├── screens/                   # Screen implementations
│   ├── theme/                     # Colors, spacing, typography
│   └── types/                     # Shared TypeScript types
├── server/
│   └── src/
│       ├── controllers/           # ChatController, DonationController
│       ├── routes/                # Chat and donation API routes
│       ├── services/              # ClaudeService, StripeService, ConversationStore,
│       │   └── crisis/            # CrisisDetectionService, CrisisAnalyzer, KeywordMatcher
│       └── types/                 # Chat, crisis, donation types
├── e2e/                           # Detox E2E tests (screenplay pattern)
├── docs/
│   ├── specs/                     # L1 (high-level) and L2 (detailed) requirements
│   ├── detailed-designs/          # Per-screen technical designs with diagrams
│   ├── screens/                   # Screen mockup PNGs (7 screens)
│   ├── infrastructure-costs.md    # Hosting & AI provider cost estimates
│   └── ui-design.pen              # App screen designs
```

## Design

The app design follows a warm, calming aesthetic with cream backgrounds, soft shadows, and nature-inspired accents:

- **Get Well mode** — Green accent (#3D8A5A) conveying calm and growth
- **Get Well Faith mode** — Warm coral accent (#D89575) conveying warmth and grace

Screens designed:

1. Welcome / Onboarding with mode selection
2. Chat — Get Well (general support)
3. Chat — Get Well Faith (faith-based support)
4. Crisis Resources (hotlines and text lines)
5. Donation
6. Settings / About
7. Chat — Crisis Detection Banner

## Crisis Resources

Get Well includes built-in crisis detection and direct access to:

- **988 Suicide & Crisis Lifeline** — Call or text 988
- **Crisis Text Line** — Text HOME to 741741
- **SAMHSA Helpline** — 1-800-662-4357
- **Trevor Project** — 1-866-488-7386 (LGBTQ+)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get involved.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

