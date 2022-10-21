import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroTiempos } from '../interfaces/Registro__Tiempos';

@Injectable({
  providedIn: 'root'
})
export class RegistroTiemposService {


  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }

  getRecord(): Observable<any> {
    return this.servicio.get(`${this.servidor}/registro`);
  }


  createRecord(registro: RegistroTiempos) {
    return this.servicio.post<RegistroTiempos>(`${this.servidor}/registro`, registro);
  }

  editar(registro: RegistroTiempos) {
    return this.servicio.put<RegistroTiempos>(`${this.servidor}/registro/`, registro.nmid);
  }

  updateRecord(registro: RegistroTiempos) {
    return this.servicio.put<RegistroTiempos>(this.servidor + "/registro", registro)
  }

}
