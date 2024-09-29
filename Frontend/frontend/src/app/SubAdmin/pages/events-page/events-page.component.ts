import { Component } from '@angular/core';
import { EventService } from '../../services/event-service/event.service';
import { Attendance, Event } from '../../models/event.models';
import { DateFormatPipe } from '../../../pipes/date-format/date-format.pipe';
import { Router, RouterLink } from '@angular/router';
import { Subadmin } from '../../models/subadmin.models';

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [DateFormatPipe, RouterLink],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.css',
})
export class EventsPageComponent {
  events: Event[];

  constructor(private eventService: EventService, private router: Router) {}

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
        this.formatAttendance();
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
  formatAttendance() {
    this.events.map((event) => {
      let attendance: Attendance[] = [];
      Object.entries(event.attendance).forEach((item) => {
        const str = item[0];
        const regex = /(\w+)='([^']*)'/g;
        const result: { [key: string]: string } = {};
        let match = /(\w+)=([0-9]*)/.exec(str);
        result[match[1]] = match[2];

        while ((match = regex.exec(str)) !== null) {
          result[match[1]] = match[2];
        }
        let subadmin = new Subadmin(result);
        let polices: any = item[1];

        attendance.push(new Attendance(subadmin, polices));
      });
      event.attendance = attendance;
    });
  }

  viewEvent(event: Event) {
    this.router.navigate(
      ['/subadmin/events', event.eventname.toLowerCase().replace(/\s+/g, '-')],
      { state: { event } }
    );
  }
}
