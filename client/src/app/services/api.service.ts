import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5004/api';
  private jwtToken = signal<string | null>(null);

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('token');
    if (saved) this.jwtToken.set(saved);
  }

  token() {
    return this.jwtToken();
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, {
      email,
      password,
    });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.jwtToken.set(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.jwtToken.set(null);
  }

  getSchedule() {
    return this.http.get<Record<string, string>>(`${this.baseUrl}/schedule`, {
      headers: { Authorization: `Bearer ${this.token()}` },
    });
  }

  updateSchedule(schedule: Record<string, string>) {
    return this.http.put(`${this.baseUrl}/schedule`, schedule, {
      headers: { Authorization: `Bearer ${this.token()}` },
    });
  }

  checkAccess() {
    return this.http.get(`${this.baseUrl}/check-access`);
  }
}
