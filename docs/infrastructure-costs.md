# Get Well - Technical Infrastructure Operating Costs

Estimated monthly operating costs for hosting, AI providers, and third-party services across development, staging, and production environments.

> **Last updated:** March 2026
> **Currency:** USD
> **Billing cycle:** Monthly unless noted

---

## Cost Summary

| Category                  | Dev        | Staging    | Production (Low) | Production (High) |
| ------------------------- | ---------- | ---------- | ----------------- | ------------------ |
| Backend Hosting           | $0–5       | $5–15      | $25–70            | $150–400           |
| AI Provider (Anthropic)   | $5–20      | $20–50     | $200–800          | $2,000–5,000+      |
| Mobile App Distribution   | —          | —          | $8/mo amortized   | $8/mo amortized    |
| Payment Processing        | $0         | $0         | Variable          | Variable           |
| DNS & CDN                 | $0         | $0–5       | $0–20             | $20–100            |
| Monitoring & Logging      | $0         | $0         | $0–30             | $30–100            |
| CI/CD & Build             | $0         | $0–15      | $15–30            | $30–50             |
| Secrets Management        | $0         | $0         | $0                | $0–10              |
| **Estimated Monthly Total** | **$5–25** | **$25–85** | **$250–960**      | **$2,240–5,670+**  |

> **Production (Low):** ~1,000 daily active users, ~5,000 conversations/day
> **Production (High):** ~10,000+ daily active users, ~50,000 conversations/day

---

## 1. Backend Hosting (Node.js / Express API)

The backend is stateless with in-memory session storage (30-min TTL). No persistent database is required.

### Recommended: Cloud Run (Google Cloud) or similar container hosting

| Environment | Tier / Config                            | Est. Cost/mo |
| ----------- | ---------------------------------------- | ------------- |
| Dev         | Local / free-tier Cloud Run              | $0–5          |
| Staging     | Cloud Run — 1 instance, 0.5 vCPU, 512MB | $5–15         |
| Production  | Cloud Run — auto-scaling 2–10 instances  | $25–400       |

**Alternative options:**

| Provider      | Dev       | Staging  | Production     |
| ------------- | --------- | -------- | -------------- |
| Railway       | Free      | $5–10    | $20–100        |
| Fly.io        | Free      | $5–15    | $25–150        |
| Render        | Free      | $7       | $25–100        |
| AWS ECS       | Free tier | $10–20   | $50–400        |
| Heroku        | $0 (Eco)  | $7–25    | $50–250        |

### Scaling notes

- At production scale, consider sticky sessions or migrating session storage to Redis ($15–30/mo for a managed instance) if horizontal scaling causes session loss.
- A Redis instance would be needed only if running multiple backend replicas behind a load balancer.

---

## 2. AI Provider — Anthropic Claude API

This is the **largest variable cost**. Every chat message triggers at least one Claude API call, and crisis detection adds a second call when keyword matching returns low/no severity.

### Pricing (Claude Sonnet — as of early 2026)

| Model          | Input (per 1M tokens) | Output (per 1M tokens) |
| -------------- | --------------------- | ---------------------- |
| Claude Sonnet  | $3.00                 | $15.00                 |

### Token usage estimates per conversation

| Component           | Avg Input Tokens | Avg Output Tokens |
| ------------------- | ---------------- | ----------------- |
| Chat response       | ~1,500           | ~300              |
| Crisis analysis     | ~800             | ~100              |
| **Per message avg** | **~1,800**       | **~350**          |

> Assumes ~10 messages per session average, system prompt + conversation history grows per turn.

### Monthly cost projections

| Environment | Daily Conversations | Messages/Day | Est. Cost/mo |
| ----------- | ------------------- | ------------ | ------------ |
| Dev         | 10–50               | 100–500      | $5–20        |
| Staging     | 50–200              | 500–2,000    | $20–50       |
| Prod (Low)  | 5,000               | 50,000       | $200–800     |
| Prod (High) | 50,000              | 500,000      | $2,000–5,000 |

### Cost optimization strategies

- **Prompt caching** — Cache system prompts to reduce repeated input tokens (Anthropic supports this).
- **Max tokens cap** — Already set to 512 output tokens per response.
- **Session message limit** — Already capped at 50 messages per session.
- **Model tiering** — Use Claude Haiku ($0.25/$1.25 per 1M tokens) for crisis keyword pre-screening to reduce Sonnet calls by ~40–60%. Estimated savings: 30–50% of AI costs.
- **Rate limiting** — Throttle per-session message frequency to prevent abuse.

### Budget with Haiku optimization (production estimate)

| Scenario    | Sonnet Only | With Haiku Tiering |
| ----------- | ----------- | ------------------ |
| Prod (Low)  | $200–800    | $120–500           |
| Prod (High) | $2,000–5,000| $1,200–3,000       |

---

## 3. Mobile App Distribution

| Service                      | Cost             | Notes                              |
| ---------------------------- | ---------------- | ---------------------------------- |
| Apple Developer Program      | $99/year         | Required for App Store publishing  |
| Google Play Developer        | $25 one-time     | Required for Play Store publishing |
| Expo EAS Build (free tier)   | $0               | 30 builds/mo on free plan          |
| Expo EAS Build (Production)  | $99/mo           | Priority builds, more concurrency  |
| **Amortized monthly**        | **~$8–16/mo**    |                                    |

> Dev and staging builds use Expo Go or local simulators — no distribution cost.

---

## 4. Payment Processing (Stripe)

Stripe has no monthly fee. Costs are purely transactional:

| Fee Type                  | Rate                        |
| ------------------------- | --------------------------- |
| Card transactions         | 2.9% + $0.30 per donation   |
| Stripe for nonprofits     | Apply for discounted rate    |

