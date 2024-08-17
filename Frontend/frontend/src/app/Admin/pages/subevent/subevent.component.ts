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
  subeventName: string;
  subeventId: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subeventName = this.route.snapshot.paramMap.get('name');

    this.route.queryParams.subscribe(params => {
      this.subeventId = params['id'];
    });

    console.log(`Subevent Name: ${this.subeventName}`);
    console.log(`Subevent ID: ${this.subeventId}`);
  }

  navigateToEditEvent() {
    const currentPath = this.router.url;
    const eventObject = {};
    this.router.navigate([`${currentPath}/edit`], { state: { eventObject } });
  }
  
  editEvent() {
    console.log("edit button clicked!");
    this.router.navigate(['events/create']);
  }
}