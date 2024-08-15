import { Component } from '@angular/core';
import { EventService } from '../../services/event-service/event.service';
import { Event } from '../../models/event.models';
import { DateFormatPipe } from '../../../pipes/date-format/date-format.pipe';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [DateFormatPipe, RouterLink],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.css'
})
export class EventsPageComponent {

  events: Event[];

  constructor(private eventService: EventService, private router:Router) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  formatEventName(eventName: string): string {
    return eventName.replace(/\s+/g, '-');
  }

  fetchEvents(): void {
    this.eventService.getEvents().subscribe(
      (data) => {
        this.events = data;
        console.log('Fetched Events:', data);
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  viewEvent(event:Event){
    this.router.navigate(['/subadmin/events', event.eventname.toLowerCase().replace(/\s+/g, '-')], { state: { event } });
  }

}
