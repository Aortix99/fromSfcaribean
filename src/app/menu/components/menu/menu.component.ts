import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Opcion } from 'src/app/interfaces/Opcion';
import { OpcionService } from '../../../services/opcion.service';
import { Auth } from "aws-amplify";

declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

  [x: string]: any;
  datosOpcionPadre: Array<Opcion> = [];
  datosOpcion: Array<Opcion> = [];
  mobileQuery: MediaQueryList;
  usuario = '';
  isShown: boolean = false;

  _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private servicioOpcion: OpcionService, private router: Router, private route: ActivatedRoute) {
    this.mobileQuery = window.matchMedia('(max-width: 600px)');
    this.mobileQuery.addEventListener('change', () => {
      this._mobileQueryListener();
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {

    let arrayOpciones: Array<Opcion> = [];
    this.servicioOpcion.getOpcion().subscribe(datos => {
      this.datosOpcion = datos.data;
      console.log(datos);
    });

    let arrayOpcionesPadre: Array<Opcion> = [];
    this.servicioOpcion.getOpcionPadre().subscribe(datos => {
      this.datosOpcionPadre = datos.data;
      console.log(datos);
    });

    this.setUsuario();

  }

  mostrarHijo(nmid_padre: any,) {
    let arrayOpcion: Array<Opcion> = [];

    this.servicioOpcion.getOpcionidpadre(nmid_padre)
      .subscribe(datos => {
        this.datosOpcionidpadre = datos.data;
        console.log(this.datosOpcionidpadre);

      });

    this.isShown = !this.isShown;

  }

  setUsuario() {
    Auth.currentUserInfo().then(info => {

      this.usuario = info.username;
      console.log(info);
    })
  }

}

