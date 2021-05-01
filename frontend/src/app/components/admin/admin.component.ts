import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from '../../../../../library/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public users: User[];
  public deleteUserButtonDisabled: boolean;

  public editUserButtonDisabled: boolean;
  public editedUser: User | null;
  public userDialog: boolean;
  //public roles = [Role.Admin, Role.User];
  public roles = [{ role: "Admin" }, { role: "User" }];

  constructor(private adminService: AdminService, private loginServices: LoginService) {
    this.users = [];
    this.deleteUserButtonDisabled = false;
    this.editUserButtonDisabled = false;
    this.editedUser = null;
    this.userDialog = false;
  }

  public async saveUserAsync() {
    if (!this.editedUser) {
      return;
    }

    const updatedUser: User = {
      id: this.editedUser.id,
      name: this.editedUser.name,
      role: this.editedUser.role,
      password: this.editedUser.password
    };

    const isUpdated: boolean = await this.adminService.updateUserAsync(updatedUser);

    if (isUpdated) {
      this.users[this.findIndexById(updatedUser.id)] = updatedUser;
      this.users = [...this.users];
      this.userDialog = false;
      this.editedUser = null;
    }

    this.editUserButtonDisabled = false;
  }

  // edits entry
  public async editUserAsync(entry: User): Promise<void> {
    this.editUserButtonDisabled = true;
    this.editedUser = { ...entry };
    this.userDialog = true;
  }

  public findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  public hideDialog(): void {
    this.userDialog = false;
    this.editUserButtonDisabled = false;
  }

  // deletes user
  public async deleteUserAsync(user: User): Promise<void> {
    this.deleteUserButtonDisabled = true;
    const isDeleted: boolean = await this.adminService.deleteUserAsync(user);

    if (isDeleted) {
      this.users = this.users.filter(value => value.id != user.id);
    }

    this.deleteUserButtonDisabled = false;
  }

  async ngOnInit(): Promise<void> {
    if (this.loginServices.user) {
      this.users = await this.adminService.getUsersAsync();
    }
  }
}