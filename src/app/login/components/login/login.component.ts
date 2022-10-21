import { Component, Inject } from '@angular/core';
import { WindowToken } from 'src/app/helper/injectorwindows';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(@Inject(WindowToken) private window: Window){
  }
  singleSSO() {
    this.window.location.href=`https://${environment.USER_POOL_DOMAIN}/oauth2/authorize?identity_provider=${environment.USER_POOL_INDETITY_PROVIDER}&redirect_uri=${environment.USER_POOL_REDIRECT_SIGN_IN}&response_type=CODE&client_id=${environment.USER_POOL_WEB_CLIENT_ID}&scope=aws.cognito.signin.user.admin email openid phone profile`
  }

}
