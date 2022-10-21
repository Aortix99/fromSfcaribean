import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(next: ActivatedRouteSnapshot): Promise < boolean > {
    return new Promise((resolve) => {
      Auth.currentAuthenticatedUser({
          bypassCache: false
        })
        .then((user) => {
          if (user && next.data.permission) {
            if (user.attributes['custom:resources']) {
              const exist = JSON.parse(user.attributes['custom:resources']).includes(next.data.permission);
              if (!exist) {
                this.router.navigate(['/home']);
                Swal.fire({
                  icon: 'error',
                  title: 'No tiene permisos para ingresar a esta página',
                  showConfirmButton: false,
                  timer: 3000
                });
              }
              resolve(exist);
              return
            }
            Swal.fire({
              icon: 'warning',
              title: 'No tiene recursos asignados, favor comunicarse con el administrador',
              showConfirmButton: false,
              timer: 3000
            });
            resolve(false)
          } else if (user) {
            resolve(true);
          }
        })
        .catch(() => {
          this.router.navigate(['/login']);
          resolve(false);
        });
    });
  }
  
}