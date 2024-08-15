import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private loggedIn = false;

  login(username: string, password: string): boolean {
    
    if (username === 'subadmin' && password === 'subadmin') {
      this.loggedIn = true;
      localStorage.setItem("subadmin","token");
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("subadmin") === "token";
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem("subadmin");
  }

}
