import { Component, OnInit } from '@angular/core';
import { BackBtnComponent } from '../../../../components/reusable/back-btn/back-btn.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Sector } from '../../../../models/sector.models';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../../../../models/event.models';
import { Location } from '../../../../models/location.models';
import { CreateBtnComponent } from '../../../../components/reusable/create-btn/create-btn.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-sector',
  standalone: true,
  imports: [
    CreateBtnComponent,
    BackBtnComponent,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './sector.component.html',
  styleUrl: './sector.component.css'
})
export class SectorComponent implements OnInit {

  sector: Sector;
  event:Event;

  constructor(private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sector = history.state.sector;
      console.log(this.sector)
      this.event = history.state.event;
    });
  }

  navigateToLocation(location:Location){
    const currentPath = this.router.url;
    this.router.navigate(
      [
        `${currentPath}/${location.locationName
          .toLowerCase()
          .replace(' ', '-')}`,
      ],
      { state: { location, event:this.event } }
    );
  }

  navigateToAddLocation() {
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/add-location`], {state:{sector:this.sector, event:this.event}});
  }

  editSector() {
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/edit`]);
  }
}
