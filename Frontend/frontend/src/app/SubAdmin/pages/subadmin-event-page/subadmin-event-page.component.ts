import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../models/event.models';
import { DateFormatPipe } from '../../../pipes/date-format/date-format.pipe';

@Component({
  selector: 'app-subadmin-event-page',
  standalone: true,
  imports: [DateFormatPipe],
  templateUrl: './subadmin-event-page.component.html',
  styleUrl: './subadmin-event-page.component.css'
})
export class SubadminEventPageComponent {
  event:Event;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
   this.route.queryParams.subscribe(params => {
    const eventFromState = history.state.event;
    if (eventFromState) {
      this.event = eventFromState;
      console.log(this.event);
    }
  });
  }
}
