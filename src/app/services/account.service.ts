import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../interfaces/login';
import { LoginResponse } from '../models/login';
import { Router } from '@angular/router';
import { catchError, map, of, ReplaySubject } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseURL = environment.baseURL;
  private currentUserSource = new ReplaySubject<LoginResponse | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(loginForm: any) {
    return this.http
      .post<ApiResponse<LoginResponse>>(`${this.baseURL}Account/login`, loginForm)
      .pipe(
        map((response) => {
          if (response.isSuccess && response.result) {
            this.setCurrentUser(response.result);
            return true;
          } else {
            alert(response.message || 'Login failed');
            return false;
          }
        }),
        catchError((error) => {
          // Handle HTTP errors gracefully
          alert('An error occurred during login');
          return of(false);
        })
      );
  }

  private setCurrentUser(user: LoginResponse): void {
    localStorage.setItem('user', btoa(JSON.stringify(user)));
    this.currentUserSource.next(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/login');
  }

  loadCurrentUser(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: LoginResponse = JSON.parse(atob(userJson));
      this.currentUserSource.next(user);
    }
  }

  getCurrentUser(): LoginResponse | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(atob(userJson)) as LoginResponse : null;
  }

  isUserAuthenticated(): boolean {
    const currentUser = this.getCurrentUser();
    console.log(currentUser)
    return currentUser !== null && !!currentUser.token;
  }
  
  
}
