import { TestBed } from '@angular/core/testing';

import { WebsocketConnectionService } from './websocket-connection.service';

describe('WebsocketConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsocketConnectionService = TestBed.get(WebsocketConnectionService);
    expect(service).toBeTruthy();
  });
});
