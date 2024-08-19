import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;


  private apiUrl = environment.baseUrl + "/api/admins";

  constructor(private http: HttpClient, private router: Router) { }

  private token: string;

  login(data: { username: string, password: string }): void {
    this.http.post<{ jwtToken: string }>(`${this.apiUrl}/login`, data)
      .subscribe(response => {
        localStorage.setItem("admin_token", response.jwtToken);
        this.router.navigate(['/']);
        this.token = response.jwtToken;
        this.loggedIn = true;
      });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("admin_token") !== null;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem("admin_token");
  }
}
