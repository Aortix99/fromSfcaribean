import { TestBed } from '@angular/core/testing';

import { OpcionRolService } from './opcion-rol.service';

describe('OpcionRolService', () => {
  let service: OpcionRolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpcionRolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
