import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Proyecto_Usuario } from '../interfaces/Proyecto_Usuario';
import { ProyectoUsuarioService } from '../services/proyecto-usuario.service';
import { rolesService } from '../services/roles.service';
import { Rol } from '../interfaces/Roles'
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-colaborators',
  templateUrl: './colaborators.component.html',
  styleUrls: ['./colaborators.component.scss']
})
export class ColaboratorsComponent implements OnInit, OnDestroy {

  [x: string]: any;
  datosProyecto_Usuario: Array<Proyecto_Usuario> = [];
  myForm!: FormGroup;
  filterPost = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  data: any

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal, private servicioProyecto_Usuario: ProyectoUsuarioService, private servicioRol: rolesService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      nmid: [''],
      cdusuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      nmrolid_col: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      cdestado: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      nmproyectoid_prouser: []
    });

    this.route.queryParams.subscribe(params => {
      this.dsproyecto = params.dsproyecto,
        this.dscliente = params.dscliente,
        this.nmproyectoid_prouser = params.nmid,
        this.myForm.get('nmproyectoid_prouser')?.setValue(params.nmid)

      let arrayProyecto_Usuario: Array<Proyecto_Usuario> = [];
      this.servicioProyecto_Usuario.getProyectoUsuarioId(this.nmproyectoid_prouser)
        .subscribe(datos => {
          this.datosProyecto_Usuario = datos.data;
          console.log(this.datosProyecto_Usuario);
        });
    });

    let arrayRoles: Array<Rol> = [];
    this.servicioRol.getRoles().subscribe(datos => {
      this.datosRoles = datos.data;
      console.log(datos);
    })



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
    this.servicioProyecto_Usuario.createProyecto_Usuario(form.value)
      .subscribe(data => {
        alert("Se guardó con exito!!!")

        this.myForm.patchValue({
          cdusuario: '',
          nmrolid_col: '',
          cdestado: ''
        })
        this.refresh();
      }
      )
  }

  editar(datos: { nmid: any; cdusuario: any; nmrolid_col: any; cdestado: any; nmproyectoid_prouser: any; }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      cdusuario: datos.cdusuario,
      nmrolid_col: datos.nmrolid_col,
      cdestado: datos.cdestado,
      nmproyectoid_prouser: datos.nmproyectoid_prouser
    })
  }

  actualizar(form: FormGroup) {

    this.route.queryParams.subscribe(params => {
      this.nmproyectoid_prouser = params.nmid,
        this.myForm.get('nmproyectoid_prouser')?.setValue(params.nmid)


      this.servicioProyecto_Usuario.updateColaborador(form.value)
        .subscribe(data => {
          alert("Se actualizó con exito!!!");
          this.refresh();
        });
    });
  }

  refresh() {

    this.route.queryParams.subscribe(params => {
      this.dsproyecto = params.dsproyecto,
        this.dscliente = params.dscliente,
        this.nmproyectoid_prouser = params.nmid,
        this.myForm.get('nmproyectoid_prouser')?.setValue(params.nmid)

      let arrayProyecto_Usuario: Array<Proyecto_Usuario> = [];
      this.servicioProyecto_Usuario.getProyectoUsuarioId(this.nmproyectoid_prouser)
        .subscribe(datos => {
          this.datosProyecto_Usuario = datos.data;
          console.log(this.datosProyecto_Usuario);
        });
    });
  }
}
