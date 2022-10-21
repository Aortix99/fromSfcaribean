import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../interfaces/Roles';
import { rolesService } from '../services/roles.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  datosRoles: Array<Rol> = [];
  myForm!: FormGroup;
  filterPost = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  data: any;
  estado: any;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal, private servicioRol: rolesService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      nmid: [''],
      cdrol: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      dsrol: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],

    });

    let arrayRoles: Array<Rol> = [];
    this.servicioRol.getRoles().subscribe(datos => {
      this.datosRoles = datos.data;
      console.log(datos);
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  open(content: any) {
    this.modalService.open(content);
  }

  guardar(form: FormGroup) {
    if (form.value.nmid && form.value.nmid !== 0) {
      this.actualizar(form);
      return;
    }
    this.servicioRol.createRol(form.value)
      .subscribe(data => {
        alert("Se guardó el rol con éxito!");
        this.myForm.reset();
        this.refresh();
      }
      )
  }

  editar(datos: { nmid: any; cdrol: any; dsrol: any; }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      cdrol: datos.cdrol,
      dsrol: datos.dsrol
    })
  }

  actualizar(form: FormGroup) {
    this.servicioRol.updateRol(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!!")
        this.refresh();
      });
  }

  mostrar(datos: { nmid: any; cdrol: any }) {
    this.router.navigate(["administracion-de-opcion2"], { queryParams: { nmid: datos.nmid, cdrol: datos.cdrol } });
  }

  refresh() {
    let arrayRoles: Array<Rol> = [];
    this.servicioRol.getRoles().subscribe(datos => {
      this.datosRoles = datos.data;
      console.log(datos);
    });
  }
}
