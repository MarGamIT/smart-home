import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbstractLogger } from '../../../library/services/abstract-logger';
import { ConsoleLoggerService } from '../../../library/services/console-logger.service';
import { LoginService } from './services/login.service';
import { RegistrationService } from './services/registration.service';
import { AuthenticationGuardService } from './guards/authentication.guard.service';
import { AuthenticationService } from './guards/authentication.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AdminComponent } from './components/admin/admin.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ControlComponent } from './components/control/control.component';
import { ProfileComponent } from './components/profile/profile.component';

import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { ChartModule } from 'primeng/chart';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { ColorPickerModule } from 'primeng/colorpicker';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ControlComponent,
    PageNotFoundComponent,
    NavigationComponent,
    AdminComponent,
    ProfileComponent,
    HistoryComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputNumberModule,
    SelectButtonModule,
    BrowserModule,
    AppRoutingModule,
    DialogModule,
    AvatarModule,
    ChartModule,
    SharedModule,
    MenubarModule,
    TableModule,
    InputSwitchModule,
    ToastModule,
    ToggleButtonModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    KeyFilterModule,
    RippleModule,
    TooltipModule,
    DropdownModule,
    ColorPickerModule
  ],
  providers: [
    {
      provide: AbstractLogger,
      useClass: ConsoleLoggerService
    },
    LoginService,
    RegistrationService,
    MessageService,
    AuthenticationService,
    AuthenticationGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
