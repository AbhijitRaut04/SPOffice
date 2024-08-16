import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CreateBtnComponent } from '../../components/reusable/create-btn/create-btn.component';
import { CreateEventFormComponent } from '../../components/reusable/create-event-form/create-event-form.component';
import { CreateSubeventFormComponent } from '../../components/reusable/create-subevent-form/create-subevent-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { BackBtnComponent } from '../../components/reusable/back-btn/back-btn.component';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    SidebarComponent,
    CreateBtnComponent,
    CreateEventFormComponent,
    CreateSubeventFormComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    BackBtnComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEventComponent {

  constructor(private router: Router) { }

  
  navigateToCreateEvent() {
    console.log("+ button clicked!");
    this.router.navigate(['events/create/subevent']);
  }
}
