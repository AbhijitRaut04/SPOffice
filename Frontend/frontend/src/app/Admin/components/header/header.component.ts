import { Component, HostListener } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { jsPDF } from 'jspdf'
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgFor, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  showDialog: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {}


  navElements = [
    { img: 'https://cdn-icons-png.flaticon.com/128/1946/1946488.png', title: 'Home', active: true, path:'/' },
    { img: 'https://cdn-icons-png.flaticon.com/128/3503/3503827.png', title: 'Events', active: false, path:'/events' },
    { img: 'https://cdn-icons-png.flaticon.com/128/1077/1077063.png', title: 'SubAdmins', active: false, path:'/subadmins' },
    { img: 'https://cdn-icons-png.flaticon.com/128/833/833593.png', title: 'Requests', active: false, path:'/requests' },
    { img: 'https://cdn-icons-png.flaticon.com/128/1286/1286853.png', title: 'Logout', active: false, path:'/' }
  ];

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth > 500) {
      this.showDialog = true;
    }
    else {
      this.showDialog = false;
    }
  }


  handleClick(index: number){
    this.navElements.forEach((element, i) => element.active = i === index);
    this.router.navigate([this.navElements[index].path]);
  }

}
