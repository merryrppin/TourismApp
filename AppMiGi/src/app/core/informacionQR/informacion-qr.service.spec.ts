import { TestBed } from '@angular/core/testing';

import { InformacionQRService } from './informacion-qr.service';

describe('InformacionQRService', () => {
  let service: InformacionQRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformacionQRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
