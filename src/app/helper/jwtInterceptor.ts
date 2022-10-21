import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Auth } from 'aws-amplify';
import { finalize, switchMap } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private countRequest = 0;
    @BlockUI() blockUI!: NgBlockUI;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if (!this.countRequest) {
            this.blockUI.start();
        }
        this.countRequest++;
        // add authorization header with jwt token if available
        return from(
            Auth.currentSession()
                .then((user) =>  user.getIdToken().getJwtToken())
            ).pipe(
                switchMap((token) => {
                    if (token && token.length > 0) {
                        request = request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${token}`,
                            }
                        });
                    }
                    return next.handle(request);
                }),
                finalize(() => {
                    this.countRequest--;
                    if (!this.countRequest) {
                        this.blockUI.stop();
                    }
                }))
        
    }
}