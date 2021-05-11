import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;

        if (isAuth) {
          return true;
        } else {
          // If the user is not authenticated, redirect them to the homepage if they visit a blacklisted page.
          return this.router.createUrlTree(['/']);
        }
      })
    );
  }
}
