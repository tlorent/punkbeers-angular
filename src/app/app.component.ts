import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }

  prepareRoute(outlet: RouterOutlet) {
    /*
      Take the value of the outlet directive
      and return a string value representing the state
      of the animation based on the custom data
      of the current active route.
    */
    return outlet?.activatedRouteData?.animation;
  }
}
