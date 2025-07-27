import { TestBed } from '@angular/core/testing';

import { AsistvirtualService } from './asistvirtual.service';

describe('AsistvirtualService', () => {
  let service: AsistvirtualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistvirtualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
