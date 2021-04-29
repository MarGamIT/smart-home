import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public items: MenuItem[];

  constructor(private router: Router) {
    this.items = [];
  }

  public signOut(): void {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Control', icon: 'pi pi-fw pi-eye', routerLink: '/control' },
      { label: 'Configuration', icon: 'pi pi-fw pi-cog', routerLink: '/config' },
      { label: 'History', icon: 'pi pi-fw pi-book', routerLink: '/history' }];
  }

}