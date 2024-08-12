import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  login(username: string, password: string): boolean {
    
    if (username === 'admin' && password === 'admin') {
      this.loggedIn = true;
      localStorage.setItem("admin","token");
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("admin") === "token";
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem("admin");
  }
}
