import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../../../../models/location.models';
import { Event } from '../../../../models/event.models';

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

  constructor (private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.location = history.state.location;
      console.log(this.location)
      this.event = history.state.event;
    });
  }

  addPolice() {
    console.log("Add police")
  }

  editLocation() {
    const currentPath = this.router.url;
    this.router.navigate([`${currentPath}/edit`]);
  }

}
