import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Response {
  jwtToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.baseUrl + '/api/subadmins';

  constructor(private http: HttpClient, private router: Router) {}

  private loggedIn = false;

  login(data: { username: string; password: string }): void {
    this.http
      .post<{ jwtToken: string }>(`${this.apiUrl}/login`, data)
      .subscribe((response) => {
        localStorage.setItem('subadmin_token', response.jwtToken);
        this.router.navigate(['/subadmin/']);
        this.loggedIn = true;
      });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('subadmin_token') !== null;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('subadmin_token');
  }
}
