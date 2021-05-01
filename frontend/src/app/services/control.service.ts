import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Home } from '../../../../library/models/home.model';
import { HistoryService } from './history.service';
import { Activity } from '../../../../library/models/activity.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  public home: Home | null;

  constructor(private http: HttpClient, private messageService: MessageService, public historyService: HistoryService, public loginService: LoginService) {
    this.home = null;
  }

  // creates home
  public async createHomeAsync(homeData: Home): Promise<Home | null> {
    let home: Home | null = null;
    await this.http.post('http://localhost:3000/home', homeData).toPromise().then(async (response: any) => {
      await this.historyService.createLogMessageAsync({ id: "", date: new Date(), type: Activity.Config, user: this.loginService.user!, message: "Home added" });
      this.messageService.add({ key: 'homeCreationSuccess', severity: 'success', summary: 'Success', detail: 'Home creation was successful' });
      home = response;
    }).catch((error) => this.messageService.add({ key: 'homeCreationError', severity: 'error', summary: 'Error', detail: 'Home creation not possible' }));
    return home;
  }

  // Get 
  public async getHomeAsync(): Promise<Home | null> {
    await this.http.get<Home>('http://localhost:3000/home').toPromise().then((response) => {
      this.home = response;
    }).catch((error) => this.messageService.add({ key: 'requestHomeError', severity: 'error', summary: 'Error', detail: 'Listing home not possible' }));

    return this.home;
  }

  // updates home
  public async updateHomeAsync(home: Home): Promise<boolean> {
    let updated: boolean = false;
    await this.http.put('http://localhost:3000/home/' + home.id, home).toPromise().then(async (response: any) => {
      await this.historyService.createLogMessageAsync({ id: "", date: new Date(), type: Activity.Config, user: this.loginService.user!, message: "Home updated" });
      this.messageService.add({ key: 'homeUpdateSuccess', severity: 'success', summary: 'Success', detail: 'Home update was successful' });
      updated = true;
    }).catch((error) => this.messageService.add({ key: 'homeUpdateError', severity: 'error', summary: 'Error', detail: 'Home update not possible' }));
    return updated;
  }
}
