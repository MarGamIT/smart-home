import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/services/login.service';
import { Role } from '../../../../../library/models/role.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public items: MenuItem[];

  constructor(private router: Router, private loginService: LoginService) {
    this.items = [];
  }

  ngOnInit(): void {

    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/home' },
      { label: 'Control Panel', icon: 'pi pi-fw pi-sliders-h', routerLink: '/controlpanel' },
      {
        label: 'Profile', icon: 'pi pi-fw pi-user', items: [
          { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: '/profile' },
          {
            label: 'Sign out', icon: 'pi pi-fw pi-sign-out', command: async () => {
              await this.loginService.logoutAsync();
              this.router.navigate(['/login']);
            }
          }
        ]
      }];

    if (this.loginService.user?.role === Role.Admin) {
      this.items.push({ label: 'Admin', icon: 'pi pi-fw pi-users', routerLink: '/admin' });
    }
  }
}
