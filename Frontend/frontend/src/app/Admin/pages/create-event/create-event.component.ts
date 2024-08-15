import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CreateBtnComponent } from '../../components/reusable/create-btn/create-btn.component';
import { CreateEventFormComponent } from '../../components/reusable/create-event-form/create-event-form.component';
import { CreateSubeventFormComponent } from '../../components/reusable/create-subevent-form/create-subevent-form.component';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    SidebarComponent,
    CreateBtnComponent,
    CreateEventFormComponent,
    CreateSubeventFormComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEventComponent {}
