import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationGuardService } from './authentication.guard.service';
import { AuthenticationService } from './authentication.service';
import { Role } from '../../../../library/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public authentication: AuthenticationService, public authGuard: AuthenticationGuardService, public router: Router) {
  }
  // this will be passed from the route config
  // decode the token to get its payload
  // on the data property
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole: Role = route.data.expectedRole;

    if (this.authentication.isAuthenticated() && this.authGuard.user?.role === expectedRole) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}