import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { ChatService } from '../../services/chatbot.service';

interface ChatMessage {
  content: string;
  isUser: boolean;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ChatMessageComponent, ChatInputComponent],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent implements OnInit {
  messages: ChatMessage[] = [];
  isLoading = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getHistory().subscribe({
      next: (history) => {
        if (history.length === 0) {
          this.messages.push({
            content: "Hello! I'm your AI assistant. How can I help you today?",
            isUser: false,
          });
        } else {
          this.messages = history.map((m) => ({
            content: m.content,
            isUser: m.role === 'user',
          }));
        }
      },
      error: () => {
        this.messages.push({
          content: "Hello! I'm your AI assistant. How can I help you today?",
          isUser: false,
        });
      },
    });
  }

  sendMessage(message: string): void {
    if (!message.trim() || this.isLoading) return;

    this.messages.push({ content: message, isUser: true });
    this.isLoading = true;

    this.chatService.sendMessage(message).subscribe({
      next: (response) => {
        this.messages.push({ content: response, isUser: false });
        this.isLoading = false;
      },
      error: () => {
        this.messages.push({
          content: 'Sorry, I encountered an error. Please try again.',
          isUser: false,
        });
        this.isLoading = false;
      },
    });
  }

  clearChat(): void {
    this.chatService.clearSession();
  }
}
