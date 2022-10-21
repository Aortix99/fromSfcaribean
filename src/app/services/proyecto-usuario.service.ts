import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto_Usuario } from '../interfaces/Proyecto_Usuario';

@Injectable({
  providedIn: 'root'
})
export class ProyectoUsuarioService {

  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }

  getProyecto_Usuario(): Observable<any> {
    return this.servicio.get(`${this.servidor}/proyectousuario`);
  }

  getProyectoUsuarioId(nmproyectoid_prouser: number): Observable<any> {
    return this.servicio.get<Proyecto_Usuario>(`${this.servidor}/proyectousuario/{nmproyectoid_prouser}?nmproyectoid_prouser=${nmproyectoid_prouser}`);
  }

  createProyecto_Usuario(proyecto_Usuario: Proyecto_Usuario) {
    return this.servicio.post<Proyecto_Usuario>(`${this.servidor}/proyectousuario`, proyecto_Usuario);
  }

  editar(colaborador: Proyecto_Usuario) {
    return this.servicio.put<Proyecto_Usuario>(`${this.servidor}/proyectousuario/`, colaborador.nmid);
  }

  updateColaborador(colaborador: Proyecto_Usuario) {
    return this.servicio.put<Proyecto_Usuario>(this.servidor + "/proyectousuario", colaborador)
  }
}
