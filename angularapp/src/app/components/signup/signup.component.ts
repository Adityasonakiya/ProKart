import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  passwordMismatch: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, this.isPasswordComplex]],
      confirmPassword: ['', Validators.required],
      userRole: ['user', Validators.required]  // Default role is set to 'user'
    });
  }

  register(): void {
    if (this.signupForm.invalid) {
      return;
    }

    const password = this.signupForm.get('password').value;
    const confirmPassword = this.signupForm.get('confirmPassword').value;

    if (password !== confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    const user: User = {
      username: this.signupForm.get('username').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      mobileNumber: this.signupForm.get('mobileNumber').value,
      userRole: this.signupForm.get('userRole').value
    };

    this.authService.register(user).subscribe(
      response => {
        console.log("*********registration.ts*********");
        console.log(response);
        this.toastr.success('Registration successful!', 'Success');
        this.router.navigate(['/login']);
      },
      error => {
        if (error.status === 409 && error.error) {
          this.toastr.error(error.error, 'Error');
        } else {
          this.toastr.error('An unexpected error occurred', 'Error');
        }
        console.log("************Error***************");
        console.log(error);
        // this.router.navigate(['/error']); 
      }
    );
  }

  isPasswordComplex(control): { [key: string]: boolean } | null {
    const password: string = control.value;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password);

    if (hasUppercase && hasLowercase && hasDigit && hasSpecialChar) {
      return null;
    }

    return { passwordComplexity: true };
  }
}
