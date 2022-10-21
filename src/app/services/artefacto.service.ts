import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artefacto } from '../interfaces/Artefactos';

@Injectable({
  providedIn: 'root'
})
export class ArtefactoService {
  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }

  getArtefacto(): Observable<any> {
    return this.servicio.get(`${this.servidor}/artefacto`);
  }

  createArtefactos(artefacto: Artefacto) {
    return this.servicio.post<Artefacto>(`${this.servidor}/artefacto`, artefacto);
  }

}
