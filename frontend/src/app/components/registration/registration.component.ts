import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';
import { Role } from '../../../../../library/models/role.model';
import { User } from '../../../../../library/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registerForm: FormGroup;
  public registerButtonDisabled: boolean;

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService) {
    this.registerButtonDisabled = false;
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // register user
  public async registerAsync(): Promise<void> {
    this.registerButtonDisabled = true;
    const user: User = { id: "", name: this.registerForm.controls.name.value, password: this.registerForm.controls.password.value, role: Role.User };
    await this.registrationService.createUserAsync(user);
    this.registerButtonDisabled = false;
  }

  ngOnInit(): void {
  }
}
