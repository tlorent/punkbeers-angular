import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      // take manages the subscription for you, so you don't have to subscribe
      // and unsubscribe to the user BehaviorSubject.
      take(1),
      // https://rxjs.dev/api/operators/exhaustMap
      /*
        exhaustMap waits for the previous Observable to complete, passes the data along and
        then you return a new observable. Projects each source value to an Observable which
        is merged in the output Observable only if the previous projected Observable has completed.
      */
      exhaustMap((user) => {
        /*
          If there is no user, use the original request sent without the added auth token.
          Because the request to login and signup will fail with an auth token.
          Only use the modified request with the auth token for "protected" requests.
        */
        if (!user) {
          return next.handle(req);
        } else {
          const modifiedReq = req.clone({
            params: new HttpParams().set('auth', user.token ?? ''),
          });
          return next.handle(modifiedReq);
        }
      })
    );
  }
}
