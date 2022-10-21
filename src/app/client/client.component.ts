import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClientesService } from '../services/clientes.service';
import { Clientes } from '../interfaces/Clientes';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


declare var $: any;
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  // add NgbModalConfig and NgbModal to the component providers

})
export class ClientComponent implements OnInit, OnDestroy {

  datosClientes: Array<Clientes> = [];
  myForm!: FormGroup;
  filterPost = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  data: any;
  estado: any;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal, private servicioCliente: ClientesService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      nmid: [''],
      dscliente: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      cdestado: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],

    });

    let arrayClientes: Array<Clientes> = [];
    this.servicioCliente.getClientes().subscribe(datos => {
      this.datosClientes = datos.data;
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
    if (this.myForm.valid) {
      if (form.value.nmid && form.value.nmid !== 0) {
        this.actualizar(form);
        return;
      }
      this.servicioCliente.createClientes(form.value)
        .subscribe(data => {
          alert("Se guardó el cliente con éxito!");
          this.myForm.reset();
          this.refresh();
        }
        )

    }
    else {
      alert('formualario inválido')
    }

  }

  guardar2(): void {
    if (this.myForm.valid) {
      alert('formualario válido')
    } else {
      alert('formualario inválido')
    }
  }

  editar(datos: { nmid: any; dscliente: any; cdestado: any; }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      dscliente: datos.dscliente,
      cdestado: datos.cdestado
    })
  }

  actualizar(form: FormGroup) {
    this.servicioCliente.updateClientes(form.value)
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
    let arrayClientes: Array<Clientes> = [];
    this.servicioCliente.getClientes().subscribe(datos => {
      this.datosClientes = datos.data;
      console.log(datos);
    });
  }
}


