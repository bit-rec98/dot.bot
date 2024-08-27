import { TestBed } from '@angular/core/testing';

import { OllamaService } from './chatbot.service';

describe('ChatbotService', () => {
  let service: OllamaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OllamaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
