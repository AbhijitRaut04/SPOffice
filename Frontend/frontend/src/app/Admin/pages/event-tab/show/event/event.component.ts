import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { CreateBtnComponent } from '../../../../components/reusable/create-btn/create-btn.component';
import { CreateEventFormComponent } from '../../../../components/reusable/create-event-form/create-event-form.component';
import { CreateSubeventFormComponent } from '../../../../components/reusable/create-subevent-form/create-subevent-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, ActivatedRoute } from '@angular/router';
import { BackBtnComponent } from '../../../../components/reusable/back-btn/back-btn.component';
import { SearchToolbarComponent } from '../../../../components/reusable/search-toolbar/search-toolbar.component';
import { Event } from '../../../../models/event.models';
import { DateFormatPipe } from '../../../../../pipes/date-format/date-format.pipe';

@Component({
  selector: 'app-event',
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
    SearchToolbarComponent,
    DateFormatPipe
  ],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  event:Event;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const eventFromState = history.state.event;
      if (eventFromState) {
        this.event = eventFromState;
        console.log(this.event);
      }
    });
  }

  navigateToSubevent() {
    console.log("edit button clicked!");
    // this.router.navigate(['/create/subevent']);
    this.router.navigate([this.event.eventname], { state: { event:this.event } });  

    // const currentPath = this.router.url;
    // const eventObject = {
    //   id: this.event.id,
    //   name: this.event.eventname,
    // };
    // console.log(`${currentPath}/subevent`, this.event.eventname)
    // this.router.navigate([`${currentPath}/subevent`, this.event.eventname], { state: { eventObject } });
    
  }


  
  navigateToEditEvent() {
    const currentPath = this.router.url;
    const eventObject = {
      id: this.event.id,
      name: this.event.eventname,
    };
    this.router.navigate([`${currentPath}/edit`], { state: { eventObject } });
  }
}