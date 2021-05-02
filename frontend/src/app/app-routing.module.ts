import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { ControlComponent } from './components/control/control.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TestComponent } from './components/test/test.component';
import { AuthenticationGuardService } from './guards/authentication.guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuardService] },
  { path: 'control', component: ControlComponent, canActivate: [AuthenticationGuardService] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthenticationGuardService] },
  { path: 'config', component: ConfigurationComponent, canActivate: [AuthenticationGuardService] },
  { path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }