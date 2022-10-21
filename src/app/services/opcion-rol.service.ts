import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OpcionRol } from '../interfaces/OpcionRol';
import { Opcion } from '../interfaces/Opcion';

@Injectable({
  providedIn: 'root'
})
export class OpcionRolService {

  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }

  getOpcion(): Observable<any> {
    return this.servicio.get(`${this.servidor}/opcionrol`);
  }

  createOpcion(opcion: OpcionRol[]) {
    return this.servicio.post<OpcionRol>(`${this.servidor}/createopcionrol`, opcion);
  }

  editar(opcion: OpcionRol) {
    return this.servicio.put<OpcionRol>(`${this.servidor}/opcionrol/`, opcion.nmid);
  }

  updateOpcion(opcion: OpcionRol) {
    return this.servicio.put<OpcionRol>(this.servidor + "/opcionrol", opcion)
  }

  getOpcionesHijo(nmid_padre: number): Observable<any> {
    return this.servicio.get<Opcion>(`${this.servidor}/opcionhijo/{nmid_padre}?nmid_padre=${nmid_padre}`);
  }
  getOpcionesroles(nmid_padre: number, nmrolid: number): Observable<any> {
    return this.servicio.get<Opcion>(`${this.servidor}/opcionrol/${nmrolid}/${nmid_padre}`);
  }

}
