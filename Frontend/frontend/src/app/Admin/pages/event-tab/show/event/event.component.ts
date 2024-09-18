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

      //testing purpose
      // this.event = {
      //   id: 1,
      //   adminId: 1,
      //   eventname: 'Community Safety Meeting',
      //   description:
      //     'A meeting to discuss community safety measures and initiatives.',
      //   head: {
      //     id: 1,
      //     fullname: 'John Doe',
      //     email: 'john.doe@example.com',
      //     phone: '123-456-7890',
      //     policeId: 12345,
      //     gender: 'Male',
      //     designation: 'Chief of Police',
      //   },
      //   cohead: {
      //     id: 2,
      //     fullname: 'Jane Smith',
      //     email: 'jane.smith@example.com',
      //     phone: '098-765-4321',
      //     policeId: 54321,
      //     gender: 'Female',
      //     designation: 'Deputy Chief',
      //   },
      //   date: new Date('2023-10-01T10:00:00'),
      //   subpatrollings: [
      //     {
      //       id: 1,
      //       subpatrollingname: 'Patrol Area 1',
      //       description:
      //         'Patrol area covering the north side of the community.',
      //       instructions: 'Ensure all entry points are secured.',
      //       head: {
      //         id: 3,
      //         fullname: 'Officer A',
      //         email: 'officer.a@example.com',
      //         phone: '111-222-3333',
      //         policeId: 67890,
      //         gender: 'Male',
      //         designation: 'Patrol Officer',
      //       },
      //       cohead: {
      //         id: 5,
      //         fullname: 'Officer C',
      //         email: 'officer.c@example.com',
      //         phone: '222-333-4444',
      //         policeId: 11223,
      //         gender: 'Female',
      //         designation: 'Assistant Patrol Officer',
      //       },
      //     },
      //     {
      //       id: 2,
      //       subpatrollingname: 'Patrol Area 2',
      //       description:
      //         'Patrol area covering the south side of the community.',
      //       instructions: 'Monitor all suspicious activities.',
      //       head: {
      //         id: 4,
      //         fullname: 'Officer B',
      //         email: 'officer.b@example.com',
      //         phone: '444-555-6666',
      //         policeId: 98765,
      //         gender: 'Female',
      //         designation: 'Patrol Officer',
      //       },
      //       cohead: {
      //         id: 6,
      //         fullname: 'Officer D',
      //         email: 'officer.d@example.com',
      //         phone: '555-666-7777',
      //         policeId: 33445,
      //         gender: 'Male',
      //         designation: 'Assistant Patrol Officer',
      //       },
      //     },
      //   ],
      // };
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
      { state: { subevent } }
    );
  }

  navigateToAddSubevent() {
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/add-subevent`]);
  }

  navigateToEditEvent() {
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/edit`], {
      state: { event: this.event },
    });
  }
}
