import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { CreateBtnComponent } from '../../../../components/reusable/create-btn/create-btn.component';
import { CreateEventFormComponent } from '../../../../components/reusable/create-event-form/create-event-form.component';
import { CreateSubeventFormComponent } from '../../../../components/reusable/create-subevent-form/create-subevent-form.component';
import { BackBtnComponent } from '../../../../components/reusable/back-btn/back-btn.component';
import { SearchToolbarComponent } from '../../../../components/reusable/search-toolbar/search-toolbar.component';
import { Subevent } from '../../../../models/subevent.models';
import { Event } from '../../../../models/event.models';
import { Area } from '../../../../models/area.models';

@Component({
  selector: 'app-subevent',
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
  templateUrl: './subevent.component.html',
  styleUrl: './subevent.component.css'
})
export class SubeventComponent implements OnInit {
  subevent:Subevent;
  event:Event;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.subevent = history.state.subevent;
      this.event = history.state.event;
    });
  }

  navigateToArea(area:Area){
    const currentPath = this.router.url;
    this.router.navigate(
      [
        `${currentPath}/${area.areaName
          .toLowerCase()
          .replace(' ', '-')}`,
      ],
      { state: { area, event:this.event } }
    );
  }

  navigateToAddArea() {
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/add-area`], {state:{subevent:this.subevent, event:this.event}});
  }
  
  navigateToPreviewPdf() {
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/preview`], {state:{event:this.event, subevent:this.subevent}});
  }
  editSubevent() {
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/edit`], {
      state: { subevent: this.subevent, event: this.event },
    });
  }
}