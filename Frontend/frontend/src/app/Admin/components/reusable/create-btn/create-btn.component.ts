import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';


@Component({
  selector: 'app-create-btn',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule],
  templateUrl: './create-btn.component.html',
  styleUrl: './create-btn.component.css'
})
export class CreateBtnComponent {

  constructor( private router: Router) {}

  
  navigateToCreateEvent() {
    console.log("+ button clicked!");
    this.router.navigate(['events/create']);
  }
}
