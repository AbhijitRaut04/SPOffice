import { Component, OnInit } from '@angular/core';
import { SubadminService } from '../../../services/subadmin-service/subadmin.service';
import { Subadmin } from '../../../models/subadmin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subadmins',
  standalone: true,
  templateUrl: './subadmins.component.html',
  styleUrls: ['./subadmins.component.css']
})
export class SubadminsComponent implements OnInit {

  subadmins: Subadmin[] = [];

  constructor(private subadminService: SubadminService, private router: Router) {}

  ngOnInit(): void {
    this.getSubadmins();
  }

  getSubadmins() {
    this.subadminService.getValidSubadmins().subscribe(
      (data: Subadmin[]) => {
        this.subadmins = data;
        console.log(this.subadmins);
      },
      error => {
        console.error("Error fetching subadmins:", error);
      }
    );
  }

  viewSubadmin(subadmin: Subadmin) {
    this.router.navigate(['/subadmins', subadmin.username.toLowerCase().replace(/\s+/g, '-')], { state: { subadmin } });
  }
}
