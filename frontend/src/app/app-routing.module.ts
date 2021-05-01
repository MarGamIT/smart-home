import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Role } from '../../../library/models/role.model';
import { AdminComponent } from './components/admin/admin.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { ControlComponent } from './components/control/control.component';
import { HistoryComponent } from './components/history/history.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthenticationGuardService } from './guards/authentication.guard.service';
import { RoleGuardService } from './guards/role-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'control', component: ControlComponent, canActivate: [AuthenticationGuardService] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthenticationGuardService] },
  { path: 'config', component: ConfigurationComponent, canActivate: [AuthenticationGuardService] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthenticationGuardService], data: { expectedRole: Role.User } },
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuardService], data: { expectedRole: Role.Admin } },
  { path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }