import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Role } from '../../../library/models/role.model';
import { AdminComponent } from './components/admin/admin.component';
import { ControlComponent } from './components/control/control.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthenticationGuardService } from './guards/authentication.guard.service';
import { RoleGuardService } from './guards/role-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'controlpanel', component: ControlComponent },
  // { path: 'controlpanel', component: ControlComponent, canActivate: [AuthenticationGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuardService] },
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuardService], data: { expectedRole: Role.Admin } },
  { path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }