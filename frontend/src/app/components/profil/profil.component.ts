import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ProfilService } from 'src/app/services/profil.service';
import { Role } from '../../../../../library/models/role.model';
import { User } from '../../../../../library/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public user: User | null;
  public editedUser: User | null;
  public editUserButtonDisabled: boolean;
  public profileDialog: boolean;

  constructor(private profilService: ProfilService, private loginService: LoginService) {
    this.profileDialog = false;
    this.editedUser = null;
    this.user = null;
    this.editUserButtonDisabled = false;
  }

  ngOnInit(): void {
    this.user = this.loginService.user;
  }

  // edits user
  public async editUserAsync(user: User | null): Promise<void> {
    this.editUserButtonDisabled = true;
    this.editedUser = JSON.parse(JSON.stringify(user));
    this.profileDialog = true;
  }

  public hideDialog(): void {
    this.profileDialog = false;
    this.editUserButtonDisabled = false;
  }

  public async saveUserAsync() {
    if (!this.editedUser) {
      return;
    }

    const updatedUser = {
      id: this.editedUser.id,
      name: this.editedUser.name ? this.editedUser.name : '',
      password: this.editedUser.password,
      role: Role.User
    };

    const updated: boolean = await this.profilService.updateUserAsync(updatedUser);

    if (updated) {
      this.user = updatedUser;
      this.loginService.user = updatedUser;
      this.profileDialog = false;
      this.editedUser = null;
    }

    this.editUserButtonDisabled = false;
  }
}