### Projected transaction costs

| Monthly Donations | Avg. Donation | Stripe Fees/mo |
| ----------------- | ------------- | -------------- |
| 100               | $15           | ~$74           |
| 500               | $15           | ~$368          |
| 1,000             | $20           | ~$890          |

> These fees come out of donation revenue, not operating budget.
> Stripe offers discounted nonprofit pricing — apply at [stripe.com/nonprofit](https://stripe.com/nonprofit).

---

## 5. DNS, Domain & CDN

| Service                  | Cost/mo  | Notes                                 |
| ------------------------ | -------- | ------------------------------------- |
| Domain (getwell.help)    | ~$1–3    | Annual cost amortized                 |
| Cloudflare (Free tier)   | $0       | DNS, SSL, basic DDoS protection       |
| Cloudflare Pro           | $20      | WAF, advanced DDoS, analytics         |
| AWS CloudFront (if used) | $0–100   | Based on traffic volume               |

| Environment | Recommended          | Cost/mo |
| ----------- | -------------------- | ------- |
| Dev         | Cloudflare Free      | $0      |
| Staging     | Cloudflare Free      | $0–5    |
| Production  | Cloudflare Pro / CDN | $0–100  |

---

## 6. Monitoring, Logging & Error Tracking

| Service         | Free Tier             | Paid Tier     | Notes                          |
| --------------- | --------------------- | ------------- | ------------------------------ |
| Sentry          | 5K errors/mo          | $26/mo+       | Error tracking, crash reports  |
| LogTail / Axiom | 1 GB/mo free          | $25/mo+       | Structured logging             |
| UptimeRobot     | 50 monitors free      | $7/mo         | Uptime & health checks         |
| Google Cloud Logging | 50 GB/mo free    | $0.50/GB      | If using GCP                   |

| Environment | Recommended              | Cost/mo |
| ----------- | ------------------------ | ------- |
| Dev         | Console logging          | $0      |
| Staging     | Sentry free tier         | $0      |
| Production  | Sentry + Logging service | $0–100  |

---

## 7. CI/CD & Build Pipeline

| Service              | Free Tier         | Paid Tier   | Notes                        |
| -------------------- | ----------------- | ----------- | ---------------------------- |
| GitHub Actions       | 2,000 min/mo free | $0.008/min  | CI testing, lint, deploy     |
| Expo EAS Build       | 30 builds/mo      | $99/mo      | iOS/Android builds           |
| Expo EAS Update (OTA)| Free              | Included    | Over-the-air JS updates      |

| Environment | Cost/mo |
| ----------- | ------- |
| Dev         | $0      |
| Staging     | $0–15   |
| Production  | $15–50  |

---

## 8. Secrets Management

| Service                  | Cost/mo | Notes                              |
| ------------------------ | ------- | ---------------------------------- |
| Environment variables    | $0      | Built into hosting platforms       |
| Google Secret Manager    | $0      | 6 active versions free, then minor |
| AWS Secrets Manager      | $0.40/secret/mo | Per secret per month       |
| Doppler                  | Free (5 users)  | Team secrets management    |

> Secrets to manage: `ANTHROPIC_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`

---

## Annual Cost Projections

| Environment      | Monthly Est.   | Annual Est.       |
| ---------------- | -------------- | ----------------- |
| Dev              | $5–25          | $60–300           |
| Staging          | $25–85         | $300–1,020        |
| Production (Low) | $250–960       | $3,000–11,520     |
| Production (High)| $2,240–5,670   | $26,880–68,040    |

### Combined (Dev + Staging + Production)

| Scenario         | Monthly Total  | Annual Total      |
| ---------------- | -------------- | ----------------- |
| Early stage      | $280–1,070     | $3,360–12,840     |
| Growth stage     | $2,270–5,780   | $27,240–69,360    |

---

## Key Cost Drivers & Recommendations

### Top 3 cost drivers (production)

1. **Anthropic Claude API** — 70–85% of total cost
2. **Backend hosting / scaling** — 5–15% of total cost
3. **Monitoring & CI/CD** — 5–10% of total cost

### Cost reduction recommendations

| Strategy                        | Potential Savings | Effort |
| ------------------------------- | ----------------- | ------ |
| Use Haiku for crisis screening  | 30–50% on AI      | Low    |
| Enable Anthropic prompt caching | 10–20% on AI      | Low    |
| Apply for Anthropic nonprofit credits | Up to 100%  | Low    |
| Apply for Google Cloud nonprofit credits | Hosting  | Low    |
| Apply for Stripe nonprofit rate | ~0.7% per txn     | Low    |
| Implement response streaming    | Better UX, same $ | Medium |
| Add client-side message caching | 5–10% on AI       | Medium |

### Nonprofit programs to apply for

- **Anthropic** — Contact sales for nonprofit/mission-driven pricing or credits
- **Google Cloud for Nonprofits** — Up to $10,000/year in credits
- **AWS Activate for Nonprofits** — Up to $10,000 in credits
- **Cloudflare Project Galileo** — Free enterprise-level protection for nonprofits
- **Stripe for Nonprofits** — Reduced processing fees
- **GitHub for Nonprofits** — Free Team plan
- **Sentry for Good** — Free or discounted plans for nonprofits
- **Expo** — Contact for nonprofit/mission-driven pricing

---

## Assumptions & Notes

- All estimates assume US-based hosting regions.
- AI token counts are approximations based on typical conversation patterns — actual usage will vary.
- Production estimates assume organic growth without viral spikes. Budget a 2x buffer for unexpected traffic.
- Stripe fees are deducted from donations, not operating expenses, but included for completeness.
- No persistent database costs are included since the app is fully anonymous with in-memory sessions.
- Costs are based on publicly available pricing as of early 2026 and are subject to change.
