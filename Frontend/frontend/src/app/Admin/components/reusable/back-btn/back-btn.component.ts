import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-back-btn',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './back-btn.component.html',
  styleUrl: './back-btn.component.css',
})
export class BackBtnComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
