import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BackBtnComponent } from '../../../../components/reusable/back-btn/back-btn.component';
import { CreateAreaFormComponent } from '../../../../components/reusable/create-area-form/create-area-form.component';

@Component({
  selector: 'app-create-location',
  standalone: true,
  imports: [
    SidebarComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    BackBtnComponent,
    CreateAreaFormComponent,
  ],
  templateUrl: './create-location.component.html',
  styleUrl: './create-location.component.css',
})
export class CreateLocationComponent {}
