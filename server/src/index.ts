import express from 'express';
import cors from 'cors';
import { ClaudeService } from './services/ClaudeService';
import { ConversationStore } from './services/ConversationStore';
import { CrisisDetectionService } from './services/crisis/CrisisDetectionService';
import { StripeService } from './services/StripeService';
import { ChatController } from './controllers/ChatController';
import { DonationController } from './controllers/DonationController';
import { createChatRouter } from './routes/chat';
import { createDonationRouter } from './routes/donations';

const PORT = parseInt(process.env.PORT || '3000', 10);
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY environment variable is required');
  process.exit(1);
}

if (!STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY environment variable is required');
  process.exit(1);
}

// Initialize services
const claudeService = new ClaudeService(ANTHROPIC_API_KEY);
const conversationStore = new ConversationStore();
const crisisDetectionService = new CrisisDetectionService(ANTHROPIC_API_KEY);
const stripeService = new StripeService(STRIPE_SECRET_KEY);

// Initialize controllers
const chatController = new ChatController(claudeService, conversationStore, crisisDetectionService);
const donationController = new DonationController(stripeService);

// Create Express app
const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use(createChatRouter(chatController));
app.use(createDonationRouter(donationController));

// Start server
conversationStore.start();

const server = app.listen(PORT, () => {
  console.log(`GetWell server listening on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  conversationStore.stop();
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down...');
  conversationStore.stop();
  server.close(() => process.exit(0));
});

export default app;
