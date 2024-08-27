import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OllamaService {
  private apiUrl = environment.ollamaApiUrl;

  constructor(private http: HttpClient) {}

  getResponse(message: string): Observable<string> {
    const body = {
      model: environment.ollamaModel,
      prompt: message,
      stream: false,
    };

    return this.http
      .post<any>(`${this.apiUrl}/api/generate`, body)
      .pipe(map((response) => response.response));
  }

  getChatResponse(
    messages: { role: string; content: string }[]
  ): Observable<string> {
    const body = {
      model: environment.ollamaModel,
      messages: messages,
      stream: false,
    };

    return this.http
      .post<any>(`${this.apiUrl}/api/chat`, body)
      .pipe(map((response) => response.message.content));
  }
}
