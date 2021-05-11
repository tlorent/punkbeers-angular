import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from '../../environments/environment';

export type AuthResponseData = {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /*
    https://rxjs.dev/api/index/class/BehaviorSubject
    A variant of Subject that requires an initial value and emits its current value whenever it is subscribed to.

    Why a BehaviorSubject here? Because we need the user token in the beers service and we
    do not want to subscribe "completely", i.e. get notified every time the user value changes.
    We are only interested in the token of the currently logged in user in its current state,
    not whenever it changes.
  */
  user = new BehaviorSubject<User | null>(null);
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        /*
          https://www.learnrxjs.io/learn-rxjs/operators/error_handling/catch
          https://rxjs.dev/api/operators/catchError
          Catches errors on the observable to be handled by returning a new observable or throwing an error (throw).
          The observable returned by the selector will continue the observable chain (in this case, throwError).

          It handles errors from the source observable, and maps them to a new observable.
          The error may also be rethrown, or a new error can be thrown to emit an error from the result.

          You catch errors and then decide how they should be handled further in the observable chain
          by either returning a new observable (e.g. throwError), retrying the source Observable
          or throwing an error (with throw).

          catchError returns a function that returns an Observable that either comes from the source
          (when throw is used in the source and you respond in catchError with another throw)
          or a new Observable returned from the selector function (everything in the callback () after catchError is the selector).
          Second argument for the callback is "caught", which returns the source Observable in case you want to retry.
        */
        catchError(this.handleError),
        tap(({ email, localId, idToken, expiresIn }) =>
          this.handleAuth(email, localId, idToken, +expiresIn)
        )
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(({ email, localId, idToken, expiresIn }) =>
          this.handleAuth(email, localId, idToken, +expiresIn)
        )
      );
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');
    if (!userData) return;

    const { email, id, _token, _tokenExpirationDate } = JSON.parse(userData);
    const loadedUser = new User(
      email,
      id,
      _token,
      new Date(_tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);

      // future expiration date - current date = difference = duration when the token expires.
      const expirationDuration =
        new Date(_tokenExpirationDate).getTime() - new Date().getTime();

      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('userData');

    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);

    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured.';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email was not found.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password.';
        break;
      default:
        errorMessage;
        break;
    }
    // Creates a simple Observable that emits no items to the Observer and immediately emits an error notification.
    return throwError(errorMessage);
  }
}
