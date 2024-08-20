import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { CreateBtnComponent } from '../../../components/reusable/create-btn/create-btn.component';
import { CreateSubeventFormComponent } from '../../../components/reusable/create-subevent-form/create-subevent-form.component';
import { EventService } from '../../../services/event-service/event.service';
import { Event } from '../../../models/event.models';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [MatCardModule, CreateBtnComponent, CreateSubeventFormComponent],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css',
})
export class EventPageComponent implements OnInit {

  events:Event[] = [];
  constructor(private router: Router, private eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  eventName:string = 'example-event';
  eventId:string = '12345';

  navigateToEvent() {
    this.router.navigate(['/events', this.eventName], { queryParams: { id: this.eventId } });  
  }
  getEvents() {
    this.eventService.getEvents().pipe(
      switchMap(() => this.eventService.getEvents()),
      catchError(error => {
        console.error("Error fetching events:", error);
        return of([]);
      })
    ).subscribe((data: Event[]) => {
      this.events = data;
      console.log(this.events)
    });
  }
}
