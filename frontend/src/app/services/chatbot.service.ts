import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment.dev';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly apiUrl = `${environment.backendApiUrl}/api/chat`;
  readonly sessionId: string;

  constructor(private http: HttpClient) {
    this.sessionId = this.getOrCreateSessionId();
  }

  private getOrCreateSessionId(): string {
    let id = localStorage.getItem('chat_session_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('chat_session_id', id);
    }
    return id;
  }

  sendMessage(message: string): Observable<string> {
    return this.http
      .post<{ response: string }>(this.apiUrl, { sessionId: this.sessionId, message })
      .pipe(map((res) => res.response));
  }

  getHistory(): Observable<ChatMessage[]> {
    return this.http
      .get<{ messages: ChatMessage[] }>(`${this.apiUrl}/${this.sessionId}`)
      .pipe(map((res) => res.messages));
  }

  clearSession(): void {
    this.http.delete(`${this.apiUrl}/${this.sessionId}`).subscribe();
    localStorage.removeItem('chat_session_id');
    location.reload();
  }
}
