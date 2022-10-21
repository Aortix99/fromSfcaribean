import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../interfaces/Roles';

@Injectable({
  providedIn: 'root'
})
export class rolesService {

  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }

  getRoles(): Observable<any> {
    return this.servicio.get(`${this.servidor}/secrol`);
  }


  createRol(rol: Rol) {
    return this.servicio.post<Rol>(`${this.servidor}/secrol`, rol);
  }

  editar(rol: Rol) {
    return this.servicio.put<Rol>(`${this.servidor}/secrol/`, rol.nmid);
  }

  updateRol(rol: Rol) {
    return this.servicio.put<Rol>(this.servidor + "/secrol", rol)
  }

}
