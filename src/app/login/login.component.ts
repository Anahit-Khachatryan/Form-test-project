import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink, NgClass,JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm: FormGroup;
    authService = inject(AuthService)

    constructor(private formBuilder: FormBuilder) {
      this.loginForm = this.formBuilder.group({
         email: ['', [Validators.required, Validators.email]],
         password: ['', [Validators.required, Validators.minLength(6)]]
      })
    }

    onLogin() {
      console.log(15, this.loginForm)
      if (this.loginForm.valid) {
        this.authService.login(this.loginForm.value)
        this.loginForm.disable();
      }
    }
}
