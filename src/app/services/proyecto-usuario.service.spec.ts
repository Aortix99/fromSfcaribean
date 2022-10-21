import { TestBed } from '@angular/core/testing';

import { ProyectoUsuarioService } from './proyecto-usuario.service';

describe('ProyectoUsuarioService', () => {
  let service: ProyectoUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectoUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
