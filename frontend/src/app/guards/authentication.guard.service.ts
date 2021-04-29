import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '../../../../library/models/user.model';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationGuardService implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }

  public user: User | null = null;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.loginService.isLoggedIn) {
      this.user = this.loginService.user;
      return true;
    }
    // this.router.navigate(['login']);
    return this.router.createUrlTree(["login"]);
  }
}