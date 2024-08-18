import { Component, OnInit } from '@angular/core';
import { SubadminService } from '../../services/subadmin-service/subadmin.service';
import { CurrentSubadmin } from '../../models/subadmin.models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-police-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './police-page.component.html',
  styleUrls: ['./police-page.component.css'] 
})
export class PolicePageComponent implements OnInit {

  subadmin?: CurrentSubadmin;

  constructor(private subadminService: SubadminService) { }

  ngOnInit(): void {
    this.fetchSubadmin();
  }

  fetchSubadmin(): void {
    this.subadminService.fetchSubadmin().subscribe(
      (data: CurrentSubadmin) => {
        this.subadmin = data;
        console.log('Fetched Subadmin:', data);
      },
      (error) => {
        console.error('Error fetching subadmin:', error);
      }
    );
  }
}
