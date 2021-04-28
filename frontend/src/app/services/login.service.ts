import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../library/models/user.model'
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user: User | null;

  public isLoggedIn: boolean;

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {
    this.user = null;
    this.isLoggedIn = false;
  }

  // creates login session
  public async createLoginSessionAsync(loginData: User): Promise<void> {
    await this.http.post('http://localhost:3000/login', loginData).toPromise().then((response: any) => {
      this.user = response;
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }).catch((error) => this.messageService.add({ key: 'loginError', severity: 'error', summary: 'Error', detail: 'Login not possible' }));
  }

  public async logoutAsync() {
    this.user = null;
    this.isLoggedIn = false;
  }
}
