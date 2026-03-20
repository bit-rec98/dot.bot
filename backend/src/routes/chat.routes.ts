import { Router } from 'express';
import { sendMessage, getHistory, clearSession } from '../controllers/chat.controller';

const router = Router();

router.post('/', sendMessage);
router.get('/:sessionId', getHistory);
router.delete('/:sessionId', clearSession);

export default router;
