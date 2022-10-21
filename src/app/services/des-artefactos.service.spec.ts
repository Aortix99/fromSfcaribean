import { TestBed } from '@angular/core/testing';

import { DesArtefactosService } from './des-artefactos.service';

describe('DesArtefactosService', () => {
  let service: DesArtefactosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesArtefactosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
