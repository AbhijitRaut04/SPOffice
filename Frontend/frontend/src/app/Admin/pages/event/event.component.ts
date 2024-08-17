import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CreateBtnComponent } from '../../components/reusable/create-btn/create-btn.component';
import { CreateEventFormComponent } from '../../components/reusable/create-event-form/create-event-form.component';
import { CreateSubeventFormComponent } from '../../components/reusable/create-subevent-form/create-subevent-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, ActivatedRoute } from '@angular/router';
import { BackBtnComponent } from '../../components/reusable/back-btn/back-btn.component';
import { SearchToolbarComponent } from '../../components/reusable/search-toolbar/search-toolbar.component';

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
  ],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventName: string;
  eventId: string;
  eventObject: object;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.eventName = this.route.snapshot.paramMap.get('name');

    this.route.queryParams.subscribe(params => {
      this.eventId = params['id'];
    });

    console.log(`Event Name: ${this.eventName}`);
    console.log(`Event ID: ${this.eventId}`);
  }

  navigateToSubevent() {
    console.log("edit button clicked!");
    // this.router.navigate(['/create/subevent']);
    this.router.navigate([this.eventName], { queryParams: { id: this.eventId } });  

    const currentPath = this.router.url;
    const eventObject = {
      id: this.eventId,
      name: this.eventName,
    };
    console.log(`${currentPath}/subevent`, this.eventName)
    this.router.navigate([`${currentPath}/subevent`, this.eventName], { state: { eventObject } });
    
  }


  
  navigateToEditEvent() {
    const currentPath = this.router.url;
    const eventObject = {
      id: this.eventId,
      name: this.eventName,
    };
    this.router.navigate([`${currentPath}/edit`], { state: { eventObject } });
  }
}