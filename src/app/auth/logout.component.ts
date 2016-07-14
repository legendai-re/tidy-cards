import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  template: ''
})

export class LogoutComponent {

  constructor(public authService: AuthService, public router: Router) {
    this.authService.logout();
  }

}
