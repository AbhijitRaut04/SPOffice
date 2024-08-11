import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { CreateBtnComponent } from '../../components/reusable/create-btn/create-btn.component';
import { CreateSubeventFormComponent } from '../../components/reusable/create-subevent-form/create-subevent-form.component';


import { EventService } from '../../services/event-service/event.service';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [MatCardModule, RouterModule, MatExpansionModule, MatButtonModule, CreateBtnComponent, CreateSubeventFormComponent ],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventPageComponent {

  constructor( private router: Router, private eventService:EventService) {}

  navigateToCreateEvent() {
    console.log("+ button clicked!");
    this.router.navigate(['events/create']);
  }
  readonly panelOpenState = signal(false);
//   constructor(private eventService:EventService){}
  getEvents(){
    console.log(this.eventService.getEvents());
  }
}
