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
import { DateFormatPipe } from '../../../../../pipes/date-format/date-format.pipe';
import { Event } from '../../../../models/event.models';
import { Subevent } from '../../../../models/subevent.models';

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
    DateFormatPipe,
  ],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  event: Event;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.event = history.state.event;
    });
  }

  navigateToSubevent(subevent: Subevent) {
    const currentPath = this.router.url;
    this.router.navigate(
      [
        `${currentPath}/${subevent.subpatrollingname
          .toLowerCase()
          .replace(' ', '-')}`,
      ],
      { state: { subevent, event: this.event } }
    );
  }

 navigateToPreviewPdf(subevent:Subevent) {
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/${subevent.subpatrollingname
      .toLowerCase()
      .replace(' ', '-')}/preview`], {state:{event:this.event, subevent}});
  }


 navigateToAddSubevent() {
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/add-subevent`], {
      state: { event: this.event },
    });
  }

  navigateToEditEvent() {
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/edit`], {
      state: { event: this.event },
    });
  }

  viewAttendance() {
    console.log(this.event.attendance);
  }
}
