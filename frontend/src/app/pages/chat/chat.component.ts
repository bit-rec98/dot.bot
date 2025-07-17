import { Component } from '@angular/core';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatbotComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {}
