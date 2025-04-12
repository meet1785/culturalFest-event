import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { API_ENDPOINTS } from '../core/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Make currentUserSubject protected instead of private to be accessible in EditProfileComponent
  protected currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  private getUserFromStorage(): User | null {
    const userString = localStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${API_ENDPOINTS.USERS}`, user).pipe(
      tap(user => {
        this.storeUserData(user);
      }),
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(() => new Error('Registration failed. Please try again.'));
      })
    );
  }

  login(email: string): Observable<User> {
    return this.http.get<User>(`${API_ENDPOINTS.USERS}/${email}`).pipe(
      tap(user => {
        this.storeUserData(user);
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed. Email not found.'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  private storeUserData(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    // For simplicity, we're using email as a token
    // In a real app, you should implement proper JWT handling
    localStorage.setItem('token', user.email);
    this.currentUserSubject.next(user);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Method to update user data
  public updateUserInStorage(user: User): void {
    // Update user in local storage
    localStorage.setItem('currentUser', JSON.stringify(user));
    // Update the user in the behavior subject
    this.currentUserSubject.next(user);
  }
}