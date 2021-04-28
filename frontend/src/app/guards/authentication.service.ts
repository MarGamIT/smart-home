import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public loginService: LoginService) {
  }

  public isAuthenticated(): boolean {
    return this.loginService.isLoggedIn;
    // Check whether the token is expired and return
    // const token = localStorage.getItem('token');
    // return !this.jwtHelper.isTokenExpired(token!);
  }
}