import { Injectable }             from '@angular/core';
import { CanActivate,
         Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { AuthService }            from './auth.service';

@Injectable()
export class GrantedAnonymous implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next:  ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isLoggedIn) { return true; }
    this.router.navigate(['/']);
    return false;
  }
}

@Injectable()
export class GrantedUser implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next:  ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ( this.authService.isLoggedIn ) { return true; }
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable()
export class GrantedAdmin implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next:  ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ( this.authService.isLoggedIn && this.authService.currentUser.isGranted('ROLE_ADMIN') ) { return true; }
    this.router.navigate(['/']);
    return false;
  }
}

@Injectable()
export class HomeGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next:  ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ( this.authService.isLoggedIn ) {
      this.router.navigate(['/dashboard']);
    }
    if ( !this.authService.isLoggedIn ) {
      this.router.navigate(['/c/last']);
    }
    return false;
  }
}
