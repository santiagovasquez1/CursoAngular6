import { TestBed } from '@angular/core/testing';

import { AppLoadServiceService } from './app-load-service.service';

describe('AppLoadServiceService', () => {
  let service: AppLoadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppLoadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
