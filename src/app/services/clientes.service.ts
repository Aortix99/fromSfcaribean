import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientes } from '../interfaces/Clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }

  getClientes(): Observable<any> {
    return this.servicio.get(`${this.servidor}/cliente`);
  }
  createClientes(cliente: Clientes) {
    return this.servicio.post<Clientes>(`${this.servidor}/cliente`, cliente);
  }

  editar(cliente: Clientes) {
    return this.servicio.put<Clientes>(`${this.servidor}/cliente/`, cliente.nmid);
  }

  updateClientes(cliente: Clientes) {
    return this.servicio.put<Clientes>(this.servidor + "/cliente", cliente)
  }
}
