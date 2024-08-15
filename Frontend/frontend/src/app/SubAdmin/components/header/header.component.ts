import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/subadmin-auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router, public authService:AuthService,private _snackBar: MatSnackBar){}

  handleLogin(){
    this.login();
  }
  handleLogout(){
    this.logout();
  }

  login() {
    this.authService.login("subadmin", "subadmin");
    this._snackBar.open("Subadmin Logged In", "OK");
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/subadmin/login']);
    this._snackBar.open("Logged Out", "OK");
  }
}
