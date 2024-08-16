import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { CreateBtnComponent } from '../../components/reusable/create-btn/create-btn.component';
import { CreateSubeventFormComponent } from '../../components/reusable/create-subevent-form/create-subevent-form.component';


import { EventService } from '../../services/event-service/event.service';
import { catchError, of, switchMap } from 'rxjs';
import { Event } from '../../models/event.models';

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

  navigateToCreateEvent() {
    console.log("+ button clicked!");
    this.router.navigate(['events/create']);
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
