import { Component } from '@angular/core';
import { LoginForm } from '../interfaces/login';
import { AccountService } from '../services/account.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cc-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginModel: any = {};

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  login(loginForm: NgForm): void {
    if (!loginForm.valid) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    this.accountService.login(this.loginModel).subscribe({
      next: (loginSuccess) => {
        if (loginSuccess) {
          const redirectUrl =
            this.route.snapshot.queryParamMap.get('redirectUrl');
          if (redirectUrl != null) {
            this.router.navigateByUrl(redirectUrl);
          } else {
            this.router.navigateByUrl('/dashboard');
          }
        }
      },
      error: () => {
        alert('An unexpected error occurred. Please try again later.');
      },
    });
  }
}
