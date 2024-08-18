import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../services/admin-auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgFor, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showDialog: boolean = true;

  navElements = [
    { img: 'https://cdn-icons-png.flaticon.com/128/1946/1946488.png', title: 'Home', active: true, path: '/' },
    { img: 'https://cdn-icons-png.flaticon.com/128/3503/3503827.png', title: 'Events', active: false, path: '/events' },
    { img: 'https://cdn-icons-png.flaticon.com/128/1077/1077063.png', title: 'SubAdmins', active: false, path: '/subadmins' },
    { img: 'https://cdn-icons-png.flaticon.com/128/833/833593.png', title: 'Requests', active: false, path: '/requests' },
    { img: 'https://cdn-icons-png.flaticon.com/128/1286/1286853.png', title: 'Login', active: false, path: '/' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService, // Inject AuthService
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.updateNavElements();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.showDialog = window.innerWidth > 500;
  }

  handleClick(index: number) {
    this.navElements.forEach((element, i) => element.active = i === index);
    this.router.navigate([this.navElements[index].path]);
    if(window.innerWidth < 500) this.showDialog = false;

    if (index === 4) {
      this.authService.isLoggedIn() ? this.logout() : this.login();
    }
  }

  login() {
    this.authService.login("admin", "admin");
    this.updateNavElements();
    this._snackBar.open("User Logged In", "OK",
      {
        duration:5000
      }
    );
  }

  logout() {
    this.authService.logout();
    this.updateNavElements();
    this._snackBar.open("Logged Out", "OK",
      {
        duration:5000
      }
    );
  }

  private updateNavElements() {
    this.navElements[4].title = this.authService.isLoggedIn() ? 'Logout' : 'Login';
  }


}
