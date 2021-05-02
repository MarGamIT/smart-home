import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/services/login.service';

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

  public async signOut(): Promise<void> {
    await this.loginService.logoutAsync();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Control', icon: 'pi pi-fw pi-eye', routerLink: '/control' },
      { label: 'Configuration', icon: 'pi pi-fw pi-cog', routerLink: '/config' },
      { label: 'History', icon: 'pi pi-fw pi-book', routerLink: '/history' },
    ];
  }
}