import { Component, OnInit } from '@angular/core';
import { Subadmin } from '../../../models/subadmin.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subadmin-page',
  standalone: true,
  templateUrl: './subadmin-page.component.html',
  styleUrls: ['./subadmin-page.component.css'],
})
export class SubadminPageComponent implements OnInit {
  subadmin: Subadmin;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const subadminFromState = history.state.subadmin;
      if (subadminFromState) {
        this.subadmin = subadminFromState;
      }
    });
  }
}
