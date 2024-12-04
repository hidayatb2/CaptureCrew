import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AccountService } from '../services/account.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject dependencies
  const accountService = inject(AccountService);
  const router = inject(Router);

  // Get the current user and token
  const currentUser = accountService.getCurrentUser();

  // If the user has a token, clone the request and set the Authorization header
  if (currentUser?.Token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.Token}`,
      },
    });
  }

  // Handle the request and catch any errors
  return next(req).pipe(
    catchError((err: any) => {
      if (err.status === 401) {
        // If unauthorized, redirect to login
        router.navigate(['/login']);
      } else if (err.status === 403 || err.status >= 500) {
        // Logout user in case of forbidden or server errors
        accountService.logout();
      }

      // Re-throw the error to pass it further down the chain
      return throwError(() => err);
    })
  );
};
