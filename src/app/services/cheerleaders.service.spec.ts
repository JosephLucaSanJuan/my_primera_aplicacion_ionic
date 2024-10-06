import { TestBed } from '@angular/core/testing';

import { CheerleadersService } from './cheerleaders.service';

describe('CheerleadersService', () => {
  let service: CheerleadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheerleadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
