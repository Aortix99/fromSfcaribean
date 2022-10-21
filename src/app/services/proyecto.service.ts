import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }

  getProyectos(): Observable<any> {
    return this.servicio.get(`${this.servidor}/proyecto`);
  }

  createProyectos(proyecto: Proyecto) {
    return this.servicio.post<Proyecto>(`${this.servidor}/proyecto`, proyecto);
  }

  editar(proyecto: Proyecto) {
    return this.servicio.put<Proyecto>(`${this.servidor}/proyecto/`, proyecto.nmid);
  }

  updateProyectos(proyecto: Proyecto) {
    return this.servicio.put<Proyecto>(this.servidor + "/proyecto", proyecto)
  }

}
