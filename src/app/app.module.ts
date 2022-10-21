import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './home/home.component';
import { MenuModule } from './menu/menu.module';
import { BlockUIModule } from 'ng-block-ui';
import { ValidateComponent } from './validate/validate.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CoreModule } from './core/core.module';
import { environment } from 'src/environments/environment';
import { JwtInterceptor } from './helper/jwtInterceptor';
import { DataTablesModule } from "angular-datatables";

/* Add Amplify imports */
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import AmplifyI18n from "amplify-i18n"
import { windowProvider, WindowToken } from './helper/injectorwindows';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileSaverModule } from 'ngx-filesaver';
import { ClientComponent } from './client/client.component';
import { ProyectsComponent } from './proyects/proyects.component';
import { SprintComponent } from './sprint/sprint.component';
import { ColaboratorsComponent } from './colaborators/colaborators.component';
import { ArtefactsComponent } from './artefacts/artefacts.component';
import { UserComponent } from './user/user.component';
import { RolesComponent } from './roles/roles.component';
import { OptionComponent } from './option/option.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { FilterProjectPipe } from './Pipes/filter-project.pipe';
import { FilterSprintPipe } from './Pipes/filter-sprint.pipe';
import { FilterColaboratorPipe } from './Pipes/filter-colaborator.pipe';
import { FilterArtefactPipe } from './Pipes/filter-artefact.pipe';
import { FilterRolPipe } from './Pipes/filter-rol.pipe';
import { RolOptionComponent } from './rol-option/rol-option.component';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { TimeRecordComponent } from './time-record/time-record.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
const awsExports = {
  Auth: {
    // identityPoolId: 'us-east-1:4d8dd2b4-5b75-4280-8b58-9bd8bdd89b6a',
    // identityPoolRegion: process.env.VUE_APP_IDENTITY_POOL_REGION,
    // Amazon Cognito Region
    region: environment.USER_POOL_REGION,
    // Amazon Cognito User Pool ID
    userPoolId: environment.USER_POOL_ID,
    // Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: environment.USER_POOL_WEB_CLIENT_ID,
    // Enforce user authentication prior to accessing AWS resources or not
    // mandatorySignIn: true,
    // customized storage object
    // storage: MyStorage,
    // Hosted UI configuration
    oauth: {
      domain: environment.USER_POOL_DOMAIN,
      scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: environment.USER_POOL_REDIRECT_SIGN_IN,
      redirectSignOut: environment.USER_POOL_REDIRECT_SIGN_OUT,
      responseType: 'code',
      options: {
        // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
        AdvancedSecurityDataCollectionFlag: true
      }
    }
  }
};


const locales: Array<any> = ["es", "en"]
AmplifyI18n.configure(locales);
Amplify.I18n.putVocabularies({
  "es": {
    "You will receive a verification code to reset your password": "Recibirás un codigo de verificacion para restablecer tu contraseña",
    "You will receive a verification code": "Recibirás un codigo de verificación",
    "Account recovery requires verified contact information": "La recuperación de la cuenta requiere información de contacto verificada",
    "User does not exist": "El usuario no existe",
    "User already exists": "El usuario ya existe",
    "Incorrect username or password": "Nombre de usuario o contraseña incorrecta",
    "Invalid password format": "Formato de contraseña inválido",
    "Invalid phone number format": "Formato de número de teléfono inválido. Utiliza el formato de número de teléfono +12345678900",
    "Username cannot be empty": "El nombre de usuario no puede estar vacio",
    "Custom auth lambda trigger is not configured for the user pool.": "No esta permitido el inicio de sesión sin contraseña",
    "Incorrect username or password.": "Usuario o contraseña incorrecto",
    "Password cannot be empty": "La contraseña no puede estar vacia",
    "Password attempts exceeded": "Excedido el tiempo de reintentos, espera unos segundos",
    "Invalid verification code provided, please try again.": "Se proporcionó un código de verificación no válido. Vuelva a intentarlo."
  }
}
)

Amplify.I18n.setLanguage("es");
Amplify.configure(awsExports);
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    ValidateComponent,
    ClientComponent,
    ProyectsComponent,
    SprintComponent,
    ColaboratorsComponent,
    ArtefactsComponent,
    RolesComponent,
    OptionComponent,
    UserComponent,

    FilterPipe,
    FilterProjectPipe,
    FilterSprintPipe,
    FilterColaboratorPipe,
    FilterArtefactPipe,

    RolesComponent,
    FilterRolPipe,
    RolOptionComponent,
    TimeRecordComponent,
  ],
  imports: [

    AmplifyUIAngularModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    LayoutModule,
    MenuModule,
    BlockUIModule.forRoot(),
    SweetAlert2Module,
    CoreModule,
    MatDialogModule,
    ReactiveFormsModule,
    FileSaverModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    DragDropModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'Campo requerido',
          minlength: ({ requiredLength, actualLength }) =>
            `Expect ${requiredLength} but got ${actualLength}`,
          invalidAddress: error => `Address isn't valid`
        }
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: WindowToken, useFactory: windowProvider }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
