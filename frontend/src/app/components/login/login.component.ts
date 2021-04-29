import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Role } from '../../../../../library/models/role.model';
import { User } from '../../../../../library/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loginButtonDisabled: boolean;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {
    this.loginButtonDisabled = false;
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // login user
  public async loginAsync(): Promise<void> {
    this.loginButtonDisabled = true;
    const user: User = { id: "", name: this.loginForm.controls.name.value, password: this.loginForm.controls.password.value, role: Role.User };
    await this.loginService.createLoginSessionAsync(user);
    this.loginButtonDisabled = false;
  }

  ngOnInit(): void {
  }
}