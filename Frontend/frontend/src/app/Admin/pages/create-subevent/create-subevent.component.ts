import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Location } from '@angular/common';
import { BackBtnComponent } from '../../components/reusable/back-btn/back-btn.component';

@Component({
  selector: 'app-create-subevent',
  standalone: true,
  imports: [
    SidebarComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    BackBtnComponent,
  ],
  templateUrl: './create-subevent.component.html',
  styleUrl: './create-subevent.component.css'
})
export class CreateSubeventComponent {

  constructor(private location: Location) { }

}
