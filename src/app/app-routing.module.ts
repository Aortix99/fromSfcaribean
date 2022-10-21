import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ValidateComponent } from './validate/validate.component';
import { AuthGuard } from './guard/auth.guard';
import { ClientComponent } from './client/client.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { SprintComponent } from './sprint/sprint.component';
import { ColaboratorsComponent } from './colaborators/colaborators.component';
import { ArtefactsComponent } from './artefacts/artefacts.component';
import { RolesComponent } from './roles/roles.component';
import { OptionComponent } from './option/option.component';
import { MenuComponent } from './menu/components/menu/menu.component';
import { UserComponent } from './user/user.component';
import { RolOptionComponent } from './rol-option/rol-option.component';
import { TimeRecordComponent } from './time-record/time-record.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        component: HomeComponent
      },
      {
        path: 'administrador-de-clientes',
        canActivate: [AuthGuard],
        component: ClientComponent
      },
      {
        path: 'administrador-de-usuarios',
        canActivate: [AuthGuard],
        component: UserComponent
      },
      {
        path: 'administrador-de-proyectos',
        canActivate: [AuthGuard],
        component: ProyectsComponent
      },
      {
        path: 'administrador-de-sprints',
        canActivate: [AuthGuard],
        component: SprintComponent
      },
      {
        path: 'asignacion-de-colaboradores',
        canActivate: [AuthGuard],
        component: ColaboratorsComponent
      },
      {
        path: 'artefactos-de-proyecto',
        canActivate: [AuthGuard],
        component: ArtefactsComponent
      },
      {
        path: 'asignacion-de-roles',
        canActivate: [AuthGuard],
        component: RolesComponent
      },
      {
        path: 'administracion-de-opcion',
        canActivate: [AuthGuard],
        component: OptionComponent
      },

      {
        path: 'menu',
        canActivate: [AuthGuard],
        component: MenuComponent
      },

      {
        path: 'administracion-de-opcion2',
        canActivate: [AuthGuard],
        component: RolOptionComponent
      },


      {
        path: 'registro-de-tiempos',
        canActivate: [AuthGuard],
        component: TimeRecordComponent
      },

    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'validate',
    component: ValidateComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
