import { Component, OnInit } from '@angular/core';
import { AuthenticationGuardService } from 'src/app/guards/authentication.guard.service';
import { Role } from '../../../../../library/models/role.model';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  public adminRole:Role = Role.Admin;
  public userRole:Role = Role.User;

  constructor(public authGuard: AuthenticationGuardService) { }

  ngOnInit(): void {
  }

}