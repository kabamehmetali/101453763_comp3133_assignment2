// Path: src/app/components/signup/signup.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) return;
    this.authService.signup(this.signupForm.value as { username: string; password: string }).subscribe({
      next: (res) => {
        if (res.data && res.data.signup && res.data.signup.token) {
          this.authService.setToken(res.data.signup.token);
          this.router.navigate(['/employees']);
        } else {
          this.errorMessage = 'Signup failed.';
        }
      },
      error: () => {
        this.errorMessage = 'Signup error.';
      }
    });
  }
}
