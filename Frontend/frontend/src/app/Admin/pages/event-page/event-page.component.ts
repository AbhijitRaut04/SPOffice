import { Component } from '@angular/core';
import { EventService } from '../../services/event-service/event.service';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {

  constructor(private eventService:EventService){}
  getEvents(){
    console.log(this.eventService.getEvents());
  }
}
