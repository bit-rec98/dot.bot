import { Request, Response, NextFunction } from 'express';
import { Conversation } from '../models/conversation.model';
import { getChatResponse, ChatMessage } from '../services/ollama.service';

export async function sendMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { sessionId, message } = req.body as { sessionId: string; message: string };

    if (!sessionId || !message?.trim()) {
      res.status(400).json({ error: 'sessionId and message are required' });
      return;
    }

    let conversation = await Conversation.findOne({ sessionId });
    if (!conversation) {
      conversation = new Conversation({ sessionId, messages: [] });
    }

    conversation.messages.push({ role: 'user', content: message.trim(), timestamp: new Date() });

    const history: ChatMessage[] = conversation.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const aiResponse = await getChatResponse(history);

    conversation.messages.push({ role: 'assistant', content: aiResponse, timestamp: new Date() });
    await conversation.save();

    res.json({ response: aiResponse });
  } catch (error) {
    next(error);
  }
}

export async function getHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { sessionId } = req.params;
    const conversation = await Conversation.findOne({ sessionId });
    res.json({ messages: conversation?.messages ?? [] });
  } catch (error) {
    next(error);
  }
}

export async function clearSession(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { sessionId } = req.params;
    await Conversation.deleteOne({ sessionId });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}
