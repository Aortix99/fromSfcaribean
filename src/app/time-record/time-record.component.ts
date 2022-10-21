import { DataSource } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroTiempos } from '../interfaces/Registro__Tiempos';
import { RegistroTiemposService } from '../services/registro-tiempos.service';

@Component({
  selector: 'app-time-record',
  templateUrl: './time-record.component.html',
  styleUrls: ['./time-record.component.scss']
})
export class TimeRecordComponent implements OnInit {
  timeForm!: FormGroup;
  progreso: RegistroTiempos[] = [];
  tarea: RegistroTiempos[] = [];
  hecho: RegistroTiempos[] = [];
  updateIndex!: any;
  isEditEnabled: boolean = false;
  arrayRegistro = new Array<RegistroTiempos>();

  constructor(private fb: FormBuilder, private registroService: RegistroTiemposService,
    private router: Router) { }

  ngOnInit(): void {
    this.timeForm = this.fb.group({
      //item: [''],
      nmid: [''],
      cdregistro: ['', Validators.required],
      dsregistro: ['', Validators.required],
      cdestado: ['A']
    })
    this.registroService.getRecord().subscribe(datos => {
      this.tarea = datos.data;
      console.log(datos);
    });
  }
  editar(i: number, datos: {
    nmid: any; cdregistro: any; dsregistro: any; cdestado: any
  }) {
    this.timeForm.setValue({
      nmid: datos.nmid,
      cdregistro: datos.cdregistro,
      dsregistro: datos.dsregistro,
      cdestado: datos.cdestado
    })
    this.timeForm.controls['item'].setValue(datos.nmid);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  Actualizar(form: FormGroup) {
    this.registroService.updateRecord(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!!")
      });
    this.refresh();
  }

  guardarTareas(form: FormGroup) {
    //this.tarea.push({
    //nmid:
    //cdregistro: this.timeForm.value.item,
    //done: false,
    //id: 0
    // });
    // this.timeForm.reset();
    if (form.value.nmid && form.value.nmid !== 0) {
      this.Actualizar(form);
      return;

    }
    this.registroService.createRecord(form.value).subscribe(
      data => {
        alert("El usuario se ha creado correctamente!");
        this.timeForm.reset();
        this.refresh();
      }
    )

    this.registroService.getRecord().subscribe(datos => {
      this.tarea = datos.data;
      console.log(datos);
    });

  }

  actualizarTareas() {
    this.tarea[this.updateIndex].description = this.timeForm.value.item;
    this.tarea[this.updateIndex].done = false;
    this.timeForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }
  eliminarTareas(i: number) {
    this.tarea.splice(i, 1)
  }
  eliminarProgresoTareas(i: number) {
    this.progreso.splice(i, 1)
  }
  eliminarHechoTareas(i: number) {
    this.hecho.splice(i, 1)
  }
  drop(event: CdkDragDrop<RegistroTiempos[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

  }

  refresh() {
    this.registroService.getRecord().subscribe(datos => {
      this.tarea = datos.data;
      console.log(datos);
    });
  }
}
