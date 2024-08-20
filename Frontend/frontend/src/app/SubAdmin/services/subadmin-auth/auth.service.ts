import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';


interface Response {
  jwtToken: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baseUrl + "/api/subadmins";


  constructor(private http: HttpClient, private router: Router) { }

  private loggedIn = false;
  private token: string;


  login(data: { username: string, password: string }): void {
    this.http.post<{ jwtToken: string }>(`${this.apiUrl}/login`, data)
      .subscribe(response => {
        localStorage.setItem("subadmin_token", response.jwtToken);
        this.router.navigate(['/subadmin/']);
        this.token = response.jwtToken;
        this.loggedIn = true;
      });
  }




  isLoggedIn(): boolean {
    return localStorage.getItem("subadmin_token") === this.token;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem("subadmin_token");
  }

}
