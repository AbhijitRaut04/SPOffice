import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BackBtnComponent } from '../../../../components/reusable/back-btn/back-btn.component';
import { CreateSubeventFormComponent } from '../../../../components/reusable/create-subevent-form/create-subevent-form.component';
import { CreateAreaFormComponent } from '../../../../components/reusable/create-area-form/create-area-form.component';

@Component({
  selector: 'app-create-area',
  standalone: true,
  imports: [
    SidebarComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    BackBtnComponent,
    CreateSubeventFormComponent,
    CreateAreaFormComponent,
  ],
  templateUrl: './create-area.component.html',
  styleUrl: './create-area.component.css',
})
export class CreateAreaComponent {}
