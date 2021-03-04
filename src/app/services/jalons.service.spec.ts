import { TestBed } from '@angular/core/testing';

import { JalonsService } from './jalons.service';

describe('JalonsService', () => {
  let service: JalonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JalonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
