import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UnsubscribeOnDestroyAdapter } from '../unsubscribe-on-destroy-adapter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.subs.sink = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onLogOut() {
    this.authService.logout();
  }
}
