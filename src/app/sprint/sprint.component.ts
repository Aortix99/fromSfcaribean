import { Component, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Sprint } from '../interfaces/Sprint';
import { SprintService } from '../services/sprint.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoService } from '../services/proyecto.service';

declare var $: any;

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']

})
export class SprintComponent implements OnInit, OnDestroy {

  [x: string]: any;
  datosSprint: Array<Sprint> = [];
  myForm!: FormGroup;
  filterPost = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  data: any

  @Input() dsproyecto: string = "";

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private http: HttpClient, config: NgbModalConfig, private modalService: NgbModal, private servicioSprint: SprintService, private servicioProyecto: ProyectoService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nmid: [''],
      dssprint: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      nmproyectoid_spr: [],
      nmclienteid_spr: [],
      feinicio: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      fefin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      nmduracion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      cdestado: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    });

    this.route.queryParams.subscribe(params => {
      this.dsproyecto = params.dsproyecto,
        this.dscliente = params.dscliente,
        this.nmproyectoid_spr = params.nmid,
        this.nmclienteid_spr = params.nmclienteid_proy,
        this.myForm.get('nmproyectoid_spr')?.setValue(params.nmid)
      this.myForm.get('nmclienteid_spr')?.setValue(params.nmclienteid_proy)

      let arraySprint: Array<Sprint> = [];
      this.servicioSprint.getSprintProyecto(this.nmproyectoid_spr)
        .subscribe(datos => {
          this.datosSprint = datos.data;
          console.log(this.datosSprint);
        });
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  open(content: any) {
    this.modalService.open(content);
  }

  onEdit() {
    this.router.navigate(['/asignacion-de-colaboradores']);
  }

  guardar(form: FormGroup) {
    if (form.value.nmid && form.value.nmid !== 0) {
      this.actualizar(form);
      return;
    }
    this.servicioSprint.createSprint(form.value)
      .subscribe(data => {
        this.myForm.patchValue({
          dssprint: '',
          feinicio: '',
          fefin: '',
          nmduracion: '',
          cdestado: ''
        })
        alert("Se guardó con exito!!!");
        this.refresh();
      }
      )
  }

  editar(datos: { nmid: any; dssprint: any; nmproyectoid_spr: any; nmclienteid_spr: any; feinicio: any; fefin: any; nmduracion: any; cdestado: any; }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      dssprint: datos.dssprint,
      nmproyectoid_spr: datos.nmproyectoid_spr,
      nmclienteid_spr: datos.nmclienteid_spr,
      feinicio: new Date(datos.feinicio).toISOString().substring(0, 10),
      fefin: new Date(datos.fefin).toISOString().substring(0, 10),
      nmduracion: datos.nmduracion,
      cdestado: datos.cdestado,
    })
  }

  actualizar(form: FormGroup) {
    this.route.queryParams.subscribe(params => {
      this.nmproyectoid_spr = params.nmid,
        this.nmclienteid_spr = params.nmclienteid_proy,
        this.myForm.get('nmproyectoid_spr')?.setValue(params.nmid)
      this.myForm.get('nmclienteid_spr')?.setValue(params.nmclienteid_proy)

      this.servicioSprint.updateSprint(form.value)
        .subscribe(data => {
          alert("Se actualizó con exito!!!")
          this.refresh();
        });
    });
  }

  refresh() {

    this.route.queryParams.subscribe(params => {
      this.dsproyecto = params.dsproyecto,
        this.dscliente = params.dscliente,
        this.nmproyectoid_spr = params.nmid,
        this.nmclienteid_spr = params.nmclienteid_proy,
        this.myForm.get('nmproyectoid_spr')?.setValue(params.nmid)
      this.myForm.get('nmclienteid_spr')?.setValue(params.nmclienteid_proy)

      let arraySprint: Array<Sprint> = [];
      this.servicioSprint.getSprintProyecto(this.nmproyectoid_spr)
        .subscribe(datos => {
          this.datosSprint = datos.data;
          console.log(this.datosSprint);
        });
    });
  }
}


