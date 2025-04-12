import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { API_ENDPOINTS } from '../core/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject for current user state
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing user from localStorage');
        localStorage.removeItem('currentUser');
      }
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(userData: { full_name: string; email: string; college_name?: string; phone?: string }): Observable<any> {
    return this.http.post(API_ENDPOINTS.AUTH.REGISTER, userData).pipe(
      tap((response: any) => {
        if (response.user && response.token) {
          this.storeUserAndToken(response.user, response.token);
        }
      }),
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(() => new Error(error.error?.message || 'Registration failed. Please try again.'));
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(API_ENDPOINTS.AUTH.LOGIN, credentials).pipe(
      tap((response: any) => {
        if (response.user && response.token) {
          this.storeUserAndToken(response.user, response.token);
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.error?.message || 'Login failed. Please check your credentials.'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('auth_token');
    this.currentUserSubject.next(null);
  }

  private storeUserAndToken(user: User, token: string): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('auth_token', token);
    this.currentUserSubject.next(user);
  }

  refreshToken(): Observable<any> {
    return this.http.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
      refreshToken: localStorage.getItem('refresh_token')
    }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
          if (response.refreshToken) {
            localStorage.setItem('refresh_token', response.refreshToken);
          }
        }
      }),
      catchError(error => {
        this.logout();
        return throwError(() => new Error('Session expired. Please login again.'));
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.currentUserValue;
  }

  updateUserProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(API_ENDPOINTS.USERS.UPDATE_PROFILE, userData).pipe(
      tap(updatedUser => {
        const currentUser = this.currentUserValue;
        if (currentUser) {
          const mergedUser = { ...currentUser, ...updatedUser };
          localStorage.setItem('currentUser', JSON.stringify(mergedUser));
          this.currentUserSubject.next(mergedUser);
        }
      })
    );
  }
}