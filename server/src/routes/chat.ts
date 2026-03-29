import { Router } from 'express';
import { ChatController } from '../controllers/ChatController';

export function createChatRouter(chatController: ChatController): Router {
  const router = Router();

  router.post('/api/chat', (req, res) => chatController.handleChat(req, res));

  return router;
}
