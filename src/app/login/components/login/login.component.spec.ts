import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WindowToken } from 'src/app/helper/injectorwindows';
import { environment } from 'src/environments/environment';

import { LoginComponent } from './login.component';
const MockWindow = {
  location: {
    _href: '',
    set href(url: string) {
      this._href = url;
    },
    get href() {
      return this._href;
    }
  }
};
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [LoginComponent],
      providers: [{ provide: WindowToken, useValue: MockWindow}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    let href = spyOnProperty(MockWindow.location, 'href', 'set');
    component.singleSSO();
    expect(component).toBeTruthy();
    expect(href).toHaveBeenCalledWith(`https://${environment.USER_POOL_DOMAIN}/oauth2/authorize?identity_provider=${environment.USER_POOL_INDETITY_PROVIDER}&redirect_uri=${environment.USER_POOL_REDIRECT_SIGN_IN}&response_type=CODE&client_id=${environment.USER_POOL_WEB_CLIENT_ID}&scope=aws.cognito.signin.user.admin email openid phone profile`);
  });
});
