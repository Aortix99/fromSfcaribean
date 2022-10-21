import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuarios } from '../interfaces/Usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.servicio.get(`${this.servidor}/usuario`);
  }

  createUsuarios(usuario: Usuarios) {
    return this.servicio.post<Usuarios>(`${this.servidor}/usuario`, usuario);
  }

  edit(usuario: Usuarios) {
    return this.servicio.put<Usuarios>(`${this.servidor}/usuario/`, usuario.nmid);
  }

  updateUsuario(usuario: Usuarios) {
    return this.servicio.put<Usuarios>(`${this.servidor}/usuario`, usuario);
  }
}
