import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  // Replace this with your actual backend API URL
  private backendUrl = 'https://localhost:7131/api/Values/google';

  constructor(private http: HttpClient) { }

  // Method to handle Google login
  googleLogin(token: string): Observable<any> {
    return this.http.post(`${this.backendUrl}/google-login`, { token });
  }

  // Method to handle form-based login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.backendUrl}/login`, { email, password });
  }

  // Method to get the authenticated user's information
  getUserInfo(): Observable<any> {
    return this.http.get(`${this.backendUrl}/user-info`);
  }

  // Method to log out the user
  logout(): void {
    // Implement logout logic (e.g., clear tokens, redirect, etc.)
    // Example:
    // localStorage.removeItem('token');
    // this.router.navigate(['/login']);
  }
}
