import { Component, ChangeDetectorRef, NgZone, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { WindowToken } from './helper/injectorwindows';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'ruta-lavado-front';
  user: CognitoUserInterface | undefined;
  authState: AuthState | undefined;
  constructor(public zone: NgZone, private ref: ChangeDetectorRef, private route : Router, private router: ActivatedRoute, @Inject(WindowToken) private window: Window) { }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      if (this.router.snapshot.queryParams.redirect)
        localStorage.setItem('redirect', this.router.snapshot.queryParams.redirect)
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
      if (this.authState === 'signedin') {
        this.zone.run(() => {
          const redirect = localStorage.getItem('redirect')
          if (redirect) {
            this.window.location.href=redirect
            localStorage.removeItem('redirect')
            return;
          }
          this.route.navigate(['/home']);
        });
      }
      if (this.authState === 'signedout') {
        this.route.navigate(['login']);
      }
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
