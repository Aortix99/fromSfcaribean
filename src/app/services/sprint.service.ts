import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto';
import { Sprint } from '../interfaces/Sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  servidor = 'http://localhost:8080/api';
  constructor(private servicio: HttpClient) { }
  proyectos: Proyecto[] = [];

  getSprint(): Observable<any> {
    return this.servicio.get(`${this.servidor}/sprint`);
  }

  createSprint(sprint: Sprint) {
    return this.servicio.post<Sprint>(`${this.servidor}/sprint`, sprint);
  }

  getSprintProyecto(nmproyectoid_spr: number): Observable<any> {
    return this.servicio.get<Sprint>(`${this.servidor}/sprintProyecto/{nmproyectoid_spr}?nmproyectoid_spr=${nmproyectoid_spr}`);
  }

  editar(sprint: Sprint) {
    return this.servicio.put<Sprint>(`${this.servidor}/sprint/`, sprint.nmid);
  }

  updateSprint(sprint: Sprint) {
    return this.servicio.put<Sprint>(this.servidor + "/sprint", sprint)
  }
}

function of(arg0: Proyecto | undefined): Observable<Proyecto> {
  throw new Error('Function not implemented.');
}
