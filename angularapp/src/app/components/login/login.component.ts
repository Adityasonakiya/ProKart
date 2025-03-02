import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/login.model';
import { AuthUser } from 'src/app/models/AuthUser.model';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  authUser: AuthUser;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: UserStoreService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill in the form correctly.', 'Error');
      return;
    }

    const credentials: Login = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };

    this.authService.login(credentials).subscribe(
      (authUser: AuthUser) => {
        const userRole = authUser.role;
        this.toastr.success('Login successful!', 'Success');
        console.log('role ...  ' + userRole);

        this.store.saveUser(authUser);

        if (userRole === 'admin' || userRole === 'user') {
          this.router.navigate(['/home-page']);
        } else {
          this.error = 'Invalid user role';
          this.toastr.error(this.error, 'Error');
        }
      },
      error => {
        this.error = 'Login failed. Please check your email and password.';
        this.toastr.error(this.error, 'Error');
      }
    );
  }

  signOut(): void {
    this.store.clear();
    this.toastr.success('Signed out successfully', 'Success');
    this.router.navigate(['/home']);
  }
}
