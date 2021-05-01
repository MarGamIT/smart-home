import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from '../../../../library/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  // updates user
  public async updateUserAsync(user: User): Promise<boolean> {
    let updated: boolean = false;
    await this.http.put('http://localhost:3000/users/' + user.id, user).toPromise().then((response: any) => {
      this.messageService.add({ key: 'userUpdateSuccess', severity: 'success', summary: 'Success', detail: 'User update was successful' });
      updated = true;
    }).catch((error) => this.messageService.add({ key: 'userUpdateError', severity: 'error', summary: 'Error', detail: 'User update not possible' }));
    return updated;
  }
}