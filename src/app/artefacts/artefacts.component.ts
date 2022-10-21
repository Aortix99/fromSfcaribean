import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ArtefactoService } from "../services/artefacto.service";
import { Artefacto } from "../interfaces/Artefactos";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-artefacts',
  templateUrl: './artefacts.component.html',
  styleUrls: ['./artefacts.component.scss']

})
export class ArtefactsComponent implements OnInit, OnDestroy {
  datosArtefacto: Array<Artefacto> = [];

  myForm!: FormGroup;
  filterPost = '';
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal, private servicioArtefacto: ArtefactoService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

  dtOptions: DataTables.Settings = {};

  dtTrigger = new Subject<any>();
  data: any

  ngOnInit(): void {

    this.myForm = this.fb.group({
      dsobservacion: ['', Validators.required],

    });

    let arrayArtefacto: Array<Artefacto> = [];
    this.servicioArtefacto.getArtefacto().subscribe(datos => {
      this.datosArtefacto = datos.data;
      console.log(datos);
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4
    };

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  Guardar(form: FormGroup) {
    this.servicioArtefacto.createArtefactos(form.value)
      .subscribe(data => {
        alert("Se guardó el artefacto con éxito!");
        this.router.navigate(["artefactos-de-proyecto"])
      }
      )

  }

}

