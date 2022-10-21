import { TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import Auth from '@aws-amplify/auth';
import { LoginModule } from '../login/login.module';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginModule },
        ]),
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('canActivate() is true', async () => {
    spyOn(Auth, 'currentAuthenticatedUser').and.callFake(() => Promise.resolve({ attributes: {
      'custom:resources': '["URO", "CORU"]'
    }}));
    let result = await guard.canActivate({ data: { permission: 'URO' }} as any)
    expect(result).toBe(true);
  });
  it('canActivate() is true', async () => {
    spyOn(Auth, 'currentAuthenticatedUser').and.callFake(() => Promise.resolve({ attributes: {
      'custom:resources': '["URO", "CORU"]'
    }}));
    let result = await guard.canActivate({ data: { xd: 'URO' }} as any)
    expect(result).toBe(true);
  });
  it('canActivate() is true and false', async () => {
    spyOn(Auth, 'currentAuthenticatedUser').and.callFake(() => Promise.resolve({ attributes: {
      'custom:resources': '["USRO", "CORU"]'
    }}));
    let result = await guard.canActivate({ data: { permission: 'URO' }} as any)
    expect(result).toBe(false);
  });
  it('canActivate() is true and false', async () => {
    spyOn(Auth, 'currentAuthenticatedUser').and.callFake(() => Promise.resolve({ attributes: {
      'custom:otro': '["USRO", "CORU"]'
    }}));
    let result = await guard.canActivate({ data: { permission: 'URO' }} as any)
    expect(result).toBe(false);
  });
  it('canActivate() is false', async () => {
    let result = await guard.canActivate({ data: { permission: false }} as any)
    expect(result).toBe(false);
  });
});
