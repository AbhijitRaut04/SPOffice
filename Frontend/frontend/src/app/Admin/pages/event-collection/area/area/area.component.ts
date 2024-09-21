import { Component, OnInit } from '@angular/core';
import { BackBtnComponent } from '../../../../components/reusable/back-btn/back-btn.component';
import { CreateBtnComponent } from '../../../../components/reusable/create-btn/create-btn.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Area } from '../../../../models/area.models';
import { Event } from '../../../../models/event.models';
import { Sector } from '../../../../models/sector.models';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [
    CreateBtnComponent,
    MatIconModule,
    CreateBtnComponent,
    BackBtnComponent,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
  ],
  templateUrl: './area.component.html',
  styleUrl: './area.component.css'
})
export class AreaComponent implements OnInit {

  area:Area;
  event:Event;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.area = history.state.area;
      console.log(this.area)
      this.event = history.state.event;
    });
  }

  navigateToSector(sector:Sector){
    console.log(sector)
    // const currentPath = this.router.url;
    // this.router.navigate(
    //   [
    //     `${currentPath}/${sector.sectorName
    //       .toLowerCase()
    //       .replace(' ', '-')}`,
    //   ],
    //   { state: { sector, event:this.event } }
    // );
  }

  navigateToAddSector() {
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/add-sector`], {state:{area:this.area, event:this.event}});
  }

  editArea(){
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/edit`]);
  }

}
