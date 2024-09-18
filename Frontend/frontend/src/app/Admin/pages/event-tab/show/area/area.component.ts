import { Component, OnInit } from '@angular/core';
import { Area } from '../../../../models/area.models';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { CreateBtnComponent } from '../../../../components/reusable/create-btn/create-btn.component';
import { CreateEventFormComponent } from '../../../../components/reusable/create-event-form/create-event-form.component';
import { CreateSubeventFormComponent } from '../../../../components/reusable/create-subevent-form/create-subevent-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BackBtnComponent } from '../../../../components/reusable/back-btn/back-btn.component';
import { SearchToolbarComponent } from '../../../../components/reusable/search-toolbar/search-toolbar.component';
import { DateFormatPipe } from '../../../../../pipes/date-format/date-format.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-area',
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
  templateUrl: './area.component.html',
  styleUrl: './area.component.css',
})
export class AreaComponent implements OnInit {
  area: Area;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.area = {
      id: 1,
      areaName: 'area example',
      head: {
        id: 1001,
        fullname: 'Dipanshu Singh',
        policeId: 2032,
        phone: '9658452855',
        email: 'depanshu123@gmail.com',
        gender: 'male',
        designation: 'Constable',
      },
      subPatrollingId: 1,
      description: 'g  kjndsf',
    };
  }

  navigateToLocation(location: any) {
    const currentPath = this.router.url;
    this.router.navigate(
      [
        `${currentPath}/${location.locationName
          .toLowerCase()
          .replace(' ', '-')}`,
      ],
      { state: { location } }
    );
  }

  navigateToAddArea() {
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/add-location`]);
  }

  navigateToEditArea() {
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/edit`], {
      state: { area: this.area },
    });
  }
}
