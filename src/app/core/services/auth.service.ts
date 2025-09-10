import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';


// Placeholder interfaces for request payloads
interface LoginCredentials {
  email: string;
  password?: string; // Optional for SSO
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/auth';

  // In a real app, the token would be stored securely (e.g., HttpOnly cookie)
  private token: string | null = null;

  /**
   * @description Handles user login via email/password or SSO.
   * On success, it stores the token.
   */
  login(credentials: LoginCredentials): Observable<{ token: string, user: User }> {
    // Replace with actual API call
    // return this.http.post<{ token: string, user: User }>(`${this.apiUrl}/login`, credentials).pipe(
    //   tap(response => this.token = response.token)
    // );
    console.log('AuthService: Simulating login for', credentials.email);
    const mockUser: User = {
      id: 'user-123',
      companyId: 'comp-456',
      email: credentials.email,
      role: 'employee',
      profileData: { firstName: 'John', lastName: 'Doe' },
      lastLogin: new Date(), createdAt: new Date(), updatedAt: new Date()
    };
    return of({ token: 'mock-jwt-token', user: mockUser }).pipe(
      tap(response => this.token = response.token)
    );
  }

  /**
   * @description Handles the company registration process.
   * Sends company data and legal documents as multipart/form-data.
   */
  registerCompany(formData: FormData): Observable<{ message: string }> {
    // In a real implementation, you would post the FormData
    // return this.http.post<{ message: string }>(`${this.apiUrl}/register-company`, formData);
    console.log('AuthService: Simulating company registration for', formData.get('companyName'));
    return of({ message: 'Registration submitted for approval.' });
  }

  /**
   * @description Fetches the profile for the currently authenticated user.
   */
  getProfile(): Observable<User> {
    // This would fetch user data using the stored token
    // return this.http.get<User>(`${this.apiUrl}/profile`);
    console.log('AuthService: Simulating profile fetch.');
    const mockUser: User = {
      id: 'user-123',
      companyId: 'comp-456',
      email: 'john.doe@company.com',
      role: 'employee',
      profileData: { firstName: 'John', lastName: 'Doe', phone: '123-456-7890' },
      lastLogin: new Date(), createdAt: new Date(), updatedAt: new Date()
    };
    return of(mockUser);
  }

  /**
   * @description Updates the user's profile data.
   */
  updateProfile(profileData: Partial<User['profileData']>): Observable<User> {
    // return this.http.patch<User>(`${this.apiUrl}/profile`, { profileData });
    console.log('AuthService: Simulating profile update with', profileData);
    const mockUser: User = {
      id: 'user-123',
      companyId: 'comp-456',
      email: 'john.doe@company.com',
      role: 'employee',
      profileData: { firstName: 'John', lastName: 'Doe', ...profileData },
      lastLogin: new Date(), createdAt: new Date(), updatedAt: new Date()
    };
    return of(mockUser);
  }

  /**
   * @description Logs the user out by clearing the token.
   */
  logout(): void {
    console.log('AuthService: Logging out.');
    this.token = null;
    // In a real app, you might also call a backend endpoint to invalidate the session.
  }

  /**
   * @description A simple check to see if a token exists.
   */
  isAuthenticated(): boolean {
    return !!this.token;
  }
}
