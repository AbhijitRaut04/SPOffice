import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
// import { CreateBtnComponent } from '../../../components/reusable/create-btn/create-btn.component';
// import { CreateSubeventFormComponent } from '../../../components/reusable/create-subevent-form/create-subevent-form.component';
// import { EventService } from '../../../services/event-service/event.service';
// import { Event } from '../../../models/event.models';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CreateBtnComponent } from '../../components/reusable/create-btn/create-btn.component';
import { CreateSubeventFormComponent } from '../../components/reusable/create-subevent-form/create-subevent-form.component';
import { EventService } from '../../services/event-service/event.service';
import { Event } from '../../models/event.models';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [
    MatCardModule,
    CreateBtnComponent,
    CreateSubeventFormComponent,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css',
})
export class EventPageComponent implements OnInit {
  events: Event[] = [];
  constructor(private router: Router, private eventService: EventService) {}

  isLoading: boolean = true;

  ngOnInit(): void {
    this.getEvents();
  }

  addEvent() {
    this.router.navigate(['/events/create-event']);
  }

  navigateToEvent(event: Event) {
    this.router.navigate(
      ['/events', event.eventname.toLowerCase().replaceAll(' ', '-')],
      { state: { event } }
    );
  }
  getEvents() {
    this.isLoading = true;
    this.eventService
      .getEvents()
      .pipe(
        switchMap(() => this.eventService.getEvents()),
        catchError((error) => {
          console.error('Error fetching events:', error);
          return of([]);
        })
      )
      .subscribe((data: Event[]) => {
        this.events = data;
        console.log(this.events);
      });
    this.isLoading = false;
  }
}
