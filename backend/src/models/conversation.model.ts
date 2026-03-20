import { Schema, model, Document } from 'mongoose';

interface IMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface IConversation extends Document {
  sessionId: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ConversationSchema = new Schema<IConversation>(
  {
    sessionId: { type: String, required: true, index: true, unique: true },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

export const Conversation = model<IConversation>('Conversation', ConversationSchema);
export type { IMessage, IConversation };
