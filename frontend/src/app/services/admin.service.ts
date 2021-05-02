import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../library/models/user.model'
import { MessageService } from 'primeng/api';
import { HistoryService } from './history.service';
import { Activity } from '../../../../library/models/activity.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private messageService: MessageService, public historyService: HistoryService, public loginService: LoginService) { }

  // gets users
  public async getUsersAsync(): Promise<User[]> {
    let users: User[] = [];
    await this.http.get<User[]>('http://localhost:3000/users').toPromise().then((response) => {
      users = response;
    }).catch((error) => this.messageService.add({ key: 'requestUsersError', severity: 'error', summary: 'Error', detail: 'Listing users not possible' }));
    return users;
  }

  public async updateUserAsync(user: User): Promise<boolean> {
    let isUpdated: boolean = false;
    await this.http.put('http://localhost:3000/users/' + user.id, user).toPromise().then(async (response: any) => {
      await this.historyService.createLogMessageAsync({ id: "", date: new Date(), type: Activity.User, user: this.loginService.user!, message: "Updated user" });
      this.messageService.add({ key: 'userUpdateSuccess', severity: 'success', summary: 'Success', detail: 'User update was successful' });
      isUpdated = true;
    }).catch((error) => this.messageService.add({ key: 'userUpdateError', severity: 'error', summary: 'Error', detail: 'User update not possible' }));
    return isUpdated;
  }

  // deletes user
  public async deleteUserAsync(user: User): Promise<boolean> {
    let isDeleted: boolean = false;
    await this.http.delete('http://localhost:3000/users/' + user.id).toPromise().then(async (response: any) => {
      await this.historyService.createLogMessageAsync({ id: "", date: new Date(), type: Activity.User, user: this.loginService.user!, message: "Deleted user" });
      this.messageService.add({ key: 'userDeletionSuccess', severity: 'success', summary: 'Success', detail: 'User deletion was successful' });
      isDeleted = true;
    }).catch((error) => this.messageService.add({ key: 'userDeletionError', severity: 'error', summary: 'Error', detail: 'User deletion not possible' }));
    return isDeleted;
  }
}
