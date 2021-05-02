import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../library/models/user.model'
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Activity } from '../../../../library/models/activity.model';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user: User | null;

  public isLoggedIn: boolean;

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService, public historyService: HistoryService) {
    this.user = null;
    this.isLoggedIn = false;
  }

  // creates login session
  public async createLoginSessionAsync(loginData: User): Promise<void> {
    await this.http.post('http://localhost:3000/login', loginData).toPromise().then(async (response: any) => {
      this.user = response;
      this.isLoggedIn = true;
      await this.historyService.createLogMessageAsync({ id: "", date: new Date(), type: Activity.User, user: loginData!, message: "Login session created" });
      this.router.navigate(['/home']);
    }).catch((error) => this.messageService.add({ key: 'loginError', severity: 'error', summary: 'Error', detail: 'Login not possible' }));
  }

  public async logoutAsync() {
    await this.historyService.createLogMessageAsync({ id: "", date: new Date(), type: Activity.User, user: this.user!, message: "Login session stopped" });
    this.user = null;
    this.isLoggedIn = false;
  }
}
