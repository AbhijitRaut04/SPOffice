import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../../../../models/location.models';
import { Event } from '../../../../models/event.models';
import { Sector } from '../../../../models/sector.models';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {

  location:Location;
  event:Event;
  sector: Sector;

  constructor (private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.event = history.state.event;
      this.sector = history.state.sector;
      this.location = history.state.location;
    });
  }

  addPolice() {
    console.log("Add police")
  }

  navigateToEditLocation(){
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/edit`],{
      state: { event: this.event, location: this.location, sector: this.sector },
    });
  }

}
