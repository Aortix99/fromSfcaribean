import { TestBed } from '@angular/core/testing';

import { RegistroTiemposService } from './registro-tiempos.service';

describe('RegistroTiemposService', () => {
  let service: RegistroTiemposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroTiemposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
