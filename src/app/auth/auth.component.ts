import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

// const observer = {
//   next: (x: AuthDataResponse) => console.log(x),
//   error: (err: string | null) => {
//     console.log(err);
//   },
//   complete: () => console.log('Observer got a complete notification'),
// };

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const { email, password } = form.value;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      // https://rxjs.dev/guide/observer
      /*
        An Observer is a consumer of values delivered by an Observable.
        Observers are simply a set of callbacks, one for each type of notification
        delivered by the Observable: next, error, and complete.
        Observers are just objects with three callbacks, one for each type of notification that an Observable may deliver.
      */
      () => {
        this.router.navigate(['/beers']);
      },
      // error callback sends a JS error or throws an exception.
      (errorMsg: string) => {
        this.error = errorMsg;
      }
    );

    form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.error = null;
  }
}
