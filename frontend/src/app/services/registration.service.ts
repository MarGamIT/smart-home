import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../../../../library/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) { }

  // creates user
  public async createUserAsync(registrationData: User): Promise<void> {
    await this.http.post('http://localhost:3000/users', registrationData).toPromise().then((response: any) => {
      this.messageService.add({ key: 'registrationSuccess', severity: 'success', summary: 'Success', detail: 'Registration was successful' })
    }).catch((error) => this.messageService.add({ key: 'registrationError', severity: 'error', summary: 'Error', detail: 'Registration not possible' }));
  }
}