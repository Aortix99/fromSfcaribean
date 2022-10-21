import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Usuarios } from '../interfaces/Usuarios';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  datosUsuarios: Array<Usuarios> = [];
  myForm!: FormGroup;
  filterPost = '';
  date: Date = new Date();




  constructor(private fb: FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private userService: UsuariosService,
    private router: Router) {

    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    this.modalService.open(content);
  }

  arrayUsuarios = new Array<Usuarios>();

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nmid: [''],
      cdusuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      cdpassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      cdcorreo: ['', [Validators.required, Validators.email]],
      dsnombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      cdrol: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      cdestado: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      dtfechacreacion: [this.date],
      dtfechamodificacion: [''],
      dtfeultimoingreso: [''],
      cdinterno: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    })


    this.userService.getUsuarios().subscribe(datos => {
      this.datosUsuarios = datos.data;
      console.log(datos);
    });

  }

  Guardar(form: FormGroup) {
    if (form.value.nmid && form.value.nmid !== 0) {
      this.Actualizar(form);
      return;
    }
    this.userService.createUsuarios(form.value).subscribe(
      data => {
        alert("El usuario se ha creado correctamente!");
        this.myForm.reset();
        this.refresh();
      }
    )
  }



  Editar(datos: {
    nmid: any; cdusuario: any; cdpassword: any; cdcorreo: any; dsnombre: any;
    cdrol: any; cdestado: any; dtfechacreacion: any; dtfechamodificacion: any; dtfeultimoingreso: any; cdinterno: any;
  }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      cdusuario: datos.cdusuario,
      cdpassword: datos.cdpassword,
      cdcorreo: datos.cdcorreo,
      dsnombre: datos.dsnombre,
      cdrol: datos.cdrol,
      cdestado: datos.cdestado,
      dtfechacreacion: datos.dtfechacreacion,
      dtfechamodificacion: datos.dtfechamodificacion,
      dtfeultimoingreso: datos.dtfeultimoingreso,
      cdinterno: datos.cdinterno
    })
  }

  Actualizar(form: FormGroup) {
    this.userService.updateUsuario(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!!")
        this.refresh();
      });
  }
  errorbutton() {
    if (this.myForm.invalid) {
      alert("Debes llenar todos los campos!")
      return;
    }

  }

  refresh() {
    this.userService.getUsuarios().subscribe(datos => {
      this.datosUsuarios = datos.data;
      console.log(datos);
    });
  }

}

