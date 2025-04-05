// Path: src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'sessionToken';
  public isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
  private apiUrl = environment.apiUrl; // e.g., 'http://localhost:6000/graphql'

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  }

  login(credentials: { username: string; password: string }) {
    const query = `
      mutation {
        login(input: { username: "${credentials.username}", password: "${credentials.password}" }) {
          token
          user {
            id
            username
          }
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query }, { headers: this.getHeaders() });
  }

  signup(details: { username: string; password: string }) {
    const query = `
      mutation {
        signup(input: { username: "${details.username}", password: "${details.password}" }) {
          token
          user {
            id
            username
          }
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query }, { headers: this.getHeaders() });
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.isAuthenticated.next(true);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated.next(false);
  }
}
