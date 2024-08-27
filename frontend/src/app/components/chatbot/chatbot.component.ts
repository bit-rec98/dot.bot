import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { OllamaService } from '../../services/chatbot.service';

interface ChatMessage {
  content: string;
  isUser: boolean;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ChatMessageComponent,
    ChatInputComponent,
  ],
  template: `
    <div class="chatbot-container">
      <div class="chat-messages">
        <app-chat-message
          *ngFor="let message of messages"
          [content]="message.content"
          [isUser]="message.isUser"
        ></app-chat-message>
      </div>
      <app-chat-input (sendMessage)="sendMessage($event)"></app-chat-input>
    </div>
  `,
  styles: [
    `
      .chatbot-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        background-color: #1e1e1e;
        color: #ffffff;
      }
      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
      }
    `,
  ],
})
export class ChatbotComponent implements OnInit {
  messages: ChatMessage[] = [];

  constructor(private ollamaService: OllamaService) {}

  ngOnInit() {
    this.messages.push({
      content: "Hello! I'm your Moondream assistant. How can I help you today?",
      isUser: false,
    });
  }

  sendMessage(message: string) {
    this.messages.push({ content: message, isUser: true });

    const chatHistory = this.messages.map((msg) => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.content,
    }));

    this.ollamaService.getChatResponse(chatHistory).subscribe(
      (response) => {
        this.messages.push({ content: response, isUser: false });
      },
      (error) => {
        console.error('Error:', error);
        this.messages.push({
          content: 'Sorry, I encountered an error. Please try again.',
          isUser: false,
        });
      }
    );
  }
}
